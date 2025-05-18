// PostCard.jsx
import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="block h-full">
            <div className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg
            transition duration-300 h-full overflow-hidden">
                <div className="w-full h-56 overflow-hidden">
                    <img
                        src={appwriteService.getPreview(featuredImage)}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4 flex-grow flex items-center">
                    <h2 className="text-lg font-semibold text-gray-800 text-center">
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
