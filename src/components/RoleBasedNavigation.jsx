import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Define navigation items based on roles
const NAVIGATION_ITEMS = {
  INSPECTING_ENGINEER: [
    {
      title: 'Duty - SMS',
      path: '/sms',
      icon: '🏭'
    },
    {
      title: 'Duty - Rolling Stage',
      path: '/stage',
      icon: '⚙️'
    },
    {
      title: 'Duty - NDT',
      path: '/ndt',
      icon: '🔍'
    },
    {
      title: 'Duty - Visual',
      path: '/vi',
      icon: '👁️'
    },
    {
      title: 'Duty - Welding',
      path: '/welding',
      icon: '🔥'
    },
    {
      title: 'ISO Reports - Complete',
      path: '/',
      icon: '📊'
    }
  ],
  MANAGER: [
    {
      title: 'Duty Module Complete Access',
      path: '/',
      icon: '⚡'
    },
    {
      title: 'Records',
      path: '/',
      icon: '📋'
    },
    {
      title: 'ISO Reports',
      path: '/',
      icon: '📊'
    },
    {
      title: 'Data Analysis',
      path: '/',
      icon: '📈'
    }
  ],
  LOCAL_ADMIN: [
    {
      title: 'Duty',
      path: '/',
      icon: '⚡'
    },
    {
      title: 'Records',
      path: '/',
      icon: '📋'
    },
    {
      title: 'ISO Report',
      path: '/',
      icon: '📊'
    },
    {
      title: 'Admin',
      path: '/',
      icon: '⚙️'
    },
    {
      title: 'Data Analysis',
      path: '/',
      icon: '📈'
    },
    {
      title: 'AI System',
      path: '/',
      icon: '🤖'
    }
  ],
  MAIN_ADMIN: [
    {
      title: 'Dashboard',
      path: '/',
      icon: '🏠'
    },
    {
      title: 'SMS Duty',
      path: '/sms',
      icon: '🏭'
    },
    {
      title: 'Rolling Stage',
      path: '/stage',
      icon: '⚙️'
    },
    {
      title: 'NDT',
      path: '/ndt',
      icon: '🔍'
    },
    {
      title: 'Visual Inspection',
      path: '/vi',
      icon: '👁️'
    },
    {
      title: 'Welding',
      path: '/welding',
      icon: '🔥'
    },
    {
      title: 'QCT',
      path: '/qct',
      icon: '🧪'
    },
    {
      title: 'Testing',
      path: '/testing',
      icon: '🔬'
    },
    {
      title: 'Calibration',
      path: '/calibration',
      icon: '📏'
    },
    {
      title: 'SRI',
      path: '/sri',
      icon: '📡'
    },
    {
      title: 'Records',
      path: '/record',
      icon: '📋'
    },
    {
      title: 'AI System',
      path: '/dashboard/aiSystem',
      icon: '🤖'
    },
    {
      title: 'BSP Admin',
      path: '/bsp',
      icon: '🔧'
    }
  ]
};

const RoleBasedNavigation = ({ className = '' }) => {
  const { userType } = useSelector(state => state.auth);
  
  if (!userType) {
    return null;
  }
  
  const navigationItems = NAVIGATION_ITEMS[userType] || [];
  
  return (
    <nav className={`role-based-navigation ${className}`}>
      <div className="navigation-header">
        <h3 className="text-lg font-semibold mb-4">
          {userType.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())} Menu
        </h3>
      </div>
      <ul className="navigation-list space-y-2">
        {navigationItems.map((item, index) => (
          <li key={index} className="navigation-item">
            <Link
              to={item.path}
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span className="font-medium">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Helper component for role-based menu items
export const RoleBasedMenuItem = ({ requiredRole, children }) => {
  const { userType } = useSelector(state => state.auth);
  
  if (!userType) return null;
  
  // Main Admin can see everything
  if (userType === 'MAIN_ADMIN') return children;
  
  // Check if user has required role or higher
  const roleHierarchy = {
    'INSPECTING_ENGINEER': 1,
    'MANAGER': 2,
    'LOCAL_ADMIN': 3,
    'MAIN_ADMIN': 4
  };
  
  const userLevel = roleHierarchy[userType] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;
  
  return userLevel >= requiredLevel ? children : null;
};

export default RoleBasedNavigation;
