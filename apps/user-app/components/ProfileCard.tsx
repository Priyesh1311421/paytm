"use client"
import { Card } from "@repo/ui/card";

export const ProfileCard = ({ name, email}: { name: string; email: string }) => {
    return (
        <Card title={"Profile"}>
            <div className="p-2 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-300 pb-2">
                    <div className="text-lg font-medium text-gray-700">
                        Name
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                        {name}
                    </div>
                </div>
                <div className="flex justify-between items-center border-b border-slate-300 py-2">
                    <div className="text-lg font-medium text-gray-700">
                        Email
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                        {email}
                    </div>
                </div>
                <button onClick={()=>{}} className="text-white bg-gray-900 border-2 border-gray-500 rounded-md p-2 ">Update Profile</button>
            </div>
        </Card>
    );
};