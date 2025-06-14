import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useNavigate } from "react-router-dom";

function Home() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) setPosts(posts.documents);
        });
    }, []);

    const isLoggedIn = posts.length > 0;

    return (
        <div className="w-full text-gray-800">
            {!isLoggedIn && (
                <>
                    {/* Hero Section */}
                    <section className="py-24 w-full bg-gradient-to-br from-indigo-100 via-blue-50 
                    to-cyan-100 flex items-center justify-center px-6">
                        <Container>
                            <div className="text-center max-w-3xl mx-auto">
                                <h1 className="text-5xl font-bold text-indigo-700 mb-4 drop-shadow">
                                    Welcome to Blogzilla ✨
                                </h1>
                                <p className="text-lg text-gray-600 mb-6 italic">
                                    Where Devs Share, Learn, and Grow.
                                </p>
                                <a
                                    href="/login"
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-full 
                                    font-medium shadow hover:bg-indigo-700 transition"
                                >
                                    Login to Discover Posts
                                </a>
                            </div>
                        </Container>
                    </section>

                    {/* Mission Section */}
                    <section className="py-20 bg-white">
                        <Container>
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-3xl font-bold text-cyan-700 mb-4">Our Mission</h2>
                                <p className="text-lg text-gray-700">
                                    At Blogzilla, we believe in community-powered learning. We bring
                                    developers together to share ideas, grow skills, and push
                                    boundaries in technology.
                                </p>
                            </div>
                        </Container>
                    </section>

                    {/* What's Inside */}
                    <section className="py-20 bg-white">
                        <Container>
                            <div className="max-w-4xl mx-auto text-center mb-12">
                                <h2 className="text-3xl font-bold text-indigo-800">
                                    What You’ll Find Inside 🧠
                                </h2>
                                <p className="text-gray-600 mt-3">
                                    Blogzilla isn’t just a blog. It’s a curated collection of personal
                                    journeys, best practices, and tech revelations from developers like you.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                                {[
                                    {
                                        icon: "🛠️",
                                        title: "Hands-On Tutorials",
                                        desc: "From setup to deployment, learn by building.",
                                    },
                                    {
                                        icon: "🧠",
                                        title: "Deep Dives",
                                        desc: "Explore concepts behind the code and stay updated with trends.",
                                    },
                                    {
                                        icon: "🗣️",
                                        title: "Voices & Opinions",
                                        desc: "Personal takes, developer rants, and thoughtful perspectives.",
                                    },
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-indigo-50 p-6 rounded-xl border 
                                    border-indigo-200">
                                        <div className="text-3xl mb-3">{item.icon}</div>
                                        <h3 className="text-xl font-semibold mb-2 text-indigo-800">{item.title}
                                        </h3>
                                        <p className="text-gray-700">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </section>

                    {/* Features */}
                    <section className="py-20 bg-gradient-to-r from-cyan-50 via-indigo-50 to-purple-50">
                        <Container>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-indigo-800 mb-2">
                                    Why Join Us?
                                </h2>
                                <p className="text-gray-600">
                                    Empowering you through meaningful content and community.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                {[
                                    {
                                        icon: "📚",
                                        title: "Quality Reads",
                                        desc: "Get deep, insightful posts crafted by developers.",
                                    },
                                    {
                                        icon: "💬",
                                        title: "Community Talk",
                                        desc: "Join conversations, ask questions, and grow together.",
                                    },
                                    {
                                        icon: "🚀",
                                        title: "Real Projects",
                                        desc: "Learn through actual projects and real-world use cases.",
                                    },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                                    >
                                        <div className="text-5xl mb-4">{item.icon}</div>
                                        <h3 className="text-xl font-semibold mb-2 text-indigo-700">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </section>
                </>
            )}

            {/* Latest Posts (Logged In) */}
            {isLoggedIn && (
                <section className="relative py-24 bg-gradient-to-br from-indigo-50 via-blue-100 
                to-cyan-100 min-h-screen">
                    <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-10 z-0" />
                    <Container>
                        <div className="relative z-10 text-center mb-14">
                            <h2 className="text-5xl font-extrabold text-cyan-700 drop-shadow-sm mb-4">
                                Latest Posts 📰
                            </h2>
                            <p className="text-lg text-gray-700 max-w-xl mx-auto">
                                Dive into fresh content, personal stories, and real-world dev learnings from
                                our community.
                            </p>
                            <div className="w-20 h-1 bg-indigo-400 mx-auto mt-4 rounded-full animate-pulse" />
                        </div>

                        {posts.length > 0 ? (
                            <>
                                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                                gap-10">
                                    {posts.map((post) => (
                                        <PostCard
                                            key={post.$id}
                                            $id={post.$id}
                                            title={post.title}
                                            featuredImage={post.featuredImage}
                                        />
                                    ))}
                                </div>

                                <div className="relative z-10 mt-16 text-center">
                                    <button
                                        onClick={() => navigate("/all-posts")}
                                        className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600
                                        hover:from-indigo-700 hover:to-cyan-700 
                                        text-white font-semibold rounded-full shadow-md hover:shadow-lg
                                        transition duration-300"
                                    >
                                        View All Posts
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className="text-center text-gray-600 text-lg mt-12 relative z-10">
                                No posts available yet. Start writing your first one!
                            </p>
                        )}
                    </Container>
                </section>
            )}

        </div>
    );
}

export default Home;
