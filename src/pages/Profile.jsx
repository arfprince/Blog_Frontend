import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RanderUserCreatedBlogs from "../components/userElements/profile/randerUserCreatedBlogs";
import { useSelector } from "react-redux";

function Profile() {
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [idForDeleteBlog, setIdForDeleteBlog] = useState("");
  const [editedBlog, setEditedBlog] = useState({});
  const [saveEditedBlog, setSaveEditedBlog] = useState(false);
  const [userBlogs, setUserBlogs] = useState([]);
  const navigate = useNavigate();

  const currentSessionUser = useSelector(
    (state) => state.auth.currentSessionUser
  );

  const handleCreateNewBlog = () => {
    navigate("/newBlog");
  };
  useEffect(() => {
    if (saveEditedBlog) {
      console.log(editedBlog);
      const updateBlog = async () => {
        try {
          const response = await fetch(
            "http://54.80.179.248:3333/blog/update_blog",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: editedBlog.id,
                title: editedBlog.title,
                content: editedBlog.content,
                imageUrl: editedBlog.imageUrl,
              }),
              credentials: "include",
            }
          );

          const data = await response.json();
          if (response.ok) {
            const updatedUserBlogs = userBlogs.map((blog) =>
              blog.id === editedBlog.id ? editedBlog : blog
            );
            setUserBlogs(updatedUserBlogs);
          } else {
            throw new Error(data.error);
          }
        } catch (error) {}
      };
      updateBlog();
      setSaveEditedBlog(false);
      setEditedBlog({});
    }
  }, [saveEditedBlog]);

  useEffect(() => {
    if (deleteButtonClicked) {
      const deleteBlog = async () => {
        try {
          const response = await fetch(
            "http://54.80.179.248:3333/blog/delete_blog",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: idForDeleteBlog }),
              credentials: "include",
            }
          );

          const data = await response.json();

          if (response.ok) {
            alert(data.message);
            const updatedUserBlogs = userBlogs.filter(
              (blog) => blog.id !== idForDeleteBlog
            );
            setUserBlogs(updatedUserBlogs);
          } else {
            throw new Error(data.error);
          }
        } catch (error) {
          alert(error.message);
        }
      };
      deleteBlog();
      setDeleteButtonClicked(false);
      setIdForDeleteBlog("");
    }
  }, [idForDeleteBlog, deleteButtonClicked]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "http://54.80.179.248:3333/blog/get_blog_by_user_id",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: currentSessionUser.id }),
            credentials: "include",
          }
        );

        const data = await response.json();
        if (response.ok) {
          setUserBlogs(data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

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
        {userBlogs &&
          userBlogs.map((blog, index) => (
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
