"use client"

import { useState } from "react"
import { mockPatients } from "@/context/mockData"

export default function BillingDashboard({ user, onLogout, patients, onUpdateStatus }) {
  const [allPatients, setAllPatients] = useState(mockPatients)
  const [filter, setFilter] = useState("all")

  const pendingPaymentPatients = allPatients.filter((p) => p.paymentStatus === "pending")
  const paidPatients = allPatients.filter((p) => p.paymentStatus === "paid")

  const handleUpdateStatus = (patientId) => {
    setAllPatients((prev) =>
      prev.map((p) =>
        p.id === patientId
          ? {
              ...p,
              paymentStatus: p.paymentStatus === "pending" ? "paid" : "discharged",
              dischargeDate: p.paymentStatus === "paid" ? new Date().toISOString().split("T")[0] : p.dischargeDate,
            }
          : p,
      ),
    )
  }

  const displayPatients = filter === "pending" ? pendingPaymentPatients : filter === "paid" ? paidPatients : allPatients

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 border-b border-blue-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="text-white">
            <h1 className="text-3xl font-bold">MediCare</h1>
            <p className="text-blue-100 text-sm">EHR Management System - Billing Desk</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-gray-600 text-sm flex items-center gap-2">
              <span className="text-2xl">⏳</span> Pending Payments
            </p>
            <p className="text-3xl font-bold text-red-600 mt-2">{pendingPaymentPatients.length}</p>
            <p className="text-xs text-gray-600 mt-2">
              Total: ₹{pendingPaymentPatients.reduce((sum, p) => sum + p.totalBill, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-gray-600 text-sm flex items-center gap-2">
              <span className="text-2xl">✅</span> Payment Completed
            </p>
            <p className="text-3xl font-bold text-green-600 mt-2">{paidPatients.length}</p>
            <p className="text-xs text-gray-600 mt-2">
              Total: ₹{paidPatients.reduce((sum, p) => sum + p.totalBill, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-gray-600 text-sm flex items-center gap-2">
              <span className="text-2xl">💰</span> Total Receivable
            </p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              ₹{allPatients.reduce((sum, p) => sum + p.totalBill, 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {[
            { id: "all", label: "📋 All Patients" },
            { id: "pending", label: "⏳ Pending Payment" },
            { id: "paid", label: "✅ Payment Completed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                filter === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Patient ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Patient Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Admission Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Discharge Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ward/Room</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Doctor Assigned</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Treatment Cost (₹)</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Insurance Provider</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Payment Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{patient.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{patient.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.admissionDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.dischargeDate || "Active"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.wardRoom}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.doctorAssigned}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ₹{patient.treatmentCost.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.insuranceProvider}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          patient.paymentStatus === "pending"
                            ? "bg-red-100 text-red-800"
                            : patient.paymentStatus === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {patient.paymentStatus === "pending"
                          ? "⏳ Pending"
                          : patient.paymentStatus === "paid"
                            ? "✅ Paid"
                            : "🏥 Discharged"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleUpdateStatus(patient.id)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          patient.paymentStatus === "pending"
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : patient.paymentStatus === "paid"
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-gray-400 text-white cursor-not-allowed"
                        }`}
                        disabled={patient.paymentStatus === "discharged"}
                      >
                        {patient.paymentStatus === "pending"
                          ? "Mark Paid"
                          : patient.paymentStatus === "paid"
                            ? "Discharge"
                            : "Discharged"}
                      </button>
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
