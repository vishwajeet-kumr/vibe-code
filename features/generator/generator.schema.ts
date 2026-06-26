// features/generator/generator.schema.ts — Zod validation schema for generator form inputs

import { z } from "zod";
import {
  PROJECT_TYPES,
  TECH_STACK_OPTIONS,
} from "@/features/generator/generator.types";
import type { ProjectInput } from "@/features/generator/generator.types";

export const projectInputSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters")
    .max(60, "Project name must be 60 characters or less"),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be 1000 characters or less"),
  projectType: z.enum(PROJECT_TYPES, {
    errorMap: () => ({ message: "Please select a valid project type" }),
  }),
  techStack: z
    .enum(TECH_STACK_OPTIONS, {
      errorMap: () => ({ message: "Please select a valid tech stack" }),
    })
    .default("default"),
});

export type ProjectInputSchema = z.infer<typeof projectInputSchema>;

type TypesMatch<T, U> = [T] extends [U]
  ? [U] extends [T]
    ? true
    : false
  : false;

const _typeCheck: TypesMatch<ProjectInputSchema, ProjectInput> = true;
void _typeCheck;
