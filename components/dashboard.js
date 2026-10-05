"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { updateUser } from "@/actions/useractions"

export default function Dashboard() {
  const { data: session } = useSession()
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilepic: "",
    coverpic: "",
    stripeid: "",
    stripesecret: ""
  })

  useEffect(() => {
    if (!session) {
      router.push("/login")
    } else if (session.user) {
      setForm({
        name: session.user.name || "",
        email: session.user.email || "",
        username: session.user.name
          ? session.user.name.split("@")[0]
          : "",
        profilepic: session.user.image || "",
        coverpic: "",
        stripeid: "",
        stripesecret: ""
      })
    }
  }, [session, router])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await updateUser(form)

    console.log("Saved Data:", result)
    alert("Dashboard details saved successfully!")
  }

  return (
    <div className="min-h-screen bg-[#0b0b1a] text-white flex flex-col justify-between">

      <div className="flex flex-col items-center justify-center my-10 px-4">

        <h1 className="text-3xl font-bold mb-8">
          Welcome to your Dashboard
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl flex flex-col gap-4 bg-[#12122c] p-8 rounded-xl border border-gray-800 shadow-xl"
        >

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="bg-[#1c1c38] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              readOnly
              className="bg-[#1c1c38] border border-gray-700 rounded-lg p-3 text-white"
            />
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="bg-[#1c1c38] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">
              Profile Picture
            </label>

            <input
              type="text"
              name="profilepic"
              value={form.profilepic}
              onChange={handleChange}
              className="bg-[#1c1c38] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Cover Picture */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">
              Cover Picture
            </label>

            <input
              type="text"
              name="coverpic"
              value={form.coverpic}
              onChange={handleChange}
              className="bg-[#1c1c38] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Stripe Key */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">
              Stripe Key
            </label>

            <input
              type="text"
              name="stripeid"
              value={form.stripeid}
              onChange={handleChange}
              className="bg-[#1c1c38] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Stripe Secret */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">
              Stripe Secret
            </label>

            <input
              type="password"
              name="stripesecret"
              value={form.stripesecret}
              onChange={handleChange}
              className="bg-[#1c1c38] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Save
          </button>

        </form>
      </div>

      <footer className="text-center py-4 text-xs text-gray-500 border-t border-gray-800">
        Get Me a Chai! All rights reserved.
      </footer>

    </div>
  )
}