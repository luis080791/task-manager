import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//Services
import { ApiService } from '../../../services/api'

@Component({
  selector: 'card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css']
})
export class CardComponentComponent implements OnInit {

  constructor(private modalService: NgbModal, private api : ApiService) {}

  
  name: String = '';
  description: String = '';
  estimate: Number = 0;
  states = [];

  ngOnInit() {
    this._getStates();
  }

  _getStates(){
    this.api.getStates()
    .subscribe((states: any) => {
        if(states.error){
          //Error
        }else{
          console.log(states)
          states.data.map((s)=>{
            this.states.push( { id: s._id, name: s.name } )
          })
        }
    })
  }

  @Input() public task: string;

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  close(){
      this.modalService.dismissAll();
  }

  edit(){
    console.log('Editar')
    //$('#editTask').modal('hide')
  }

  remove(){
    console.log('Remove')
    //$('#removeTask').modal('hide')
  }





}
