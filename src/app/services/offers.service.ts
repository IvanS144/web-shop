import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchRequest } from '../model/search-request';
import { Observable } from 'rxjs';
import { OffersPage } from '../model/offers-page';
import { baseUrl } from '../app.module';
import { OfferDTO } from '../model/offer-dto';
import { OfferRequest } from '../model/offer-request';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http:HttpClient) { }

  search(searchRequest: SearchRequest, page: number, pageSize: number) : Observable<OffersPage> {
    return this.http.post<OffersPage>(`${baseUrl}/offers/search?page=${page}&page_size=${pageSize}`, searchRequest)
  }

  getAll(page: number, pageSize: number): Observable<OffersPage> {
    return this.http.get<OffersPage>(`${baseUrl}/offers?page=${page}&page_size=${pageSize}`)
  }

  getById(offerId: number | string): Observable<OfferDTO> {
    return this.http.get<OfferDTO>(`${baseUrl}/offers/${offerId}`)
  }

  create(offerRequest: OfferRequest): Observable<OfferDTO>{
    return this.http.post<OfferDTO>(`${baseUrl}/offers`, offerRequest)
  }


}
