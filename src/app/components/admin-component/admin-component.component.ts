import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';

//Services
import { ApiService } from '../../../services/api'

@Component({
    selector: 'admin-component',
    templateUrl: './admin-component.component.html',
    styleUrls: ['./admin-component.component.css']
})
export class AdminComponentComponent implements OnInit {

    constructor(private modalService: NgbModal, private api : ApiService, private _snackBar: MatSnackBar) {}

    //Auxiliary values
    cad: String = '';    

    //Form values
    states = [];
    name: String = '';
    description: String = '';
    estimate: Number;
    state_name: String = '';
    state_id: String = '';
    error: Boolean = true;

    ngOnInit() {
        this._getStates();
    }

    _getStates(){
        this.api.getStates()
        .subscribe((states:any) => {
            if(states.error){
            //Error
            }else{
                console.log('Volvi')
                states.data.map((s)=>{
                    if(s.code == 'PLA'){
                        this.state_name = s.name;
                        this.state_id = s._id;
                    }
                    this.states.push( { id: s._id, name: s.name } )
                })
            }
        })
    }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    close(){
        this.modalService.dismissAll();
    }

    create(){
        if(
            this.name != '' &&
            this.description != '' &&
            (this.estimate != 0 && this.estimate != undefined)
        ){
            this.api.postTask(this.name,this.description, this.estimate, this.state_id)
            .subscribe((task:any) => {
               if(task.error){

               }else{
                   this._getStates();
               }
            })
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

    
}
