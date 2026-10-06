"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
const Navbar = () => {
    const [showdropdown, setShowdropdown] = useState(false)
    const { data: session } = useSession()
    const [search, setSearch] = useState("")
    const router = useRouter()
    const handleSearch = (e) => {
        e.preventDefault()
        const name = search.trim()
        if (!name) return
        router.push(`/${encodeURIComponent(name)}`)
        setSearch("")
    }

    return (
        <nav className='bg-gray-900 text-white flex justify-between items-center px-4 md:h-14 flex-col md:flex-row'>
            <Link href={"/"} className='logo font-bold text-lg flex justify-center items-center'>
                <div className='flex justify-center items-center gap-1'>
                    GetMeAChai!
                    <img src="tea.gif" width={40} alt="" className='invertImg' />
                </div>
            </Link>
            <form onSubmit={handleSearch} className='flex gap-2 my-2 md:my-0'>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search username"
                    className='px-3 py-2 rounded-lg text-sm text-black bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button
                    type="submit"
                    className='text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl font-medium text-sm px-4 py-2 rounded-lg'
                >
                    Search
                </button>
            </form>
            <div className='relative flex flex-col gap-2 md:block'>
                {session && <> <button onClick={() => { setShowdropdown(!showdropdown) }} onBlur={() => {
                    setTimeout(() => {
                        setShowdropdown(false)
                    }, 300);
                }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue:300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.email}<svg className="w-4 h-3 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" /></svg>
                </button>

                    <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-32.5 top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                            </li>
                        </ul>
                    </div></>

                }
                {session && <button onClick={() => { signOut() }} className='text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-lg my-2'>Logout</button>}
                {!session && <Link href={"/login"}><button className='text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-lg my-2' >Login</button></Link>}

            </div>
        </nav>
    )
}

export default Navbar
