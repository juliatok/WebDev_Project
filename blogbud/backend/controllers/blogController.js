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

// get blogs by a tag
const getBlogByTag = async (req, res) => {
  try {
    // Assuming the tag is passed as a URL parameter named 'tag'
    
    const blog = await Blog.findone({ tag: req.params.tag }); // Find the first blog with the specified tag
    
    if (!blog) {
      return res.status(404).json({ error: "Blog with the specified tag not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// create a new blog
const createBlog = async (req, res) => {
  try {
    const { title, body, author, description, tag } = req.body;
    if (!title || !body || !author || !description || !tag) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newBlog = new Blog({ title, body, author, description, tag });
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
  getBlogByTag,
  createBlog,
  deleteBlog,
  putBlog,
  patchBlog,
};
