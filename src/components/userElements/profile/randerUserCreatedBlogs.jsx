import React, { useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsersFavouriteBlogs, setAllUsersLikedBlogs, setBlogs } from "../../../redux/rootSlice";

export default function RanderUserCreatedBlogs({
  blog,
  index,
  setDeleteButtonClicked,
  setIdForDeleteBlog,
  editedBlog,
  setEditedBlog,
  setSaveEditedBlog,
}) {
  const [showMore, setShowMore] = useState(false);
  const [status, setStatus] = useState(blog.status);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    title: "",
    image: "",
    content: ""
  });
  const dispatch = useDispatch();
  const allBlogs = JSON.parse(JSON.stringify(useSelector((state)=> state.rootSlice.blogs)));
  let updatedAllUsersFavouriteBlogs = { ...useSelector((state)=>state.rootSlice.allUsersFavouriteBlogs)};
  let updatedAllUsersLikedBlogs = { ...useSelector((state)=>state.rootSlice.allUsersLikedBlogs) };
  let currentSessionUser = useSelector((state)=>state.auth.currentSessionUser);
  const toggleStatus = () => {
    const newStatus = status === "public" ? "private" : "public";
    setStatus(newStatus);
    
    if (allBlogs[currentSessionUser]) {
      allBlogs[currentSessionUser] = allBlogs[currentSessionUser].map((b) =>
        b.id === blog.id ? { ...b, status: newStatus } : b
      );
      dispatch(setBlogs(allBlogs));
    }
    
    for (let user in updatedAllUsersFavouriteBlogs) {
      let perUserBlogs = updatedAllUsersFavouriteBlogs[user];
      perUserBlogs = perUserBlogs.filter((b) => b.id !== blog.id);
      updatedAllUsersFavouriteBlogs[user] = perUserBlogs;
    }
    dispatch(setAllUsersFavouriteBlogs(updatedAllUsersFavouriteBlogs));

    // Update users' liked blogs
    for (let user in updatedAllUsersLikedBlogs) {
      let perUserBlogs = updatedAllUsersLikedBlogs[user];
      perUserBlogs = perUserBlogs.filter((b) => b.id !== blog.id);
      updatedAllUsersLikedBlogs[user] = perUserBlogs;
    }
    dispatch(setAllUsersLikedBlogs(updatedAllUsersLikedBlogs));
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "title":
        if (!value.trim()) {
          error = "Title is required";
        } else if (value.length < 3) {
          error = "Title must be at least 3 characters long";
        } else if (value.length > 100) {
          error = "Title must be less than 100 characters";
        }
        break;
      case "image":
        if (value.trim() && !value.match(/^(http|https):\/\/[^ "]+$/)) {
          error = "Please enter a valid image URL";
        }
        break;
      case "content":
        if (!value.trim()) {
          error = "Content is required";
        } else if (value.length < 10) {
          error = "Content must be at least 10 characters long";
        } else if (value.length > 5000) {
          error = "Content must be less than 5000 characters";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog({ ...editedBlog, [name]: value });
    const error = validateField(name, value);
    setValidationErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSave = () => {
    const newErrors = {
      title: validateField("title", editedBlog.title),
      image: validateField("image", editedBlog.image),
      content: validateField("content", editedBlog.content)
    };

    setValidationErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== "")) {
      return;
    }

    setSaveEditedBlog(true);
    setIsEditModalOpen(false);
  };

  return (
    <>
      {/* Blog Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]">
        {/* Blog Image */}
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-52 object-cover rounded-lg mb-4"
          />
        )}

        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-900">{blog.title}</h3>

        {/* Author & Status */}
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>
            By <span className="font-medium text-gray-700">{blog.author}</span>
          </span>
          <button
            onClick={toggleStatus}
            className={`px-3 py-1 rounded-md text-sm font-medium capitalize transition duration-300 ${
              status === "public"
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            {status}
          </button>
        </div>

        {/* Content Preview */}
        <p className="text-gray-700 mt-4 leading-relaxed">
          {showMore ? blog.content : `${blog.content.substring(0, 100)}...`}
        </p>
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-blue-600 font-medium mt-2 hover:underline"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>

        {/* Time & Read Time */}
        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <span>{new Date(blog.time).toLocaleString()}</span>
          <span>
            <ReactTimeAgo date={new Date(blog.time)} locale="en-US" />
          </span>
          <span>⏳ {blog.readTime} mins read</span>
        </div>

        {/* Buttons (Likes, Edit, Delete) */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-gray-700 flex items-center space-x-2">
            <span className="font-medium">❤️ {blog.likeCount}</span>
          </span>

          <div className="flex space-x-3">
            {/* Edit Button */}
            <button
              onClick={() => {
                setIsEditModalOpen(true);
                setEditedBlog(blog);
                setValidationErrors({ title: "", image: "", content: "" });
              }}
              className="bg-blue-500 text-white text-sm px-5 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
            >
              Edit
            </button>

            {/* Delete Button */}
            <button
              onClick={() => {
                setDeleteButtonClicked(true);
                setIdForDeleteBlog(blog.id);
              }}
              className="bg-red-500 text-white text-sm px-5 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Edit Blog Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[450px]">
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Edit Blog
            </h2>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={editedBlog.title}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md mt-1 focus:ring focus:ring-blue-200 ${
                  validationErrors.title ? 'border-red-500' : ''
                }`}
              />
              {validationErrors.title && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
              )}
            </div>

            {/* Image URL */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={editedBlog.image}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md mt-1 focus:ring focus:ring-blue-200 ${
                  validationErrors.image ? 'border-red-500' : ''
                }`}
              />
              {validationErrors.image && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.image}</p>
              )}
            </div>

            {/* Content */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                name="content"
                value={editedBlog.content}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md mt-1 h-28 focus:ring focus:ring-blue-200 ${
                  validationErrors.content ? 'border-red-500' : ''
                }`}
              />
              {validationErrors.content && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.content}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-5">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}