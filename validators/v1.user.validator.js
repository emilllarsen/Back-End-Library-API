import { param, body } from "express-validator";
import { checkUserExist, checkUsernameExist } from "../services/v1.users.services.js";
export function validateUid() {
  return [
    param("uid")
      .isInt({ min: 0, max: Number.MAX_SAFE_INTEGER })
      .withMessage("User IDs is supposed to be integers larger than 0!")
      .bail() // If the checks before this in the validation chain fail, we quit! (aka do not run the check below)
      .toInt() // all follow up functions will receive uid as a integer
      .custom(checkUserExist),
  ];
}

export function validateLoanId() {
  return [
    param(":loanid")
      .isInt({ min: 0, max: Number.MAX_SAFE_INTEGER })
      .withMessage("Loan IDs is supposed to be integers larger than 0!")
      .toInt()
  ];
}


/**
 * An idea for the incoming user obj shape
 * {
 *  username: string,
 *  pwd: string,
 *  email: email,
 *  ifStudent: boolean,
 *  age: number
 * }
 *  @returns an array of validators to be used as middleware in express
 */
export function validateUser(){
    return [
        body("username")
            .trim()
            .escape() // replaces all XSS related characters 
            .isAlphanumeric().withMessage("Only alpha numeric characters is allowed in a username!")
            .isLength({ min: 2 }).withMessage("Username has to be longer than 2 characters")
            .bail()
            .custom(username => !checkUsernameExist(username))
            .withMessage("Something!"),
        body("pwd")
            .trim()
            .isStrongPassword({ min: 8, minLowercase: 1, minUppercase: 2, minNumber: 2 })
            .withMessage("Password should be 9 + characters and contain 2 of each lower and upper case characters, numbers and symbols!")



    ];
}

export default {
  validateUid,
  validateLoanId,
  validateUser
};
