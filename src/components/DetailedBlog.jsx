import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { setSingleDetailedBlog } from "../redux/rootSlice";

function DetailedBlog() {
  const dispatch = useDispatch();
  const singleDetailedBlog = useSelector(
    (state) => state.rootSlice.singleDetailedBlog
  );

  const [isFavourite, setIsFavourite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "http://54.80.179.248:3333/blog/get_blog_by_blog_id",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: singleDetailedBlog.id }),
            credentials: "include",
          }
        );

        const data = await response.json();
        if (response.ok) {
          setSingleDetailedBlog(data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);
  console.log(singleDetailedBlog);

  const {
    id,
    title,
    content,
    readTime,
    imageUrl,
    status,
    likeCount,
    username,
    createdAt,
  } = singleDetailedBlog;
  const [currentLikes, setCurrentLikes] = useState(likeCount);
  const currentSessionUser = useSelector(
    (state) => state.auth.currentSessionUser
  );
  if (!singleDetailedBlog) {
    return (
      <div className="text-center text-lg text-gray-600">Blog not found</div>
    );
  }

  const toggleFavourite = async () => {
    if (!currentSessionUser.id) return;

    try {
      const endpoint = !isFavourite
        ? "http://54.80.179.248:3333/blog/add_to_favourite"
        : "http://54.80.179.248:3333/blog/remove_from_favourite";
      setIsFavourite(!isFavourite);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blog_id: id,
          user_id: currentSessionUser.id,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        if (isFavourite) {
          setIsFavourite(!isFavourite);
        } else {
          setIsFavourite(!isFavourite);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleLike = async () => {
    if (!currentSessionUser.id) return;

    try {
      const responseOne = await fetch(
        "http://54.80.179.248:3333/blog/update_like",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            blog_id: id,
            like_count: currentLikes,
          }),
          credentials: "include",
        }
      );

      if (responseOne.ok) {
        isLiked
          ? setCurrentLikes(currentLikes - 1)
          : setCurrentLikes(currentLikes + 1);
        const endpoint = !isLiked
          ? "http://54.80.179.248:3333/blog/add_to_like"
          : "http://54.80.179.248:3333/blog/remove_from_like";
        setIsLiked(!isLiked);

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            blog_id: id,
            user_id: currentSessionUser.id,
          }),
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          if (isLiked) {
            setIsLiked(!isLiked);
          } else {
            setIsLiked(!isLiked);
          }
        } else {
          throw new Error(response.error);
        }
      } else {
        throw new Error(responseOne.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getUserFavourites = async () => {
      if (!currentSessionUser.id) return;
      try {
        const response = await fetch(
          "http://54.80.179.248:3333/blog/get_user_favourite_blogs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ user_id: currentSessionUser.id }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          const isBlogFavorite = data.some((fav) => {
            if (fav.blogId === id) return true;
          });
          isBlogFavorite ? setIsFavourite(true) : setIsFavourite(false);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    getUserFavourites();

    const getUserLikes = async () => {
      if (!currentSessionUser.id) return;
      try {
        const response = await fetch(
          "http://54.80.179.248:3333/blog/get_user_liked_blogs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ user_id: currentSessionUser.id }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          const isBlogLiked = data.some((fav) => {
            if (fav.blogId === id) return true;
          });
          isBlogLiked ? setIsLiked(true) : setIsLiked(false);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    getUserLikes();
  }, [currentSessionUser]);

  console.log(isLiked, isFavourite);
  return (
    <div className="container mx-auto px-6 py-12">
      <Link
        to="/"
        className="inline-block mb-6 px-6 py-3 text-xl sm:text-base md:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
      >
        Back to Home
      </Link>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">{title}</h1>

        <div className="flex space-x-6 mb-6 text-sm text-gray-500">
          <span>{new Date(createdAt).toLocaleString()}</span>
          <span>
            <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
          </span>
          <span>⏳ {readTime} mins read</span>
        </div>

        <div className="flex space-x-6 text-sm text-gray-600 mb-6">
          <span className="font-medium text-gray-700">Status:</span>
          <span
            className={`text-${status === "public" ? "green" : "yellow"}-500`}
          >
            {status}
          </span>
          <span className="font-medium text-gray-700">Likes:</span>
          <span>{likeCount}</span>
          <span className="font-medium text-gray-700">Author:</span>
          <span>{username}</span>
        </div>

        <div className="relative mb-8">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-96 object-cover rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 px-6 py-3 bg-black bg-opacity-50 text-white text-xl font-semibold rounded-lg shadow-lg">
            Featured Image
          </div>
        </div>

        <p className="text-lg text-gray-700 mt-6 leading-relaxed">{content}</p>

        <div className="mt-4 flex justify-between items-center">
          {/* Like Button */}
          {currentSessionUser && (
            <button
              onClick={toggleLike}
              className={`px-5 py-2 rounded-lg transition flex items-center gap-1 ${
                isLiked
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 hover:bg-gray-400"
              } text-white`}
            >
              👍 {currentLikes}
            </button>
          )}

          {/* Favourite Button */}
          {currentSessionUser && (
            <button
              onClick={toggleFavourite}
              className={`px-5 py-2 rounded-lg transition ${
                isFavourite
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white`}
            >
              {isFavourite ? "Unfavourite" : "Favourite"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailedBlog;
