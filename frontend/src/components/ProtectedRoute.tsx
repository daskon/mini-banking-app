import React, { type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
}

export default ProtectedRoute;