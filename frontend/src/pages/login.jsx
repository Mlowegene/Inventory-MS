import React from "react";

function Login() {
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-green-600 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="text-3xl text-white">Inventory Management System</h2>
      <div className="border shadow-lg p-6 w-120 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              className="w-full px-3 py-2 border"
              type="email"
              name="email"
              placeholder="enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border"
              type="password"
              name="password"
              placeholder="enter your password"
              required
            />
          </div>
          <div className="mb-4">
            <button
              className="w-full bg-green-600 text-white py-2"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
