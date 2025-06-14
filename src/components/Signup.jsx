import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError('');
        setLoading(true);
        try {
            const newUser = await authService.createAccount(data);
            if (newUser) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    dispatch(login(currentUser));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message || 'Account creation failed');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => navigate('/');

    return (
        <div className="flex items-center justify-center py-8 bg-gradient-to-br from-cyan-100 
        via-blue-50 to-indigo-100 px-4">
            <div className="relative w-full max-w-lg p-10 bg-white rounded-3xl shadow-xl border 
            border-gray-100">
                <button
                    onClick={handleClose}
                    aria-label="Close signup page"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                    disabled={loading}
                >
                    <MdClose size={24} />
                </button>

                <h2 className="text-center text-3xl font-extrabold text-indigo-700 mb-1">
                    Create an Account
                </h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Join <span className="font-semibold text-indigo-600">Blogzilla
                        </span> today. It’s free and easy!
                </p>

                {error && (
                    <p className="text-center text-red-500 text-sm mb-4">{error}</p>
                )}

                <form onSubmit={handleSubmit(create)} className="space-y-5">
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register('name', {
                            required: 'Name is required',
                        })}
                    />
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    'Enter a valid email address',
                            },
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Create a secure password"
                        {...register('password', {
                            required: 'Password is required',
                        })}
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Account'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-indigo-600 font-medium hover:underline transition"
                    >
                        Sign in here
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
