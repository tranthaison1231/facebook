import { expect, test } from 'vitest'
import { formatName } from './name'

describe('Name utility', () => {
  test('Check formatName have correct output', () => {
    //Arrange
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      id: '1',
      fullName: 'John Doe',
      avatar: 'avatar',
      school: 'school',
      address: 'address',
      workAt: 'workAt'
    }

    //Act
    const fullName = formatName(user)

    //Assert
    expect(fullName).toBe('John Doe')
  })
})
