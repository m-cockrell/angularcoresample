import { tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  profile: any;
  private roles: string[] = [];

  auth0 = new auth0.WebAuth({
    clientID: 'CTWpbfyqrkL7Xpn2ZeWazH3Z0cyw3Ccd',
    domain: 'mcockrell.auth0.com',
    responseType: 'token id_token',
    audience: 'https://api.mcockrelltests.com',
    redirectUri: 'http://localhost:5000/vehicles',      
    scope: 'openid email profile',
    additionalSignUpFields: [
      {
        name: "name",
        placeholder: "Name"
      }
    ]
  });

  constructor(public router: Router) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  public isInRole(roleName) {
    return this.roles.indexOf(roleName) > -1;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.auth0.client.userInfo(authResult.accessToken, (error, profile) => {
          if (error)
            throw error;
          
          this.roles = profile["https://example.com/roles"];

          localStorage.setItem('profile', JSON.stringify(profile));
          this.profile = profile;
        });

        this.router.navigate(['/vehicles/']);
      } else if (err) {
        this.router.navigate(['/error']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');

    this.profile = null;
    this.roles = [];
    // Go back to the home route
    this.router.navigate(['/vehicles/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}