import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-events-detail',
  templateUrl: './events-detail.page.html',
  styleUrls: ['./events-detail.page.scss'],
})
export class EventsDetailPage implements OnInit {

  items: Array<any> = [];
  data: any;

  constructor(public api: RestApiService, 
    public loadingController: LoadingController, 
    public route: ActivatedRoute,
    public router: Router) { }

  getAllTasks(){
    //console.log(this.api.getAllEvents());
    this.api.getAllEvents().subscribe(
      data =>{
        this.items = data.eventosFree
        console.log(data.eventosFree);
      }
      ,error =>{
        console.log("noo");
      })
  }

  ngOnInit() {
    console.log(this.route.snapshot.params['event']);
  }

}
