"use client"

import { useState } from "react"
import { mockPatients } from "@/context/mockData"

export default function PatientDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview")
  const patient = mockPatients.find((p) => p.id === user.id)

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Patient data not found</p>
          <button onClick={onLogout} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 border-b border-blue-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="text-white">
            <h1 className="text-3xl font-bold">MediCare</h1>
            <p className="text-blue-100 text-sm">EHR Management System - Patient Portal</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">
              Patient ID: <span className="font-bold text-white">{patient.id}</span>
            </p>
            <button
              onClick={onLogout}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 mb-6 border-b border-gray-200 overflow-x-auto">
          {[
            { id: "overview", label: "📋 Medical Overview" },
            { id: "reports", label: "📄 Diagnosis Reports" },
            { id: "prescriptions", label: "💊 Prescriptions" },
            { id: "billing", label: "💳 Billing Forms" },
            { id: "insurance", label: "📋 Insurance Forms" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">👤</span> Personal Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-600">Patient ID:</span>
                  <span className="font-medium text-gray-900">{patient.id}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-600">Unit Stay ID:</span>
                  <span className="font-medium text-gray-900">{patient.unitStayId}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium text-gray-900">{patient.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-600">DOB:</span>
                  <span className="font-medium text-gray-900">{patient.dob}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-medium text-gray-900">{patient.gender}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium text-gray-900">{patient.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Aadhaar:</span>
                  <span className="font-medium text-gray-900">{patient.aadhaar}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚕️</span> Clinical Information
              </h2>
              <div className="space-y-3">
                <div className="pb-2 border-b border-gray-100">
                  <span className="text-gray-600 text-sm block">Diagnosis:</span>
                  <p className="text-gray-900 font-medium text-sm mt-1">{patient.diagnosis}</p>
                </div>
                <div className="pb-2 border-b border-gray-100">
                  <span className="text-gray-600 text-sm block">Symptoms:</span>
                  <p className="text-gray-900 font-medium text-sm mt-1">{patient.symptoms}</p>
                </div>
                <div className="pb-2 border-b border-gray-100">
                  <span className="text-gray-600 text-sm block">Allergies:</span>
                  <p className="text-red-600 font-medium text-sm mt-1">{patient.allergies}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm block">Doctor Assigned:</span>
                  <p className="text-gray-900 font-medium text-sm mt-1">{patient.doctorAssigned}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">📅</span> Admission Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-600">Ward/Room:</span>
                  <span className="font-medium text-gray-900">{patient.wardRoom}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-600">Admission Date:</span>
                  <span className="font-medium text-gray-900">{patient.admissionDate}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-600">Discharge Date:</span>
                  <span className="font-medium text-gray-900">{patient.dischargeDate || "Active"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${patient.dischargeDate ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                  >
                    {patient.dischargeDate ? "Discharged" : "Active"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-teal-50">
                <h2 className="text-lg font-semibold text-gray-900">Diagnosis & Medical Reports</h2>
              </div>
              <div className="px-6 py-4 border-b border-gray-100 bg-blue-50">
                <p className="text-gray-700">
                  <strong>Diagnosis:</strong> {patient.diagnosis}
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Medical History:</strong> {patient.medicalHistory}
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Test Results:</strong> {patient.testResults}
                </p>
              </div>
              <div className="divide-y divide-gray-200">
                {patient.reports && patient.reports.length > 0 ? (
                  patient.reports.map((report) => (
                    <div key={report.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{report.type}</h3>
                          <p className="text-sm text-gray-600 mt-1">📅 Date: {report.date}</p>
                          <p className="text-sm text-gray-600">👨‍⚕️ Doctor: {report.doctor}</p>
                          <p className="text-sm text-gray-600">📄 Details: {report.details}</p>
                          <p
                            className={`text-sm font-medium mt-2 ${
                              report.result === "Normal" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            Result: {report.result}
                          </p>
                        </div>
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium whitespace-nowrap ml-4"
                        >
                          📥 Download
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center text-gray-600">No reports available</div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "prescriptions" && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-teal-50">
              <h2 className="text-lg font-semibold text-gray-900">💊 Prescriptions & Medications</h2>
            </div>
            <div className="p-6 space-y-4">
              {patient.prescriptions && patient.prescriptions.length > 0 ? (
                patient.prescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <span className="text-gray-600 text-sm block">Medicine</span>
                        <p className="font-semibold text-gray-900">{prescription.medicine}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm block">Dosage</span>
                        <p className="font-semibold text-gray-900">{prescription.dosage}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm block">Duration</span>
                        <p className="font-semibold text-gray-900">{prescription.duration}</p>
                      </div>
                      <div>
                        <button className="w-full px-3 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                          📥 Download Rx
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-600">No prescriptions available</div>
              )}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Always follow the prescribed dosage and duration. Do not self-medicate.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-teal-50">
              <h2 className="text-lg font-semibold text-gray-900">💳 Billing & Payment Forms</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Treatment Cost Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Treatment Cost:</span>
                      <span className="font-medium">₹{patient.treatmentCost}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-200">
                      <span className="text-gray-600">Ward/Room Charges:</span>
                      <span className="font-medium">₹2,000</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-blue-600 pt-2">
                      <span>Total Bill:</span>
                      <span>₹{patient.totalBill}</span>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Payment Status</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Status:</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${
                          patient.paymentStatus === "pending"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {patient.paymentStatus === "pending" ? "⏳ Pending" : "✅ Paid"}
                      </span>
                    </div>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      📋 View Invoice
                    </button>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                  💳 Make Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "insurance" && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-teal-50">
              <h2 className="text-lg font-semibold text-gray-900">📋 Insurance Forms & Documents</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Insurance Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-600">Insurance Provider:</p>
                    <p className="font-medium text-gray-900">{patient.insuranceProvider}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Policy Number:</p>
                    <p className="font-medium text-gray-900">POL-2024-{patient.id}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-900 flex items-center justify-between">
                  <span>📄 Insurance Claim Form</span>
                  <span>📥</span>
                </button>
                <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-900 flex items-center justify-between">
                  <span>📋 Pre-Authorization Form</span>
                  <span>📥</span>
                </button>
                <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-900 flex items-center justify-between">
                  <span>📑 Treatment Report</span>
                  <span>📥</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
