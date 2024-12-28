"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [transferStatus, setTransferStatus] = useState("");
    const [error, setError] = useState("");

    const Transfer = async (number: string, amount: number) => {
        if (amount < 1 || amount > 100000) {
            setError("Amount must be between 1 and 100,000");
            return;
        }

        setTransferStatus("Sending...");
        setError("");
        try {
            const payment = await p2pTransfer(number, amount);
            setTransferStatus(payment?.message || "");
        } catch (e) {
            setError("Payment failed");
        }

        setTimeout(() => {
            setTransferStatus("");
        }, 10000);
    };

    return (
        <div className="h-full flex items-center justify-center pt-20 pb-8">
                <Card title="Send">
                    <div className="min-w-72 pt-2">
                        <TextInput
                            placeholder={"Number"}
                            label="Number"
                            onChange={(value) => {
                                setNumber(value);
                            }}
                        />
                        <TextInput
                            placeholder={"Amount"}
                            label="Amount"
                            onChange={(value) => {
                                setAmount(value);
                            }}
                        />
                        <div className="pt-4 flex justify-center">
                            <Button
                                onClick={async () => {
                                    await Transfer(number, parseFloat(amount) * 100);
                                }}
                            >
                                Send
                            </Button>
                        </div>
                        {error && (
                            <div className="text-center pt-4 text-red-500">
                                {error}
                            </div>
                        )}
                        <div
                            className={`text-center pt-4 ${
                                transferStatus === "Payment successful" || transferStatus === "Sending..."
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {transferStatus}
                        </div>
                    </div>
                </Card>
        </div>
    );
}