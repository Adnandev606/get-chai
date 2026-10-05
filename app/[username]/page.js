
"use client";

import React, { useEffect, useState } from "react";
import {
  fetchuser,
  fetchpayments,
  initiate,
} from "@/actions/useractions";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import {
  ToastContainer,
  toast,
  Bounce,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Username() {

  const params = useParams();
  const username = params.username;

  const router = useRouter();
  const searchParams = useSearchParams();

  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // User aur payments database se lana
  useEffect(() => {

    if (!username) return;

    const getData = async () => {

      try {

        const user = await fetchuser(username);

        if (!user) {
          toast.error("User not found!");
          return;
        }

        setCurrentUser(user);

        const dbpayments = await fetchpayments(username);

        setPayments(dbpayments);

      } catch (error) {

        console.error(error);
        toast.error("Data load nahi ho saka");

      }

    };

    getData();

  }, [username]);


  // Stripe payment ke baad
  useEffect(() => {

    if (searchParams.get("paymentdone") === "true") {

      toast.success("Thanks for your donation!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });

      router.replace(`/${username}`);
    }

  }, [searchParams, router, username]);


  // Input handle karna
  const handleChange = (e) => {

    setPaymentform({
      ...paymentform,
      [e.target.name]: e.target.value,
    });

  };


  // Stripe payment
  const pay = async (amount) => {

    try {

      if (!paymentform.name.trim()) {
        toast.error("Please enter your name");
        return;
      }

      if (!paymentform.message.trim()) {
        toast.error("Please enter your message");
        return;
      }

      if (!amount || Number(amount) < 1) {
        toast.error("Please enter a valid amount");
        return;
      }

      setLoading(true);

      console.log("Payment starting...");

      const result = await initiate(
        Number(amount),
        username,
        paymentform
      );

      console.log("Stripe Result:", result);

      if (result?.url) {

        // Stripe Checkout par redirect
        window.location.href = result.url;

      } else {

        toast.error("Stripe checkout open nahi ho saka");

        setLoading(false);

      }

    } catch (error) {

      console.error("Payment Error:", error);

      toast.error(
        error?.message || "Payment start nahi ho saki"
      );

      setLoading(false);

    }

  };


  return (
    <>
      <ToastContainer />

      <div className="relative text-center w-full pb-12 bg-[#0d0714] text-white min-h-screen">

        {/* Background / Banner Image */}
        <div className="w-full h-48 sm:h-64 overflow-hidden">

          <img
            src={
              currentUser?.coverpic ||
              "https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/20.gif?token-hash=YeWX-axIr5oOAwubKY1_utF3TH39LdWV6XGo8lwe9f0%3D&token-time=1791072000"
            }
            alt="Banner"
            className="w-full h-full object-cover"
          />

        </div>


        {/* Profile / Avatar Image */}
        <div className="flex justify-center">

          <img
            className="rounded-full border-4 border-[#0d0714] -mt-12 relative shadow-md"
            width={100}
            height={100}
            src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/aa52624d1cef47ba91c357da4a7859cf/eyJoIjozNjAsInciOjM2MH0%3D/4.gif?token-hash=3-Lxs-KvoPOlZpCEZ5tLybnZLEUp0RCSXv0vjjHW_n0%3D&token-time=1791504000"
            alt="Avatar"
          />

        </div>


        {/* Username */}
        <div className="m-4 font-bold text-3xl w-full">

          @{username}

        </div>


        {/* Bio */}
        <div className="text-gray-400 mb-1">

          Creating Animated art for VTT's

        </div>


        {/* Stats */}
        <div className="text-gray-400 mb-8 text-sm">

          27,059 members • 114 posts • $16,420/release

        </div>


        {/* Supporters & Payment Form Section */}
        <div className="paymet flex justify-center items-center w-full px-4">

          <div className="flex flex-col lg:flex-row w-full max-w-5xl gap-6">


            {/* Supporters Box */}
            <div className="w-full lg:w-1/2 p-6 text-left border border-gray-800 rounded-xl bg-[#130b1e] shadow-lg">

              <h2 className="font-bold text-xl mb-4 text-white">
                Supporters
              </h2>


              <ul className="text-sm text-gray-300 space-y-3">

                {payments.length === 0 ? (

                  <li>
                    No supporters yet
                  </li>

                ) : (

                  payments.map((payment, index) => (

                    <li key={payment._id || index}>

                      {payment.name} donated ${payment.amount}
                      {payment.message && ` with a message: ${payment.message}`}

                    </li>

                  ))

                )}

              </ul>

            </div>


            {/* Make a Payment Form Box */}
            <div className="bg-[#130b1e] w-full lg:w-1/2 p-6 text-left border border-gray-800 rounded-xl shadow-lg">

              <h2 className="font-bold text-xl mb-4 text-white">

                Make a Payment

              </h2>


              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  pay(Number(paymentform.amount));
                }}
                className="flex flex-col space-y-4"
              >


                {/* Name */}
                <input
                  type="text"
                  name="name"
                  value={paymentform.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="bg-[#1c122b] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />


                {/* Message */}
                <input
                  type="text"
                  name="message"
                  value={paymentform.message}
                  onChange={handleChange}
                  placeholder="Enter Message"
                  className="bg-[#1c122b] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />


                {/* Amount */}
                <input
                  type="number"
                  name="amount"
                  value={paymentform.amount}
                  onChange={handleChange}
                  placeholder="Enter Amount"
                  min="1"
                  className="bg-[#1c122b] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />


                {/* Pay Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold w-1/2 py-3 rounded-lg hover:opacity-95 transition disabled:opacity-50"
                >

                  {loading ? "Redirecting..." : "Pay"}

                </button>

              </form>


              {/* Quick Amount Buttons */}
              <div className="flex gap-3 mt-4">

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => pay(10)}
                  className="bg-[#1c122b] border border-gray-700 text-sm text-gray-300 px-4 py-2 rounded-lg hover:bg-purple-900/40 disabled:opacity-50"
                >
                  Pay $10
                </button>


                <button
                  type="button"
                  disabled={loading}
                  onClick={() => pay(20)}
                  className="bg-[#1c122b] border border-gray-700 text-sm text-gray-300 px-4 py-2 rounded-lg hover:bg-purple-900/40 disabled:opacity-50"
                >
                  Pay $20
                </button>


                <button
                  type="button"
                  disabled={loading}
                  onClick={() => pay(30)}
                  className="bg-[#1c122b] border border-gray-700 text-sm text-gray-300 px-4 py-2 rounded-lg hover:bg-purple-900/40 disabled:opacity-50"
                >
                  Pay $30
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}































































































// import React from 'react'

// export default async function Username({ params }) {
//   const resolvedParams = await params;

//   return (
//     <>
//       <div className="relative text-center w-full pb-12 bg-[#0d0714] text-white min-h-screen">
//         {/* Background / Banner Image */}
//         <div className="w-full h-48 sm:h-64 overflow-hidden">
//           <img
//             src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/20.gif?token-hash=YeWX-axIr5oOAwubKY1_utF3TH39LdWV6XGo8lwe9f0%3D&token-time=1791072000"
//             alt="Banner"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Profile / Avatar Image */}
//         <div className="flex justify-center">
//           <img
//             className="rounded-full border-4 border-[#0d0714] -mt-12 relative shadow-md"
//             width={100}
//             height={100}
//             src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/aa52624d1cef47ba91c357da4a7859cf/eyJoIjozNjAsInciOjM2MH0%3D/4.gif?token-hash=3-Lxs-KvoPOlZpCEZ5tLybnZLEUp0RCSXv0vjjHW_n0%3D&token-time=1791504000"
//             alt="Avatar"
//           />
//         </div>

//         {/* Username */}
//         <div className="m-4 font-bold text-3xl w-full">
//           @{resolvedParams.username}
//         </div>

//         {/* Bio */}
//         <div className="text-gray-400 mb-1">
//           Creating Animated art for VTT's
//         </div>

//         {/* Stats */}
//         <div className="text-gray-400 mb-8 text-sm">
//           27,059 members • 114 posts • $16,420/release
//         </div>

//         {/* Supporters & Payment Form Section */}
//         <div className="paymet flex justify-center items-center w-full px-4">
//           <div className="flex flex-col lg:flex-row w-full max-w-5xl gap-6">
            
//             {/* Supporters Box */}
//             <div className="w-full lg:w-1/2 p-6 text-left border border-gray-800 rounded-xl bg-[#130b1e] shadow-lg">
//               <h2 className="font-bold text-xl mb-4 text-white">Supporters</h2>
//               <ul className="text-sm text-gray-300 space-y-3">
//                 <li>Adnan donated $30 with a message</li>
//                 <li>Adnan donated $30 with a message</li>
//                 <li>Adnan donated $30 with a message</li>
//                 <li>Adnan donated $30 with a message</li>
//                 <li>Adnan donated $30 with a message</li>
//               </ul>
//             </div>

//             {/* Make a Payment Form Box */}
//             <div className="bg-[#130b1e] w-full lg:w-1/2 p-6 text-left border border-gray-800 rounded-xl shadow-lg">
//               <h2 className="font-bold text-xl mb-4 text-white">Make a Payment</h2>
              
//               <form className="flex flex-col space-y-4">
//                 <input 
//                   type="text" 
//                   placeholder="Enter Name" 
//                   className="bg-[#1c122b] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
//                 />
//                 <input 
//                   type="text" 
//                   placeholder="Enter Message" 
//                   className="bg-[#1c122b] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
//                 />
//                 <input 
//                   type="number" 
//                   placeholder="Enter Amount" 
//                   className="bg-[#1c122b] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
//                 />
                
//                 {/* Pay Button */}
//                 <button 
//                   type="submit" 
//                   className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold w-1/2 py-3 rounded-lg hover:opacity-95 transition"
//                 >
//                   Pay
//                 </button>
//               </form>

//               {/* Quick Amount Buttons */}
//               <div className="flex gap-3 mt-4">
//                 <button type="button" className="bg-[#1c122b] border border-gray-700 text-sm text-gray-300 px-4 py-2 rounded-lg hover:bg-purple-900/40">Pay $10</button>
//                 <button type="button" className="bg-[#1c122b] border border-gray-700 text-sm text-gray-300 px-4 py-2 rounded-lg hover:bg-purple-900/40">Pay $20</button>
//                 <button type="button" className="bg-[#1c122b] border border-gray-700  text-sm text-gray-300 px-4 py-2 rounded-lg hover:bg-purple-900/40">Pay $30</button>
//               </div>

//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   )
// }