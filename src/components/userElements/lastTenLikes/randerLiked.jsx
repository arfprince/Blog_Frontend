import React, { useState } from "react";
import ReactTimeAgo from "react-time-ago";
function RanderLiked({ blog }) {

  
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6 hover:bg-gray-200 transition duration-300">
      {/* Blog Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
        />
      )}

      {/* Title */}
      <h3 className="text-2xl font-semibold text-gray-800">{blog.title}</h3>

      {/* Author and Status */}
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <span>
          By <span className="font-medium text-gray-700">{blog.author}</span>
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

      {/* Content Preview with "Show More" Toggle */}
      <p className="text-gray-700 mt-4 leading-relaxed">
        {showMore ? blog.content : `${blog.content.substring(0, 100)}...`}
      </p>
      <button
        onClick={() => setShowMore(!showMore)}
        className="text-blue-500 mt-2 font-medium hover:underline"
      >
        {showMore ? "Show Less" : "Show More"}
      </button>

      {/* Time and Read Time */}
      <div className="flex justify-between text-sm text-gray-500 mt-4">
        <span>{new Date(blog.time).toLocaleString()}</span>
        <span>
          <ReactTimeAgo date={new Date(blog.time)} locale="en-US" />
        </span>
        <span>⏳ {blog.readTime} mins read</span>
      </div>

      {/* Like Count & Delete Button */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-gray-700 font-medium">
          👍 {blog.likeCount} Likes
        </span>
        {/* <button
          onClick={() => {}}
          className="bg-red-500 text-white text-sm px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Delete
        </button> */}
      </div>
    </div>
  );
}

export default RanderLiked;
