import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { notEmptyNotBlankRegex } from 'src/app/app.module';
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
constructor(private usersService: UsersService, private formBuilder: FormBuilder, private citiesService: CitiesService, private avatarsService: AvatarsService, private snackBar: MatSnackBar){}

user?: UserDTO
editMode: boolean = false
profileForm: FormGroup = this.formBuilder.group({
    "firstName" : [{value: '', disabled: true}, [Validators.required]],
    "lastName" : [{value: '', disabled: true},[Validators.required, Validators.pattern(notEmptyNotBlankRegex)]],
    "email" : [{value: '', disabled: true},[Validators.required, Validators.email]],
    "userName": [{value: '', disabled: true}],//! required?
    "password": [{value: '', disabled: true},[Validators.required, Validators.pattern(notEmptyNotBlankRegex)]],
    "cityId": [{value: 1, disabled: true}],
  })

  get firstName(){
    return this.profileForm.get('firstName')
  }

  get lastName(){
    return this.profileForm.get('lastName')
  }

  get email(){
    return this.profileForm.get('email')
  }

  get password(){
    return this.profileForm.get('password')
  }

  get cityId(){
    return this.profileForm.get('cityId')
  }


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
        this.snackBar.open('Account updated', 'OK', {duration:5000})
        this.user = data
        this.syncForm(data)
        if(this.avatar){
        this.avatarsService.uploadAvatar(this.avatar, data.userId).subscribe({
          next: (id: any) =>{if(this.user){this.user.avatar.avatarId=id};},
          error: (err: HttpErrorResponse) => console.log(err)
        })
        }
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
