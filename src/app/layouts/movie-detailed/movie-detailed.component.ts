import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {MessageServices} from "../../services/message.services";
import {Observable} from "rxjs";
import {shareReplay, tap} from "rxjs/operators";

@Component({
  selector: 'app-movie-detailed',
  templateUrl: './movie-detailed.component.html',
  styleUrls: ['./movie-detailed.component.css']
})
export class MovieDetailedComponent implements OnInit {
  apiUrl = 'http://35.184.2.25:8001/'
  reviews;
  movie;
  routerUrl = this.router.url;
  autoTicks = true;
  disabled = false;
  invert = false;
  max = 5;
  min = 1;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  userRating = 0;
  userReview: string;
  vertical = false;
  tickInterval = 1;
  showSuccessMessage = false;
  constructor(private http: HttpClient, private router: Router, private messageService: MessageServices) { }

  ngOnInit(): void {
    this.getPosts();
  }

  sendMessage(message): void {
    // This is to send a message to the subscribers via the observable subject.
    this.messageService.sendMessage(message);
  }

  clearMessages(): void {
    // clear messages
    this.messageService.clearMessages();
  }

  getPosts() {
    return this.http.get<any>(`${this.apiUrl}${this.routerUrl}`).subscribe(response => {
      this.movie = response;
      this.getReviews();
    });
  }

  getReviews(){
    let slug = this.routerUrl.split('/')[2];
    return this.http.get<any>(`${this.apiUrl}/all_reviews/?movie=${slug}`).subscribe(response => {
        this.reviews = response;
      });
  }

  onSubmit() {
    let userData = {
      "rating_value": this.userRating,
      "review": this.userReview || "",
      "slug": this.movie.slug
    }
    return this.http.post(this.apiUrl.concat('/reviews/'), userData).subscribe(response => {
      this.userRatings();
      this.userRating = 0;
      this.showSuccessMessage= true;
      this.getPosts();
    });
  }

  userRatings(){
    return this.http.get<any>(`${this.apiUrl}/reviews/`).subscribe(response => {
      this.sendMessage(response);
    });
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }
    return 0;
  }

}
