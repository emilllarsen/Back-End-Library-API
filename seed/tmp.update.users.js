import users from "./users.json" with { type: "json" };
import { updateUsersWithUid } from "./seed.helper.js";
import fs from "node:fs/promises";


await fs.writeFile("./users.new.json", JSON.stringify(updateUsersWithUid(users)), "utf-8");

console.log("users updated")