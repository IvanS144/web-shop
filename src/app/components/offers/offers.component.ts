import { Component } from '@angular/core';
import { CategoryDTO } from '../../model/category-dto';
import { OfferDTO } from '../../model/offer-dto';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OffersService } from 'src/app/services/offers.service';
import { OffersPage } from 'src/app/model/offers-page';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
  selectedCategory?: CategoryDTO //!koristen ?
  offers: OfferDTO[] = []
  totalPages: number = 10;
  pageSize: number = 1;
  currentPage: number = 1;
  categories: CategoryDTO[] = []

  filterByAttributesForm: FormGroup = this.formBuilder.group({
    "categoryId": this.formBuilder.control(0),
    "attributes": this.formBuilder.array(
      []
    ),
    "priceFrom": this.formBuilder.control(0),
    "priceTo": this.formBuilder.control(-1),
    "onlyNew": this.formBuilder.control(false),
    "text": this.formBuilder.control('')
  });

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
            id: this.formBuilder.control(attribute.attributeId),
            name: this.formBuilder.control(attribute.name),
            value: this.formBuilder.control('')
          }
        ))
      }
    }
  }

  onCategorySelected(category: CategoryDTO) {
    this.attributesFormArray.clear();
    for (var attribute of category.attributes) {
      this.attributesFormArray.push(this.formBuilder.group(
        {
          id: this.formBuilder.control(attribute.attributeId),
          name: this.formBuilder.control(attribute.name),
          value: this.formBuilder.control('')
        }
      ))
    }

  }

  sendSearchRequest(page: number = 0, pageSize: number = 2) {
    this.filterByAttributesForm.patchValue({ "categoryId": this.selectedCategory?.categoryId })//! koristen ?
    this.offersService.search(this.filterByAttributesForm.value, page, pageSize)
      .subscribe({
        next: (data: OffersPage) => {
          this.offers = data.content
          this.totalPages = data.totalPages
          this.currentPage = page
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
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

  getCategories(){
    this.categoriesService.getAll()
    .subscribe({
      next: (data: CategoryDTO[]) => this.categories = data,
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

}
