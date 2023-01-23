module.exports = (error) => {
    // Handling duplicates
    if (error.code === 11000) {
        const path = Object.keys(error.keyPattern)[0]
        // return { errors: { [path]: path + ' already exist' } }
        return { errors:  `${path}` + ' already exist' }

        // Handling validation errors 
    } else if(error.errors) {
        const errorArr = Object.values(error.errors)
        const output = { errors: errorArr.join(', ') };
        return output
    }
    return {errors: error.message}
}



