import { CanActivate } from '@angular/router';
import { Auth } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(protected auth: Auth) { }

  canActivate() { 
    if (this.auth.authenticated())
      return true;

    window.location.href = 'https://mcockrell.auth0.com/login?client=CTWpbfyqrkL7Xpn2ZeWazH3Z0cyw3Ccd';
    return false;
  }
}