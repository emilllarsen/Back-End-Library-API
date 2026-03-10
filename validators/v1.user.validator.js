import { param, body } from "express-validator";
import { checkUserExist } from "../services/v1.users.services.js";
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

export default {
  validateUid,
  validateLoanId
};
