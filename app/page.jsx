"use client"

import { useState } from "react"
import LoginPage from "@/components/LoginPage"
import PatientDashboard from "@/components/dashboards/PatientDashboard"
import DoctorDashboard from "@/components/dashboards/DoctorDashboard"
import FrontDeskDashboard from "@/components/dashboards/FrontDeskDashboard"
import BillingDashboard from "@/components/dashboards/BillingDashboard"

export default function Home() {
  const [user, setUser] = useState(null)
  const [emergencyAccess, setEmergencyAccess] = useState({})
  const [patients, setPatients] = useState([])

  const handleLogin = (loginUser) => {
    console.log("[v0] User logged in:", loginUser)
    setUser(loginUser)
  }

  const handleLogout = () => {
    console.log("[v0] User logged out")
    setUser(null)
    setEmergencyAccess({})
  }

  const handleEmergencyAccess = (patientId, doctorId) => {
    const expiryTime = new Date(Date.now() + 30 * 60 * 1000)
    setEmergencyAccess((prev) => ({
      ...prev,
      [patientId]: { doctorId, expiryTime },
    }))
    console.log("[v0] Emergency access granted for patient:", patientId)
  }

  const handleRegisterPatient = (newPatient) => {
    setPatients((prev) => [...prev, newPatient])
    console.log("[v0] Patient registered:", newPatient)
  }

  const handleUpdatePatientStatus = (patientId, newStatus) => {
    setPatients((prev) => prev.map((p) => (p.id === patientId ? { ...p, paymentStatus: newStatus } : p)))
    console.log("[v0] Patient status updated:", patientId, newStatus)
  }

  const renderDashboard = () => {
    if (!user) return <LoginPage onLogin={handleLogin} />

    switch (user.role) {
      case "patient":
        return <PatientDashboard user={user} onLogout={handleLogout} />
      case "cardiologist":
      case "orthopaedic":
      case "general_physician":
        return (
          <DoctorDashboard
            user={user}
            onLogout={handleLogout}
            onEmergencyAccess={handleEmergencyAccess}
            emergencyAccess={emergencyAccess}
          />
        )
      case "front_desk":
        return (
          <FrontDeskDashboard
            user={user}
            onLogout={handleLogout}
            patients={patients}
            onRegisterPatient={handleRegisterPatient}
          />
        )
      case "billing_desk":
        return (
          <BillingDashboard
            user={user}
            onLogout={handleLogout}
            patients={patients}
            onUpdateStatus={handleUpdatePatientStatus}
          />
        )
      default:
        return <LoginPage onLogin={handleLogin} />
    }
  }

  return <main>{renderDashboard()}</main>
}
