import { User } from "@/types/User"

export type LoginResponse = {
  token: string,
  user: User,
}
