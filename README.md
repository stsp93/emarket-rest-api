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
- User login, returns JWT(username, email, _id)
> POST : /users/logout
- User logout, blacklisting JWT
> POST : /users/profile
- Returns array of all user listings
### /items

> GET : /items/categories
- Returns an object of available categories and relevant image Urls.

```
Example 
{ category1: category1ImageUrl, category2: category2ImageUrl}
```

> GET : /items/:id
- Returns a specific item by its ID in form of an Object.

> POST : /items
- Creates item (for logged in Users) and returns the created object

> PUT : /items/:id
- Updates item (for logged in Users) and returns the edited object

> PUT : /items/:id
- Delete item (for logged in Users) returns no content

#### Query parameters for /items

- `cat` : Category query.
- `q` : Item title query with case-insensitive Regexp.



