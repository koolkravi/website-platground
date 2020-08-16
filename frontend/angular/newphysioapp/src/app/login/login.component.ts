import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from './services/user.service';
import { Registration }  from './model/registration'
import { AlertifyService } from '../services/alertify.service';
import { AuthenticationService } from './services/authentication.service';

import { User }  from './model/user'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registrationModel! : Registration;
  regFormSubmitted : boolean=false;
  userModel! : User;

  @ViewChild('LoginForm') LoginForm?: ElementRef;
  @ViewChild('RegForm') RegForm?: ElementRef;
  @ViewChild('Indicator') Indicator: ElementRef | undefined;

  registrationForm! :FormGroup;
  newloginForm! :FormGroup;

  constructor(private fb: FormBuilder, private userService:UserService,
    private alertifyService:AlertifyService, private authService:AuthenticationService,
    private router:Router) { }

  ngOnInit(): void {

    // this.registrationForm = new FormGroup({
    //   username: new FormControl("Default",Validators.required),
    //   email: new FormControl(null,[Validators.required,Validators.email]),
    //   password: new FormControl(null,[Validators.required, Validators.minLength(8)]),
    //   conformedpassword: new FormControl(null,[Validators.required]),
    //   mobileNo: new FormControl(null,[Validators.required,Validators.maxLength(10)])
    // }, this.passowrdmatchingValidator);
    this.createRegistrationForm();

    // this.newloginForm = new FormGroup({
    //   username: new FormControl()
    // });
    this.createLoginForm();
  }

  createLoginForm(){
    this.newloginForm =this.fb.group({
      username:[null,Validators.required],
      password:[null,Validators.required]
    })
  }

  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      username:['Default',Validators.required],
      email:[null,[Validators.required,Validators.email]],
      password: [null,[Validators.required, Validators.minLength(8)]],
      conformedpassword: [null,[Validators.required]],
      mobileNo: [null,[Validators.required,Validators.maxLength(10)]]
    },{validators:this.passowrdmatchingValidator})
  }


  passowrdmatchingValidator(fg: FormGroup): Validators {
    return fg.get('password')?.value===fg.get('conformedpassword')?.value? null!  :{ nomatched: true };
  }

  get username(){
    return this.registrationForm.get('username') as FormControl;
  }

  get email(){
    return this.registrationForm.get('email') as FormControl;
  }

  get password(){
    return this.registrationForm.get('password') as FormControl;
  }

  get conformedpassword(){
    return this.registrationForm.get('conformedpassword') as FormControl;
  }

  get mobileNo(){
    return this.registrationForm.get('mobileNo') as FormControl;
  }

  get usernamelogin(){
    return this.newloginForm.get('username') as FormControl;
  }
  get passwordlogin(){
    return this.newloginForm.get('password') as FormControl;
  }

  onRegSubmit(){

    console.log(this.registrationForm.value);
    this.regFormSubmitted =true;
    if(this.registrationForm.valid){
      //this.registrationModel=Object.assign(this.registrationModel,this.registrationForm.value);

      // this.userService.addUser(this.registrationModel)
      this.userService.addUser(this.registrationData());
      this.registrationForm.reset();
      this.regFormSubmitted =false;
      this.alertifyService.success("You are successfully Registered");
    } else{
      this.alertifyService.error("Please provide all fields");
    }
  }

  registrationData(): Registration{
    return this.registrationModel= {
      username: this.username.value,
      email:this.email.value,
      password: this.password.value,
      mobileNo: this.mobileNo.value
    }
  }

  userData(): User{
    return this.userModel= {
      username: this.usernamelogin.value,
      password: this.passwordlogin.value    }
  }


  onLoginSubmit(){
    const token=this.authService.authenticateUser(this.userData());
    if(token){
      console.log(token.username);
      localStorage.setItem('token',token.username);
      this.alertifyService.success("Login Success");
      this.router.navigate(['/']);
    } else{
      this.alertifyService.error("Login not successfull");
    }
  }



  // onLoginSubmit(loginform: NgForm){
  //   console.log(loginform);
  // }

  login(){
    console.log("login");
    if(this.LoginForm && this.RegForm && this.Indicator) {
      this.LoginForm.nativeElement.style.transform = "translateX(300px)";
      this.RegForm.nativeElement.style.transform = "translateX(300px)";
      this.Indicator.nativeElement.style.transform = "translateX(0px)";
    }

  }

  register() {
    console.log("register");
    if(this.LoginForm && this.RegForm && this.Indicator) {
    this.LoginForm.nativeElement.style.transform = "translateX(0px)";
    this.RegForm.nativeElement.style.transform = "translateX(0px)";
    this.Indicator.nativeElement.style.transform = "translateX(100px)";
    }
  }

}
