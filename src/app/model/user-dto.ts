import { CityDTO } from "./city-dto"

export interface UserDTO {
  userId: number,
  firstName: string,
  lastName: string,
  email: string,
  userName: string,
  activated: boolean
  city: CityDTO
}
