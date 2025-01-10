import { Pool } from 'pg';

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.POSTGRES_HOST,
	port: parseInt(process.env.POSTGRES_PORT || '5432'),
	database: process.env.POSTGRES_DATABASE
});

export const supabase = {
	from: (table: string) => ({
		select: async (columns = '*') => {
			try {
				const { rows } = await pool.query(`SELECT ${columns} FROM ${table}`);
				return { data: rows, error: null };
			} catch (error) {
				return { data: null, error };
			}
		},
		insert: async (values: any) => {
			try {
				const columns = Object.keys(values).join(', ');
				const placeholders = Object.keys(values).map((_, i) => `$${i + 1}`).join(', ');
				const queryValues = Object.values(values);
				
				const { rows } = await pool.query(
					`INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`,
					queryValues
				);
				return { data: rows[0], error: null };
			} catch (error) {
				return { data: null, error };
			}
		},
		update: async (values: any) => ({
			eq: async (column: string, value: any) => {
				try {
					const setClause = Object.keys(values)
						.map((key, i) => `${key} = $${i + 1}`)
						.join(', ');
					const queryValues = [...Object.values(values), value];
					
					const { rows } = await pool.query(
						`UPDATE ${table} SET ${setClause} WHERE ${column} = $${Object.keys(values).length + 1} RETURNING *`,
						queryValues
					);
					return { data: rows[0], error: null };
				} catch (error) {
					return { data: null, error };
				}
			}
		}),
		delete: async () => ({
			eq: async (column: string, value: any) => {
				try {
					const { rows } = await pool.query(
						`DELETE FROM ${table} WHERE ${column} = $1 RETURNING *`,
						[value]
					);
					return { data: rows[0], error: null };
				} catch (error) {
					return { data: null, error };
				}
			}
		})
	})
};

export default supabase;