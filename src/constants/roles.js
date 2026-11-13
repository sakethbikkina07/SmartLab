export const ROLES = {
  superadmin: 'Super Admin',
  admin: 'College Admin',
  hod: 'HOD',
  faculty: 'Faculty',
  student: 'Student',
};

// Roles that can self-register (Super Admin must be provisioned internally)
export const REGISTRABLE_ROLES = {
  student: 'Student',
  faculty: 'Faculty',
  hod: 'HOD',
  admin: 'College Admin',
};

