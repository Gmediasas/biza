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

  constructor(public api: RestApiService, public route: ActivatedRoute,private formBuilder: FormBuilder) { 
    this.FormGroup = this.formBuilder.group({
      boletas: new FormArray([], minSelectedCheckboxes(1))
    });
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
    console.log(this.FormGroup.controls['boletas'].value);
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
