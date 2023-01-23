const SALT_ROUNDS = 10;
const JWT_SECRET = 'N*!7y8N&1nyj!Ljw8!w uh1@'
const CATEGORIES = {'Vehicles': `https://images.unsplash.com/photo-1630165356623-266076eaceb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`,
    'Clothing':`https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`,
    'Electronics':`https://images.unsplash.com/photo-1627313433073-a98d074772e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`,
    'Hobbies':`https://images.unsplash.com/photo-1629055871644-7867e4b11f14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80`,
    'Housing':`https://images.unsplash.com/photo-1591170715502-fbc32adc4f52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdXNpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60`}

const NO_IMG_URL = `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`

module.exports = {
    SALT_ROUNDS,
    JWT_SECRET,
    CATEGORIES,
    NO_IMG_URL
}