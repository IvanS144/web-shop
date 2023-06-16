import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { AccountActivationComponent } from '../modal/account-activation/account-activation.component';
import { UserDTO } from 'src/app/model/user-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  constructor(private loginService : LoginService, private formBuilder: FormBuilder, private dialog: MatDialog, private router: Router){}

  registerForm: FormGroup = this.formBuilder.group({
    "firstName" : this.formBuilder.control(''),
    "lastName" : this.formBuilder.control(''),
    "email" : this.formBuilder.control(''),
    "userName": this.formBuilder.control(''),
    "password": this.formBuilder.control(''),
    "cityId": this.formBuilder.control(1)
  })

  register(){
    this.loginService.register(this.registerForm.value)
    .subscribe({
      next: (data : UserDTO) => {
          let dialogRef = this.dialog.open(AccountActivationComponent, {
            data
          })

          dialogRef.afterClosed().subscribe(
            (activated: boolean) => {
              if(activated){
              localStorage.setItem("userId", data.userId.toString())
              this.router.navigate([''])
              }
            })
        },
      error: (err: HttpErrorResponse) => console.log(err)//TODO prikaz obavještenja
    })
  }

}
