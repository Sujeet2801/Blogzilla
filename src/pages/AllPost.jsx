import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        appwriteService
        .getPosts([])
        .then((response) => {
            if (response && response.documents) {
            setPosts(response.documents);
            } else {
            setPosts([]);
            }
        })
        .catch((err) => {
            console.error('Error fetching posts:', err);
            setError('Something went wrong while fetching posts.');
        })
        .finally(() => setLoading(false));
    }, []);

    return (
        <div className="w-full py-16 min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#e5ecfb] 
        to-[#fdfcff]">
            <Container>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-indigo-700 mb-2">All Posts</h1>
                <p className="text-gray-600 text-lg">
                Browse through all community stories, tutorials, and dev logs.
                </p>
            </div>

            {loading ? (
                <p className="text-center text-gray-500 animate-pulse">Loading posts...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : posts.length === 0 ? (
                <p className="text-center text-gray-600">No posts available right now. Check back later.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {posts.map((post) => (
                    <div
                    key={post.$id}
                    className="bg-white/60 backdrop-blur shadow-md rounded-xl p-4 transition hover:shadow-xl"
                    >
                    <PostCard {...post} />
                    </div>
                ))}
                </div>
            )}
            </Container>
        </div>
    );
}

export default AllPosts;
