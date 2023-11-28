import { sql } from "../database/database.js";

const shopAdd = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
};

const shopListAll = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = TRUE`;
};

const shopList = async (id) => {
    return await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;
};

const deactivateList = async(id) => {
    await sql`UPDATE shopping_lists SET active = FALSE WHERE id = ${id}`;
};

const amount = async() => {
    const result = await sql`SELECT COUNT(*) as list_count FROM shopping_lists`;
    return result[0].list_count;
}
export {shopAdd, shopListAll, shopList, deactivateList, amount};