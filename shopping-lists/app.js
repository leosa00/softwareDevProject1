import { serve } from "./deps.js";
import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";
const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);
  const path = url.pathname;
  //main page
  if (path === "/"){
    return await listController.number();
  }
  //lists page functionality
  if (path.endsWith("/lists") && request.method === "GET"){
    return await listController.listAll();

  } else if (path.endsWith("/lists") && request.method === "POST"){
    return await listController.listAdd(request);

  } else if (path.startsWith("/lists/") && path.endsWith("/deactivate") && request.method === "POST") {
    const listId = path.split("/")[2];
    return await listController.listRemove(listId);

  } else if (path.startsWith("/lists/")  && !path.endsWith("/collect") && request.method === "GET"){
    const listId = path.split("/")[2];
    return await listController.listSpec(listId);
 
  } else if (path.startsWith("/lists/")  && !path.endsWith("/collect") && request.method === "POST"){
    const listId = path.split("/")[2];
    return await itemController.addItem(request,listId);
  
  } else if (path.endsWith("/collect") && request.method === "POST"){
    const split = path.split("/");
    const listId = split[2];
    const itemId = split[4];
    return await itemController.collectedItem(itemId,listId);
  }
};

serve(handleRequest, {port: 7777});