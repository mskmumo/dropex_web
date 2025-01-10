import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function getUserRole(userId: string) {
	try {
		const { rows } = await query(
			'SELECT role FROM users WHERE id = $1',
			[userId]
		);
		return rows[0]?.role || null;
	} catch (err) {
		console.error('Error getting user role:', err);
		return null;
	}
}

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get('userId');

		if (!userId) {
			return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
		}

		const role = await getUserRole(userId);
		return NextResponse.json({ role });
	} catch (err) {
		console.error('Error in get-user-role route:', err);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}