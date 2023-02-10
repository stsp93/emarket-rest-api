# EMARKET REST API

A REST API for consumer-to-consumer sales using Express.js.


## Development Status

The REST API is currently in beta.

---

## Getting Started

To get started with the REST API, follow these steps:

1. Clone the repository: `git clone https://github.com/stsp93/emarket-rest-api.git`
2. Install the dependencies: `npm install`
3. Start the API: `npm start`

The REST API requires a MongoDB database to be running.
The API will be available at `http://localhost:3030`. You can test the endpoints using tools such as `curl` or a REST client.

## Endpoints

### /users

> POST : /users/register 
- Creates a user (email, username, hashedPassword)
> POST : /users/login
- User login, retrieves JWT(username, email, _id)
> POST : /users/logout
- User logout, blacklisting JWT

### /items

> GET : /items/categories
- Retrieves an object of available categories and relevant image Urls.

```
Example 
{ Clothing: clothingImageUrl, Vehicles: vehiclesImageUrl}
```

> GET : /items/:id
- Retrieve a specific item by its ID.

> POST : /items
- Creates item (for logged in Users)

> PUT : /items/:id
- Updates item (for logged in Users)

> PUT : /items/:id
- Delete item (for logged in Users)

#### Query parameters for /items

- `cat` : Category query.
- `q` : Item title query with case-insensitive Regexp.



