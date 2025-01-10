import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface User {
	id: string;
	email: string;
	role: string;
}

export async function getUser(token: string | undefined): Promise<User | null> {
	if (!token) return null;

	try {
		const verified = await jwtVerify(
			token,
			new TextEncoder().encode(JWT_SECRET)
		);

		return verified.payload as User;
	} catch (err) {
		console.error('Error verifying token:', err);
		return null;
	}
}

export async function getCurrentUser(): Promise<User | null> {
	const token = cookies().get('token')?.value;
	return getUser(token);
}