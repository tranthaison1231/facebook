import { faker } from '@faker-js/faker'

export const userMock = {
  id: faker.datatype.uuid()
}

export const groupMock = {
  id: faker.datatype.uuid(),
  avatar: faker.image.imageUrl(),
  userId: userMock.id,
  name: faker.name.fullName()
}

export const shortCutsMock = [
  {
    id: faker.datatype.uuid(),
    groupId: groupMock.id,
    group: groupMock,
    userId: userMock.id
  }
]
