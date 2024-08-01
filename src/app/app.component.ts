// src/app/app.component.ts
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title='App1';
  constructor(public authService: AuthService) { }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }
  signOut(){
    this.authService.signOut();
  }
}
