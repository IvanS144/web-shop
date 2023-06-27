import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { notEmptyNotBlankRegex } from 'src/app/app.module';
import { UserDTO } from 'src/app/model/user-dto';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent {
  constructor(private snackBar: MatSnackBar,private loginService: LoginService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AccountActivationComponent>,@Inject(MAT_DIALOG_DATA) public user: UserDTO){}

  activationForm: FormGroup = this.formBuilder.group({
    "pin": ['',[Validators.required, Validators.pattern(notEmptyNotBlankRegex)]],
    "userId": [0]
  })

  get pin(){
    return this.activationForm.get('pin')
  }

  activate(){
    //let userId = localStorage.getItem("userId")
    console.log(this.user)
    this.activationForm.patchValue({"userId": this.user.userId})
    console.log(this.activationForm.value)
    this.loginService.activate(this.activationForm.value, this.user.userId).subscribe({
      next: (data: UserDTO) => this.dialogRef.close(true),
      error: (err: HttpErrorResponse) => {console.log(err); this.snackBar.open('Code is not valid', 'OK', {duration: 5000})}
    })
  }

}
