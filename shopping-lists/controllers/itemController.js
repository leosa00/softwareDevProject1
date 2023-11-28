import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as itemServices from "../services/itemServices.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };
  
  const redirectTo = (path) => {
    return new Response(`Redirecting to ${path}.`, {
      status: 303,
      headers: {
        "Location": path,
      },
    });
  };

const addItem = async (request,id) => {
    const formData = await request.formData();
    const name = formData.get("name");
  
    await itemServices.itemAdd(name,id);
    return redirectTo(`/lists/${id}`)
}

const itemsAll = async (id) => {
  
    const data = {
    itemList: await itemServices.itemListAll(id),
    };

    return new Response(await renderFile("shoppinglist.eta",data), responseDetails);
}

const collectedItem = async (itemId,listId) => {
    
    await itemServices.itemCollected(itemId,listId);

    return redirectTo(`/lists/${listId}`);

}



export {addItem,itemsAll,collectedItem}