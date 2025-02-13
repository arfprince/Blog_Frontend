import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setBlogs } from "../../../redux/rootSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CreateNewBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.rootSlice.blogs);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [readTime, setReadTime] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    title: "",
    content: "",
    image: "",
    readTime: "",
    status: "",
  });
  const user = useSelector((state) => state.auth.currentSessionUser);
  
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
      case "content":
        if (!value.trim()) {
          error = "Content is required";
        } else if (value.length < 10) {
          error = "Content must be at least 10 characters long";
        } else if (value.length > 5000) {
          error = "Content must be less than 5000 characters";
        }
        break;
      case "image":
        if (!value.trim()) {
          error = "Image URL is required";
        } else if (!value.match(/^(http|https):\/\/[^ "]+$/)) {
          error = "Please enter a valid image URL";
        }
        break;
      case "readTime":
        if (!value.trim()) {
          error = "Read time is required";
        } else if (isNaN(value) || value <= 0) {
          error = "Read time must be a positive number";
        } else if (value > 120) {
          error = "Read time must be less than 120 minutes";
        }
        break;
      case "status":
        if (!value) {
          error = "Please select a status";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter(value);
    const error = validateField(name, value);
    setValidationErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      title: validateField("title", title),
      content: validateField("content", content),
      image: validateField("image", image),
      readTime: validateField("readTime", readTime),
      status: validateField("status", status),
    };

    setValidationErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    // const currentSessionUser = JSON.parse(
    //   localStorage.getItem("currentSessionUser")
    // );
    
    // const updatedBlogs = {...blogs };
    // let currentSessionUserBlogs = updatedBlogs[currentSessionUser] || [];
    // currentSessionUserBlogs = [...currentSessionUserBlogs, newBlog];
    // updatedBlogs[currentSessionUser] = currentSessionUserBlogs;
    // dispatch(setBlogs(updatedBlogs));
    let payload = {
      title,
      author: user.username,
      content,
      time: new Date().toISOString(),
      image,
      likeCount: 0,
      readTime,
      status,
      id: user.id,
    };
    console.log("from frontend->>" , payload);
    
    try {
      const response = await fetch("http://localhost:3333/blog/create_blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        // dispatch(login(data.user));
        alert(data.message);
        navigate("/profile");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error.message);
    }

    setTitle("");
    setContent("");
    setImage("");
    setStatus("");
    setReadTime("");
    setValidationErrors({
      title: "",
      content: "",
      image: "",
      readTime: "",
      status: "",
    });
    navigate("/profile");
  };

  return (
    <>
      <Link
        to="/profile"
        className="inline-block mb-4 px-6 py-3 text-xl sm:text-base md:text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:from-sky-600 hover:to-blue-600"
      >
        Back to Profile
      </Link>

      <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Create a Blog Post
        </h2>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <input
              onChange={(e) => handleInputChange(e, setTitle)}
              type="text"
              name="title"
              placeholder="Title"
              className={`w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                validationErrors.title ? "border-red-500" : "border-gray-300"
              }`}
              value={title}
            />
            {validationErrors.title && (
              <p className="text-red-500 text-sm mt-2">
                {validationErrors.title}
              </p>
            )}
          </div>

          <div className="mb-6">
            <textarea
              onChange={(e) => handleInputChange(e, setContent)}
              name="content"
              placeholder="Content"
              className={`w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition h-32 resize-none ${
                validationErrors.content ? "border-red-500" : "border-gray-300"
              }`}
              value={content}
            ></textarea>
            {validationErrors.content && (
              <p className="text-red-500 text-sm mt-2">
                {validationErrors.content}
              </p>
            )}
          </div>

          <div className="mb-6">
            <input
              onChange={(e) => handleInputChange(e, setImage)}
              type="text"
              name="image"
              placeholder="Image URL"
              className={`w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                validationErrors.image ? "border-red-500" : "border-gray-300"
              }`}
              value={image}
            />
            {validationErrors.image && (
              <p className="text-red-500 text-sm mt-2">
                {validationErrors.image}
              </p>
            )}
          </div>

          <div className="mb-6">
            <input
              onChange={(e) => handleInputChange(e, setReadTime)}
              type="text"
              name="readTime"
              placeholder="Read time..."
              className={`w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                validationErrors.readTime ? "border-red-500" : "border-gray-300"
              }`}
              value={readTime}
            />
            {validationErrors.readTime && (
              <p className="text-red-500 text-sm mt-2">
                {validationErrors.readTime}
              </p>
            )}
          </div>

          <div className="mb-6">
            <select
              onChange={(e) => handleInputChange(e, setStatus)}
              name="status"
              className={`w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                validationErrors.status ? "border-red-500" : "border-gray-300"
              }`}
              value={status}
            >
              <option value="">Select a Category</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            {validationErrors.status && (
              <p className="text-red-500 text-sm mt-2">
                {validationErrors.status}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:from-blue-600 hover:to-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
