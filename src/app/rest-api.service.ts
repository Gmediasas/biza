import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';

const apiUrl = "http://api.zippopotam.us/";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  token: any = localStorage.getItem("token");
  id: any = localStorage.getItem("id");
  urlEmail: any="https://testing.gevents.co/eventosFree/public/";
  MyUrl:any="https://testing.gevents.co/middleware/public/api";

  constructor(private http: HttpClient) { }
  
  getAllTask(){
    const path = this.MyUrl+"/detail_event_free/1";
    return this.http.get(path);
  }

  // Metodo para restablecer la contraseña del usuario

  rememberPassword(emailRemember: any):Observable<any>{
    const httpHeaders = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Accept': 'application/json' 
    });
    const path = this.MyUrl+"/rememberPassword";
    

    return this.http.post(path,{
      email: emailRemember,
      url: this.urlEmail
      },{ headers: httpHeaders }) 
  }
  // Metodo para realizar el login
  loginPost(emailPost: any, passwordPost:any ):Observable<any>{
    const httpHeaders = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Accept': 'application/json' 
    });
    const path = this.MyUrl+"/login_user_cors";

    return this.http.post(path,{
      email: emailPost,
      password: passwordPost,
      remember_me: true
      },{ headers: httpHeaders }) 
  }

  // Inicializar token
  setToken(token: any){
    this.token = token;
  }

  // Inicializar id
  setId(id: any){
    this.id = id;
  }

  // Obtener todos los eventos de un usuario
  getAllEvents():Observable<any>{

    
    const httpHeaders = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ this.token
    });
    const path = this.MyUrl+"/api/list_events_free_cors/" + this.id;
    return this.http.get(path,{headers: httpHeaders});
  }

  getDetailsEvents(evento: any):Observable<any>{
    const httpHeaders = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ this.token
    });
    const path = this.MyUrl+"/detail_event_free_cors/" + evento;

    console.log(this.token);
console.log(this.id);
    return this.http.get(path,{headers: httpHeaders});
  }

  getListTickets(evento: any):Observable<any>{
    const httpHeaders = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ this.token
    });
    const path = this.MyUrl+"/boletas_eventos/" + evento;
    return this.http.get(path,{headers: httpHeaders});
  }

  sendCodeQR(codigo: any, evento: any):Observable<any>{
    const httpHeaders = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ this.token
    });

    const path = this.MyUrl+"/decode_code_QR";
    return this.http.post(path,{"codigo":codigo, "evento": evento},{headers: httpHeaders});
  }

  validateMultiTickets(tickes: any):Observable<any>{
    const httpHeaders = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ this.token
    });

    const path = this.MyUrl+"/validate_multi_boletas";
    return this.http.post(path,{"boletas":tickes},{headers: httpHeaders});
  }

  validateLogin(){
    if (this.token == ""){
      return 0;
    }else{
      return 1;
    }
  }

  closeSession(){
    this.token = "";
    localStorage.setItem("token", ' ');     
  }


}
