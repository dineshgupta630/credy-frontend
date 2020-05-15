import {Component, OnInit} from '@angular/core';
import {throwError} from 'rxjs';  // Angular 6/RxJS 6
import {AuthServices} from "./services/auth.services";
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthServices]
})
export class AppComponent implements OnInit {

  input;

  constructor(public router: Router,private userService: AuthServices) { }

  ngOnInit() {
    this.input = {
      // email: '',
      username : '',
      password : '',
    }
  }

  onRegister() {
    this.userService.registerUser(this.input).subscribe(
      response =>{
        alert('User '+ this.input.username + ' created')
      },
      error => {
        console.log('error', error)
      }
    )
  }








}
