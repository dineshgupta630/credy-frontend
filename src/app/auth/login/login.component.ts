import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthServices} from "../../services/auth.services";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthServices, private router: Router) { }

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });


  onSubmit() {
    const formValue = this.loginForm.value;
    if (formValue.username && formValue.password) {
      this.authService.loginUser(this.loginForm.value)
        .subscribe(
          () => {
            console.log("User is logged in");
            this.router.navigateByUrl('/');
          }
        );
    }
  }

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn());
  }

}
