const request = require("supertest");
const app = require("../../app");
import mongoose from "mongoose";

let random = Math.random().toString().substr(2, 8);

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .expect(200);
  });
});

describe("Test the user path", () => {
  test("Test user register", () => {
    return request(app)
      .post("/users")
      .send({
          username: 'kelvinchan'+ random,
          password: 'qwe123asd',
        })
      .expect(201);
  });

  test("Test user register duplicated", () => {
    return request(app)
      .post("/users")
      .send({
          username: 'kelvinchan'+ random,
          password: 'qwe123asd',
        })
      .expect(400);
  });
  test("Test user login with incorrect password", () => {
    return request(app)
      .post("/users/login")
      .send({
          username: 'kelvinchan' + random,
          password: 'wrongpassword',
        })
      .expect(400);
  });
  
  test("Test user login", () => {
    return request(app)
      .post("/users/login")
      .send({
          username: 'kelvinchan' + random,
          password: 'qwe123asd',
        })
      .expect(200);
  });

});

afterAll((done) => {
    mongoose.disconnect(done);
});