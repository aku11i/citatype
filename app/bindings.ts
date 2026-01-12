import * as v from "valibot";

export const environmentValues = ["production", "preview", "local"] as const;
export type Environment = (typeof environmentValues)[number];

export const environmentSchema = v.pipe(
  v.string(),
  v.trim(),
  v.toLowerCase(),
  v.picklist(environmentValues),
);

export const bindingsSchema = v.objectWithRest(
  {
    ENVIRONMENT: environmentSchema,
  },
  v.unknown(),
);

export type Bindings = v.InferOutput<typeof bindingsSchema>;

export const parseBindings = (input: unknown): Bindings => {
  return v.parse(bindingsSchema, input);
};
