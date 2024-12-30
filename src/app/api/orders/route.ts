import { sendEmail } from '@/utils/sendEmail'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // ... existing code to process the order ...
      const order = await createOrder(req.body);
      const user = await findUserById(order.userId);

      // Add this to the POST method
      await sendEmail(
        user.email,
        'Order Confirmation',
        `Your order #${order.id} has been placed successfully.`
      )

      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

