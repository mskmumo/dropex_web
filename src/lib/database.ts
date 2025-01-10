import { Pool, PoolConfig } from 'pg';

let pool: Pool;

function getConfig(): PoolConfig {
	if (process.env.NODE_ENV === 'production') {
		return {
			connectionString: process.env.DATABASE_URL,
			ssl: { rejectUnauthorized: false }
		};
	}
	return {
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		host: process.env.POSTGRES_HOST,
		port: parseInt(process.env.POSTGRES_PORT || '5432'),
		database: process.env.POSTGRES_DATABASE
	};
}

if (!pool) {
	pool = new Pool(getConfig());
}

export async function query<T = any>(text: string, params?: any[]): Promise<{ rows: T[]; rowCount: number }> {
	const client = await pool.connect();
	try {
		const result = await client.query(text, params);
		return { rows: result.rows, rowCount: result.rowCount || 0 };
	} finally {
		client.release();
	}
}

export default pool;
