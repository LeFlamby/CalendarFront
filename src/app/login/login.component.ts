import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginData: any = null;
  userData: any = null;
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

 
  ngOnInit() {  // sinon boucle infini
    const token = localStorage.getItem('token');

    if (token) {
      const jwtHelper = new JwtHelperService();

      const tokenData = jwtHelper.decodeToken(token);

      this.isLoggedIn = tokenData && tokenData.USER !== null; // rajouter expiration du token

      console.log(this.isLoggedIn);
    }
  }

  onLoginSubmit() {
    const { password, username } = this.loginForm.value;
    if (password.length && username.length) {
      this.auth.login(username, password).subscribe((data: any) => {
        this.loginData = data;
        alert("Vous êtes connecté!");
        this.router.navigate(['/home']);
      });
    } else {
      alert("Identifiant ou mot de passe incorrect");
    }
  }

  signOut() {
    this.auth.onSignOut();
  }
}
