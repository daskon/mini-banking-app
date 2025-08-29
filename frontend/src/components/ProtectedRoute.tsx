import React, { type ReactNode } from 'react'
import { useMeQuery } from '../services/auth/authServiceApi';
import { Spin } from 'antd';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactNode
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {

  const { data, isLoading } = useMeQuery();

  if(isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
  );

  if (!data) return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;