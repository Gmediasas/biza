import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {

  tickes: any[] = [];

  constructor(public api: RestApiService, public route: ActivatedRoute) { }

  getAllEvents(){
    this.api.getListTickets(this.route.snapshot.params['event']).subscribe(
      data =>{
        this.tickes = data.boletas;
        console.log(this.tickes);
      }
      ,error =>{
        console.log("noo");
      })
  }

  buscar(){
    
  }

  ngOnInit() {
    this.getAllEvents();
   // console.log(this.route.snapshot.params['event']);
  }

}
