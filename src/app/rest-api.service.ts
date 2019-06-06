import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';

const apiUrl = "http://api.zippopotam.us/";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    let response1 = this.http.get(apiUrl+'US/00210');
    let response2= this.http.get(apiUrl+'IN/110001');
    let response3 = this.http.get(apiUrl+'BR/01000-000');
    let response4 = this.http.get(apiUrl+'FR/01000');
    return forkJoin([response1, response2, response3, response4]);
  }
  
  getAllTask(){
    const path = "http://localhost/middleware/public/api/detail_event_free/2";
    return this.http.get(path);
  }

  loginPost(emailPost: any, passwordPost:any ){
    const httpHeaders = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Accept': 'application/json' 
    });
    const path = "http://192.168.1.171/middleware/public/api/login_user_cors";
    const path1 = "http://localhost/middleware/public/api/detail_event_free_cors/2";

    return this.http.post(path,{
      email: emailPost,
      password: passwordPost,
      remember_me: true
      },{ headers: httpHeaders }) 
     // return this.http.get(path1);
  }

  getAllEvents(id: any){
    const path = "http://192.168.1.171/middleware/public/api/list_events_free_cors/"+id;
    return this.http.get(path);
  }
}
