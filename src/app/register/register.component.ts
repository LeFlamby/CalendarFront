import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  registerData:any;
  isTyping : boolean = false

  constructor( private formBuilder: FormBuilder, private auth: AuthService, private router: Router){
    this.registerForm = this.formBuilder.group({
      username:  Validators.required,
      password: [Validators.required, Validators.minLength(8)], //regex en + ?
      confirmPassword: [Validators.required, Validators.minLength(8)],
    }, {
      validators: [this.passwordMatchesValidator]
    });
  }

  passwordMatchesValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onRegisterSubmit(){
    if (this.registerForm.valid) {
      const { password, username } = this.registerForm.value;
     
      this.auth.register({
        username: username,
        password: password,
      }).subscribe((data: any) => {
        
        alert("Votre compte a bien été créé");
        this.router.navigate(['/login']);
        this.registerData = data;
        this.isTyping = false;
      });
    }
  }
  }


