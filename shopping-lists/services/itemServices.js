import { sql } from "../database/database.js";

const itemAdd = async (name,id) => {
    await sql`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${name}, ${id})`;
};

const itemListAll = async (id) => {
    return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} ORDER BY name ASC, collected`;
};

const itemCollected = async(itemId,listId) => {
    await sql`UPDATE shopping_list_items SET collected = TRUE WHERE shopping_list_id = ${listId} AND id = ${itemId}`;
};

const amount = async() => {
    const result = await sql`SELECT COUNT(*) as items_count FROM shopping_list_items`;
    return result[0].items_count;
}

export {itemAdd,itemListAll,itemCollected,amount}