import { describe, test, expect } from 'bun:test'
import { getSchema, type User } from './yupIndex'
import { type Model } from '../types'

const allOptionalModel: Model = {
  isNameRequired: false,
  isSurnameRequired: false,
  isAgeRequired: false,
  isCityRequired: false,
  isStreetRequired: false,
}

const allRequiredModel: Model = {
  isNameRequired: true,
  isSurnameRequired: true,
  isAgeRequired: true,
  isCityRequired: true,
  isStreetRequired: true,
}

const streetRequiredModel: Model = {
  isNameRequired: false,
  isSurnameRequired: false,
  isAgeRequired: false,
  isCityRequired: false,
  isStreetRequired: true,
}

describe('The schema validation for the allOptionalModel', () => {
  test('should work if the schema is empty', () => {
    const data: User = {
      address: {},
    }
    expect(getSchema(allOptionalModel).isValidSync(data)).toBe(true)
  })

  test('should work if all properties are null', () => {
    const data: User = {
      name: null,
      surname: null,
      age: null,
      city: null,
      address: {
        street: null,
      },
    }
    expect(getSchema(allOptionalModel).isValidSync(data)).toBe(true)
  })

  test('should work if all the properties are falsy', () => {
    const data: User = {
      name: '',
      surname: '',
      age: 0,
      city: '',
      address: {
        street: '',
      },
    }
    expect(getSchema(allOptionalModel).isValidSync(data)).toBe(true)
  })
})

describe('The schema validation for the allRequiredModel', () => {
  test('should fail if the schema is empty', () => {
    const data: User = {
      address: {},
    }
    expect(getSchema(allRequiredModel).isValidSync(data)).toBe(false)
  })

  test('should fail if all properties are null', () => {
    const data: User = {
      name: null,
      surname: null,
      age: null,
      city: null,
      address: {
        street: null,
      },
    }
    expect(getSchema(allRequiredModel).isValidSync(data)).toBe(false)
  })

  test('should fail if all the properties are falsy', () => {
    const data: User = {
      name: '',
      surname: '',
      age: 0,
      city: '',
      address: {
        street: '',
      },
    }
    expect(getSchema(allRequiredModel).isValidSync(data)).toBe(false)
  })
})

describe('The schema validation for the streetRequiredModel', () => {
  // Remember that the condition applied here is that the street will
  // only apply the model condition (isStreetRequired) if the name
  // introduced is "Gustavo".
  test.todo(
    'should work if the street is required and not empty for Gustavo',
    () => {
      const data: User = {
        name: 'Gustavo',
        surname: null,
        age: null,
        city: null,
        address: {
          street: 'Calle de los Dolores de Cabeza, 42',
        },
      }
      expect(getSchema(streetRequiredModel).isValidSync(data)).toBe(true)
    }
  )

  test.todo(
    'should fail if the street is required and empty for Gustavo',
    () => {
      const data: User = {
        name: 'Gustavo',
        surname: null,
        age: null,
        city: null,
        address: {
          street: null,
        },
      }
      expect(getSchema(streetRequiredModel).isValidSync(data)).toBe(false)
    }
  )

  test.todo(
    'should work if the street is required and empty but for other person',
    () => {
      const data: User = {
        name: 'John',
        surname: null,
        age: null,
        city: null,
        address: {
          street: null,
        },
      }
      expect(getSchema(streetRequiredModel).isValidSync(data)).toBe(true)
    }
  )
})
