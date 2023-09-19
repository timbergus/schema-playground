import * as yup from 'yup'

export const stringValidator = (isRequired?: boolean) =>
  yup
    .string()
    .nullable()
    .test('is-required', 'This field is required', (value) =>
      Boolean(!isRequired || value)
    )

export const numberValidator = (isRequired?: boolean) =>
  yup
    .number()
    .nullable()
    .test('is-required', 'This field is required', (value) =>
      Boolean(!isRequired || value)
    )
