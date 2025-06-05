import { User } from "./user.type"

export type fetchUsersResponse = {
  response: {
    users: User[]
    count: number
  }
  pagination: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}