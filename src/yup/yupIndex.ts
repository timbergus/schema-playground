import * as yup from 'yup'
import { Model } from '../types'
import { numberValidator, stringValidator } from './rules'

export const getSchema = (model?: Model) =>
  yup.object({
    name: stringValidator(model?.isNameRequired),
    surname: stringValidator(model?.isSurnameRequired),
    age: numberValidator(model?.isAgeRequired),
    city: stringValidator(model?.isCityRequired),
    // ! This is not working because it only get properties from
    // ! siblings but not from the parent.
    address: yup.object({
      street: stringValidator().when('name', {
        is: 'Gustavo',
        then: (schema) => schema.required(),
      }),
    }),
  })

const schema = getSchema()

export type User = yup.InferType<typeof schema>
