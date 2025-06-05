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
