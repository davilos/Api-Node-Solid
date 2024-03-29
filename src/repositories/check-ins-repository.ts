import { type CheckIN, type Prisma } from "@prisma/client"

export interface CheckInsRepository {
  create: (data: Prisma.CheckINUncheckedCreateInput) => Promise<CheckIN>
}
