"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, LogOut, Utensils, Dumbbell, Calendar, ChevronLeft } from "lucide-react"
import type React from "react"

export default function NewDashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const router = useRouter()

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1]

    if (!token) {
      router.push("/login")
    } else {
      setAuthenticated(true)
      try {
        const decoded = JSON.parse(atob(token))
        setUsername(decoded.username)
        localStorage.setItem("currentUser", decoded.username)
      } catch (error) {
        console.error("Error decoding token:", error)
      }
    }
  }, [router])

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    localStorage.removeItem("currentUser")
    router.push("/login")
  }

  const DashboardBox = ({ title, icon, href }: { title: string; icon: React.ReactNode; href: string }) => (
    <Link
      href={href}
      className="flex flex-col items-center justify-center p-6 backdrop-blur-md bg-white bg-opacity-20 rounded-3xl shadow-lg hover:bg-opacity-30 transition-all duration-300 border border-[#97a683]/30"
    >
      <div className="text-4xl mb-4 text-[#2f2226]">{icon}</div>
      <h2 className="text-xl font-mono font-thin text-[#2f2226]">{title}</h2>
    </Link>
  )

  return authenticated ? (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage:
          "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bgdash-tkWpfFocEsJwQggAqCUMtkz0e47UQo.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <header className="flex justify-between items-center fixed top-6 left-6 right-6 z-10">
        <Link
          href="/"
          className="flex items-center bg-[#2f2226] text-white font-mono font-thin text-lg py-2 px-4 rounded-full hover:bg-opacity-80 transition-colors duration-300"
        >
          <ChevronLeft className="mr-2" size={20} />
          Back to Home
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center bg-[#2f2226] text-white font-mono font-thin text-lg py-2 px-4 rounded-full hover:bg-opacity-80 transition-colors duration-300"
        >
          <LogOut className="mr-2" size={20} />
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-mono font-thin text-[#2f2226] mb-12 text-center">Welcome, {username}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 w-full max-w-4xl">
          <DashboardBox title="Meal Planner" icon={<Utensils />} href="/meal" />
          <DashboardBox title="Fitness Planner" icon={<Dumbbell />} href="/workout" />
          <DashboardBox title="Symptom Tracker" icon={<Calendar />} href="/calendar" />
        </div>
        <Link
          href="/profile"
          className="mt-8 bg-[#2f2226] text-white font-mono font-thin text-lg py-2 px-8 rounded-full hover:bg-opacity-80 transition-colors duration-300 flex items-center"
        >
          <User className="mr-2" size={20} />
          My Profile
        </Link>
      </main>
    </div>
  ) : null
}