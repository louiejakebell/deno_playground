import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { getCat, getCats, addCat, updateCat, removeCat } from "./api.ts";

const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || "127.0.0.1";
const router = new Router();

router
  .get("/cats", getCats)
  .get("/cats/:name", getCat)
  .post("/cats", addCat)
  .put("/cats/:name", updateCat)
  .delete("/cats/:name", removeCat);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT}...`);

await app.listen(`${HOST}:${PORT}`);
