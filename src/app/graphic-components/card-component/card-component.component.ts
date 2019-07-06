import { Component, OnInit, Input } from '@angular/core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'; //Import icons by name

@Component({
  selector: 'card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css']
})
export class CardComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //Create icon variables;
  faTrash = faTrash;
  faEdit = faEdit;

  //Import attributes
  @Input() public task: string;


  edit(){
    console.log('Editar')
    $('#editTask').modal('hide')
  }

  remove(){
    console.log('Remove')
    $('#removeTask').modal('hide')
  }

}
