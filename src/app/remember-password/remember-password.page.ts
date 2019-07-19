import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-remember-password',
  templateUrl: './remember-password.page.html',
  styleUrls: ['./remember-password.page.scss'],
})
export class RememberPasswordPage implements OnInit {
  email: string;
  
  constructor(public api: RestApiService,
    public route: ActivatedRoute,
    private router: Router,
    public alertCtrl: AlertController) { }

  ngOnInit() {
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

  rememberPasswordForm(){
     this.api.rememberPassword(this.email).subscribe(
       
      data =>{
        console.log(data);
        this.presentAlert('Verifique su correo electrónico, se ha enviado una contraseña');
        
      }, error => {
        console.log(error);
         this.presentAlert('Usuario no registrado, verifique su correo');
      }
    ) 
  }

  //Cerrar la sesion
  logOut(){
    this.api.closeSession();
    this.router.navigateByUrl('/home');
  }

}
