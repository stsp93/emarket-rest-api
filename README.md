# EMARKET REST API

A REST API for consumer-to-consumer and business-to-consumer sales using Express.js.


## Development Status

The REST API is currently in beta.

---

## Endpoints

### /users

> POST : /users/register 
- Creates a user (email, username, hashedPassword)
> POST : /users/login
- User login, returning JWT(username, email, _id)
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



