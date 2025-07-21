export type User = {
  id: number
  name: string
  firstLastname: string
  secondLastname: string
  username: string
  isActive: boolean
  roleId: number
  role:{
    name:string
  }
  createdAt: string
  updatedAt: string
}

export type UpdateUserDTO = {
    name: string
    firstLastname: string
    secondLastname: string
    username: string
    isActive: boolean
    roleId: number
}

export type UpdatePasswordDTO = {
    password: string,
    id: number
}

export type LoginUserDTO = {
    username: string;
    password: string;
}
