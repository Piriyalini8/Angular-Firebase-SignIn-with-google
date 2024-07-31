// src/app/app.component.ts
import { Component } from '@angular/core';
import { getGoogleToken } from './firebase-config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title='App1';
  user: any = null;

  constructor(private http: HttpClient) {}

  async signInWithGoogle() {
    try {
      const token = await getGoogleToken();
      if (token) {
        console.log('Google token: ' + token);
        this.http.post<{ customToken: string }>('http://localhost:8080/api/users/google', { token })
          .subscribe({
            next: (response) => {
              // Use the custom token to authenticate with Firebase
              this.signInWithCustomToken(response.customToken);
            },
            error: (error) => {
              console.error('Backend error:', error);
            }
          });
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  }

  signInWithCustomToken(customToken: string) {
    console.log('custom token: '+customToken);
    // Logic to sign in with custom token
    // This part would be specific to your authentication needs
  }

  signOut(){
    console.log('User signed out');
  }
}
