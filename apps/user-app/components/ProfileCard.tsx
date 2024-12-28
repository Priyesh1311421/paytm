"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

export const ProfileCard = ({ name, imgSrc, balance }: { name: string; imgSrc: string; balance: number }) => {
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);

    const handleRedirect = () => {
        setLoading(true);
        redirect('/p2p-transfer');
    };
    const Redirect = () => {
        setLoading1(true);
        redirect('/transfer');
    };

    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md py-2 overflow-hidden border-[1px] border-gray-900">
            <div className="p-6 text-center space-y-4">
                {/* Profile Picture */}
                <div className="flex justify-center">
                    <img
                        src={imgSrc}
                        alt="Profile Picture"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                </div>
                {/* Name */}
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                {/* Balance */}
                <div className="text-gray-500">
                    <p className="text-sm">Balance</p>
                    <p className="text-lg font-semibold text-gray-900">₹ {(balance / 100).toFixed(2)}</p>
                </div>
                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-4">
                    <button className="bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-700" onClick={Redirect}>
                        {loading1 ? (
                            <svg
                            className="animate-spin h-5 w-5 mr-3 text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="white"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                        </svg>
                        ):<span> Add funds</span>}
                    </button>
                    <button
                        className="flex items-center text-gray-900 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100"
                        onClick={handleRedirect}
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 mr-3 text-gray-900"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                ></path>
                            </svg>
                        ) : (
                            <>
                                Send money <span className="ml-2">→</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};