import { Component } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currentScreenOrientation:string;

  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  nombre: string;
  password: string;

  constructor(
    public api: RestApiService,  
    public alertCtrl: AlertController,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    private screenOrientation: ScreenOrientation
  ) {
    this.currentScreenOrientation = this.screenOrientation.type; 
    this.encodeData = "https://www.FreakyJolly.com";
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }


  setPortrait(){
    // set to portrait
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  // Metodo de inicio de sesion

  login(){
     this.api.loginPost(this.nombre, this.password).subscribe(
       
      data =>{
        if (data !== null && data !== undefined) {
          this.router.navigateByUrl('/events-list');
          this.api.setToken(data.access_token);
          this.api.setId( data.user.id);
        }else{
         this.presentAlert('Datos incorrectos');
        }
        
      }, error => {
        let error_text = ''
        switch (error.status) {
          case 401:
            error_text = "Usuario o contraseña incorrecta"
            break

          case 500:
            error_text = "Hubo un problema de nuestro lado Inténtelo mas tarde"
            break

          default:
            error_text = "Hubo un problema inténtelo mas tarde"
            break
        }
        this.presentAlert(error_text);
      }
    ) 
  }

  // Alert errores
  
  async presentAlert(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Gevents',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  ionViewWillEnter() {
    this.setPortrait();
    if(this.api.validateLogin() != 0){
      this.router.navigateByUrl('/events-list');
    }
  }

}
