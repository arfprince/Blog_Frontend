import { useState } from "react";
import DisplayBlogsOnHome from "../components/DisplayBlogsOnHome";
import { useSelector } from "react-redux";

export default function Home() {
  const  blogs = JSON.parse(JSON.stringify(useSelector((state)=> state.rootSlice.blogs)));
  
  const [searchTerm, setSearchTerm] = useState("");

  const allPublicBlogs = Object.values(blogs)
    .flat()
    .filter((blog) => blog.status === "public");

  return (
    <div className="text-center mt-10 px-4">
      {/* Header */}
      <h2 className="text-4xl font-extrabold text-gray-900">
        Welcome to{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
          My Blog
        </span>
      </h2>
      <p className="text-gray-600 mt-2 text-lg">
        Explore and share your thoughts with the world.
      </p>

      {/* Search Bar */}
      <div className="flex justify-end mt-6 max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          className="w-full md:w-1/2 px-6 py-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out duration-300 transform hover:scale-105"
        />
      </div>

      {searchTerm.length > 0 ? (
        <div className="p-8 bg-white rounded-xl shadow-xl max-w-7xl mx-auto mt-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            All Search Blogs
          </h1>

          {allPublicBlogs.length === 0 ? (
            <p className="text-lg text-gray-500 text-center">
              No blogs available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {allPublicBlogs
                .filter((blog) => blog.title.toLowerCase().includes(searchTerm))
                .map((blog, index) => (
                  <DisplayBlogsOnHome blog={blog} key={blog.id || index} />
                ))}
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 bg-white rounded-xl shadow-xl max-w-7xl mx-auto mt-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            All Users' Blogs
          </h1>

          {allPublicBlogs.length === 0 ? (
            <p className="text-lg text-gray-500 text-center">
              No blogs available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {allPublicBlogs.map((blog, index) => (
                <DisplayBlogsOnHome blog={blog} key={blog.id || index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
