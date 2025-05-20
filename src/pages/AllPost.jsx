import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        appwriteService.getPosts([])
            .then((response) => {
                if (response && response.documents) {
                    setPosts(response.documents);
                } else {
                    setPosts([]);
                }
            })
            .catch((err) => {
                console.error("Error fetching posts:", err);
                setError("Something went wrong while fetching posts.");
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                {loading ? (
                    <p className="text-center w-full">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500 w-full">{error}</p>
                ) : posts.length === 0 ? (
                    <p className="text-center w-full">No posts available.</p>
                ) : (
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
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
