import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { AccountActivationComponent } from '../modal/account-activation/account-activation.component';
import { UserDTO } from 'src/app/model/user-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CityDTO } from 'src/app/model/city-dto';
import { CitiesService } from 'src/app/services/cities.service';
import { AvatarsService } from 'src/app/services/avatars.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  constructor(private loginService : LoginService, private formBuilder: FormBuilder, private dialog: MatDialog, private router: Router, private citiesService : CitiesService, private avatarsService: AvatarsService){}

  selectedCity!: CityDTO //! !
  cities: CityDTO[] = []
  avatar?: File

  registerForm: FormGroup = this.formBuilder.group({
    "firstName" : this.formBuilder.control(''),
    "lastName" : this.formBuilder.control(''),
    "email" : this.formBuilder.control(''),
    "userName": this.formBuilder.control(''),
    "password": this.formBuilder.control(''),
    "cityId": this.formBuilder.control(1)
  })

  ngOnInit(){
    this.getCities()
  }

  register(){
    this.registerForm.patchValue({"cityId" : this.selectedCity.cityId})
    this.loginService.register(this.registerForm.value)
    .subscribe({
      next: (data : UserDTO) => {
        if(this.avatar){
        this.avatarsService.uploadAvatar(this.avatar, data.userId)
        .subscribe({
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
      error: (err: HttpErrorResponse) => console.log(err)//TODO prikaz obavještenja
    })
  }

  getCities(){
    this.citiesService.getAll().subscribe({
      next: (data: CityDTO[]) => this.cities=data,
      error: (err: HttpErrorResponse) => console.log(err)
    })

  }

  onCitySelected(city: CityDTO){
    this.selectedCity=city
  }

  onAvatarSelected(event: any){
    this.avatar = event.target.files.item(0)
  }

}
