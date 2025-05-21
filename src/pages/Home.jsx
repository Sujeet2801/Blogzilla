// Home.jsx
import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full min-h-[70vh] flex items-center justify-center py-10 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
                <Container>
                    <div className="flex flex-col items-center justify-center bg-white p-10 rounded-2xl shadow-lg">
                        <h1 className="text-4xl font-bold text-pink-600 hover:text-pink-700 transition duration-300">
                            Login to read posts
                        </h1>
                        <p className="mt-4 text-gray-600 text-center">
                            You must be logged in to access posts. Please login and enjoy curated content.
                        </p>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-12 bg-gradient-to-b from-purple-50 to-white min-h-[100vh]">
            <Container>
                <h2 className="text-5xl font-extrabold text-center mb-12 text-purple-800 drop-shadow-md">
                    🌟 Latest Posts
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
