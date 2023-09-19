import { z } from 'zod'

export const stringValidator = (isRequired?: boolean) =>
  z
    .string()
    .nullish()
    .refine((value) => !isRequired || value)

export const numberValidator = (isRequired?: boolean) =>
  z
    .number()
    .nullish()
    .refine((value) => !isRequired || value)
