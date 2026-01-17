"use client"

import { useState } from "react"
import { getAllUsers } from "@/context/mockData"

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")

    const allUsers = getAllUsers()
    const user = allUsers.find((u) => u.email === email && u.password === password)

    if (user) {
      console.log("[v0] Login attempt successful for:", email)
      onLogin(user)
    } else {
      console.log("[v0] Login attempt failed for:", email)
      setError("Invalid email or password")
    }
  }

  const demoAccounts = [
    { email: "john@example.com", password: "password123", role: "Patient" },
    { email: "sharma@hospital.com", password: "password123", role: "Cardiologist" },
    { email: "patel@hospital.com", password: "password123", role: "Orthopaedic" },
    { email: "desai@hospital.com", password: "password123", role: "General Physician" },
    { email: "rahul@hospital.com", password: "password123", role: "Front Desk" },
    { email: "priya@hospital.com", password: "password123", role: "Billing Desk" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-8 py-8">
            <h1 className="text-3xl font-bold text-white text-center mb-2">MediCare</h1>
            <p className="text-blue-50 text-center text-sm">Healthcare Management System</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-shadow"
              >
                Login
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-600 font-semibold mb-3">Demo Accounts:</p>
              <div className="grid grid-cols-1 gap-2">
                {demoAccounts.map((account, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setEmail(account.email)
                      setPassword(account.password)
                    }}
                    className="text-xs text-left p-2 bg-gray-50 hover:bg-blue-50 rounded border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <span className="font-semibold text-gray-700">{account.role}:</span>
                    <span className="text-gray-600"> {account.email}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
