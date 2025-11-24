import * as z from 'zod';

export function jsonContent<T extends z.ZodType>({
  schema,
  description,
}: {
  schema: T;
  description: string;
}) {
  return {
    content: {
      'application/json': {
        schema,
      },
    },
    description,
  };
}

export function jsonContentRequired<T extends z.ZodType>({
  schema,
  description,
}: {
  schema: T;
  description: string;
}) {
  return {
    ...jsonContent({ schema, description }),
    required: true,
  };
}

export function jsonContentOneOf<T extends z.ZodType[]>({
  schemas,
  description,
}: {
  schemas: T;
  description: string;
}) {
  const unionSchema = z.union(schemas);

  return jsonContent({
    schema: unionSchema,
    description,
  });
}
