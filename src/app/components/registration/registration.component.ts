import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { AccountActivationComponent } from '../modal/account-activation/account-activation.component';
import { UserDTO } from 'src/app/model/user-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CityDTO } from 'src/app/model/city-dto';
import { CitiesService } from 'src/app/services/cities.service';
import { AvatarsService } from 'src/app/services/avatars.service';
import { notEmptyNotBlankRegex } from 'src/app/app.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  constructor(private loginService : LoginService, private formBuilder: FormBuilder, private dialog: MatDialog, private router: Router, private citiesService : CitiesService, private avatarsService: AvatarsService, private snackBar: MatSnackBar){}

  selectedCity!: CityDTO //! !
  cities: CityDTO[] = []
  avatar?: File

  registerForm: FormGroup = this.formBuilder.group({
    "firstName" : ['', [Validators.required, Validators.pattern(notEmptyNotBlankRegex)]],
    "lastName" : ['', [Validators.required, Validators.pattern(notEmptyNotBlankRegex)]],
    "email" : ['', [Validators.required, Validators.email]],
    "userName": ['', [Validators.required, Validators.pattern(notEmptyNotBlankRegex)]],
    "password": ['', [Validators.required, Validators.pattern(notEmptyNotBlankRegex)]],
    "cityId": [1,[Validators.required]],
  })

  get firstName(){
    return this.registerForm.get('firstName')
  }

  get lastName(){
    return this.registerForm.get('lastName')
  }

  get email(){
    return this.registerForm.get('email')
  }

  get userName(){
    return this.registerForm.get('userName')
  }

  get password(){
    return this.registerForm.get('password')
  }

  get cityId(){
    return this.registerForm.get('cityId')
  }

  ngOnInit(){
    this.getCities()
  }

  register(){
    //this.registerForm.patchValue({"cityId" : this.selectedCity.cityId})
    this.loginService.register(this.registerForm.value)
    .subscribe({
      next: (data : UserDTO) => {
        if(this.avatar){
        this.avatarsService.uploadAvatar(this.avatar, data.userId)
        .subscribe({
          next: _ => this.snackBar.open('Successfuly registered', 'OK', {duration: 5000}),
          error: (err: HttpErrorResponse) => console.log(err)
        })
        }
          let dialogRef = this.dialog.open(AccountActivationComponent, {
            data
          })

          dialogRef.afterClosed().subscribe(
            (activated: boolean) => {
              if(activated==true){
              localStorage.setItem("userId", data.userId.toString())
              this.router.navigate([''])
              }
            })
        },
      error: (err: HttpErrorResponse) => this.snackBar.open('User name allready exists', 'OK')
    })
  }

  getCities(){
    this.citiesService.getAll().subscribe({
      next: (data: CityDTO[]) => {this.cities=data; this.selectedCity=data[0]},
      error: (err: HttpErrorResponse) => console.log(err)
    })

  }

  onCitySelected(city: CityDTO){
    this.selectedCity=city
    this.registerForm.patchValue({"cityId": city.cityId})
  }

  onAvatarSelected(event: any){
    this.avatar = event.target.files.item(0)
  }

}
