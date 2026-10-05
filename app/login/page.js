"use client"
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

const Login = () => {
     const { data: session } = useSession()
    

        const router=useRouter()
        useEffect(()=>{
            if(session){
                router.push('/dashboard')
            }
        },[session, router]

        )
     
      
    return (
        <div className="text-white py-14 container mx-auto">
            <h1 className="font-bold text-3xl text-center mb-6">Login/Signup to your favorite</h1>
            <div className="flex justify-center flex-col gap-4 min-h-screen items-center p-10">

                {/* Google Button */}
                <button onClick={()=>{signIn("google")}} className="flex items-center justify-start gap-4 w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <img src="image4.png" alt="Google" width={32} />
                    <span>Continue with Google</span>
                </button>

                {/* LinkedIn Button */}
                <button className="flex items-center justify-start gap-4 w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <img src="image3.png" alt="LinkedIn" width={32} />
                    <span>Continue with LinkedIn</span>
                </button>

                {/* Twitter Button */}
                <button onClick={()=>{signIn("twitter")}} className="flex items-center justify-start gap-4 w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <img src="imag6.png" alt="Twitter" width={32} />
                    <span>Continue with Twitter</span>
                </button>

                {/* GitHub Button */}
                <button onClick={()=>{signIn("github")}} className="flex items-center justify-start gap-4 w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <img src="image.png" alt="GitHub" width={32} />
                    <span>Continue with GitHub</span>
                </button>

                {/* Facebook Button */}
                <button className="flex items-center justify-start gap-4 w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <img src="image7.png" alt="Facebook" width={32} />
                    <span>Continue with Facebook</span>
                </button>

            </div>
        </div>
    )
}

export default Login