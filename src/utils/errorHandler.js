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



