import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.page.html',
  styleUrls: ['./events-list.page.scss'],
})
export class EventsListPage implements OnInit {

  constructor(public api: RestApiService) { }

  getAllTasks(){
    //console.log(this.api.getAllEvents());
    this.api.getAllEvents().subscribe(
      data =>{
        console.log(data);
      }
      ,error =>{
        console.log("noo");
      })
  }


  ngOnInit() {
    this.getAllTasks();
  }

}
