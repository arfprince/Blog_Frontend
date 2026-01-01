import { useDispatch, useSelector } from "react-redux";
import RanderLiked from "../components/userElements/lastTenLikes/randerLiked";
import { useEffect, useState } from "react";
export default function LastTenLikes() {
  const dispatch = useDispatch();
  const [userLastTenLikedBlogs, setUserLastTenLikedBlogs] = useState([]);
  const currentSessionUser = useSelector(
    (state) => state.auth.currentSessionUser
  );
  useEffect(() => {
    const fetchLikeBlogs = async () => {
      try {
        const response = await fetch(
          "http://54.80.179.248:3333/blog/get_likes",
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
          if (userLastTenLikedBlogs > 10) {
            setUserLastTenLikedBlogs(userLastTenLikedBlogs.slice(-10));
          } else {
            setUserLastTenLikedBlogs(data);
          }
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchLikeBlogs();
  }, [currentSessionUser]);

  return (
    <div className="w-2/3 mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        My liked Blogs
      </h2>

      {userLastTenLikedBlogs?.length > 0 ? (
        userLastTenLikedBlogs.map((blog, index) => (
          <RanderLiked blog={blog} key={index} />
        ))
      ) : (
        <p className="text-gray-500 text-center mt-4">
          No liked blogs added yet.
        </p>
      )}
    </div>
  );
}
