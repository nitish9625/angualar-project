import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthgardService{

  constructor( private router: Router) { }

  canActivate():boolean{
    if(localStorage.getItem('user')){
      return true;
    }
    alert("not logged in")
    this.router.navigate(['login'])
    return false;
    
  }
}
