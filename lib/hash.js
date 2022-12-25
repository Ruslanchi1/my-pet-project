import { compare, hash } from "bcrypt";


export const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 3)

  return hashedPassword
}

export const comparePasswords = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword)

  return isValid
}
