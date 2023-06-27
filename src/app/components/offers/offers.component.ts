import { Component } from '@angular/core';
import { CategoryDTO } from '../../model/category-dto';
import { OfferDTO } from '../../model/offer-dto';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OffersService } from 'src/app/services/offers.service';
import { OffersPage } from 'src/app/model/offers-page';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoriesService } from 'src/app/services/categories.service';
import { positiveNumberOrNullValidator, positiveNumberValidator, priceRangeValidator } from 'src/app/app.module';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
  selectedCategory?: CategoryDTO //!koristen ?
  offers: OfferDTO[] = []
  totalPages: number = 1;
  pageSize: number = 1;
  currentPage: number = 1;
  categories: CategoryDTO[] = []
  filterMode: boolean=false;

  filterByAttributesForm: FormGroup = this.formBuilder.group({
    "categoryId": [null],
    "attributes": this.formBuilder.array(
      []
    ),
    "priceFrom": [null, [positiveNumberOrNullValidator]],
    "priceTo": [null, [positiveNumberOrNullValidator]],
    "onlyNew": [false],
    "text": [null]
  }, { validators: priceRangeValidator });

  get priceFrom() {
    return this.filterByAttributesForm.get('priceFrom')
  }

  get priceTo() {
    return this.filterByAttributesForm.get('priceTo')
  }

  get attributesFormArray(): FormArray {
    return (this.filterByAttributesForm.controls["attributes"] as FormArray)
  }

  constructor(private formBuilder: FormBuilder, private offersService: OffersService, private categoriesService: CategoriesService) {

  }

  ngOnInit() {
    this.getCategories()
    this.getAll()
    if (this.selectedCategory != null) {
      for (var attribute of this.selectedCategory.attributes) {
        (this.filterByAttributesForm.controls["attributes"] as FormArray).push(this.formBuilder.group(
          {
            "attributeId": this.formBuilder.control(attribute.attributeId),
            "name": this.formBuilder.control(attribute.name),
            "value": [null]
          }
        ))
      }
    }
  }

  onCategorySelected(category: CategoryDTO | null | undefined) {
    this.attributesFormArray.clear();
    if (category) {
      for (var attribute of category.attributes) {
        this.attributesFormArray.push(this.formBuilder.group(
          {
            "attributeId": this.formBuilder.control(attribute.attributeId),
            "name": this.formBuilder.control(attribute.name),
            "value": [null]
          }
        ))
      }
    }

  }

  sendSearchRequest(page: number = 0, pageSize: number = 10, includeFilters: boolean = false) {
    if(includeFilters == false){
      console.log("get")
      this.filterMode=false;
      this.getAll(page, pageSize)
    }
    else{
    this.filterMode=true;
    if (this.selectedCategory)
      this.filterByAttributesForm.patchValue({ "categoryId": this.selectedCategory?.categoryId })//! koristen ?
    if (this.filterByAttributesForm.get('text')?.value == '') {
      this.filterByAttributesForm.patchValue({ "text": null })
    }

    console.log(this.filterByAttributesForm.value);


    this.offersService.search(this.filterByAttributesForm.value, page, pageSize)
      .subscribe({
        next: (data: OffersPage) => {
          console.log(data)
          this.offers = data.content
          this.totalPages = data.totalPages
          this.currentPage = page
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
    }
  }

  getAll(page: number = 0, pageSize: number = 10) {
    this.offersService.getAll(page, pageSize)
      .subscribe({
        next: (data: OffersPage) => {
          console.log(data)
          this.offers = data.content
          this.totalPages = data.totalPages
          this.currentPage = page
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
  }

  getCategories() {
    this.categoriesService.getAll()
      .subscribe({
        next: (data: CategoryDTO[]) => this.categories = data,
        error: (err: HttpErrorResponse) => console.log(err)
      })
  }

  clear(){
    this.filterByAttributesForm.reset()
    this.selectedCategory = undefined;
  }

  clearFilters(){
    this.filterMode=false
    this.getAll()
  }

}
