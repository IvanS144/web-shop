import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionRequest } from '../model/question-request';
import { Observable } from 'rxjs';
import { QuestionDTO } from '../model/question-dto';
import { baseUrl } from '../app.module';
import { AnswerRequest } from '../model/answer-request';
import { AnswerDTO } from '../model/answer-dto';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  sendQuestion(questionRequest: QuestionRequest): Observable<QuestionDTO>{
    return this.http.post<QuestionDTO>(`${baseUrl}/questions`, questionRequest)
  }

  sendAnswer(answerRequest: AnswerRequest, questionId: number): Observable<AnswerDTO>{
    return this.http.post<AnswerDTO>(`${baseUrl}/questions/${questionId}/answers`, answerRequest)
  }
}
