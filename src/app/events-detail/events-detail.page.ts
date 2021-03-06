import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    public router: Router,
    public alertCtrl: AlertController) {
      this.encodeData = "https://www.FreakyJolly.com";
      //Options
      this.barcodeScannerOptions = {
        showTorchButton: true,
        showFlipCameraButton: true, 
        prompt : "Message"
      };
    }


  scanCode() {
    this.barcodeScanner
      .scan(this.barcodeScannerOptions)
      .then(barcodeData => {
        this.scannedData = barcodeData.text;
        this.api.sendCodeQR(this.scannedData, this.id).subscribe(
        data =>{
          var mensaje = "";
          if (data.estado == "1"){
            mensaje = "Boleta validada correctamente, Bienvenido."
          }else if(data.estado == "2"){
            mensaje = "Boleta anulada."
          }else if(data.estado == "3"){
            mensaje = "Boleta ya fue validada"
          }else{
            mensaje = "Problema al validar"
          }
          this.presentAlert(mensaje);
          //alert("Mensaje: " + mensaje);
          //console.log(data.boletas);    
        },(err) => {
          this.presentAlert(err);
            //alert("Error " + err);
          }
        );
      })
      .catch(err => {
        console.log("Error", err);
      });
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

  logOut(){
    this.api.closeSession();
    this.router.navigateByUrl('/home');
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Gevents',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

}
