import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { notEmptyNotBlankRegex, positiveNumberValidator } from 'src/app/app.module';
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
  constructor(private formBuilder: FormBuilder, private offersService: OffersService, private categoriesService: CategoriesService, private router: Router, private snackBar: MatSnackBar){}

  createOfferForm: FormGroup = this.formBuilder.group({
    "title": [null, [Validators.required, Validators.pattern(notEmptyNotBlankRegex)]],
    "description": ['', [Validators.required, Validators.pattern(notEmptyNotBlankRegex)]],
    "price": [null,[Validators.required, positiveNumberValidator]],
    "isNew": [false],
    "quantity": [1,[Validators.required, Validators.min(1)]],
    "location": ['', [Validators.required, Validators.pattern(notEmptyNotBlankRegex)]],
    "categoryIds": [null, [Validators.required]],
    "attributeRequests": this.formBuilder.array([]),
    "userId": [''],
    "selectedFiles": [null, Validators.required]
  })

  get title(){
    return this.createOfferForm.get('title');
  }
  get description(){
    return this.createOfferForm.get('description');
  }
  get price(){
    return this.createOfferForm.get('price');
  }
  get isNew(){
    return this.createOfferForm.get('isNew');
  }
  get quantity(){
    return this.createOfferForm.get('quantity');
  }
  get location(){
    return this.createOfferForm.get('location');
  }

  get selectedFilesControl(){
    return this.createOfferForm.get('selectedFiles')
  }

  get categoryIds(){
    return this.createOfferForm.get('categoryIds')
  }

  get attributesFormArray(): FormArray{
    return (this.createOfferForm.controls["attributeRequests"] as FormArray)
  }

  selectedCategory?: CategoryDTO //! ?
  selectedFiles!: FileList //! !
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
      next: (data: CategoryDTO[]) => {
        this.categories = data; this.createOfferForm.patchValue({"categoryIds": [data[0].categoryId]})
        this.attributesFormArray.clear();
      for(var attribute of data[0].attributes){
      this.attributesFormArray.push(this.formBuilder.group(
        {
          "attributeId": this.formBuilder.control(attribute.attributeId),
          "name": this.formBuilder.control(attribute.name),
          "value": [null, [Validators.required, Validators.pattern(notEmptyNotBlankRegex)]]
        }
      ))
    }},
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

  onCategorySelected(category: CategoryDTO){
    this.attributesFormArray.clear();
    for(var attribute of category.attributes){
      this.attributesFormArray.push(this.formBuilder.group(
        {
          "attributeId": this.formBuilder.control(attribute.attributeId),
          "name": this.formBuilder.control(attribute.name),
          "value": [null, [Validators.required, Validators.pattern(notEmptyNotBlankRegex)]]
        }
      ))
    }
    //?this.createOfferForm.patchValue({"categoryIds": [category.categoryId]})
    // this.categoryIds?.markAsTouched({
    //   onlySelf: true
    // })
    // this.categoryIds?.updateValueAndValidity()

  }

  onCategoryIdSelected(array: number[]){
    this.attributesFormArray.clear();
    const foundCategory = this.categories.find(c => c.categoryId==array[0])
    if(foundCategory){
      console.log("found")
    for(var attribute of foundCategory.attributes){
      this.attributesFormArray.push(this.formBuilder.group(
        {
          "attributeId": this.formBuilder.control(attribute.attributeId),
          "name": this.formBuilder.control(attribute.name),
          "value": [null, [Validators.required, Validators.pattern(notEmptyNotBlankRegex)]]
        }
      ))
    }
    //?this.createOfferForm.patchValue({"categoryIds": [category.categoryId]})
    // this.categoryIds?.markAsTouched({
    //   onlySelf: true
    // })
    // this.categoryIds?.updateValueAndValidity()
  }

  }

  create(){
    this.createOfferForm.patchValue({"categoryIds": [this.selectedCategory?.categoryId]})
    this.offersService.create(this.createOfferForm.value)
    .subscribe({
      next: (offer: OfferDTO) => console.log(offer),//! očistiti formu
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

  onFilesSelected(e: any){
    this.selectedFiles = e.target.files

  }

  createOffer(){
    console.log(this.createOfferForm.value)
    //?this.createOfferForm.patchValue({"categoryIds": [this.selectedCategory?.categoryId]})
    let userId = parseInt(localStorage.getItem("userId") ?? "0")//! popraviti
    this.createOfferForm.patchValue({"userId" : userId})
    this.offersService.create(this.createOfferForm.value)
    .subscribe({
      next: (data: OfferDTO) =>{
        this.offersService.uploadImages(this.selectedFiles, data.offerId).subscribe({
          next : _ => {
            this.snackBar.open('Offer created', 'OK',{ duration: 5000});
            this.createOfferForm.reset();
            // this.attributesFormArray.clear();
            this.getCategories();
          },
          error: (err: HttpErrorResponse) => console.log(err)
        })
      },
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

  compareCategoryIds(array1: number[], array2: number[]){
    return array1[0]==array2[0];
  }


}
