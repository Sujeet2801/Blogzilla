import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
        appwriteService.getPost(slug).then((post) => {
            if (post) setPosts(post);
        });
        } else {
        navigate('/');
        }
    }, [slug, navigate]);

    return post ? (
        <div className="min-h-screen bg-gradient-to-br from-[#fdf4ff] via-[#f1f5ff] to-[#fefeff] 
        py-14 px-4">
        <Container>
            <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl 
            p-6 sm:p-10 transition duration-300">
            <div className="mb-8 border-b pb-4 border-dashed border-purple-200">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-purple-800 
                tracking-tight">
                ✏️ Edit Your Post
                </h1>
                <p className="text-center text-sm text-gray-500 mt-2">
                Update your story, fix typos, or add fresh thoughts.
                </p>
            </div>

            <div className="animate-fade-in-up">
                <PostForm post={post} />
            </div>
            </div>
        </Container>
        </div>
    ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 
        to-gray-200">
        <div className="text-center animate-pulse">
            <svg
            className="w-10 h-10 text-gray-400 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v16h16V4H4z"
            />
            </svg>
            <span className="text-gray-500 text-lg font-medium">
            Loading your post data...
            </span>
        </div>
        </div>
    );
}

export default EditPost;
