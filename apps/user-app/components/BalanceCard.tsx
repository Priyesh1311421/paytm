import { Card } from "@repo/ui/card";

export const BalanceCard = ({ amount, locked }: { amount: number; locked: number }) => {
    return (
        <Card title={"Balance"}>
            <div className="p-4 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-300 pb-2">
                    <div className="text-lg font-medium text-gray-700">
                        Unlocked Balance
                    </div>
                    <div className="text-lg font-semibold text-green-500">
                        {amount / 100} INR
                    </div>
                </div>
                <div className="flex justify-between items-center border-b border-slate-300 py-2">
                    <div className="text-lg font-medium text-gray-700">
                        Total Locked Balance
                    </div>
                    <div className="text-lg font-semibold text-red-500">
                        {locked / 100} INR
                    </div>
                </div>
                <div className="flex justify-between items-center py-2">
                    <div className="text-lg font-medium text-gray-700">
                        Total Balance
                    </div>
                    <div className="text-lg font-semibold text-blue-500">
                        {(locked + amount) / 100} INR
                    </div>
                </div>
            </div>
        </Card>
    );
};