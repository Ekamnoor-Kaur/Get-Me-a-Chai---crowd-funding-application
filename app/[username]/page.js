import React from 'react'
import PaymentPage from '../components/PaymentPage'
import { notFound } from "next/navigation"
import connectDB from '../db/connectDB'
import User from '../models/User'

const Username = async ({ params }) => {
  const { username } = await params
  const checkUser = async () => {
    await connectDB()
    let u = await User.findOne({ username: username })
    if (!u) {
      return notFound()
    }
  }
  await checkUser()
  return (
    <>
      <PaymentPage username={username} />
    </>
  )
}

export default Username
export async function generateMetadata({params}){
    title:`${params.username} - Get me A Chai`
}
