import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import { DividerModule } from 'primeng/divider';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  registerData: any;
  isTyping: boolean = false

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {

    this.registerForm = new FormGroup(
      {
        username: new FormControl(
          '', [Validators.required, Validators.minLength(3)]
        ),
        password: new FormControl(
          '', [Validators.required, Validators.minLength(3)]
        ),
        confirmPassword: new FormControl(
          '', [Validators.required]
        ),
      },
      this.passwordMatch('password', 'confirmPassword')
    )

    this.registerForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.isTyping = true;
    });

  }


  onRegisterSubmit() {
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

  passwordMatch(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors["passwordMismatch"]
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

}


