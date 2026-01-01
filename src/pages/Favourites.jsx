import RanderFavourites from "../components/userElements/favourites/randerFavourites";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Favourites() {
  const dispatch = useDispatch();
  const [removeFavourite, setRemoveFavourite] = useState(false);
  const [deletedFavBlogId, setDeletedFavBlogId] = useState("");
  const [userFavBlogs, setUserFavBlogs] = useState([]);
  const currentSessionUser = useSelector(
    (state) => state.auth.currentSessionUser
  );

  useEffect(() => {
    const getUserFavourites = async () => {
      if (!currentSessionUser.id) return;
      try {
        const response = await fetch(
          "http://54.80.179.248:3333/blog/get_favourites",
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
          setUserFavBlogs(data);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    getUserFavourites();
  }, []);

  useEffect(() => {
    const removeFromFavourites = async () => {
      if (removeFavourite) {
        try {
          const response = await fetch(
            "http://54.80.179.248:3333/blog/remove_from_favourite",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                blog_id: deletedFavBlogId,
                user_id: currentSessionUser.id,
              }),
              credentials: "include",
            }
          );

          const data = await response.json();

          if (response.ok) {
            setRemoveFavourite(false);
            setDeletedFavBlogId("");
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    removeFromFavourites();
    const getUserFavourites = async () => {
      if (!currentSessionUser.id) return;
      try {
        const response = await fetch(
          "http://54.80.179.248:3333/blog/get_favourites",
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
          setUserFavBlogs(data);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    getUserFavourites();
  }, [removeFavourite, deletedFavBlogId]);

  return (
    <div className="w-2/3 mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        My Favourite Blogs
      </h2>

      {userFavBlogs?.length > 0 ? (
        userFavBlogs.map((blog, index) => (
          <RanderFavourites
            blog={blog}
            key={index}
            setRemoveFavourite={setRemoveFavourite}
            setDeletedFavBlogId={setDeletedFavBlogId}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center mt-4">
          No favourite blogs added yet.
        </p>
      )}
    </div>
  );
}
