import { useAuth } from '../context/AuthContext';

/**
 * Check if current user has a permission or role.
 * Usage:
 *   const canEdit = usePermission({ permission: 'inventory' });
 *   const isAdmin = usePermission({ roles: ['admin'] });
 *   const allowed = usePermission({ roles: ['admin', 'manager'], permission: 'production' });
 */
const usePermission = ({ roles = [], permission = null } = {}) => {
  const { user, hasPermission, hasRole } = useAuth();

  if (!user) return false;

  const roleOk = roles.length === 0 || hasRole(roles);
  const permOk = !permission || hasPermission(permission);

  return roleOk && permOk;
};

export default usePermission;
