"use client"

import { Button } from '@repo/ui/button';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { updateUserProfile } from '../app/lib/actions/updateUser';

const UpdateProfile = () => {
    const { data: session } = useSession();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (session) {
                setName(session.user?.name || '');
                setEmail(session.user?.email || '');
            }
        };

        fetchUserDetails();
    }, [session]);

    const handleUpdate = async () => {
        setUpdateStatus('Updating profile...');
        const result = await updateUserProfile(name, email);
        if (result.message === "Profile updated successfully") {
            setUpdateStatus('Profile updated successfully');
        } else {
            setError('Failed to update profile');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center pt-12 w-full ">
            <h1 className="text-3xl font-bold mb-6">Update Profile</h1>
            <div className="p-6 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className='flex justify-center'>
                    <Button onClick={handleUpdate}>
                        Update
                    </Button>
                </div>
                {updateStatus ? (
                    <div className="mt-4 text-center text-green-500">
                        {updateStatus}
                    </div>
                ):(
                    <div className="mt-4 text-center text-red-500">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateProfile;