import { Component, OnInit } from '@angular/core';
import {AuthServices} from "../../services/auth.services";
import {HttpClient} from "@angular/common/http";
import { Subscription } from 'rxjs';
import {MessageServices} from "../../services/message.services";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalReviews;
  avgRating;
  logged_in;
  apiUrl = 'http://35.184.2.25:8001/';
  messages: any[] = [];
  subscription: Subscription;
  constructor(public authService: AuthServices, private http: HttpClient, private messageService: MessageServices) {
    this.logged_in = this.authService.isLoggedIn();
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.totalReviews = message.count;
      this.avgRating = message.average_rating;
      if (message) {
        this.messages.push(message);
      } else {
        // clear messages when empty message received
        this.messages = [];
      }
    });
  }

  ngOnInit(): void {
    this.userRatings()
  }

  userRatings(){
    return this.http.get<any>(`${this.apiUrl}reviews`).subscribe(response => {
      console.log(response)
      this.totalReviews = response.count;
      this.avgRating = response.average_rating;
    });
  }

}
