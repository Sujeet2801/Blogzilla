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
            <div className="w-full min-h-[70vh] flex items-center justify-center py-8">
                <Container>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-bold text-gray-700 hover:text-gray-500 
                        transition-colors duration-300">
                            Login to read posts
                        </h1>
                        <p className="mt-4 text-gray-500">
                            You must be logged in to access posts. Please login!
                        </p>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-10 bg-gray-50 min-h-[100vh]">
            <Container>
                <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
                    Latest Posts
                </h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {posts.map((post) => (
                        <div 
                            key={post.$id} 
                            className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                        >
                            <div className="bg-white rounded-xl shadow-md hover:shadow-xl 
                            transition-shadow duration-300 h-full">
                                <PostCard {...post} />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
