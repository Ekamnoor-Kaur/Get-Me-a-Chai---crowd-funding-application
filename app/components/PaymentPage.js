"use client"
import React, { useEffect, useState } from 'react'
import { initiate, fetchUser, fetchPayments } from '../actions/useractions'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Bounce } from 'react-toastify'

// practice card number : 4100 2800 0000 1007

const PaymentPage = ({ username }) => {
    const { data: session } = useSession()
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentuser, setCurrentuser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true")
            toast('Payment has been made', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
    }, [])


    const handleChange = (e) => {
        // console.log(paymentform)
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchUser(username)
        setCurrentuser(u || {})
        let dbpayment = await fetchPayments(username)
        setPayments(dbpayment || [])
    }

    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform)
        // console.log(a)
        let orderId = a.id
        var options = {
            "key": currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:3000/api/razorpay",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "<name>", //your customer's name
                "email": "<email>",
                "contact": "<phone>" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            {/* <button id="rzp-button1">Pay</button> */}
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div className='cover w-full relative'>
                <img className='object-cover w-full md:h-85 h-60' src={currentuser.coverpic} alt="" />
                <div className='absolute -bottom-10 md:right-[44%] right-[34%] border-2 border-white rounded-full overflow-hidden md:w-37.5 md:h-37.5 h-25 w-25'>
                    <img className='rounded-full object-cover w-37.5 h-37.5' src={currentuser.profilepic} alt="" />
                </div>
            </div>

            <div className='info flex flex-col justify-center items-center my-15'>
                <div className='font-bold text-lg text-white'>@{username}</div>
                <div className='text-slate-400'>Let's @{username} to get a chai</div>
                <div className='text-slate-400'>{payments.length} Payments . raised{payments.reduce((a, b) => a + b.amount, 0)} raised </div>
            </div>

            <div className='payment flex flex-col md:flex-row gap-3 w-[80%] mx-auto my-4'>
                <div className='supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10'>
                    <h2 className='text-lg font-bold my-5'>Top 10 Supporters</h2>
                    <ul>
                        {payments.length == 0 && <li>No payments yet</li>}
                        {payments.map((p, i) => {
                            return <li key={i} className='my-4 flex gap-2 items-center'>
                                <img src="/avatar.gif" alt="avatar image" width={33} />
                                <span>{p.name} donated <span className="font-bold">{p.amount}</span> with a message "{p.message}"</span>
                            </li>
                        })}
                    </ul>
                </div>
                <div className='makepayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-5'>
                    <h2 className='text-2xl font-bold my-5'>Make a payment</h2>
                    <div className="flex gap-2 flex-col">
                        <input type="text" onChange={handleChange} value={paymentform.name} name='name' className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                        <input type="text" onChange={handleChange} value={paymentform.message} name='message' className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
                        <input type="text" onChange={handleChange} value={paymentform.amount} name='amount' className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
                        <button onClick={() => { pay(Number.parseInt(paymentform.amount) * 100) }} disabled={paymentform.name.length < 3 || paymentform.message.length < 4 || paymentform.amount<1} type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-none disabled:bg-slate-600 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-lg">Pay</button>
                    </div>
                    <div className='flex gap-2 p-3'>
                        <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { setPaymentform({ ...paymentform, "amount": "100" }) }}>Pay ₹100</button>
                        <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { setPaymentform({ ...paymentform, "amount": "150" }) }}>Pay ₹150</button>
                        <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { setPaymentform({ ...paymentform, "amount": "200" }) }}>Pay ₹200</button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default PaymentPage
