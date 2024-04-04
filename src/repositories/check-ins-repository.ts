import { type CheckIN, type Prisma } from "@prisma/client"

export interface CheckInsRepository {
  create(data: Prisma.CheckINUncheckedCreateInput): Promise<CheckIN>
  findByUserIdOnDdate(userId: string, date: Date): Promise<CheckIN | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIN[]>
}
