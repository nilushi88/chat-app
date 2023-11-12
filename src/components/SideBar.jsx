import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import ChatList from './ChatList'
import Search from './Search'

const SideBar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='h-full'>
      {/* <div className="sticky top-0 px-4 py-3 flex items-center font-semibold text-sm text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10">
      {currentUser.displayName}
      CC
      </div> */}
      <div className='w-full h-14 bg-white'>
        <div className='text-slate-900 dark:text-slate-200 text-lg px-4 py-2'>Hi, {currentUser.displayName}</div>
      </div>
      <Search/>
      <ChatList />

      <button className="border-none p-5 bg-sky-800 text-white w-full"  onClick={()=>signOut(auth)}>Logout</button>
    </div>
  )
}

export default SideBar