import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { message } from 'antd';

// Define role-based access permissions
const ROLE_PERMISSIONS = {
  INSPECTING_ENGINEER: [
    'duty-sms',
    'duty-rolling',
    'duty-ndt',
    'duty-vi',
    'duty-welding',
    'iso-reports'
  ],
  MANAGER: [
    'duty-sms',
    'duty-rolling',
    'duty-ndt',
    'duty-vi',
    'duty-welding',
    'records',
    'iso-reports',
    'data-analysis'
  ],
  LOCAL_ADMIN: [
    'duty',
    'records',
    'iso-reports',
    'admin',
    'data-analysis',
    'ai-system'
  ],
  MAIN_ADMIN: [
    'full-access'
  ]
};

// Define route to permission mapping
const ROUTE_PERMISSIONS = {
  // SMS Routes
  '/sms': 'duty-sms',
  '/sms/*': 'duty-sms',
  
  // Rolling/Stage Routes
  '/stage': 'duty-rolling',
  '/stage/*': 'duty-rolling',
  
  // NDT Routes
  '/ndt': 'duty-ndt',
  '/ndt/*': 'duty-ndt',
  
  // VI Routes
  '/vi': 'duty-vi',
  '/vi/*': 'duty-vi',
  
  // Welding Routes
  '/welding': 'duty-welding',
  '/welding/*': 'duty-welding',
  
  // QCT Routes - Only for higher roles
  '/qct': 'admin',
  '/qct/*': 'admin',

  // Testing Routes - Only for higher roles
  '/testing': 'admin',
  '/testing/*': 'admin',

  // Calibration Routes - Only for higher roles
  '/calibration': 'admin',
  '/calibration/*': 'admin',

  // SRI Routes - Only for higher roles
  '/sri': 'admin',
  '/sri/*': 'admin',
  
  // Records Routes
  '/record': 'records',
  '/record/*': 'records',
  
  // Data Analysis Routes
  '/dashboard/aiSystem': 'data-analysis',
  '/dashboard/aiSystem/*': 'data-analysis',
  
  // AI System Routes
  '/ai': 'ai-system',
  '/ai/*': 'ai-system',
  
  // Admin Routes
  '/admin': 'admin',
  '/admin/*': 'admin',
  
  // BSP Routes (typically admin)
  '/bsp': 'admin',
  '/bsp/*': 'admin'
};

const RoleBasedRoute = ({ requiredPermission, children }) => {
  const { userType, token } = useSelector(state => state.auth);
  
  // If not authenticated, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // If no userType, redirect to login
  if (!userType) {
    message.error('User role not found. Please login again.');
    return <Navigate to="/login" replace />;
  }
  
  // Main Admin has full access
  if (userType === 'MAIN_ADMIN') {
    return children ? children : <Outlet />;
  }
  
  // Get user permissions
  const userPermissions = ROLE_PERMISSIONS[userType] || [];
  
  // Check if user has required permission
  const hasPermission = userPermissions.includes(requiredPermission) || 
                       userPermissions.includes('full-access');
  
  if (!hasPermission) {
    message.error('You do not have permission to access this page.');
    return <Navigate to="/" replace />;
  }
  
  return children ? children : <Outlet />;
};

// Helper function to check if user has permission for a route
export const hasRoutePermission = (userType, routePath) => {
  if (userType === 'MAIN_ADMIN') return true;
  
  const userPermissions = ROLE_PERMISSIONS[userType] || [];
  
  // Check exact match first
  if (ROUTE_PERMISSIONS[routePath]) {
    const requiredPermission = ROUTE_PERMISSIONS[routePath];
    return userPermissions.includes(requiredPermission) || userPermissions.includes('full-access');
  }
  
  // Check wildcard matches
  for (const [route, permission] of Object.entries(ROUTE_PERMISSIONS)) {
    if (route.endsWith('/*')) {
      const baseRoute = route.slice(0, -2);
      if (routePath.startsWith(baseRoute)) {
        return userPermissions.includes(permission) || userPermissions.includes('full-access');
      }
    }
  }
  
  return false;
};

// Helper function to get user's accessible routes
export const getUserAccessibleRoutes = (userType) => {
  if (userType === 'MAIN_ADMIN') {
    return Object.keys(ROUTE_PERMISSIONS);
  }
  
  const userPermissions = ROLE_PERMISSIONS[userType] || [];
  const accessibleRoutes = [];
  
  for (const [route, permission] of Object.entries(ROUTE_PERMISSIONS)) {
    if (userPermissions.includes(permission) || userPermissions.includes('full-access')) {
      accessibleRoutes.push(route);
    }
  }
  
  return accessibleRoutes;
};

export default RoleBasedRoute;
