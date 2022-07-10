# Task1
A simple social media application.

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm run start` to start the local server
- Install Postman to play it

# API Guide

### Register a user

`POST /users`

Use `Post` method on postman with `Body` option `x-www-form-urlencoded`

`userid: userid` & `password: password`

```js
http://localhost:4000/users
```

### Login a user

`POST /users/login`

Use `Post` method on postman with `Body` option `x-www-form-urlencoded`

`userid: userid` & `password: password`

```js
http://localhost:4000/users/login
```

### Create Tweet

`POST /tweets`

Use `Post` method on postman with `Body` option `x-www-form-urlencoded`

Can only work after login

`content: YourContentHere`

```js
http://localhost:4000/tweets
```

### Read Tweets

`GET /tweets`

Use `GET` method on postman

```js
http://localhost:4000/tweets
```

### Read Tweet with ID

`GET /tweets/:tweetid`

Use `GET` method on postman

Can only work after login

```js
http://localhost:4000/tweets/tweetidHere
```

### Update Tweet

`PUT /tweets/:tweetid`

Use `PUT` method on postman with `Body` option `x-www-form-urlencoded`

Can only work after login

`content: YourContentHere`

```js
http://localhost:4000/tweets/tweetidHere
```

### DELETE Tweet

`DELETE /tweets/:tweetid`

Use `Delete` method on postman with `Body` option `x-www-form-urlencoded`

Can only work after login

```js
http://localhost:4000/tweets/tweetidHere
```

### Like & Unlike Tweet

`POST /tweets/:tweetid/like`

Use `POST` method on postman with `Body` option `x-www-form-urlencoded`

Can only work after login

```js
http://localhost:4000/tweets/tweetidHere/like
```

### Retweet

`POST /tweets/:tweetid/retweet`

Use `POST` method on postman with `Body` option `x-www-form-urlencoded`

Can only work after login

`content: YourContentHere`

```js
http://localhost:4000/tweets/tweetidHere/like
```

### Threading

`POST /tweets/:tweetid/thread`

Use `POST` method on postman with `Body` option `x-www-form-urlencoded`

Can only work after login

`content: YourContentHere`

```js
http://localhost:4000/tweets/tweetidHere/thread
```

