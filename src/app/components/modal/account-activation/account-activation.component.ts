import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDTO } from 'src/app/model/user-dto';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent {
  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AccountActivationComponent>,@Inject(MAT_DIALOG_DATA) public user: UserDTO){}

  activationForm: FormGroup = this.formBuilder.group({
    "pin": this.formBuilder.control(''),
    "userId": this.formBuilder.control(0)
  })

  activate(){
    let userId = localStorage.getItem("userId")
    this.activationForm.patchValue({"userId": userId})
    this.loginService.activate(this.activationForm.value, this.user.userId).subscribe({
      next: (data: UserDTO) => this.dialogRef.close(true),
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

}
