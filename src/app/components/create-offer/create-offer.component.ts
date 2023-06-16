import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryDTO } from 'src/app/model/category-dto';
import { OfferDTO } from 'src/app/model/offer-dto';
import { CategoriesService } from 'src/app/services/categories.service';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent {
  constructor(private formBuilder: FormBuilder, private offersService: OffersService, private categoriesService: CategoriesService, private router: Router){}

  createOfferForm: FormGroup = this.formBuilder.group({
    "title": this.formBuilder.control(''),
    "description": this.formBuilder.control(''),
    "price": this.formBuilder.control(0),
    "isNew": this.formBuilder.control(false),
    "categoryIds": this.formBuilder.control([0]),
    "attributeRequests": this.formBuilder.array([])
  })

  get attributesFormArray(): FormArray{
    return (this.createOfferForm.controls["attributes"] as FormArray)
  }

  selectedCategory?: CategoryDTO
  categories: CategoryDTO[] = []
  // [{
  //   "categoryId": 1,
  //   "name": "kategorija1",
  //   "attributes": [
  //     {"attributeId": 1, "name": "attribute11"},
  //     {"attributeId": 2, "name": "attribute21"},
  //   ]
  // },
  // {
  //   "categoryId": 1,
  //   "name": "kategorija2",
  //   "attributes": [
  //     {"attributeId": 3, "name": "attribute12"},
  //     {"attributeId": 4, "name": "attribute22"},
  //   ]
  // },
  // {
  //   "categoryId": 3,
  //   "name": "kategorija3",
  //   "attributes": [
  //     {"attributeId": 5, "name": "attribute13"},
  //     {"attributeId": 6, "name": "attribute23"},
  //   ]
  // },
  // {
  //   "categoryId": 4,
  //   "name": "kategorija4",
  //   "attributes": [
  //     {"attributeId": 7, "name": "attribute14"},
  //     {"attributeId": 8, "name": "attribute24"},
  //   ]
  // },
  // {
  //   "categoryId": 5,
  //   "name": "kategorija",
  //   "attributes": [
  //     {"attributeId": 9, "name": "attribute15"},
  //     {"attributeId": 10, "name": "attribute25"},
  //   ]
  // }]

  ngOnInit(){
    this.getCategories()
  }

  getCategories(){
    this.categoriesService.getAll()
    .subscribe({
      next: (data: CategoryDTO[]) => this.categories = data,
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

  onCategorySelected(category: CategoryDTO){
    this.attributesFormArray.clear();
    for(var attribute of category.attributes){
      this.attributesFormArray.push(this.formBuilder.group(
        {
          id: this.formBuilder.control(attribute.attributeId),
          name: this.formBuilder.control(attribute.name),
          value: this.formBuilder.control('')
        }
      ))
    }

  }

  create(){
    this.createOfferForm.patchValue({"categoryIds": [this.selectedCategory?.categoryId]})
    this.offersService.create(this.createOfferForm.value)
    .subscribe({
      next: (offer: OfferDTO) => console.log(offer),
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }


}
