import ReactTimeAgo from "react-time-ago";
import { Link, useNavigate } from "react-router-dom";
import {
  setSingleDetailedBlog,
} from "../redux/rootSlice";
import { useDispatch } from "react-redux";
import DetailedBlog from "./DetailedBlog";

function DisplayBlogsOnHome({ blog }) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md mt-6 hover:bg-gray-200 transition duration-300">
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
        />
      )}

      <h3 className="text-2xl font-semibold text-gray-800">{blog.title}</h3>

      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>
          By <span className="font-medium text-gray-700">{blog.username}</span>
        </span>
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            blog.status === "public"
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          }`}
        >
          {blog.status}
        </span>
      </div>

      <p className="text-gray-600 mt-3">{blog.content.substring(0, 100)}...</p>
      
      <Link
        to={`/${blog.id}`} // Dynamically use the blog.id for the URL
        className="text-blue-500 mt-2 font-medium hover:underline"
        onClick={() => dispatch(setSingleDetailedBlog(blog))}
      >
        Show Details
      </Link>

        
      <div className="flex justify-between text-sm text-gray-500 mt-4">
        <span>{new Date(blog.createdAt).toLocaleString()}</span>
        <span>
          <ReactTimeAgo date={new Date(blog.createdAt)} locale="en-US" />
        </span>
        <span>⏳ {blog.readTime} mins read</span>
      </div>

    </div>
  );
}

export default DisplayBlogsOnHome;
