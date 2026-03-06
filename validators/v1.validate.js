import { validationResult, matchedData } from "express-validator";
// Here we will have "shared" pieces of middleware related to data validation
// e.g, the one for react to the data being invalid


export function validate(req, res, next){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        // Sending some sort of message to the user to tell their they data are invalid
        return res.status(400).json({errors: errors.array()});
    }
    req.validDate = matchedData(req);
    next();
}