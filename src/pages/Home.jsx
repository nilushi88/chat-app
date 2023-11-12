import React from 'react'
import ChatList from '../components/ChatList'
import Chat from '../components/Chat'
import SideBar from '../components/SideBar'

const Home = () => {
  return (
    <div className="h-screen p-4 my-auto">
        <div className="flex flex-row flex-wrap h-[700px] border-2">
            <div className="w-full sm:w-1/3 md:w-1/4 h-full overflow-hidden">
                <SideBar/>
            </div>
            <div role="main" className="w-full sm:h-100 sm:w-2/3 md:w-3/4 h-full">
                <Chat/>
            </div>
        </div>
    </div>
  )
}

export default Home