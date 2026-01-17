"use client"

import { useState } from "react"
import { mockPatients } from "@/context/mockData"

export default function FrontDeskDashboard({ user, onLogout, patients, onRegisterPatient }) {
  const [showForm, setShowForm] = useState(false)
  const [registeredPatients, setRegisteredPatients] = useState(mockPatients)
  const [formData, setFormData] = useState({
    unitStayId: "",
    name: "",
    gender: "",
    age: "",
    address: "",
    phone: "",
    email: "",
    aadhaar: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPatient = {
      ...formData,
      id: `P${String(registeredPatients.length + 1).padStart(3, "0")}`,
      password: "password123",
      dob: new Date(Date.now() - Number.parseInt(formData.age) * 365.25 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      medicalHistory: "",
      currentMedications: "",
      diagnosis: "",
      symptoms: "",
      allergies: "",
      doctorAssigned: "",
      testResults: "",
      prescriptions: [],
      doctorNotes: "",
      reports: [],
      admissionDate: new Date().toISOString().split("T")[0],
      dischargeDate: null,
      wardRoom: "",
      treatmentCost: 0,
      insuranceProvider: "",
      paymentStatus: "pending",
      totalBill: 0,
    }
    setRegisteredPatients((prev) => [...prev, newPatient])
    onRegisterPatient(newPatient)
    setFormData({
      unitStayId: "",
      name: "",
      gender: "",
      age: "",
      address: "",
      phone: "",
      email: "",
      aadhaar: "",
    })
    setShowForm(false)
    alert("Patient registered successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 border-b border-blue-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="text-white">
            <h1 className="text-3xl font-bold">MediCare</h1>
            <p className="text-blue-100 text-sm">EHR Management System - Front Desk</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-gray-600 text-sm">Total Patients</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{registeredPatients.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-gray-600 text-sm">Active Registrations</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {registeredPatients.filter((p) => !p.dischargeDate).length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-gray-600 text-sm">Today's Check-ins</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {registeredPatients.filter((p) => p.admissionDate === new Date().toISOString().split("T")[0]).length}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {showForm ? "✕ Close Form" : "+ Register New Patient"}
        </button>

        {showForm && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">📋 Register New Patient</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="unitStayId"
                  placeholder="Patient Unit Stay ID"
                  value={formData.unitStayId}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="aadhaar"
                  placeholder="Aadhaar / National ID"
                  value={formData.aadhaar}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Register Patient
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-teal-50">
            <h2 className="text-lg font-semibold text-gray-900">Registered Patients</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Patient ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Unit Stay ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Gender</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Aadhaar</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {registeredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{patient.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{patient.unitStayId}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{patient.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.gender}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.aadhaar}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          patient.dischargeDate ? "bg-gray-100 text-gray-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {patient.dischargeDate ? "Discharged" : "Active"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
