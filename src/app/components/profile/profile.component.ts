import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CityDTO } from 'src/app/model/city-dto';
import { UserDTO } from 'src/app/model/user-dto';
import { AvatarsService } from 'src/app/services/avatars.service';
import { CitiesService } from 'src/app/services/cities.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
constructor(private usersService: UsersService, private formBuilder: FormBuilder, private citiesService: CitiesService, private avatarsService: AvatarsService){}

user?: UserDTO
editMode: boolean = false
profileForm: FormGroup = this.formBuilder.group({
    "firstName" : [{value: '', disabled: true}],
    "lastName" : [{value: '', disabled: true}],
    "email" : [{value: '', disabled: true}],
    "userName": [{value: '', disabled: true}],
    "password": [{value: '', disabled: true}],
    "cityId": [{value: 1, disabled: true}]
  })
selectedCity!: CityDTO
cities: CityDTO[] = []
editButtonText: string = "Edit"
userId: string | null  = localStorage.getItem("userId");
avatar?: File


ngOnInit(){
  if(this.userId){
  this.getCities()
    this.usersService.getById(this.userId)
    .subscribe({
      next: (data: UserDTO) => {
        this.user = data
        this.syncForm(data)
      },
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }
}

onCitySelected(city: CityDTO){
  this.selectedCity=city;
}

getCities(){
  this.citiesService.getAll()
  .subscribe({
    next: (data: CityDTO[]) => this.cities=data,
    error: (err: HttpErrorResponse) => console.log(err)
  })
}

toggleEditMode(){
  if(this.editMode == true){
    this.editButtonText="Edit"
    this.disableFormControls()
    if(this.user){
    this.syncForm(this.user)
      }
  }
  else{
    this.editButtonText="Cancel"
    this.enableFormControls()
  }
  this.editMode = (!this.editMode)
}

sendEditRequest(){
  if(this.user){
    this.usersService.update(this.user.userId, this.profileForm.value).subscribe({
      next: (data: UserDTO) => {
        this.user = data
        this.syncForm(data)
        // if(this.avatar){
        // this.avatarsService.uploadAvatar(this.avatar, data.userId).subscribe({
        //   next: (id: any) =>{},
        //   error: (err: HttpErrorResponse) => console.log(err)
        // })
        // }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

}

private syncForm(data: UserDTO){
        this.selectedCity=data.city
        this.profileForm.patchValue({
          "firstName": data.firstName,
          "lastName": data.lastName,
          "email": data.email,
          "password": data.password,
          "cityId": data.city.cityId,
          "userName": data.userName
        })
}

private disableFormControls(){
  this.profileForm.controls["firstName"].disable();
  this.profileForm.controls["lastName"].disable();
  this.profileForm.controls["email"].disable();
  this.profileForm.controls["userName"].disable();
  this.profileForm.controls["password"].disable();
  this.profileForm.controls["cityId"].disable();
}

private enableFormControls(){
  this.profileForm.controls["firstName"].enable();
  this.profileForm.controls["lastName"].enable();
  this.profileForm.controls["email"].enable();
  this.profileForm.controls["userName"].enable();
  this.profileForm.controls["password"].enable();
  this.profileForm.controls["cityId"].enable();
}

compareCities(city1: any, city2: any){
  return city1 && city2 && (city1.cityId == city2.cityId)
}


onAvatarSelected(event: any){
  this.avatar = event.target.files.item(0)
}
}
