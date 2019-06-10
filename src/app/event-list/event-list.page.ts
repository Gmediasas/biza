import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {

  tickes: any[] = [];

  constructor(public api: RestApiService) { }

  getAllEvents(){
    this.api.getListTickets
  }

  ngOnInit() {
  }

}
