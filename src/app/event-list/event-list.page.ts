import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormBuilder, FormGroup,FormArray, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})

export class EventListPage implements OnInit {
  form: FormGroup;
  orders = [];
  tickes = [];

  constructor(public api: RestApiService, public route: ActivatedRoute,private formBuilder: FormBuilder) { 
    
    this.form = this.formBuilder.group({
      orders: new FormArray([], minSelectedCheckboxes(1))
    });

   // this.getAllEvents();
    // async orders
    of(this.getOrders()).subscribe(orders => {
      this.orders = orders;
      this.addCheckboxes();
    });

  }

  private addCheckboxes() {
    this.orders.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.orders as FormArray).push(control);
    });
  }


  getAllEvents(){
    this.api.getListTickets(this.route.snapshot.params['event']).subscribe(
      data =>{
        this.tickes = data.boletas;
        console.log(this.tickes);
      }
      ,error =>{
        console.log("noo");
      })
  }


  getOrders() {
    /* var datass = [];
    this.api.getListTickets(this.route.snapshot.params['event']).subscribe(
      data =>{
        this.tickes = data.boletas;
        console.log(this.tickes);
      }
      ,error =>{
        console.log("noo");
      }
    );

    var numeros =  [
      { id: 100, name: 'order 1' },
      { id: 200, name: 'order 2' },
      { id: 300, name: 'order 3' },
      { id: 400, name: 'order 4' }
    ];

    
    console.log(this.tickes); */

    /* 
    var numeros1 = [
      {
            "id": 1,
            "codigo_boleta": "PJJACOA5OJ",
            "id_pasarela": 3,
            "id_evento": 2,
            "identificador_pago": "239337",
            "tipo_documento": "",
            "numero_documento": "1023970450",
            "nombre_apellido": "karen vargas",
            "email": "kdvargascasas@gmail.com",
            "telefono": "3138327845",
            "valor": 1000,
            "fecha": "2019-06-11 11:16:59",
            "medio_pago": "PSE - BANCO UNION COLOMBIANO",
            "id_codigodes": 1,
            "estado_id": 13,
            "created_at": "2019-06-11 11:18:11",
            "updated_at": "2019-06-11 11:18:11"
        },
        {
            "id": 2,
            "codigo_boleta": "RBAW6MJ2LQ",
            "id_pasarela": 3,
            "id_evento": 2,
            "identificador_pago": "239337",
            "tipo_documento": "",
            "numero_documento": "1023970450",
            "nombre_apellido": "karen vargas",
            "email": "kdvargascasas@gmail.com",
            "telefono": "3138327845",
            "valor": 1000,
            "fecha": "2019-06-11 11:16:59",
            "medio_pago": "PSE - BANCO UNION COLOMBIANO",
            "id_codigodes": 1,
            "estado_id": 13,
            "created_at": "2019-06-11 11:47:16",
            "updated_at": "2019-06-11 11:47:16"
        }
    ]; */


    var numeros1 = [
      {
            "id": 1,
            "codigo_boleta": "PJJACOA5OJ",
            "id_pasarela": 3,
            "id_evento": 2,
            "identificador_pago": "239337",
            "tipo_documento": "",
            "numero_documento": "1023970450",
            "nombre_apellido": "karen vargas",
            "email": "kdvargascasas@gmail.com",
            "telefono": "3138327845",
            "valor": 1000,
            "fecha": "2019-06-11 11:16:59",
            "medio_pago": "PSE - BANCO UNION COLOMBIANO",
            "id_codigodes": 1,
            "estado_id": 13,
            "created_at": "2019-06-11 11:18:11",
            "updated_at": "2019-06-11 11:18:11"
        },
        {
            "id": 2,
            "codigo_boleta": "RBAW6MJ2LQ",
            "id_pasarela": 3,
            "id_evento": 2,
            "identificador_pago": "239337",
            "tipo_documento": "",
            "numero_documento": "1023970450",
            "nombre_apellido": "karen vargas",
            "email": "kdvargascasas@gmail.com",
            "telefono": "3138327845",
            "valor": 1000,
            "fecha": "2019-06-11 11:16:59",
            "medio_pago": "PSE - BANCO UNION COLOMBIANO",
            "id_codigodes": 1,
            "estado_id": 13,
            "created_at": "2019-06-11 11:47:16",
            "updated_at": "2019-06-11 11:47:16"
        }
    ];

    console.log(this.tickes);
    return numeros1;
    //return this.tickes;
       
  }

  submit() {
    const selectedOrderIds = this.form.value.orders
      .map((v, i) => v ? this.orders[i].id : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }

  ngOnInit(){
    //this.getAllEvents();
  }

}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
