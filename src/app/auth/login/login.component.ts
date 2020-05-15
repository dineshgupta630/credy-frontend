import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthServices} from "../../services/auth.services";
import {MessageServices} from "../../services/message.services";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  apiUrl = 'http://35.184.2.25:8001';
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(private authService: AuthServices, private router: Router, private messageService: MessageServices,
              private http: HttpClient,) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const formValue = this.loginForm.value;
    if (formValue.username && formValue.password) {
      this.authService.loginUser(this.loginForm.value)
        .subscribe(
          () => {
            this.userRatings();
            this.router.navigateByUrl('/');

          }
        );
    }
  }

  sendMessage(message): void {
    // This is to send a message to the subscribers via the observable subject.
    this.messageService.sendMessage(message);
  }

  userRatings() {
    return this.http.get<any>(`${this.apiUrl}/reviews/`).subscribe(response => {
      this.sendMessage(response);
    });
  }

}
