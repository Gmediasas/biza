import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-events-detail',
  templateUrl: './events-detail.page.html',
  styleUrls: ['./events-detail.page.scss'],
})
export class EventsDetailPage implements OnInit {

  data: any;

  constructor(public api: RestApiService, public loadingController: LoadingController) { }

  getAllTasks(){
    this.api.getAllTask()
    .subscribe( todos => {
      this.data = todos;
      console.log(todos);
    });
  }

  ngOnInit() {
  }

}
