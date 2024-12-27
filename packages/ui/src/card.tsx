import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border rounded-lg shadow-md p-6 bg-white">
      <h1 className="text-2xl font-bold border-b pb-4 mb-4 text-gray-800">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}