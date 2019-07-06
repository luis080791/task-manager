import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  tasks: Object = [
    { 
      id: 1, 
      name: 'Login screen', 
      description: 'Desciption login screen', 
      estimate: 6, 
      created_at: '2019-07-07 11:55:34',
      updated_at: '',
      status: 1,
      state:{ 
        id: 1, 
        name: 'Planned', 
        created_at: '2019-01-01 00:00:00',
        updated_at: '',
        status: 1
      } 
    },
    { 
      id: 1, 
      name: 'Register screen', 
      description: 'Desciption register screen', 
      estimate: 6,
      created_at: '2019-07-08 00:05:49',
      updated_at: '',
      status: 1,
      state:{ 
        id: 1, 
        name: 'In progress', 
        created_at: '2019-01-01 00:00:00',
        updated_at: '',
        status: 1
      } 
    },
    { 
      id: 1, 
      name: 'Research technologies', 
      description: 'Desciption research technologies', 
      estimate: 24, 
      created_at: '2019-07-05 14:39:09',
      updated_at: '',
      status: 1,
      state:{ 
        id: 1, 
        name: 'Completed', 
        created_at: '2019-01-01 00:00:00',
        updated_at: '',
        status: 1
      } 
    },
  ]

  states: Object = [
    { id: 1, name: 'Planned' },
    { id: 2, name: 'In progress' },
    { id: 3, name: 'Completed' }
  ]

}
