// "use server";

// import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
// import { z } from "zod";

// // import { revalidatePath } from "next/cache";
// // import { redirect } from "next/navigation";

// import { createClient } from "@/utils/supabase/server";

// // export const registerUser = async ({
// //   email,
// //   password,
// //   passwordConfirm,
// // }: {
// //   email: string;
// //   password: string;
// //   passwordConfirm: string;
// // }) => {
// //   const newUserSchema = z
// //     .object({
// //       email: z.string().email(),
// //     })
// //     .and(passwordMatchSchema);

// //   const newUserValidation = newUserSchema.safeParse({
// //     email,
// //     password,
// //     passwordConfirm,
// //   });

// //   if (!newUserValidation.success) {
// //     return {
// //       error: true,
// //       message: newUserValidation.error.issues[0]?.message ?? "An error occured",
// //     };
// //   }
// // };

// export const registerUser = async ({
//   email,
//   password,
//   passwordConfirm,
//   name,
//   country,
//   countryCode,
//   phone,
//   agreement,
// }: {
//   email: string;
//   password: string;
//   passwordConfirm: string;
//   name: string;
//   country: string;
//   countryCode: string;
//   phone: string;
//   agreement: false,
// }) => {
//   const newUserSchema = z
//     .object({
//       email: z.string().email(),
//     })
//     .and(passwordMatchSchema);

//   const newUserValidation = newUserSchema.safeParse({
//     email,
//     password,
//     passwordConfirm,
//     name,
//     country,
//     countryCode,
//     phone,
//     agreement: false,
//   });

//   if (!newUserValidation.success) {
//     return {
//       error: true,
//       message: newUserValidation.error.issues[0]?.message ?? "An error occured",
//     };
//   }

//   // supabase authentication from here
//   const supabase = createClient();

//   const { data, error } = await (await supabase).auth.signUp({
//     email,
//     password,
//     name,
//     country,
//     countryCode,
//     phone,
//     agreement: false,
//   });

//   if (error) {
//     return {
//       error: true,
//       message: error.message,
//     };
//   }

//   if (data.user && data.user.identities && data.user.identities.length === 0) {
//     return {
//       error: true,
//       message: "Email already in use",
//     };
//   }

//   // User successfully created
//   return {
//     success: true,
//     message: "Check your email for the confirmation link",
//   };
// };
// "use server";

// import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
// import { z } from "zod";
// import { createClient } from "@/utils/supabase/server";

// const userRoles = ['CUSTOMER', 'ADMIN', 'MANAGER'] as const;

// const newUserSchema = z
//   .object({
//     email: z.string().email(),
//     name: z.string().min(2, "Name must be at least 2 characters long"),
//     country: z.string().min(2, "Country must be at least 2 characters long"),
//     countryCode: z.string().min(1, "Country code is required"),
//     phone: z.string().min(5, "Phone number must be at least 5 characters long"),
//     role: z.enum(userRoles).default('CUSTOMER'),
//     agreement: z.boolean().refine(val => val === true, {
//       message: "You must agree to the terms and conditions",
//     }),
//   })
//   .and(passwordMatchSchema);

// export const registerUser = async ({
//   email,
//   password,
//   passwordConfirm,
//   name,
//   country,
//   countryCode,
//   phone,
//   role = 'CUSTOMER',
//   agreement,
// }: {
//   email: string;
//   password: string;
//   passwordConfirm: string;
//   name: string;
//   country: string;
//   countryCode: string;
//   phone: string;
//   role?: typeof userRoles[number];
//   agreement: boolean;
// }) => {
//   const newUserValidation = newUserSchema.safeParse({
//     email,
//     password,
//     passwordConfirm,
//     name,
//     country,
//     countryCode,
//     phone,
//     role,
//     agreement,
//   });

//   if (!newUserValidation.success) {
//     return {
//       error: true,
//       message: newUserValidation.error.issues[0]?.message ?? "An error occurred",
//     };
//   }

//   const supabase = createClient();

//   // Sign up the user
//   const { data, error } = await (await supabase).auth.signUp({
//     email,
//     password,
//     options: {
//       data: {
//         name,
//         country,
//         phone: `${countryCode}${phone}`,
//         role,
//       }
//     }
//   });

//   if (error) {
//     return {
//       error: true,
//       message: error.message,
//     };
//   }

//   if (!data.user) {
//     return {
//       error: true,
//       message: "Failed to create user",
//     };
//   }

//   // Insert user data into the User table
//   const { error: insertError } = await (await supabase)
//     .from('User')
//     .insert({
//       id: data.user.id,
//       name,
//       email,
//       country,
//       phone: `${countryCode}${phone}`,
//       role,
//     });

//   if (insertError) {
//     console.error('Error inserting user data:', insertError);
//     return {
//       error: true,
//       message: "User created but failed to save additional data",
//     };
//   }

//   // User successfully created and data inserted
//   return {
//     success: true,
//     message: "Check your email for the confirmation link",
//     user: {
//       id: data.user.id,
//       email: data.user.email,
//       role,
//     },
//   };
// };

import { PrismaClient } from '@prisma/client';
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { z } from "zod";

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

// Function to register the user
export const registerUser = async ({
  email,
  password,
  passwordConfirm,
  name,
  country,
  countryCode,
  phone,
  role = 'CUSTOMER',
  agreement,
}: {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  country: string;
  countryCode: string;
  phone: string;
  role?: typeof userRoles[number];
  agreement: boolean;
}) => {
  // Validate the user data using the schema
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

  // If validation fails, return the error message
  if (!newUserValidation.success) {
    return {
      error: true,
      message: newUserValidation.error.issues[0]?.message ?? "An error occurred",
    };
  }

  // Proceed to create the user if validation passes
  const prisma = new PrismaClient();

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
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

    // Return success response with user data
    return {
      success: true,
      message: 'User created successfully',
      user: { id: user.id, email: user.email },
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      error: true,
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  } finally {
    // Ensure Prisma client is closed
    await prisma.$disconnect();
  }
};

// Next.js API handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password, country, countryCode, phone, agreement, role } = req.body;

    // Call the registerUser function
    const result = await registerUser({
      email,
      password,
      passwordConfirm: password, // Assuming `passwordConfirm` is the same as `password`
      name,
      country,
      countryCode,
      phone,
      role,
      agreement,
    });

    // Handle the response based on the result of registerUser
    if (result.error) {
      return res.status(400).json({ message: result.message });
    }

    // Return success response
    return res.status(201).json(result);
  } else {
    // If the method is not POST, return 405 Method Not Allowed
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
