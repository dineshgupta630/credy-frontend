import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthServices} from "../../services/auth.services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private authService: AuthServices, private router: Router) { }

  ngOnInit(): void {
  }

  myForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  onSubmit() {
    const formValue = this.myForm.value;
    if (formValue.username && formValue.password) {
      this.authService.registerUser(this.myForm.value)
        .subscribe(
          () => {
            this.router.navigateByUrl('/login');
          }
        );
    }
  }

}
