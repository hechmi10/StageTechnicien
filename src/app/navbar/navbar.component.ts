import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(private router:Router,private authService: AuthService) {}

  ngOnInit(): void {
    console.log('NavbarComponent initialized');
    this.authService.currentUser$.subscribe(user => {
      console.log('Current user updated:', user);
      this.isAuthenticated = this.authService.isAuthenticated();
      this.isAdmin = this.authService.isAdmin();
      console.log('Navbar state - isAuthenticated:', this.isAuthenticated, 'isAdmin:', this.isAdmin);
    });
  }

  logout(): void {
    console.log('Logout triggered');
    this.authService.logout();
    this.router.navigate(['/login']).then(() => {
      console.log('Redirected to login page after logout');
    }).catch(err => {
      console.error('Error redirecting to login page:', err);
    });
    this.isAuthenticated = false;
  }
}