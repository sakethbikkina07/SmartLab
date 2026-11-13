const DEMO_USERS = {
  superadmin: {
    role: 'superadmin',
    name: 'Aarav Mehta',
    email: 'super@smartlab.edu',
    college: 'Platform Super Admin',
  },
  admin: {
    role: 'admin',
    name: 'Dr. Kavya Rao',
    email: 'admin@smartlab.edu',
    college: 'Vignan Institute of Tech',
  },
  hod: {
    role: 'hod',
    name: 'Prof. Rohit Sharma',
    email: 'hod@smartlab.edu',
    department: 'Computer Science & Engineering',
    college: 'Vignan Institute of Tech',
  },
  faculty: {
    role: 'faculty',
    name: 'Dr. Ananya Iyer',
    email: 'faculty@smartlab.edu',
    department: 'CSE',
    subject: 'Python Lab',
    college: 'Vignan Institute of Tech',
  },
  student: {
    role: 'student',
    name: 'Sneha Reddy',
    email: 'student@smartlab.edu',
    roll: '21CS001',
    department: 'CSE',
    college: 'Vignan Institute of Tech',
  },
};

let registrationRequests = [
  {
    id: 101,
    name: 'Rahul Varma',
    email: 'rahul.student@vignan.edu',
    role: 'student',
    college: 'Vignan Institute of Tech',
    department: 'Computer Science & Engineering',
    roll: '21CS109',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 102,
    name: 'Dr. Suresh Reddy',
    email: 'suresh.faculty@vignan.edu',
    role: 'faculty',
    college: 'Vignan Institute of Tech',
    department: 'CSE',
    subject: 'Algorithms Lab',
    employeeId: 'FAC-2024-99',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

export const login = (req, res) => {
  const { role, email, password } = req.body;

  // Check if there is a pending registration request for this email
  const pendingReq = registrationRequests.find(
    (r) => r.email?.toLowerCase() === email?.toLowerCase() && r.status === 'Pending'
  );
  if (pendingReq) {
    return res.status(403).json({
      error: 'Your registration request is pending approval by the Super Admin. You cannot log in until approved.',
      pendingApproval: true,
    });
  }

  const rejectedReq = registrationRequests.find(
    (r) => r.email?.toLowerCase() === email?.toLowerCase() && r.status === 'Rejected'
  );
  if (rejectedReq) {
    return res.status(403).json({
      error: 'Your registration request was rejected by the Super Admin.',
    });
  }

  const targetRole = role || Object.keys(DEMO_USERS).find(
    (r) => DEMO_USERS[r].email === email
  ) || 'student';

  const user = DEMO_USERS[targetRole];

  if (!user) {
    return res.status(401).json({ error: 'Invalid user or role credentials' });
  }

  // Generate lightweight mock JWT token
  const token = Buffer.from(JSON.stringify({ role: user.role, email: user.email, ts: Date.now() })).toString('base64');

  res.json({
    success: true,
    user,
    token,
  });
};

export const getCurrentUser = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header provided' });
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    const user = DEMO_USERS[decoded.role] || DEMO_USERS.student;
    res.json({ user });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const register = (req, res) => {
  const { name, email, role, password, roll, department, college, subject, designation, employeeId } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Super admin registration is strictly prohibited
  if (role === 'superadmin') {
    return res.status(403).json({ error: 'Super Admin registration is not allowed. Super Admin must be provisioned internally.' });
  }

  const userRole = role || 'student';
  const newRequest = {
    id: Date.now(),
    role: userRole,
    name,
    email,
    college: college || 'Vignan Institute of Tech',
    department: department || 'Computer Science & Engineering',
    status: 'Pending',
    createdAt: new Date().toISOString(),
    ...(roll ? { roll } : {}),
    ...(subject ? { subject } : {}),
    ...(designation ? { designation } : {}),
    ...(employeeId ? { employeeId } : {}),
  };

  registrationRequests.unshift(newRequest);

  res.status(201).json({
    success: true,
    requiresApproval: true,
    message: 'Registration request submitted successfully. Please wait for Super Admin approval before logging in.',
    request: newRequest,
  });
};

export const getRegistrationRequests = (req, res) => {
  res.json({ success: true, requests: registrationRequests });
};

export const updateRegistrationRequestStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'Approved' | 'Rejected' | 'Pending'

  const index = registrationRequests.findIndex((r) => String(r.id) === String(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Registration request not found' });
  }

  registrationRequests[index].status = status;
  const targetReq = registrationRequests[index];

  if (status === 'Approved') {
    // Add or activate in active user directory
    DEMO_USERS[targetReq.role] = {
      ...DEMO_USERS[targetReq.role],
      role: targetReq.role,
      name: targetReq.name,
      email: targetReq.email,
      college: targetReq.college,
      ...(targetReq.department ? { department: targetReq.department } : {}),
      ...(targetReq.roll ? { roll: targetReq.roll } : {}),
      ...(targetReq.subject ? { subject: targetReq.subject } : {}),
    };
  }

  res.json({
    success: true,
    message: `Registration request ${status.toLowerCase()} successfully`,
    request: targetReq,
  });
};

export const forgotPassword = (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    message: `Password reset link sent to ${email || 'registered address'}.`,
  });
};

export const logout = (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
};

export const authController = {
  login,
  register,
  getRegistrationRequests,
  updateRegistrationRequestStatus,
  me: getCurrentUser,
  getCurrentUser,
  forgotPassword,
  logout
};

export default authController;
