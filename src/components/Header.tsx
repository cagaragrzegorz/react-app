import React from 'react';
import { useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();

  const getBreadcrumbs = (pathname:string): string => {
    const path = pathname.split('/').slice(-1)[0]
    return path.toUpperCase().slice(0,1) + path.slice(1).replaceAll('-', ' ')
  };

  return (
    <div className="breadcrumbs">
      {getBreadcrumbs(location.pathname)}
    </div>
  );
};
