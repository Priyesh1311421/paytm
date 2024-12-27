import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    };
    onSignin: () => void; 
    onSignout: () => void; 
    update: () => void;
    home: () => void;
} 

export const Appbar = ({
    user,
    onSignin,
    onSignout,
    update,
    home
}: AppbarProps) => {
    return (
        <div className="flex justify-between border-b px-4">
            <div className="text-lg flex flex-col justify-center font-bold cursor-pointer" onClick={home}>
                PayTM {user ? `| ${user?.name}` : ''}
            </div>
            <div className="flex items-center justify-between ">
                <div className="relative group p-2 mx-4 px-4 shadow-lg cursor-pointer rounded-full bg-gray-500 transform transition-transform hover:scale-105 text-white">
                    {user ? `${user?.name?.charAt(0).toUpperCase() ?? ''}` : 'U'}
                    {user && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-32 bg-black text-white text-center rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity p-2" onClick={update}>
                            Update Profile
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-center pt-2">
                    <Button onClick={user ? onSignout : onSignin}>
                        {user ? "Logout" : "Login"}
                    </Button>
                </div>
            </div>
        </div>
    );
};