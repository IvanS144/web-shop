import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { notEmptyNotBlankRegex } from 'src/app/app.module';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {
  constructor(private messagesService: MessagesService, private dialogRef: MatDialogRef<SupportComponent>, private formBuilder: FormBuilder){}

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
        next: _ => this.dialogRef.close(true),
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.dialogRef.close(false)
        }
      })
    }

  }

  close(){
    this.dialogRef.close();
  }

}
