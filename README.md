# Schema Validation Based on Configuration

This project aims to give a simple and scalable schema validation based on a model. This model tells us if one property is required or not, so we can ask for it during the validation.

## Validation

The validation has three levels.

* Data validation
* Requirement validation
* Cross validation

### Data Validation

To validate the data we can use regular expressions. It's the best way to standardize the validations, and also it's easy to create a regular expression library to share across any project.

### Requirement Validation

This condition can be extracted from the model. We can set if a value is required or not, so we can always validate its contents, but not complain if it is missing.

### Cross Validation

In case one value depends on other, we can make it not required in the schema, and then refine the whole schema to see if it is required or not.

If `addition condition`\
&emsp;and `value`\
&emsp;&emsp;and `is required` => ✅\
&emsp;&emsp;and `is not required` => ✅\
&emsp;and `no value`\
&emsp;&emsp;and `is required` => ❌\
&emsp;&emsp;and `is not required` => ✅

If `not addition condition`\
&emsp;and `value`\
&emsp;&emsp;and `is required` => ✅\
&emsp;&emsp;and `is not required` => ✅\
&emsp;and `no value`\
&emsp;&emsp;and `is required` => ✅\
&emsp;&emsp;and `is not required` => ✅

The model will provide us with the `required` condition, and the data with the `value` and the additional condition value.

## Example for Zod

Imagine we need to request the `surname` only if the `name` is present. Using the model we see the name is optional, so it is not going to fail if we don't set it. We cannot pass the required property directly to the `stringValidator` of the surname, so we pass nothing making it optional, and then we use the `superRefine` method to apply the required property of the surname only if the name is present.

```javascript
const model = {
  isNameRequired: false,
  // Only if name is included.
  isSurnameRequired: true,
}

const schema = z
  .object({
    name: stringValidator(model.isNameRequired),
    // If we don't pass any condition it's
    // optional.
    surname: stringValidator(),
  })
  .superRefine((value, { addIssue }) => {
    if(
      // Additional validation.
      value.name &&
      // Requirement validation according to the
      // property value and its model definition.
      !value.surname &&
      model.isSurnameRequired
    ) {
      // If we fullfil the addition condition,
      // but the value is empty being required,
      // we add an error to the surname field.
      addIssue({
        code: z.ZodIssueCode.custom,
        path: ['surname'],
        message: 'This field is required',
      })
    }
  })
```

## Validators

Validators are functions that we can configure to validate a certain data type without having to repeat the validation schema every time. For example, this is the string validator.

```typescript
const stringValidator = (isRequired?: boolean) =>
  z
    // Data type.
    .string()
    // Optional including null.
    .nullish()
    // Refine checking the value and the
    // required condition.
    .refine((value) => !isRequired || value)
```

Validators can have any property depending on the type of value validated. Regular expressions for any string validation not included in the library (email, url, uuid, etc.), `max` and `min` values to validate numbers or dates, etc.

In the end you can have a validators set that covers all the necesites of your project reducing the size and complexity of the schemas to the minimum.

## Running the project

To install dependencies:

```bash
bun install
```

To run:

```bash
bun test --watch
```
