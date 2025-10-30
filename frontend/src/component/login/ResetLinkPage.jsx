import React from "react";

function ResetLinkPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-md text-center w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Reset your password
        </h2>
        <p className="text-gray-600 mb-6">
          Check your email for a link to reset your password.
          <br />
          If it doesn’t appear within a few minutes, check your spam folder.
        </p>
        <a
          href="/"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          Return to sign in
        </a>
      </div>
    </div>
  );
}

export default ResetLinkPage;
