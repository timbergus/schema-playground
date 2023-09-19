import { z } from 'zod'
import { Model } from '../types'
import { numberValidator, stringValidator } from './rules'

export const getSchema = (model?: Model) =>
  z
    .object({
      name: stringValidator(model?.isNameRequired),
      surname: stringValidator(model?.isSurnameRequired),
      age: numberValidator(model?.isAgeRequired),
      city: stringValidator(model?.isCityRequired),
      address: z.object({
        street: stringValidator(),
      }),
    })
    .superRefine((value, { addIssue }) => {
      if (
        value.name === 'Gustavo' &&
        !value.address?.street &&
        model?.isStreetRequired
      ) {
        addIssue({
          code: z.ZodIssueCode.custom,
          path: ['address', 'street'],
          message: 'This field is required',
        })
      }
    })

const schema = getSchema()

export type User = z.infer<typeof schema>
