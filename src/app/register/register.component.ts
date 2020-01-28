import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder : FormBuilder) { }
  registerForm :FormGroup;
  submitted=false;


  ngOnInit() {
  this.registerForm = this.formBuilder.group({
    username:['',Validators.required],
    firstname:['',Validators.required],
    lastname:['',Validators.required]
  });

  }
  get f(){ return this.registerForm.controls;}
  register(){
     if(this.registerForm.invalid){
       return true;
     }

     console.log(this.registerForm.value);
  }
  reset(){
    this.submitted = false;
    this.registerForm.reset();
  }



}
