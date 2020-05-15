import { Component, OnInit } from '@angular/core';
import {AuthServices} from "../../services/auth.services";
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  logged_in;
  constructor(private authService: AuthServices, private router: Router) {   }

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/'])
    this.logged_in = this.authService.isLoggedIn();
  }

}
