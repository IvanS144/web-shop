import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { LoginComponent } from '../modal/login/login.component';
import { SupportComponent } from '../modal/support/support.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-header',
  templateUrl: './shop-header.component.html',
  styleUrls: ['./shop-header.component.scss']
})
export class ShopHeaderComponent {
  constructor(private dialog: MatDialog, private router: Router){}

  openLoginDialog(){
    this.dialog.open(LoginComponent)

  }

  logout(){
    localStorage.removeItem("userId");
    this.router.navigate([''])
  }

  isUserLoggedIn() : boolean{
    return localStorage.getItem("userId")!=null
  }

  contactSupport(){
    this.dialog.open(SupportComponent)
  }

}
