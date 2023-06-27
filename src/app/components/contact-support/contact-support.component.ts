import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { notEmptyNotBlankRegex } from 'src/app/app.module';
import { MessagesService } from 'src/app/services/messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-support',
  templateUrl: './contact-support.component.html',
  styleUrls: ['./contact-support.component.scss']
})
export class ContactSupportComponent {
 constructor(private messagesService: MessagesService, private formBuilder: FormBuilder, private snackBar: MatSnackBar){}

  messageForm: FormGroup = this.formBuilder.group({
    "text": ['', [Validators.required, Validators.pattern(notEmptyNotBlankRegex)]],
    "userId": [0]
  })

  get text(){
    return this.messageForm.get('text');
  }

  private userId: string | null = localStorage.getItem("userId")

  sendMessage(){
    if(this.userId){
      this.messageForm.patchValue({"userId": parseInt(this.userId)})
      this.messagesService.sendMessage(this.messageForm.value)
      .subscribe({
        next: _ => {this.snackBar.open('Message has been sent', 'OK', {
          duration: 5000
        }); this.clear()},
        error: (err: HttpErrorResponse) => {
          this.snackBar.open('An error occured, try again later', 'OK',{
            duration: 5000
          })
        }
      })
    }

  }

  clear(){
    this.messageForm.reset()
  }
}
