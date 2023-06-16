import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { LoginComponent } from '../modal/login/login.component';

@Component({
  selector: 'app-shop-header',
  templateUrl: './shop-header.component.html',
  styleUrls: ['./shop-header.component.scss']
})
export class ShopHeaderComponent {
  constructor(private dialog: MatDialog){}

  openLoginDialog(){
    this.dialog.open(LoginComponent)

  }

  logout(){
    localStorage.removeItem("userId");
  }

  isUserLoggedIn() : boolean{
    return localStorage.getItem("userId")!=null
  }

  goToCreateOffer(){

  }

}
