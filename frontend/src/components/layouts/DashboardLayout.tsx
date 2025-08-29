import React, { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    children: ReactNode
}

const DashboardLayout: React.FC <Props> = ({children}) => {
  return (
    <div className='flex h-screen'>
        <div className='w-64 bg-blue-200 text-white p-4'>
            <h1 className='text-2xl font-bold mb-6'>Banking App</h1>
            <nav className="flex flex-col gap-3">
                <Link to="/">Dashboard</Link>
                <Link to="/transfer">Transfer</Link>
                <Link to="/announcements">Announcements</Link>
            </nav>
        </div>
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">{children}</div>
    </div>
  )
}

export default DashboardLayout