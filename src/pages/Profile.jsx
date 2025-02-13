import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RanderUserCreatedBlogs from "../components/userElements/profile/randerUserCreatedBlogs";
import { setAllUsersFavouriteBlogs, setAllUsersLikedBlogs, setBlogs } from "../redux/rootSlice";
import { useDispatch, useSelector } from "react-redux";

function Profile() {

  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [idForDeleteBlog, setIdForDeleteBlog] = useState("");
  const [editedBlog, setEditedBlog] = useState({});
  const [saveEditedBlog, setSaveEditedBlog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentSessionUser = JSON.parse(
    localStorage.getItem("currentSessionUser")
  );
  const handleCreateNewBlog = () => {
    navigate("/newBlog");
  };
  let updatedBlogs = JSON.parse(JSON.stringify(useSelector((state)=> state.rootSlice.blogs)));
  let updatedAllUsersFavouriteBlogs = { ...useSelector((state)=>state.rootSlice.allUsersFavouriteBlogs)};
  let updatedAllUsersLikedBlogs = { ...useSelector((state)=>state.rootSlice.allUsersLikedBlogs) };
  useEffect(() => {
    if (saveEditedBlog) {
      
      let currentUsersAllBlogs = updatedBlogs[currentSessionUser].map((blog) =>
        blog.id === editedBlog.id ? editedBlog : blog
      );
      updatedBlogs[currentSessionUser] = currentUsersAllBlogs;
      dispatch(setBlogs(updatedBlogs));

      for (let user in updatedAllUsersFavouriteBlogs) {
        updatedAllUsersFavouriteBlogs[user] = updatedAllUsersFavouriteBlogs[
          user
        ].map((blog) => (blog.id === editedBlog.id ? editedBlog : blog));
      }
      dispatch(setAllUsersFavouriteBlogs(updatedAllUsersFavouriteBlogs));

      for (let user in updatedAllUsersLikedBlogs) {
        updatedAllUsersLikedBlogs[user] = updatedAllUsersLikedBlogs[user].map(
          (blog) => (blog.id === editedBlog.id ? editedBlog : blog)
        );
      }
      dispatch(setAllUsersLikedBlogs(updatedAllUsersLikedBlogs));

      setSaveEditedBlog(false);
      setEditedBlog({});
    }
  }, [saveEditedBlog]);

  useEffect(() => {
    if (deleteButtonClicked) {
      let updatedCurrentSessionUserBlogs = updatedBlogs[
        currentSessionUser
      ].filter((blog) => blog.id !== idForDeleteBlog);
      updatedBlogs[currentSessionUser] = updatedCurrentSessionUserBlogs;
      dispatch(setBlogs(updatedBlogs));

      for (let user in updatedAllUsersFavouriteBlogs) {
        updatedAllUsersFavouriteBlogs[user] = updatedAllUsersFavouriteBlogs[
          user
        ].filter((blog) => blog.id !== idForDeleteBlog);
      }
      dispatch(setAllUsersFavouriteBlogs(updatedAllUsersFavouriteBlogs));

      let updatedAllUsersLikedBlogs = { ...useSelector((state)=> state.rootSlice.allUsersLikedBlogs) };
      for (let user in updatedAllUsersLikedBlogs) {
        updatedAllUsersLikedBlogs[user] = updatedAllUsersLikedBlogs[
          user
        ].filter((blog) => blog.id !== idForDeleteBlog);
      }
      dispatch(setAllUsersLikedBlogs(updatedAllUsersLikedBlogs));

      setDeleteButtonClicked(false);
      setIdForDeleteBlog("");
    }
  }, [idForDeleteBlog, deleteButtonClicked]);
  const blogs = useSelector((state)=> state.rootSlice.blogs);
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-7xl mx-auto">
      <button
        onClick={handleCreateNewBlog}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Create New Blog
      </button>

      <h1 className="text-3xl font-bold text-center mt-6 text-gray-800">
        My Blogs
      </h1>

      {/* Blog Grid Layout */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {blogs[currentSessionUser] &&
          blogs[currentSessionUser].map((blog, index) => (
            <RanderUserCreatedBlogs
              key={index}
              blog={blog}
              index={index}
              setDeleteButtonClicked={setDeleteButtonClicked}
              setIdForDeleteBlog={setIdForDeleteBlog}
              editedBlog={editedBlog}
              setEditedBlog={setEditedBlog}
              setSaveEditedBlog={setSaveEditedBlog}
            />
          ))}
      </div>
    </div>
  );
}

export default Profile;
