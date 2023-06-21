import { AnswerDTO } from "./answer-dto";
import { UserDTO } from "./user-dto";

export interface QuestionDTO {
  questionId: number
  text: string
  user: UserDTO
  answer: AnswerDTO
}
