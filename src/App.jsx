import { useState } from 'react'
import React from 'react'
import './App.css'
import Signup from './Components/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'


import { useDispatch, useSelector } from 'react-redux'
import { setRole } from './features/smartHome/smartHomeSlice'
import Dashboard from './Components/tabs/Dashboard'
import Devices from './Components/tabs/Devices'
import Rooms from './Components/tabs/Rooms'

import { logout } from './features/auth/authSlice'

import { Home as HomeIcon, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


function App() {
  

  return (
    <>
    
      <Routes>
        <Route path='/' element={<SmartHomeShell />} />
        <Route path="/singup" element={<Signup />} />
        <Route path='/login' element={<Login />} />
        
      </Routes>
    </>
  )
}

function SmartHomeShell(){
  const { role } = useSelector(s => s.smartHome);
  const dispatch = useDispatch();
  const [tab, setTab] = React.useState('Dashboard');

  const Tab = {
    Dashboard: <Dashboard />,
    Devices: <Devices />,
    Rooms: <Rooms />,
    
  }[tab];

 
    const navigate = useNavigate();

    const handleSubmit = ()=>{
        dispatch(logout());
        navigate("/login");
    }
    function handleLogout(){
        dispatch(logout());
        navigate('/login')
    
    }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 bg-blue-200">
      
      <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/15 bg-gray-500 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3 ">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/20">
            <HomeIcon className="h-5 w-5" />
          </div>
          <div className=''>
            
            <h1 className="text-xl font-semibold tracking-tight ">SmartHome Manager</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select value={role} onChange={(e)=>dispatch(setRole(e.target.value))}
            className="rounded-xl border border-white/10 bg-blue-400 px-3 py-2 text-sm backdrop-blur-xl">
            {['Admin','Guest','Child'].map(r => <option key={r} className="bg-blue-400" value={r}>{r}</option>)}
          </select>
          <button className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-blue-400 px-3 py-2 text-sm backdrop-blur-xl">
            <Settings className="h-4 w-4"/> Settings
          </button>

          <button onClick={handleLogout} className='px-6 py-1.5 bg-red-500 text-white cursor-pointer rounded-lg '>
                    Logout
          </button>
        </div>
      </div>

      
      <nav className="mb-4 flex flex-wrap gap-2 ">
        {['Dashboard','Devices','Rooms'].map(t => (
          <button key={t} onClick={()=>setTab(t)}
            className={`rounded-xl border border-white/10 bg-gray-400 px-3 py-1.5 text-sm backdrop-blur-xl ${tab===t ? 'bg-white/70 text-zinc-900' : 'hover:bg-white/20'}`}>
            {t}
          </button>
        ))}
      </nav>

      
      {Tab}
    </div>
  );
}

export default App
