import { Component } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


//Services
import { ApiService } from '../services/api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  closeResult: string;

  constructor(private modalService: NgbModal, private api : ApiService, private _snackBar: MatSnackBar) {}

  //Auxiliary values
  cad: String = '';  
  aux_task_id: String = '';
  aux_state_id: String = '';
  edit: Boolean = false;
  currentContainer: String;
  previuosContainer: String;
  hours: Number = 0;

  //Modal values
  states = [];
  name: String = '';
  description: String = '';
  estimate: Number;
  state_name: String = '';
  state_id: String = '';

  //Drag and drop
  todo = <any>{};
  inprogress =  <any>{};
  done =  <any>{};
  columns =  <any>[];


  ngOnInit() {
      this._getStates();
  }

  //Api functions
  _getStates(){
      this.states = [];
    this.api.getStates()
        .subscribe((states:any) => {
            if(states.error){
            //Error
            }else{
                if(states.data.length == 0){
                    this._postStates();
                }else{
                    states.data.map((s)=>{
                    
                    this.hours = 0;
                    switch(s.code){                        
                        case 'PLA':                            
                            this.state_name = s.name;
                            this.state_id = s._id;
                            this.todo = { id: s._id, ids: s.task_ids }
                            this.columns.push(s);
                            s.task_ids.map((t)=>{
                                this.hours = this.hours + t.estimate ;
                            })
                            this.states.push( { id: s._id, name: s.name, code: s.code, hrs: this.hours } )
                        break;
                        
                        case 'INP': 
                            this.inprogress = { id: s._id, ids: s.task_ids}
                            this.columns.push(s);
                            s.task_ids.map((t)=>{
                                this.hours = this.hours + t.estimate ;
                            })
                            this.states.push( { id: s._id, name: s.name, code: s.code, hrs: this.hours } )
                        break;
                        
                        case 'COM': 
                            this.done = {id: s._id, ids: s.task_ids}
                            this.columns.push(s);

                            s.task_ids.map((t)=>{
                                this.hours = this.hours + t.estimate ;
                            })
                            this.states.push( { id: s._id, name: s.name, code: s.code, hrs: this.hours } )
                        break;
                    }
                })
              }
          }
      })
  }

    _postStates(){
        this.api.postStates()
        .subscribe((states: any) => {
            if(states.error){
            //Error
            }else{
            this._getStates();
            }
        })
    }

    _postTask(){
        this.api.postTask(this.name,this.description, this.estimate, this.state_id)
        .subscribe((task:any) => {
            if(task.error){

            }else{
                this._getStates();
                this.closeModal();           
            }
        })
    }

    _editTask(){
        this.api.putTask(this.aux_task_id, this.name, this.description, this.estimate, this.state_id, this.aux_state_id)
        .subscribe((task:any) => {
            if(task.error){

            }else{
                this._getStates();
                this.closeModal();           
            }
        })        
    }

    _deleteTask(){
        this.api.deleteTask(this.aux_task_id, this.aux_state_id)
        .subscribe((task:any) => {
            if(task.error){

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

    clear(){
        this.name= '';
        this.description = '';
        this.estimate = undefined;
        this.state_id = '';
        this.aux_task_id = '';
        this.aux_state_id = '';
        this.edit = false;
        this.states.map((s)=>{            
            if(s.code == 'PLA'){
                this.state_name = s.name;
                this.state_id = s.id;
            }
        })
    }

    flagAddT(bodyM:any){
       this.clear();
        this.openModal(bodyM);
    }

    create(){
        if(
            this.name != '' &&
            this.description != '' &&
            (this.estimate != 0 && this.estimate != undefined)
        ){
            this._postTask();
        }else{
            this._snackBar.open('Empty fields!', '', {
                duration: 1500,
            });
        }
    }

    setStateID($event){
        this.cad = $event;
        this.states.map((s)=>{
            if(this.cad == s.name)
                this.state_id = s.id;
        })
    }

    undelete(aux_task_id:any, aux_state_id:any, bodyM:any){
        this.aux_state_id = aux_state_id;
        this.aux_task_id = aux_task_id;
        this.openModal(bodyM);
    }

    flagEditT(task:any, state_id:any, bodyM:any){

        this.edit = true;

        this.name = task.name;
        this.description = task.description;
        this.estimate = task.estimate;
        this.aux_state_id = state_id;
        this.aux_task_id = task._id;
        this.states.map((s)=>{
            if(state_id == s.id){
                this.state_id = s.id;
                this.state_name = s.name;
            }                
        })
        this.openModal(bodyM);
    }

    actionInfo(){
        if(this.edit == true){
            this._editTask();
        }else{
            this._postTask();
        }
    }

  //Aesthetic functions
  limitTxt(txt, index){
    if(index == 'name'){
        if(txt.length > 30){
            return txt.substring(0,27)+'...';
        }else{
            return txt;
        }
    }else if(index == 'des'){
        if(txt.length > 50){
            return txt.substring(0,47)+'...';
        }else{
            return txt;
        }
    }
  }


  //Drag and Drop
    drop(event: CdkDragDrop<string[]>, state:any) {
        //console.log(state)
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex); 
        } else{
            transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
        }
    }


}
