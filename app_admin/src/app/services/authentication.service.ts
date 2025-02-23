import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  //Variable to handle Auth responses
  authResp: AuthResponse = new AuthResponse();

  public getToken(): string {
    let out: any;
    out = this.storage.getItem('travlr-token');

    // Return a string if no token
    if(!out) {
      return '';
    }
    return out;
  }

  //Save token to storage provider
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }
  // Logout of our application and remove the JWT from Storage
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Boolean to determine if we are logged in and token is still valid
  public isLoggedIn() : boolean { 
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }
    else {
      return false;
    }
  }

  // Retreive the current user
  public getCurrentUser(): User { 
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  // Login method that leverages login in tripDataService
  public login(user: User, passwd: string) : void {
    this.tripDataService.login(user, passwd)
      .subscribe({
        next: (value: any) => {
          if(value) 
          {
            console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }

  // Register method that leverages register method in tripDataService
  public register(user: User, passwd: string) : void {
    this.tripDataService.register(user, passwd)
      .subscribe({
        next: (value: any) => {
          if(value)
          {
            console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }
}
