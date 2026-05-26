import { SafeUser } from "./user.types"

export type AuthResponse = {
  user: SafeUser
  token: string
}
