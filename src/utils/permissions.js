// Centralized Role-Based Access Control Configuration
// This file defines all permissions and role mappings for the RITES QA System

// Define all available permissions in the system
export const PERMISSIONS = {
  // Dashboard and Navigation
  HOME: 'home',
  
  // Duty Modules
  DUTY: 'duty',
  DUTY_SMS: 'duty-sms',
  DUTY_ROLLING: 'duty-rolling',
  DUTY_NDT: 'duty-ndt',
  DUTY_VI: 'duty-vi',
  DUTY_WELDING: 'duty-welding',
  DUTY_QCT: 'duty-qct',
  DUTY_CALIBRATION: 'duty-calibration',
  DUTY_SR_INSPECTION: 'duty-sr-inspection',
  DUTY_TESTING: 'duty-testing',
  
  // Records and Reports
  RECORDS: 'records',
  ISO_REPORTS: 'iso-reports',
  
  // Analysis and AI
  DATA_ANALYSIS: 'data-analysis',
  AI_SYSTEM: 'ai-system',
  
  // Administration
  ADMIN: 'admin',
  
  // Special Permissions
  FULL_ACCESS: 'full-access'
};

// Define role-based permissions mapping
export const ROLE_PERMISSIONS = {
  INSPECTING_ENGINEER: [
    PERMISSIONS.HOME,
    PERMISSIONS.DUTY_SMS,
    PERMISSIONS.DUTY_ROLLING,
    PERMISSIONS.DUTY_NDT,
    PERMISSIONS.DUTY_VI,
    PERMISSIONS.DUTY_WELDING,
    PERMISSIONS.ISO_REPORTS
  ],
  MANAGER: [
    PERMISSIONS.HOME,
    PERMISSIONS.DUTY,
    PERMISSIONS.RECORDS,
    PERMISSIONS.ISO_REPORTS,
    PERMISSIONS.DATA_ANALYSIS,
    // MANAGER gets access to these specific admin-level duty modules
    PERMISSIONS.DUTY_QCT,
    PERMISSIONS.DUTY_CALIBRATION,
    PERMISSIONS.DUTY_SR_INSPECTION,
    PERMISSIONS.DUTY_TESTING
  ],
  LOCAL_ADMIN: [
    PERMISSIONS.HOME,
    PERMISSIONS.DUTY,
    PERMISSIONS.RECORDS,
    PERMISSIONS.ISO_REPORTS,
    PERMISSIONS.ADMIN,
    PERMISSIONS.DATA_ANALYSIS,
    PERMISSIONS.AI_SYSTEM
  ],
  MAIN_ADMIN: [
    PERMISSIONS.FULL_ACCESS
  ]
};

// Route to permission mapping for protected routes
export const ROUTE_PERMISSIONS = {
  // Duty modules
  '/sms': PERMISSIONS.DUTY_SMS,
  '/sms/*': PERMISSIONS.DUTY_SMS,
  '/stage': PERMISSIONS.DUTY_ROLLING,
  '/stage/*': PERMISSIONS.DUTY_ROLLING,
  '/ndt': PERMISSIONS.DUTY_NDT,
  '/ndt/*': PERMISSIONS.DUTY_NDT,
  '/visual': PERMISSIONS.DUTY_VI,
  '/visual/*': PERMISSIONS.DUTY_VI,
  '/welding': PERMISSIONS.DUTY_WELDING,
  '/welding/*': PERMISSIONS.DUTY_WELDING,
  
  // Admin-level duty modules (accessible by MANAGER, LOCAL_ADMIN, MAIN_ADMIN)
  '/qct': PERMISSIONS.DUTY_QCT,
  '/qct/*': PERMISSIONS.DUTY_QCT,
  '/testing': PERMISSIONS.DUTY_TESTING,
  '/testing/*': PERMISSIONS.DUTY_TESTING,
  '/calibration': PERMISSIONS.DUTY_CALIBRATION,
  '/calibration/*': PERMISSIONS.DUTY_CALIBRATION,
  '/srInspection': PERMISSIONS.DUTY_SR_INSPECTION,
  '/srInspection/*': PERMISSIONS.DUTY_SR_INSPECTION,
  
  // Records routes
  '/record': PERMISSIONS.RECORDS,
  '/record/*': PERMISSIONS.RECORDS,
  
  // Data analysis routes
  '/dashboard/aiSystem': PERMISSIONS.DATA_ANALYSIS,
  '/dashboard/aiSystem/*': PERMISSIONS.DATA_ANALYSIS,
  
  // AI system routes
  '/ai': PERMISSIONS.AI_SYSTEM,
  '/ai/*': PERMISSIONS.AI_SYSTEM,
  
  // Admin routes
  '/admin': PERMISSIONS.ADMIN,
  '/admin/*': PERMISSIONS.ADMIN,
  
  // BSP routes (admin only)
  '/bsp': PERMISSIONS.ADMIN,
  '/bsp/*': PERMISSIONS.ADMIN
};

/**
 * Check if a user has a specific permission
 * @param {string} userType - The user's role type
 * @param {string} permission - The permission to check
 * @returns {boolean} - Whether the user has the permission
 */
export const hasPermission = (userType, permission) => {
  if (!userType || !permission) return false;

  // Main Admin has access to everything
  if (userType === 'MAIN_ADMIN') return true;

  // Get user permissions
  const userPermissions = ROLE_PERMISSIONS[userType] || [];

  // Check for full access
  if (userPermissions.includes(PERMISSIONS.FULL_ACCESS)) return true;

  // Umbrella permission: if user has 'duty', allow all duty-* permissions
  if (permission.startsWith('duty-') && userPermissions.includes(PERMISSIONS.DUTY)) {
    return true;
  }



  // Check if user has the required permission
  return userPermissions.includes(permission);
};

/**
 * Get all permissions for a specific user type
 * @param {string} userType - The user's role type
 * @returns {string[]} - Array of permissions
 */
export const getUserPermissions = (userType) => {
  if (!userType) return [];
  return ROLE_PERMISSIONS[userType] || [];
};

/**
 * Check if a user can access a specific route
 * @param {string} userType - The user's role type
 * @param {string} route - The route path
 * @returns {boolean} - Whether the user can access the route
 */
export const canAccessRoute = (userType, route) => {
  const requiredPermission = ROUTE_PERMISSIONS[route];
  if (!requiredPermission) return true; // No permission required
  
  return hasPermission(userType, requiredPermission);
};

/**
 * Filter items based on user permissions
 * @param {Array} items - Array of items with permission property
 * @param {string} userType - The user's role type
 * @returns {Array} - Filtered array of items
 */
export const filterByPermissions = (items, userType) => {
  if (!Array.isArray(items)) return [];
  
  return items.filter(item => {
    if (!item.permission) return true; // No permission required
    return hasPermission(userType, item.permission);
  });
};

// Export default object with all utilities
export default {
  PERMISSIONS,
  ROLE_PERMISSIONS,
  ROUTE_PERMISSIONS,
  hasPermission,
  getUserPermissions,
  canAccessRoute,
  filterByPermissions
};
