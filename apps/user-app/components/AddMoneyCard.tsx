"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0);
    const [error, setError] = useState("");

    const handleAddMoney = async () => {
        if (value < 1) {
            setError("Amount must be greater than 1");
            return;
        }
        setError("");
        await createOnRampTransaction(provider, value);
        window.location.href = redirectUrl || "";
    };

    return (
        <Card title="Add Money">
            <div className="w-full">
                <TextInput
                    label={"Amount"}
                    placeholder={"Amount"}
                    onChange={(val) => {
                        setValue(Number(val));
                    }}
                />
                {error && <p className="text-red-500">{error}</p>}
                <div className="py-4 text-left">
                    Bank
                </div>
                <Select
                    onSelect={(value) => {
                        setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                        setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
                    }}
                    options={SUPPORTED_BANKS.map(x => ({
                        key: x.name,
                        value: x.name
                    }))}
                />
                <div className="flex justify-center pt-4">
                    <Button onClick={handleAddMoney}>
                        Add Money
                    </Button>
                </div>
            </div>
    
        </Card>
    );
};