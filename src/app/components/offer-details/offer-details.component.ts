import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferDTO } from 'src/app/model/offer-dto';
import { OffersService } from 'src/app/services/offers.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OrderComponent } from '../modal/order/order.component';
import { PurchaseDTO } from 'src/app/model/purchase-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuestionDTO } from 'src/app/model/question-dto';
import { AnswerComponent } from '../modal/answer/answer.component';
import { AnswerDTO } from 'src/app/model/answer-dto';
import { notEmptyNotBlankRegex } from 'src/app/app.module';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent {

  offer!: OfferDTO
  routeSubscibtion?: Subscription
  questionForm: FormGroup = this.formBuilder.group({
    "offerId": [0],
    "userId": [parseInt(localStorage.getItem("userId")?? "0")],
    "text": [null, [Validators.required, Validators.pattern(notEmptyNotBlankRegex)]]
  })
  userId: string | null = localStorage.getItem("userId")
  get text(){
    return this.questionForm.get('text')
  }

  constructor(private offersService: OffersService, private route: ActivatedRoute, private dialog: MatDialog, private formBuilder: FormBuilder, private questionsService: QuestionsService){}

  ngOnInit(){
    this.routeSubscibtion = this.route.params.subscribe(params =>
      this.offersService.getById(params['id']).subscribe({
        next: (data: OfferDTO) => {
          this.offer=data
          this.questionForm.patchValue({"offerId": data.offerId})
        },
        error: (err: HttpErrorResponse) => console.log(err)
      })
    )
  }

  buy(){
    let dialogRef = this.dialog.open(OrderComponent, { data : this.offer })
    dialogRef.afterClosed().subscribe((data: PurchaseDTO) => this.offer.quantity-=data.quantity)

  }

  sendQuestion(){
    this.questionsService.sendQuestion(this.questionForm.value).subscribe({
      next: (data: QuestionDTO) => {this.offer.questions.push(data); this.questionForm.reset()},
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

  isUserLoggedIn() : boolean{
    return localStorage.getItem("userId")!=null
  }

  isUserOwner(): boolean{
    return (this.isUserLoggedIn() && (this.offer.user.userId==parseInt(this.userId?? "0")))
  }

  openAnswerDialog(question: QuestionDTO){
    let dialogRef = this.dialog.open(AnswerComponent, { data: question})
    dialogRef.afterClosed().subscribe((data: AnswerDTO) => question.answer=data)
  }

  delete(){
    this.offersService.deleteById(this.offer.offerId)
    .subscribe({
      next: _ => this.offer.deleted = true,
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

  undoDeletion(){
    this.offersService.undoDeleteById(this.offer.offerId)
    .subscribe({
      next: _ => this.offer.deleted = false,
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

  ngOnDestroy(){
    this.routeSubscibtion?.unsubscribe()

  }

}
