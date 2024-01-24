'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
 
// Define a schema that matches the shape of my form object. 
// This schema will validate the formData before saving it to a database
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
 
//CREATE INVOICE

// Use Zod to update the expected types
const CreateInvoice = FormSchema.omit({ id: true, date: true });
 
export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
      });

    // It's usually good practice to store monetary values in cents in your database to eliminate 
    // JavaScript floating-point errors and ensure greater accuracy.      
    const amountInCents = amount * 100;

    const date = new Date().toISOString().split('T')[0]; //Date with the format "YYYY-MM-DD" 

    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

    // Once the database has been updated, the /dashboard/invoices path will be revalidated, 
    // and fresh data will be fetched from the server.
    revalidatePath('/dashboard/invoices');

    redirect('/dashboard/invoices'); //Redirects the user after the update is completed

    // Test without validating data
    //   const rawFormData = {
    //     customerId: formData.get('customerId'),
    //     amount: formData.get('amount'),
    //     status: formData.get('status'),
    //   };
    //   // Test it out:
    //   console.log(rawFormData);
    //   console.log(typeof rawFormData.amount);
}

//UPDATE INVOICE

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
   
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }


//DELETE INVOICE

export async function deleteInvoice(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  }