import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseRequest } from '../model/purchase-request';
import { Observable } from 'rxjs';
import { PurchaseDTO } from '../model/purchase-dto';
import { baseUrl } from '../app.module';
import { PurchasesPage } from '../model/purchases-page';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(private http: HttpClient) { }

  purchase(purchaseRequest: PurchaseRequest): Observable<PurchaseDTO>{
    return this.http.post<PurchaseDTO>(`${baseUrl}/purchases`, purchaseRequest)
  }

  getByUserId(id: number | string, page: number, pageSize: number): Observable<PurchasesPage>{
    return this.http.get<PurchasesPage>(`${baseUrl}/purchases/users/${id}}?page=${page}&page_size=${pageSize}`)
  }
}
