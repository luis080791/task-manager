import { Component } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';


//Services
import { ApiService } from '../services/api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private modalService: NgbModal, private api : ApiService, private _snackBar: MatSnackBar) {}

    //Auxiliary values
    cad: String='';  
    aux_task_id: String='';
    aux_state_id: String='';
    edit: Boolean=false;
    hours: Number=0;
    post_state_name: String = '';
    post_state_id: String = '';
    edit_state: Boolean = false;

    array_states=[];

    //Modal values
    states=[];
    name: String='';
    description: String='';
    estimate: Number;
    state_name: String='';
    state_id: String='';

    //Drag and drop
    todo={};
    inprogress={};
    done={};
    columns=[];


    ngOnInit() {
        this._getStates();
    }

  //Api functions
    _getStates(){
        this.states=[];
        this.api.getStates()
        .subscribe((states:any)=>{
            if(states.error){
                //Error
            }else{
                if(states.data.length==0){
                    //this._postStates();
                }else{
                    this.array_states=[];
                    states.data.map((s:any)=>{                    
                        this.hours=0;                        
                        s.task_ids.map((t:any)=>{
                            this.hours=this.hours + t.estimate ;
                        })
                        this.array_states.push( { id: s._id, name: s.name, hrs: this.hours, ids: s.task_ids } )
                    })  
                }
            }
        })
    }

    //Create states
    _postState(){
        this.api.postState(this.post_state_name)
        .subscribe((states:any)=>{
            if(states.error){
                //Error
            }else{
                this._getStates();
                this.closeModal();
            }
        })
    }

    //Put state
    _putSate(){
        this.api.putState(this.post_state_id, this.post_state_name)
        .subscribe((task:any)=>{
            if(task.error){
                //Error
            }else{
                this._getStates();
                this.closeModal();           
            }
        })
    }

    //Create task
    _postTask(){
        this.api.postTask(this.name,this.description, this.estimate, this.state_id)
        .subscribe((task:any)=>{
            if(task.error){
                //Error
            }else{
                this._getStates();
                this.closeModal();           
            }
        })
    }

    //Edit task
    _editTask(){
        this.api.putTask(this.aux_task_id, this.name, this.description, this.estimate, this.state_id, this.aux_state_id)
        .subscribe((task:any)=>{
            if(task.error){
                //Error
            }else{
                this._getStates();
                this.closeModal();           
            }
        })        
    }

    //Delete task
    _deleteTask(){
        this.api.deleteTask(this.aux_task_id, this.aux_state_id)
        .subscribe((task:any)=>{
            if(task.error){
                //Error
            }else{
                this._getStates();
                this.closeModal();           
            }
        })
    }

    //Modal functions
    openModal(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    closeModal(){
        this.modalService.dismissAll(); 
        this.clear();       
    }

    //Aesthetic functions
    clear(){
        //Clear fields
        this.name='';
        this.description='';
        this.estimate=undefined;
        this.state_id='';
        this.aux_task_id='';
        this.aux_state_id='';
        this.edit=false;
        this.post_state_name='';
        this.edit_state=false;
        this.state_name='';
        this.state_id='';
        this.post_state_id='';
    }

    limitTxt(txt:any, index:any){
        //Limit text
        if(index=='name'){
            if(txt.length>30){
                return txt.substring(0,27)+'...';
            }else{
                return txt;
            }
        }else if(index=='des'){
            if(txt.length>50){
                return txt.substring(0,47)+'...';
            }else{
                return txt;
            }
        }
    }

    //Clear inputs for add new task
    flagAddT(bodyM:any){
        this.clear();
        this.openModal(bodyM);
    }

    //Validate fields to create task
    create(){
        if(
            this.name!='' &&
            this.description!='' &&
            (this.estimate!=0 && this.estimate!=undefined) &&
            this.state_id!=''
        ){
            this._postTask();
        }else{
            this._snackBar.open('Empty fields!', '', {
                duration: 1500,
            });
        }
    }

    //Change state_id for tag option
    setStateID($event:any){
        this.cad=$event;
        this.array_states.map((s)=>{
            if(this.cad==s.name)
                this.state_id=s.id;
        })
    }

    //Ask after to delete and validate from and to what state
    undelete(aux_task_id:any, aux_state_id:any, bodyM:any){
        this.aux_state_id=aux_state_id;
        this.aux_task_id=aux_task_id;
        this.openModal(bodyM);
    }

    //Fill inputs for edit task
    flagEditT(task:any, state_id:any, bodyM:any){
        this.edit=true; //To determine action to click buton modal
        this.name=task.name;
        this.description=task.description;
        this.estimate=task.estimate;
        this.aux_state_id=state_id;
        this.aux_task_id=task._id;
        this.array_states.map((s)=>{
            if(state_id==s.id){
                this.state_id=s.id;
                this.state_name=s.name;
            }                
        })
        this.openModal(bodyM);
    }

    //Define action to modal
    actionInfo(){
        if(this.edit==true){
            this._editTask();
        }else{
            this._postTask();
        }
    }

    //Open add state
    stateEdit(bodyM:any, flag:any, state:any){

        if(flag ==false){
            this.edit_state = false;
            this.openModal(bodyM);
        }else{
            this.edit_state = true;
            this.post_state_name = state.name;
            this.post_state_id = state.id;
            this.openModal(bodyM);
        }
    }

    //Define action state modal
    actionInfoState(){
        if(this.edit_state == true){
            this._putSate();
        }else{
            if(this.post_state_name ==''){
                this._snackBar.open('Empty fields!', '', {
                    duration: 1500,
                });
            }else{
                this._postState();
            }            
        }
    }
}
