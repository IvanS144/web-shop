import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnswerDTO } from 'src/app/model/answer-dto';
import { QuestionDTO } from 'src/app/model/question-dto';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent {
  constructor(private questionsService: QuestionsService, private dialogRef: MatDialogRef<AnswerComponent>, @Inject(MAT_DIALOG_DATA) public question: QuestionDTO, private formBuilder: FormBuilder){}

  answerForm: FormGroup = this.formBuilder.group({
    "questionId": [this.question.questionId],
    "text": ['']
  })

  sendAnswer(){
    this.questionsService.sendAnswer(this.answerForm.value, this.question.questionId)
    .subscribe({
      next: (data: AnswerDTO) => this.dialogRef.close(data),
      error: (err: HttpErrorResponse) => {
        console.log(err)
        this.dialogRef.close(null)
      }
    })
  }

}
