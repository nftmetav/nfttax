import React from "react";

export default function LoginFailureBanner({ reason }) {
  return (
    <div className="mx-auto max-w-lg mt-5 border rounded-md bg-orange-100 border-red-600 text-red-600">
      <div className="p-2 font-bold italic">Login failed: {reason}</div>
    </div>
  );
}
