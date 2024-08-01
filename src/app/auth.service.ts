// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private clientId = '177100456114-1b1n0kqc7eeta99u82q12sc1m0edep40.apps.googleusercontent.com';
  private redirectUri = 'http://localhost:4200/auth/callback';

  constructor(private http: HttpClient, private router: Router) {}

  public signInWithGoogle() {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `response_type=token` +
      `&client_id=${this.clientId}` +
      `&redirect_uri=${encodeURIComponent(this.redirectUri)}` +
      `&scope=email%20profile`;
    window.location.href = url;
  }

  public handleAuthCallback() {
    const hash = window.location.hash.substring(1);
    console.log('Hash: '+hash);
    const params = new URLSearchParams(hash);
    console.log('Params: '+params);
    const accessToken = params.get('access_token');
    console.log('Access token: '+accessToken);
    if (accessToken) {
      this.http.post('http://localhost:8080/api/users/google', { accessToken })
        .subscribe(response => {
            console.log('Response: '+response);
          // Handle response from backend
          // Store JWT token, user info, etc.
        });
    }
  }

  public signOut() {
    // Clear user data from local storage or cookies
    localStorage.removeItem('jwtToken'); // Adjust this according to how you store the JWT

    // Optional: Make a request to your backend to invalidate the session or token
    // this.http.post('http://localhost:8080/api/users/signout', {}).subscribe();

    // Redirect user to the sign-in page or any other page as needed
    this.router.navigate(['/signin']);
  }
}
