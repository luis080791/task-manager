import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css']
})
export class CardComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() public yyy: string;

}
