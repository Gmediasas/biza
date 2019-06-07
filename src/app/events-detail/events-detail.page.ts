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
  evento: any;
  descripcion: any;
  imagen: any;

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

  getEventsDetails(){
    this.api.getDetailsEvents(this.route.snapshot.params['event']).subscribe(
      data =>{
        this.evento = data.evento.nombre
        this.descripcion = data.evento.descripcion
        this.imagen = data.imagenLogo.imagen
        //console.log(data);
      }
      ,error =>{
        console.log("noo");
      })
  }

  ngOnInit() {
    this.getEventsDetails();
  }

}
