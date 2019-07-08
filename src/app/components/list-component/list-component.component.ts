import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

//Services
import { ApiService } from '../../../services/api'

@Component({
  selector: 'list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent implements OnInit {

  constructor( private api : ApiService ) { }

  todo = <any>[];

  inprogress =  <any>[];

  done =  <any>[];

  columns =  <any>[];

  ngOnInit() {
    this._getStates();
  }

  _getStates(){    
    this.api.getStates()
    .subscribe((states: any) => {
        if(states.error){

        }else{
         
          if(states.data.length == 0){
            this._postStates();
          }else{
            states.data.map((s)=>{
              switch(s.code){
                case 'PLA': 
                  this.todo = (s.task_ids);
                  this.columns.push(s);
                break;

                case 'INP': 
                  this.inprogress = s.task_ids;
                  this.columns.push(s);
                break;

                case 'COM': 
                  this.done = s.task_ids;
                  this.columns.push(s);
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

  

  drop(event: CdkDragDrop<string[]>) {
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
