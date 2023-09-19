# Schema Playground

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.1. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Use

By default Yup makes all the properties optional. Zod makes them all required. So in Zod we need to force them to be optional.

But it's easy. We can make them `nullish`. In Yup they are optional, but we also need to make them `nullable` if we want to accept `null` as value.

In Zod, `nullish` makes the fields optional and also adds `null` to the type.

## Using the project

I'm using tests to make it work, so you can use the testing suite included with bun.

```bash
bun test --watch
```
