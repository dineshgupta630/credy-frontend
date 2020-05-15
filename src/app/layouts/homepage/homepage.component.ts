import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from '@angular/forms';
import {SatDatepickerInputEvent, SatDatepickerRangeValue} from 'saturn-datepicker';
import {Router} from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  apiUrl = 'http://35.184.2.25:8001/'
  genres = new FormControl();
  allGenresList: string[];
  actors = new FormControl();
  allActorsList: string[];
  date: SatDatepickerRangeValue<Date>;
  lastDateInput: SatDatepickerRangeValue<Date> | null;
  lastDateChange: SatDatepickerRangeValue<Date> | null;
  panelOpenState = false;
  form: FormGroup;
  movies;
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 300;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  sliderMinimumValue = 0;
  sliderMaximumValue = 0;
  vertical = false;
  tickInterval = 1;
  filterMessage = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  onDateInput = (e: SatDatepickerInputEvent<Date>) => this.lastDateInput = e.value as SatDatepickerRangeValue<Date>;

  onDateChange = (e: SatDatepickerInputEvent<Date>) => this.lastDateChange = e.value as SatDatepickerRangeValue<Date>;

  ngOnInit(): void {
    this.getPosts();
    this.getActors();
    this.getGenres();
  }

  getGenres() {
    return this.http.get<any>(`${this.apiUrl}all_genres/`)
      .subscribe(response => {
        this.allGenresList = response.results;
      });
  }

  getActors() {
    return this.http.get<any>(`${this.apiUrl}all_actors/`)
      .subscribe(response => {
        this.allActorsList = response;
      });
  }

  getPosts() {
    return this.http.get<any>(`${this.apiUrl}movies`)
      .subscribe(response => {
        this.movies = response.results;
      });
  }

  movieDetail(slug) {
    this.router.navigate([`movie/${slug}`]);
  }

  onFilter() {
    let url = `${this.apiUrl}movies/?`;
    url = this.releaseDateFilter(url);
    url = this.genreFilter(url);
    url = this.actorFilter(url);
    url = this.budgetFilter(url);
    return this.http.get(url).subscribe(response => {
      if(response['count'] != 0){
        this.movies = response['results'];
        this.filterMessage = false;
      }else{
        this.filterMessage = true;
      }
    });
  }

  releaseDateFilter(url) {
    if (this.lastDateInput) {
      let release_date_start = this.lastDateInput.begin.toISOString()
      let release_date_end = this.lastDateInput.end.toISOString()
      let dateQueryParams = `release_date_start=${release_date_start}&release_date_end=${release_date_end}`;
      url = url.concat(dateQueryParams)
    }
    return url;
  }

  genreFilter(url) {
    if (this.genres) {
      let genres = this.params(this.genres.value, 'genre');
      if (this.lastDateInput || this.actors) {
        genres = `&${genres}`;
        url = url.concat(genres);
      } else {
        url = url.concat(genres);
      }
    }
    return url;
  }

  actorFilter(url) {
    if (this.actors) {
      let actors = this.params(this.actors.value, 'actor');
      if (this.lastDateInput || this.genres) {
        actors = `&${actors}`;
        url = url.concat(actors);
      } else {
        url = url.concat(actors);
      }
    }
    return url;
  }

  budgetFilter(url) {
    if (this.sliderMinimumValue && this.sliderMaximumValue) {
      let sliderBudget = `budget_min=${this.sliderMinimumValue * 1000000}&budget_max=${this.sliderMaximumValue * 1000000}`;
      if (this.lastDateInput || this.genres || this.actors) {
        sliderBudget = `&${sliderBudget}`;
        url = url.concat(sliderBudget);
      } else {
        url = url.concat(sliderBudget);
      }
    }
    return url;
  }

  params(paramsList, query) {
    let queryParams = [];
    for (let param in paramsList) {
      if (paramsList.hasOwnProperty(param)) {
        queryParams.push(encodeURIComponent(query) + "=" + encodeURIComponent(paramsList[param]));
      }
    }
    return queryParams.join("&");
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }
    return 0;
  }
}

