import * as kysely from 'kysely'
import { createKysely } from '@vercel/postgres-kysely'
import { sql } from '@vercel/postgres'

export interface PlayersTable {
	id: kysely.Generated<number>;
	fid: string | null;
	username: string | null;
	name: string | null;
	recievedrop: boolean;
	createdAt: kysely.ColumnType<Date, string | undefined, never>;
	wallet: string | null;
}

// Keys of this interface are table names.
export interface Database {
	claimed: PlayersTable
}

export const db = createKysely<Database>()
export { sql } from 'kysely'

export async function getUser(fid: string | null): Promise<any> {
	let data: any;

	try {
		data = await db
			.selectFrom('claimed')
			.where('fid', '=', fid)
			.selectAll()
			.executeTakeFirst();
		return data; // Data fetched successfully
	} catch (e: any) {
		if (e.message.includes('relation "spiners" does not exist')) {
			console.warn(
				'Table does not exist, creating and seeding it with dummy data now...'
			);
			// Table is not created yet
			//await seed();
			return false; // Data fetched successfully after seeding
		} else {
			console.error('Error fetching data:', e);
			return false; // Error occurred while fetching data
		}
	}
}

export async function updateRecieveDrop(fid: string | null, newValue: boolean): Promise<void> {
	await db
		.updateTable('claimed')
		.set({
			recievedrop: newValue
		  })
		.where('fid', '=', fid)
		.executeTakeFirst()
}

export async function getAllUsers() {
	let data: any;
	data = await db
			.selectFrom('claimed')
			.selectAll()
			.where('recievedrop', '=', true)
			.execute();
	return data;
}

export async function addUser(fid: string | null, username: string | null, wallet: string | null) {

	const result = await db
		.insertInto('claimed')
		.values({
			fid: fid ? fid : null,
			username: username ? username : null,
			wallet: wallet ? wallet : null,
			recievedrop: false,
		})
		.executeTakeFirst()
}