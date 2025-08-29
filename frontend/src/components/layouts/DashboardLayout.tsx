import React from "react";
import { Link } from "react-router-dom";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="w-full md:w-64 bg-blue-600 text-white p-4 flex flex-col md:h-screen">
        <h1 className="text-2xl font-bold mb-6">Banking App</h1>
        <nav className="flex flex-col gap-3">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/dashboard" className="hover:underline">Announcements</Link>
        </nav>
      </div>
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">{children}</div>
    </div>
  );
};

export default DashboardLayout;