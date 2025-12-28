import { z } from "zod";

export const supervisorSchema = z.object({
  id: z.string().optional(), // Optional because new users don't have an ID yet
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  department: z.string().min(2, "Department is required"),
});

export const studentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  matric: z.string().min(5, "Matric number is required"),
});

export type SupervisorFormValues = z.infer<typeof supervisorSchema>;
export type StudentFormValues = z.infer<typeof studentSchema>;