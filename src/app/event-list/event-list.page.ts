import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup,FormArray, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})

export class EventListPage implements OnInit {
  FormGroup: FormGroup;
  orders = [];
  tickes: any[] = [];
  textoBuscar = '';
  boleta: string;
  final = [];

  constructor(public api: RestApiService, public route: ActivatedRoute,private formBuilder: FormBuilder, private router: Router) { 
    this.FormGroup = this.formBuilder.group({
      boletas: new FormArray([], minSelectedCheckboxes(1))
    });
  }


  selection(name: string) {
    //console.log(name)
    var index = this.final.indexOf(name);
    if(index >= 0){
      this.final.splice(index, 1);
    }else{
      this.final.push(name);
    }
    //console.log("indice" + index);
    console.log(this.final);
  }

  getAllEvents(){
    this.api.getListTickets(this.route.snapshot.params['event']).subscribe(
      data =>{
        this.tickes = data.boletas;
        //console.log(this.tickes);
      }
      ,error =>{
        console.log("noo");
      })
  }

  buscar(event){
    //console.log(event);
    this.textoBuscar = event.detail.value;
  }


  datos(){
    if(this.final.length > 0){
      this.api.validateMultiTickets(this.final).subscribe(
        data =>{
          console.log(data);
           if(data.estado == 1){
            alert("Mensaje: " + "Boletas Registradas");
          }else{
            alert("Mensaje: " + "Problemas al registrar");
          }

          this.router.navigateByUrl('/events-list'); 
        }
        ,error =>{
          console.log("noo");
        })
      
    }else{
      alert("Mensaje: " + "Selecione al menos una boleta");
    }
    
  }

  ngOnInit() {
    this.getAllEvents();
   // console.log(this.route.snapshot.params['event']);
  }

  submit() {
    const selectedOrderIds = this.FormGroup.value.orders
      .map((v, i) => v ? this.orders[i].id : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
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
