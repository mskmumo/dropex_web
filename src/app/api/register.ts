import { PrismaClient } from '@prisma/client'
import { passwordMatchSchema } from "@/validation/passwordMatchSchema"
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { z } from "zod"

// Define user roles as a constant
const userRoles = ['CUSTOMER', 'ADMIN', 'MANAGER'] as const;

// Create the schema for new user registration
const newUserSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(2, "Name must be at least 2 characters long"),
    country: z.string().min(2, "Country must be at least 2 characters long"),
    countryCode: z.string().min(1, "Country code is required"),
    phone: z.string().min(5, "Phone number must be at least 5 characters long"),
    role: z.enum(userRoles).default('CUSTOMER'),
    agreement: z.boolean().refine(val => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .and(passwordMatchSchema);

// Prisma client should be used only in server-side code
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, passwordConfirm, name, country, countryCode, phone, role, agreement } = req.body;

    const newUserValidation = newUserSchema.safeParse({
      email,
      password,
      passwordConfirm,
      name,
      country,
      countryCode,
      phone,
      role,
      agreement,
    });

    if (!newUserValidation.success) {
      return res.status(400).json({ message: newUserValidation.error.issues[0]?.message ?? "An error occurred" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          country,
          phone,
          role,
        },
      });

      return res.status(201).json({ message: 'User created successfully', user: { id: user.id, email: user.email } });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(400).json({ message: 'Error creating user', error: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
