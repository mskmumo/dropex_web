import { query } from './database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface User {
	id: string;
	email: string;
	role: string;
}

export async function signIn(email: string, password: string): Promise<{ user: User | null; token: string | null }> {
	try {
		const { rows } = await query<User & { password: string }>(
			'SELECT * FROM users WHERE email = $1',
			[email]
		);

		if (rows.length === 0) {
			return { user: null, token: null };
		}

		const user = rows[0];
		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword) {
			return { user: null, token: null };
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email, role: user.role },
			process.env.JWT_SECRET || 'your-secret-key',
			{ expiresIn: '24h' }
		);

		const { password: _, ...userWithoutPassword } = user;
		return { user: userWithoutPassword, token };
	} catch (error) {
		console.error('Sign in error:', error);
		throw error;
	}
}

export async function signUp(email: string, password: string): Promise<{ user: User | null; token: string | null }> {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		
		const { rows } = await query<User>(
			'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role',
			[email, hashedPassword, 'user']
		);

		if (rows.length === 0) {
			return { user: null, token: null };
		}

		const user = rows[0];
		const token = jwt.sign(
			{ id: user.id, email: user.email, role: user.role },
			process.env.JWT_SECRET || 'your-secret-key',
			{ expiresIn: '24h' }
		);

		return { user, token };
	} catch (error) {
		console.error('Sign up error:', error);
		throw error;
	}
}

export async function verifyToken(token: string): Promise<User | null> {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as User;
		const { rows } = await query<User>(
			'SELECT id, email, role FROM users WHERE id = $1',
			[decoded.id]
		);
		return rows[0] || null;
	} catch (error) {
		console.error('Token verification error:', error);
		return null;
	}
}