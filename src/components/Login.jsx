import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        setError('');
        setLoading(true);
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center bg-gradient-to-br 
        from-indigo-100 via-blue-50 to-cyan-100 px-4 py-8">

            <div className="relative w-full max-w-lg p-10 bg-white rounded-3xl shadow-xl border 
            border-gray-100 transition-all">
                <button
                    onClick={handleClose}
                    aria-label="Close login page"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                    disabled={loading}
                >
                    <MdClose size={24} />
                </button>

                <h2 className="text-center text-3xl font-extrabold text-indigo-700 mb-1">
                    Welcome Back!
                </h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Sign in to continue to <span className="font-semibold text-indigo-600">Blogzilla</span>
                </p>

                {error && (
                    <p className="text-center text-red-500 text-sm mb-4">{error}</p>
                )}

                <form onSubmit={handleSubmit(login)} className="space-y-5">
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    'Email must be valid',
                            },
                        })}
                    />
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        {...register('password', {
                            required: true,
                        })}
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Logging in...' : 'Sign In'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link
                        to="/signup"
                        className="text-indigo-600 font-medium hover:underline transition"
                    >
                        Sign up here
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
