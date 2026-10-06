"use server"
import Razorpay from "razorpay"
import Payment from "../models/Payment"
import connectDB from "../db/connectDB"
import User from "../models/User"


export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()
    let user = await User.findOne({ username: to_username })
    const secret = user.razorpaysecret
    const id = user.razorpayid
    var instance = new Razorpay({ key_id: id, key_secret: secret })
    let options = {
        amount: Number.parseInt(amount),
        currency: "INR"
    }
    let x = await instance.orders.create(options)

    await Payment.create({ oid: x.id, amount: amount / 100, to_user: to_username, name: paymentform.name, message: paymentform.message })
    return x
}

export const fetchPayments = async (username) => {
    await connectDB()
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean()
    return JSON.parse(JSON.stringify(p))
}

export const fetchUser = async (username) => {
    await connectDB()
    let u = await User.findOne({ username: username }).lean()
    return JSON.parse(JSON.stringify(u))
}

export const updateProfile = async (data, oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data)
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "username already exists" }
        }
        await User.updateOne({ email: ndata.email }, ndata)
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })
    }
    else{
        await User.updateOne({email:ndata.email},ndata)
    }

}