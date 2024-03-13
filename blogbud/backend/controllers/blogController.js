const Blog = require("../models/blogModel");
const mongoose = require('mongoose');

// get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs)
;
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get a single blog
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get blogs by user id
const getBlogByUser = async (req, res) => {
  try {
    const { user_id } = req.params; // Get user id from request params
    if (!user_id) {
      return res.status(400).json({ error: "No user id specified" });
    }

    const blogs = await Blog.find({ user_id: user_id });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ error: "No blogs found for the specified user" });
    }

    res.json(blogs);
  } catch (error) {
    console.error("Error in getBlogByUser:", error.message);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};

// get blogs by a tag
const getBlogByTag = async (req, res) => {
  try {
    const { tag } = req.query; // Get tag from query parameters
    if (!tag) {
      return res.status(400).json({ error: "No tag specified" });
    }

    // Assuming your Blog schema has a field `tags` that's an array of strings
    const blogs = await Blog.find({ tags: tag });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ error: "No blogs found with the specified tag" });
    }

    res.json(blogs);
  } catch (error) {
    console.error("Error in getBlogByTag:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// create a new blog
const createBlog = async (req, res) => {
  try {
    const { title, body, author, description } = req.body;
    if (!title || !body || !author || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newBlog = new Blog({ title, body, author, description, user_id: req.user._id});
    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// delete a blog
const deleteBlog = async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Blog not found" });
    }
    const blog = await Blog.findByIdAndDelete({_id: id});

  if (!blog) {
      return res.status(400).json({ error: "Blog doesn't exist" });
    }
    res.json({ message: "Blog deleted successfully" });
};

// Update blog using PATCH
const patchBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      {
        new: true, // return updated document
      }
    );

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update blog using PUT
const putBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }// return updated document
    );

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getBlogs,
  getBlog,
  getBlogByUser,
  getBlogByTag,
  createBlog,
  deleteBlog,
  putBlog,
  patchBlog,
};
