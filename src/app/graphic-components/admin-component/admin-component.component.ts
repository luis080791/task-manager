import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; //Import icons by name

@Component({
  selector: 'admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css']
})
export class AdminComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //Create icon variables;
  faPlus = faPlus;


  //Add task
  addTask(){
    alert('here')
  }

}
