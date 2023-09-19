import * as yup from 'yup'
import { Model } from '../types'
import { numberValidator, stringValidator } from './rules'

export const getSchema = (model?: Model) =>
  yup.object({
    name: stringValidator(model?.isNameRequired),
    surname: stringValidator(model?.isSurnameRequired),
    age: numberValidator(model?.isAgeRequired),
    city: stringValidator(model?.isCityRequired),
    address: yup.object({
      street: stringValidator().when('name', {
        is: 'Gustavo',
        then: (schema) => schema.required(),
      }),
    }),
  })

const schema = getSchema()

export type User = yup.InferType<typeof schema>

const schemaTest = getSchema({
  isNameRequired: true,
  isSurnameRequired: true,
  isAgeRequired: true,
  isCityRequired: true,
  isStreetRequired: true,
})

console.log(
  schemaTest.validateSync({
    name: 'Gustavo',
    surname: 'Muñoz',
    age: 43,
    city: 'Madrid',
    address: {
      street: 'Calle de los Dolores, 42',
    },
  } as User)
)
