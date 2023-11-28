import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as shoppingListService from "../services/shoppingListService.js";
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

const listAdd = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    await shoppingListService.shopAdd(name);

    return redirectTo("/lists")
}

const listAll = async () => {
    const data = {
        lists: await shoppingListService.shopListAll(),
    };

    return new Response(await renderFile("lists.eta",data), responseDetails);
};

const listSpec = async (id) => {

    const data = {
        list: await shoppingListService.shopList(id),
        item: await itemServices.itemListAll(id),
    };
    return new Response(await renderFile("shoppinglist.eta",data), responseDetails);
};

const listRemove = async (id) => {

    await shoppingListService.deactivateList(id);

    return redirectTo("/lists")
};

const number = async () => {
  const data = {
      listAmount: await shoppingListService.amount(),
      itemAmount:await itemServices.amount(),
  };
  return new Response(await renderFile("main.eta",data), responseDetails);
};

export{listAdd,listAll,listSpec,listRemove,number}