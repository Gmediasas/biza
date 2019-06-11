import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-events-detail',
  templateUrl: './events-detail.page.html',
  styleUrls: ['./events-detail.page.scss'],
})
export class EventsDetailPage implements OnInit {

  encodeData: any;
  scannedData: string;
  barcodeScannerOptions: BarcodeScannerOptions;

  items: Array<any> = [];
  data: any;
  evento: any;
  descripcion: any;
  imagen: any;
  id: any;

  constructor(public api: RestApiService, 
    public loadingController: LoadingController, 
    public route: ActivatedRoute,
    private barcodeScanner: BarcodeScanner,
    public router: Router) {
      this.encodeData = "https://www.FreakyJolly.com";
      //Options
      this.barcodeScannerOptions = {
        showTorchButton: true,
        showFlipCameraButton: true
      };
    }


  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        //alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData.text;
        this.api.sendCodeQR(this.scannedData).subscribe(
        data =>{
          alert("Barcode data " + data.boletas);
          console.log(data.boletas);
        },
      (err) => {
        alert("Error " + err);
      }
    );

        /* this.api.sendCodeQR(this.scannedData).subscribe(
          data =>{
            alert("Barcode data " + data);
            //console.log(data);
          },
          (err) => {alert("Error " + err);}); */

      })
      .catch(err => {
        console.log("Error", err);
      });

      /* this.api.sendCodeQR(this.scannedData).subscribe(
        data =>{
          alert("Barcode data " + JSON.stringify(data));
          //console.log(data);
        }) */
  }

  
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
        this.id = data.evento.id
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
