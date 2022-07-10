const request = require("supertest");
const app = require("../../app");
import mongoose from "mongoose";
var session = require('supertest-session');
 
var testSession = null;
 
beforeEach(function () {
  testSession = session(app);
});

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

  test("Test user register", () => {
    return request(app)
      .post("/users")
      .send({
          username: 'kelvinchan'+ random,
          password: 'qwe123asd',
        })
      .expect(201);
  });

});

describe('after login', function () {
 
  var authenticatedSession;
  let tweetId;
 
  beforeEach(function (done) {
    testSession.post('/users/login')
      .send({ username: 'kelvinchan' + random,
        password: 'qwe123asd'
      })
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        authenticatedSession = testSession;
        return done();
      });
  });
 
  it('create tweet', function (done) {
    authenticatedSession.post("/tweets")
      .send({
          content: "this is content"
        })
      .expect((res) => {
        tweetId = res._body._id
      })
      .expect(201)
      .end(done)
  });

  it('read tweet', function (done) {
    authenticatedSession.get("/tweets/" + tweetId)
      .expect(200)
      .end(done)
  });

  it('update fake tweet', function (done) {
    authenticatedSession.put("/tweets/sljahfiudabfsaef")
      .send({
          content: "this is content2"
        })
      .expect(400)

      .end(done)
  });

  it('update tweet', function (done) {
    authenticatedSession.put("/tweets/" + tweetId)
      .send({
          content: "this is content2"
        })
      .expect((res) => {
        return res.body.content === "this is content2"
      })
      .expect(200)

      .end(done)
  });

  it('delete tweet', function (done) {
    authenticatedSession.delete("/tweets/" + tweetId)
      .expect(200)
      .end(done)
  });

});

afterAll((done) => {
    mongoose.disconnect(done);
});