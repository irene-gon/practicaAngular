



import { Component, OnInit,ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Person } from './interfaces/person'
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
   columnas: String[] = ["nombre","apellidos","edad","dni", "cumpleanos","color","sexo","notas", "actualizar","borrar"]
  position: any = 0
  public personaForm: FormGroup;
  actualizar=false;



  contacts: Array<Person> = [];

  contact: Person = {
      nombre : "",
        apellidos: "",
        edad: "",
        dni: "",
        cumpleanos: new Date(),
        color: "",
        sexo: "",
        notas: ""
  }


  @ViewChild(MatTable) tabla1: MatTable<Person>;

  favouriteColours = [
    { id: 1, value: 'Rojo' },
    { id: 2, value: 'Azul' },
    { id: 3, value: 'Amarillo' },
    { id: 4, value: 'Verde' }
  ];


  sexos = [
    { id: 1, value: 'Hombre' },
    { id: 2, value: 'Mujer' },
    { id: 3, value: 'Otro' },
    { id: 4, value: 'No especificado' }
  ];



  constructor() { 
   }

  ngOnInit(): void {
    this.personaForm = new FormGroup({
      nombre : new FormControl('', [Validators.required, Validators.minLength(3)]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(3)]),
      edad:new FormControl('', [Validators.required, Validators.min(0),Validators.max(125)]),
      dni: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}[A-Za-z]{1}')]),
     cumpleanos: new FormControl(new Date()),
      color:new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      notas: new FormControl(''),
    });
  }

  public getColor(id:number):string{
    id=id-1;
       return this.favouriteColours[id].value;
    
  }

  public getSexo(id:number):string{
    id=id-1;
       return this.sexos[id].value;
    
  }

  public aceptar( ): void{
    this.setActualizar();
    this.contact = {
      nombre: "",
      apellidos: "",
      edad: "",
      dni: "",
      cumpleanos: new Date(),
      color: "",
      sexo: "",
      notas: ""
    }
  }


  public actualizarFila (cod:number):void{
    this.contact  = this.contacts[ cod ];
    this.contact.cumpleanos= new Date (this.contacts[ cod ].cumpleanos,);
    this.setActualizar();
  }

  public borrarFila(cod: number):void{
    if (confirm("Realmente quiere borrarlo?")) {
      this.contacts.splice(cod, 1);
      this.tabla1.renderRows();
    }
  }

  public getActualizar():boolean{
    return this.actualizar;
  }

  private setActualizar(): void{
    this.actualizar=!this.actualizar;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.personaForm.controls[controlName].hasError(errorName);
  }
  public agregar() {
    if (!this.getActualizar()){
     let ageNum = parseInt(this.contact.edad)
    if(ageNum > 0 && ageNum <= 125){
    this.contacts.push( this.contact )
    this.tabla1.renderRows();
    }
    this.contact = {
      nombre: "",
      apellidos: "",
      edad: "",
      dni: "",
      cumpleanos: new Date(),
      color: "",
      sexo: "",
      notas: ""
    }
   // form.resetForm()
  }
}
}

