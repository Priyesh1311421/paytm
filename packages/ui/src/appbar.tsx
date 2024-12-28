import { Button } from "./button";
import { motion } from 'framer-motion';

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
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.2,
                type: 'spring',
                damping: 10,
                stiffness: 100,
            }}
            className="fixed top-0 z-[999] w-full border-black border-b-[1px] bg-white"
        >
            <div className="wrapper flex w-full items-center justify-between p-3">
                <motion.div
                    className="flex items-center gap-4"
                    initial="hidden"
                    animate="visible"
                >
                    <div className="text-lg flex flex-col justify-center font-bold cursor-pointer" onClick={home}>
                        PayTM 
                    </div>
                </motion.div>

                <motion.div
                    className="flex items-center gap-4"
                    initial="hidden"
                    animate="visible"
                >
                    <div className="relative group p-2 mx-4 px-4 shadow-lg cursor-pointer rounded-full bg-gray-500 transform transition-transform hover:scale-105 text-white">
                        {user ? `${user?.name?.charAt(0).toUpperCase() ?? 'U'}` : 'U'}
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
                </motion.div>
            </div>
        </motion.nav>
    );
};