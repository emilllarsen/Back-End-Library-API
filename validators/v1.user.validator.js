import { param, body } from "express-validator";
import { checkUserExist } from "../services/v1.users.services.js";
export function validateUid(){
    return [
        param("uid")
            .isInt({ min: 0, max: Number.MAX_SAFE_INTEGER})
            .withMessage("User IDs is supposed to be integers larger than 0!")
            .toInt() // all follow up functions will receive uid as a integer
            .custom(checkUserExist)
    ];
}

export default {
    validateUid
}