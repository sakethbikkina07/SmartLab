import {
  LayoutDashboard,
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  FlaskConical,
  ListChecks,
  Code2,
  ClipboardCheck,
  Bot,
  BarChart3,
  QrCode,
  Award,
  Trophy,
  FileText,
  Activity,
  Server,
  Layers,
  Eye,
  HelpCircle,
  Mic,
  History,
  StickyNote,
  Calculator,
} from 'lucide-react';

const n = (p, t, i, k = 'crud', d = p) => ({ p, t, i, k, d });

export const NAV = {
  superadmin: [
    n('dashboard', 'Overview', LayoutDashboard, 'dash'),
    n('colleges', 'Colleges', Building2, 'college'),
    n('departments', 'Departments Overview', Layers),
    n('users', 'Platform Users', Users),
    n('analytics', 'Platform Analytics', BarChart3, 'chart'),
    n('activity', 'System Activity', Activity),
  ],
  admin: [
    n('dashboard', 'Overview', LayoutDashboard, 'dash'),
    n('departments', 'Departments', Layers),
    n('faculty', 'Faculty', Users),
    n('students', 'Students', GraduationCap),
    n('subjects', 'Subjects', BookOpen),
    n('resources', 'Laboratory Resources', Server, 'res'),
    n('reports', 'Reports', BarChart3, 'chart'),
  ],
  hod: [
    n('dashboard', 'Overview', LayoutDashboard, 'dash'),
    n('faculty', 'Faculty Activities', Users),
    n('students', 'Student Progress', GraduationCap),
    n('subjects', 'Subjects', BookOpen),
    n('experiments', 'Experiments', FlaskConical),
    n('internal-marks', 'Internal Marks', Calculator, 'marks'),
    n('analytics', 'Department Analytics', BarChart3, 'hodan'),
  ],
  faculty: [
    n('dashboard', 'Overview', LayoutDashboard, 'dash'),
    n('subjects', 'My Subjects', BookOpen),
    n('manuals', 'Lab Manuals', FileText, 'manual'),
    n('experiments', 'Experiments', FlaskConical),
    n('tasks', 'Daily Tasks', ListChecks, 'ftask'),
    n('assessments', 'Practical Assessments', ClipboardCheck, 'sched'),
    n('submissions', 'Submissions & Similarity', Eye, 'sim'),
    n('monitoring', 'Live Lab Monitoring', Activity, 'monitor'),
    n('mcq', 'MCQ Management', HelpCircle, 'mcqgen'),
    n('viva', 'Viva Management', Mic, 'fviva'),
    n('attendance', 'Attendance', QrCode, 'qr'),
    n('resources', 'Lab Resources', Server, 'res'),
    n('reports', 'Reports', BarChart3, 'chart'),
  ],
  student: [
    n('dashboard', 'Overview', LayoutDashboard, 'dash'),
    n('subjects', 'My Subjects', BookOpen),
    n('manuals', 'Lab Manuals', FileText, 'manual'),
    n('experiments', 'Experiments', FlaskConical, 'track'),
    n('tasks', 'Daily Tasks', ListChecks, 'task'),
    n('coding', 'Coding Workspace', Code2, 'code'),
    n('assessments', 'Practical Assessments', ClipboardCheck, 'exam'),
    n('mcq', 'MCQ Tests', HelpCircle, 'quiz'),
    n('assistant', 'AI Assistant', Bot, 'chat'),
    n('learning', 'Adaptive Learning', BookOpen, 'learn'),
    n('viva', 'Viva Preparation', Mic, 'viva'),
    n('dry-run', 'Dry Run Visualizer', Eye, 'dry'),
    n('review', 'Smart Code Review', ClipboardCheck, 'review'),
    n('records', 'Digital Lab Records', FileText, 'rec'),
    n('notes', 'Reference Notes', StickyNote, 'notes'),
    n('history', 'Code History', History, 'hist'),
    n('skills', 'Skill Passport', Award, 'passport'),
    n('performance', 'My Performance', BarChart3, 'perf'),
    n('achievements', 'Achievements', Trophy, 'ach'),
    n('attendance', 'Attendance', QrCode, 'qr'),
  ],
};

export const STATS = {
  superadmin: [
    ['Total Colleges', 5],
    ['Students', 5],
    ['Faculty', 5],
    ['Departments', 5],
    ['Active Colleges', 5],
    ['Lab Sessions', 5],
  ],
  admin: [
    ['Departments', 5],
    ['Faculty', 5],
    ['Students', 5],
    ['Subjects', 5],
    ['Active Labs', 5],
    ['Pending', 0],
  ],
  hod: [
    ['Students', 5],
    ['Faculty', 5],
    ['Subjects', 5],
    ['Completion', '80%'],
    ['Avg Performance', '82%'],
    ['Pending Evals', 2],
  ],
  faculty: [
    ['Subjects', 5],
    ['Students', 5],
    ['Active Experiments', 5],
    ['Pending Submissions', 2],
    ['Scheduled Tests', 2],
    ['Evaluated', 5],
  ],
  student: [
    ['Experiments', 5],
    ['Completed', 4],
    ['Pending Tasks', 1],
    ['Avg Marks', '86%'],
    ['Skill Score', 82],
    ['Upcoming Tests', 1],
  ],
};

// Append common nav items to all roles
Object.values(NAV).forEach((l) =>
  l.push(
    n('profile', 'Profile & Settings', Users, 'profile'),
    n('notifications', 'Notifications', Activity, 'notif')
  )
);

// Insert role-specific additional items
NAV.superadmin.splice(
  2,
  0,
  n('register', 'College Registration', Building2, 'colreg')
);
NAV.faculty.splice(
  -2,
  0,
  n('performance', 'Student Performance', BarChart3, 'perf')
);
NAV.hod.splice(
  -1,
  0,
  n('completion', 'Laboratory Completion', FlaskConical, 'track')
);
