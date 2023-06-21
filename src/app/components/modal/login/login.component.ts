import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserDTO } from 'src/app/model/user-dto';
import { LoginService } from 'src/app/services/login.service';
import { AccountActivationComponent } from '../account-activation/account-activation.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<LoginComponent>, private loginService:LoginService, private dialog: MatDialog){}

  loginForm: FormGroup = this.formBuilder.group({
    "userName": this.formBuilder.control(''),
    "password": this.formBuilder.control('')
  })

  login(){
    this.loginService.login(this.loginForm.value)
    .subscribe({
      next: (data : UserDTO) => {
        if(data.activated){
        localStorage.setItem("userId", data.userId.toString())
        this.dialogRef.close()
        }
        else{
          let dialogRefActivation = this.dialog.open(AccountActivationComponent, {
            data
          })

          dialogRefActivation.afterClosed().subscribe(
            (activated: boolean) => {
              if(activated){
              localStorage.setItem("userId", data.userId.toString())
              this.dialogRef.close()
              }
            }
          )

        }
      },
      error: (err: HttpErrorResponse) => console.log(err)//TODO prikaz obavještenja
    })

  }

}
