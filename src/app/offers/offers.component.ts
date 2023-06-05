import { Component } from '@angular/core';
import { CategoryDTO } from '../model/category-dto';
import { OfferDTO } from '../model/offer-dto';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
  selectedCategory: CategoryDTO = {
    "categoryId": 1,
    "name": "kategorija",
    "attributes": [
      {"attributeId": 1, "name": "attribute1"},
      {"attributeId": 2, "name": "attribute2"},
    ]
  }
  offers: OfferDTO[] = [{
    offerId: 1,
    title: "string",
    text: "string",
    price: 1.0,
    location: "string",
    isNew: true,
    user: {userId: 1, firstName: "a", lastName:"a", email: "a", userName: "a"},
    quantity: 1,
    attributes: [],
    categories: []
  },
  {
    offerId: 1,
    title: "string",
    text: "string",
    price: 1.0,
    location: "string",
    isNew: true,
    user: {userId: 1, firstName: "a", lastName:"a", email: "a", userName: "a"},
    quantity: 1,
    attributes: [],
    categories: []
  },
  {
    offerId: 1,
    title: "string",
    text: "string",
    price: 1.0,
    location: "string",
    isNew: true,
    user: {userId: 1, firstName: "a", lastName:"a", email: "a", userName: "a"},
    quantity: 1,
    attributes: [],
    categories: []
  },
  {
    offerId: 1,
    title: "string",
    text: "string",
    price: 1.0,
    location: "string",
    isNew: true,
    user: {userId: 1, firstName: "a", lastName:"a", email: "a", userName: "a"},
    quantity: 1,
    attributes: [],
    categories: []
  },
  {
    offerId: 1,
    title: "string",
    text: "string",
    price: 1.0,
    location: "string",
    isNew: true,
    user: {userId: 1, firstName: "a", lastName:"a", email: "a", userName: "a"},
    quantity: 1,
    attributes: [],
    categories: []
  }]
  totalResults: number = 10;
  pageSize: number = 1;
  currentPage: number = 1;
  categories: CategoryDTO[] = [
    {
      "categoryId": 1,
      "name": "kategorija1",
      "attributes": [
        {"attributeId": 1, "name": "attribute11"},
        {"attributeId": 2, "name": "attribute21"},
      ]
    },
    {
      "categoryId": 1,
      "name": "kategorija2",
      "attributes": [
        {"attributeId": 3, "name": "attribute12"},
        {"attributeId": 4, "name": "attribute22"},
      ]
    },
    {
      "categoryId": 3,
      "name": "kategorija3",
      "attributes": [
        {"attributeId": 5, "name": "attribute13"},
        {"attributeId": 6, "name": "attribute23"},
      ]
    },
    {
      "categoryId": 4,
      "name": "kategorija4",
      "attributes": [
        {"attributeId": 7, "name": "attribute14"},
        {"attributeId": 8, "name": "attribute24"},
      ]
    },
    {
      "categoryId": 5,
      "name": "kategorija",
      "attributes": [
        {"attributeId": 9, "name": "attribute15"},
        {"attributeId": 10, "name": "attribute25"},
      ]
    }
  ]
  filterByAttributesForm: FormGroup = this.formBuilder.group({
    "attributes" : this.formBuilder.array(
    []
    ),
    "priceFrom" : this.formBuilder.control(0),
    "priceTo": this.formBuilder.control(-1),
    "onlyNew": this.formBuilder.control(false),
    "text": this.formBuilder.control('')
  });

  get attributesFormArray(): FormArray{
    return (this.filterByAttributesForm.controls["attributes"] as FormArray)
  }

  constructor(private formBuilder: FormBuilder){

  }

  ngOnInit(){
    // this.filterByAttributeForm = this.formBuilder.group({
    //   attributes : this.formBuilder.array(
    //   []
    //   )
    // });
    for(var attribute of this.selectedCategory.attributes){
    (this.filterByAttributesForm.controls["attributes"] as FormArray).push(this.formBuilder.group(
      {
        id: new FormControl(attribute.attributeId),
        name: new FormControl(attribute.name),
        value: new FormControl('')
      }
    ))
    }
  }

  onCategoryChange(category: CategoryDTO){
    this.attributesFormArray.clear();
    for(var attribute of category.attributes){
      this.attributesFormArray.push(this.formBuilder.group(
        {
          id: new FormControl(attribute.attributeId),
          name: new FormControl(attribute.name),
          value: new FormControl('')
        }
      ))
    }

  }

}
