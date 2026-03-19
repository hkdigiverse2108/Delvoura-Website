import * as Yup from "yup";

type ValidationType = "string" | "number" | "array" | "mixed";

type BaseOptions<TSchema extends Yup.AnySchema> = {
  required?: boolean;
  extraRules?: (schema: TSchema) => TSchema;
};

type StringNumberOptions<TSchema extends Yup.AnySchema> = BaseOptions<TSchema> & {
  min?: number;
  max?: number;
};

type ArrayOptions<TSchema extends Yup.AnySchema> = BaseOptions<TSchema> & {
  minItems?: number;
  maxItems?: number;
};

export function Validation(type: "string", label: string, options?: StringNumberOptions<Yup.StringSchema>): Yup.StringSchema;
export function Validation(type: "number", label: string, options?: StringNumberOptions<Yup.NumberSchema>): Yup.NumberSchema;
export function Validation(type: "array", label: string, options?: ArrayOptions<Yup.ArraySchema<any, any, any, any>>): Yup.ArraySchema<any, any, any, any>;
export function Validation(type: "mixed", label: string, options?: BaseOptions<Yup.MixedSchema>): Yup.MixedSchema;
export function Validation(type: ValidationType, label: string, options: any = {}): Yup.AnySchema {
  const { required = true, min, max, minItems, maxItems, extraRules } = options;

  let schema: Yup.AnySchema;
  switch (type) {
    case "number":
      schema = Yup.number();
      break;
    case "array":
      schema = Yup.array();
      break;
    case "mixed":
      schema = Yup.mixed();
      break;
    case "string":
    default:
      schema = Yup.string();
      break;
  }

  if (required) {
    schema = schema.required(`${label} is required`);
  }

  if (typeof min === "number" && (type === "string" || type === "number")) {
    schema = (schema as Yup.StringSchema | Yup.NumberSchema).min(min, `${label} must be at least ${min}`);
  }

  if (typeof max === "number" && (type === "string" || type === "number")) {
    schema = (schema as Yup.StringSchema | Yup.NumberSchema).max(max, `${label} must be at most ${max}`);
  }

  if (type === "array") {
    if (typeof minItems === "number") {
      schema = (schema as Yup.ArraySchema<any, any, any, any>).min(minItems, `${label} must have at least ${minItems} items`);
    }
    if (typeof maxItems === "number") {
      schema = (schema as Yup.ArraySchema<any, any, any, any>).max(maxItems, `${label} must have at most ${maxItems} items`);
    }
  }

  if (extraRules) {
    schema = extraRules(schema);
  }

  return schema;
}
