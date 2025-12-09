import { faker } from "@faker-js/faker"
import { ServiceType} from '../@types'

// Função que gera 1 registro mock
function createMock(): ServiceType {
  return {
    id: faker.string.uuid(),
    client: faker.person.fullName(),
    subject: faker.lorem.sentence(3),
    process: faker.number.int({ min: 1000, max: 9999 }).toString(),
    recentRegister: faker.date.recent({ days: 10 }).toISOString(),
    tags: faker.helpers.arrayElements(
      ["urgent", "review", "approved", "pending", "archived"],
      faker.number.int({ min: 1, max: 3 })
    ),
  }
}

export function generateServiceMocks(count: number): ServiceType[] {
  return Array.from({ length: count }, createMock)
}

export const serviceMock = generateServiceMocks(10)
