module.exports = (error) => {
    // Handling duplicates
    if (error.code === 11000) {
        const path = Object.keys(error.keyPattern)[0]
        return { errors: { [path]: path + ' already exist' } }

        // Handling validation errors 
    } else if(error.errors) {
        const output = { errors: {} };
        Object.entries(error.errors).forEach(([k, v]) => output.errors[k] = v.message);
        return output
    }
    return {errors: error.message}
}

/*{
    "index": 0,
    "code": 11000,
    "keyPattern": {
        "username": 1
    },
    "keyValue": {
        "username": "john"
    }
}
{
    "errors": {
        "email": {
            "name": "ValidatorError",
            "message": "Please add a valid email address.",
            "properties": {
                "message": "Please add a valid email address.",
                "type": "regexp",
                "regexp": {},
                "path": "email",
                "value": "john"
            },
            "kind": "regexp",
            "path": "email",
            "value": "john"
        }
    },
    "_message": "User validation failed",
    "name": "ValidationError",
    "message": "User validation failed: email: Please add a valid email address."
}
*/

