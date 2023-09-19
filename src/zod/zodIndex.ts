import { z } from 'zod'
import { Model } from '../types'
import { numberValidator, stringValidator } from './rules'

// After making a field optional (including null), we can use a refine method
// to make it required. So, the moment the city is required, the validations
// fail (we show a message in the UI).

export const getSchema = (model?: Model) =>
  z
    .object({
      name: stringValidator(model?.isNameRequired),
      surname: stringValidator(model?.isSurnameRequired),
      age: numberValidator(model?.isAgeRequired),
      city: stringValidator(model?.isCityRequired),
      address: z.object({
        // We need to do it optional if we have an external condition.
        // We will validate it using the additional condition in the
        // superRefine method.
        street: stringValidator(),
      }),
    })
    .superRefine((value, { addIssue }) => {
      if (
        // External condition.
        value.name === 'Gustavo' &&
        // If the value is empty.
        !value.address?.street &&
        // Then we check if the value is required according
        // to the model.
        model?.isStreetRequired
      ) {
        // Finally we set the error. We use a custom error
        // attached to the field.
        addIssue({
          code: z.ZodIssueCode.custom,
          path: ['address', 'street'],
          message: 'This field is required',
        })
      }
    })

const schema = getSchema()

export type User = z.infer<typeof schema>
