const request = require("supertest");
const app = require("../../app");
import mongoose from "mongoose";

let random = Math.random().toString().substr(2, 8);

describe("Test the tweet path", () => {
  test("Test get tweets", () => {
    return request(app)
      .get("/tweets")
      .expect(200);
  });

  test("Test create tweet without login", () => {
    return request(app)
      .post("/tweets")
      .send({
          content: 'create tweet'
        })
      .expect(401);
  });

  test("Test update tweet without login", () => {
    return request(app)
      .put("/tweets/shadfliugwiegiugw")
      .send({
          content: 'create tweet'
        })
      .expect(401);
  });

  test("Test delete tweet without login", () => {
    return request(app)
      .delete("/tweets/shadfliugwiegiugw")
      .send({
          content: 'create tweet'
        })
      .expect(401);
  });


});

afterAll((done) => {
    mongoose.disconnect(done);
});