import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'

function DetailedBlog() {
    const singleDetailedBlog  = useSelector((state)=> state.rootSlice.singleDetailedBlog);
    if (!singleDetailedBlog) {
        return <div className="text-center text-lg text-gray-600">Blog not found</div>;
    }

    const { title, content, readTime, image, status, likeCount, author, time } = singleDetailedBlog;

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
                    <span>{new Date(time).toLocaleString()}</span>
                    <span>
                        <ReactTimeAgo date={new Date(time)} locale="en-US" />
                    </span>
                    <span>⏳ {readTime} mins read</span>
                </div>

                <div className="flex space-x-6 text-sm text-gray-600 mb-6">
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className={`text-${status === "public" ? "green" : "yellow"}-500`}>{status}</span>
                    <span className="font-medium text-gray-700">Likes:</span>
                    <span>{likeCount}</span>
                    <span className="font-medium text-gray-700">Author:</span>
                    <span>{author}</span>
                </div>

                <div className="relative mb-8">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-96 object-cover rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4 px-6 py-3 bg-black bg-opacity-50 text-white text-xl font-semibold rounded-lg shadow-lg">
                        Featured Image
                    </div>
                </div>

                <p className="text-lg text-gray-700 mt-6 leading-relaxed">{content}</p>
            </div>
        </div>
    );
}

export default DetailedBlog;
