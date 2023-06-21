import { AvatarDTO } from "./avatar-dto"
import { CityDTO } from "./city-dto"

export interface UserDTO {
  userId: number,
  firstName: string,
  lastName: string,
  email: string,
  userName: string,
  activated: boolean
  password: string
  city: CityDTO
  avatar: AvatarDTO
}
