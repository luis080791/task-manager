import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  items: Object = [
    { 
      id: 1, 
      name: 'Planned', 
      created_at: '2019-01-01 00:00:00',
      updated_at: '',
      status: 1,
      tasks:[
        { 
          id: 1, 
          name: 'Task planned 1', 
          description: 'Desciption task planned 1', 
          estimate: 6, 
          created_at: '2019-07-07 11:55:34',
          updated_at: '',
          status: 1,
          
        },
        { 
          id: 2, 
          name: 'Task planned 2', 
          description: 'Desciption task planned 2', 
          estimate: 6, 
          created_at: '2019-07-07 11:58:34',
          updated_at: '',
          status: 1,          
        },
        { 
          id: 3, 
          name: 'Task planned 3', 
          description: 'Desciption task planned 3', 
          estimate: 6, 
          created_at: '2019-07-08 00:05:34',
          updated_at: '',
          status: 1,
          
        },
      ]
    },
    { 
      id: 2, 
      name: 'In progress', 
      created_at: '2019-01-01 00:00:00',
      updated_at: '',
      status: 1,
      tasks:[ ]
    },
    { 
      id: 3, 
      name: 'Completed', 
      created_at: '2019-01-01 00:00:00',
      updated_at: '',
      status: 1,
      tasks:[ ]
    }
  ]



  todo = [
    'Get to work'
  ];

  inprogress = [
    'Get up'
  ];

  done = [
    'Clean the house'
  ];

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.container)
    if (event.previousContainer === event.container) {
      
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
