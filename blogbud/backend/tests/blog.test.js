
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Blog = require("../models/blogModel");
const blog = [
  {
    "title" : "Test title",
    "body" : "test body",
    "description" : "test description",
    "author" : "test author",
  },
  {
    "title" : "Test title 2",
    "body" : "test body 2",
    "description" : "test description 2",
    "author" : "test author 2",
  }
];

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/users/signup")
    .send({ username : 'testman', email: "test@email.fi", password: "Testpassword1!" });
  token = result.body.token;
});

describe("Given there are initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + token)
      .send(blog[0])
      .send(blog[1]);
  });

  it("should return all payments as JSON when GET /api/payment is called", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should create one payment when POST /api/payment is called", async () => {
    const newBlog = {
        title : "Test title 3",
        body : "test body 3",
        description : "test description 3",
        author : "test author 3",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + token)
      .send(newBlog)
      .expect(201);
  });
  
  it("should return one payment by ID when GET /api/payment/:id is called", async () =>  {
    const blog = await Blog.findOne();
    await api
      .get("/api/blogs/" + blog._id)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should update one payment by ID when PUT /api/payment/:id is called", async () => {
    const blog = await Blog.findOne();
    const updatedBlog = {
        title : "Test title 4",
        body : "test body 4",
        description : "test description 4",
        author : "test author 4",
    };
    await api
      .put("/api/blogs/" + blog._id)
      .set("Authorization", "bearer " + token)
      .send(updatedBlog)
      .expect(200);
    const updatedBlogCheck = await Blog.findById(blog._id);
    expect(updatedBlogCheck.toJSON()).toEqual(expect.objectContaining(updatedBlog));
  });

  it("should delete one payment by ID when DELETE /api/payment/:id is called", async () => {
    const blog = await Blog.findOne();
    await api
      .delete("/api/blogs/" + blog._id)
      .set("Authorization", "bearer " + token)
      .expect(200);
    const blogCheck = await Blog.findById(blog._id);
    expect(blogCheck).toBeNull();
  });
 
});

afterAll(() => {
  mongoose.connection.close();
});