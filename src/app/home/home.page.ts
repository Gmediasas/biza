import { Component } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombre: string;
  password: string;
  token: string;
  id: any;
  data: any;

  constructor(public api: RestApiService,  
    public alertCtrl: AlertController,
    private router: Router) {}

  login(){
     this.api.loginPost(this.nombre, this.password).subscribe(
       
      data =>{
        if (data !== null && data !== undefined) {
          this.router.navigateByUrl('/events-list');
          this.id = data.user.id;
          this.token = data.access_token;
          this.api.setToken(this.token);
          this.api.setId(this.id);
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
    //console.log(this.nombre, this.password);
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}
