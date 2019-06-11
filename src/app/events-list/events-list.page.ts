import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.page.html',
  styleUrls: ['./events-list.page.scss'],
})
export class EventsListPage implements OnInit {

  items: Array<any> = [];

  constructor(public api: RestApiService, private router: Router) { }

  getAllTasks(){
    this.api.getAllEvents().subscribe(
      data =>{
        this.items = data.eventosFree
        console.log(data.eventosFree);
      }
      ,error =>{
        console.log("noo");
      })
  }

 /*  scanCode() {
    var data = "ItPT1s4p93iiQzAEdKFgTKjPi28mfDtuKT8hG1UwBOQJNwuiyqLa8gkLumYBi89gDaRVH0IydTKx/0y0vxxs1vKV1REONCEkuROf1Mhlt9FckLZsAES9h/tg1U9rOGkG";
    this.api.sendCodeQR(data).subscribe(
      data =>{
        alert("Barcode data " + data.boletas);
        console.log(data.boletas);
      },
      (err) => {
        alert("Error " + err);
      }
    );
  } */


  ngOnInit() {
    this.getAllTasks();
  }

}
