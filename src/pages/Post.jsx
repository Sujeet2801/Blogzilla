import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-10 min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            <Container>
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="relative ">
                        <img
                            src={appwriteService.getPreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-96"
                        />

                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button
                                        bgColor="bg-green-600"
                                        className="hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow"
                                    >
                                        ✏️ Edit
                                    </Button>
                                </Link>
                                <Button
                                    bgColor="bg-red-600"
                                    className="hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow"
                                    onClick={deletePost}
                                >
                                    🗑️ Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="p-6 md:p-10">
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 leading-tight tracking-tight">
                            {post.title}
                        </h1>

                        <div className="prose prose-lg max-w-none text-gray-700">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600 text-lg">
            Loading post...
        </div>
    );
}
