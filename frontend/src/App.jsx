import { useState, useEffect, Component } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useAuth } from './context/Auth';
import { NAV } from './config';

import Layout from './components/Layout';
import { Crud } from './components/ui';
import Preloader from './components/common/Preloader';
import Aurora from './components/common/Aurora';

// Landing Page
import LandingPage from './pages/LandingPage';

// Authentication
import { Login, Register, ForgotPassword } from './pages/auth';

// Dashboard
import { DashboardPage } from './pages/dashboard';

// Coding & AI Tools
import {
  CodingWorkspace,
  AIAssistant,
  DryRunVisualizer,
  SmartCodeReview,
  CodeExecutionHistory,
} from './pages/coding';

// Laboratory
import {
  LabManuals,
  LabProgressTracker,
  LabNotes,
  DigitalLabRecords,
} from './pages/laboratory';

// Assessments & Viva
import {
  ScheduleAssessment,
  ExamSession,
  MCQManagement,
  MCQTest,
  StudentViva,
  FacultyViva,
} from './pages/assessment';

// Faculty Tools
import {
  CreateTask,
  LiveMonitoring,
  CodeSimilarity,
  InternalMarks,
} from './pages/faculty';

// Student Tools & Gamification
import {
  DailyTasks,
  SkillPassport,
  StudentPerformance,
  AdaptiveLearning,
  GamificationAchievements,
  QRAttendance,
} from './pages/student';

// Administration & Multi-College
import {
  CollegeManagement,
  CollegeRegistration,
  ResourceManagement,
  UserApprovalRequests,
} from './pages/admin';

// Analytics & Reports
import {
  AcademicAnalytics,
  DepartmentAnalytics,
} from './pages/analytics';

// Common Views
import {
  ProfilePage,
  NotificationsPage,
  RecordDetailPage,
} from './pages/common';

function RoleGuard() {
  const { user } = useAuth();
  const { role } = useParams();

  if (!user) return <Navigate to="/login" replace />;
  if (!NAV[role]) return <NotFound />;

  if (user.role !== role) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Aurora />
        <div className="glass p-10 text-center max-w-lg w-full pop">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 grid place-items-center mx-auto mb-5">
            <span className="text-2xl">🔒</span>
          </div>
          <h2 className="font-display text-xl font-semibold text-white mb-2">Unauthorized area</h2>
          <p className="text-slate-400 text-sm mb-6">
            Your active role ({user.role}) does not have permission to access the {role} workspace.
          </p>
          <button className="btn" onClick={() => window.history.back()}>Go back</button>
        </div>
      </div>
    );
  }

  return <Layout />;
}

function PageContent() {
  const { role, page } = useParams();
  const navItem = NAV[role]?.find((i) => i.p === page);

  if (!navItem) return <NotFound />;

  switch (navItem.k) {
    case 'dash':     return <DashboardPage role={role} />;
    case 'regapp':   return <UserApprovalRequests />;
    case 'chart':    return <AcademicAnalytics />;
    case 'hodan':    return <DepartmentAnalytics />;
    case 'track':    return <LabProgressTracker />;
    case 'perf':     return <StudentPerformance />;
    case 'ftask':    return <CreateTask />;
    case 'colreg':   return <CollegeRegistration />;
    case 'sched':    return <ScheduleAssessment />;
    case 'fviva':    return <FacultyViva />;
    case 'college':  return <CollegeManagement />;
    case 'res':      return <ResourceManagement />;
    case 'profile':  return <ProfilePage />;
    case 'notif':    return <NotificationsPage />;
    case 'code':     return <CodingWorkspace />;
    case 'chat':     return <AIAssistant />;
    case 'dry':      return <DryRunVisualizer />;
    case 'review':   return <SmartCodeReview />;
    case 'hist':     return <CodeExecutionHistory />;
    case 'monitor':  return <LiveMonitoring />;
    case 'sim':      return <CodeSimilarity />;
    case 'mcqgen':   return <MCQManagement />;
    case 'quiz':     return <MCQTest />;
    case 'viva':     return <StudentViva />;
    case 'exam':     return <ExamSession />;
    case 'manual':   return <LabManuals />;
    case 'rec':      return <DigitalLabRecords />;
    case 'notes':    return <LabNotes />;
    case 'task':     return <DailyTasks />;
    case 'ach':      return <GamificationAchievements />;
    case 'marks':    return <InternalMarks />;
    case 'learn':    return <AdaptiveLearning />;
    case 'passport': return <SkillPassport />;
    case 'qr':       return <QRAttendance role={role} />;
    default:         return <Crud key={navItem.d} k={navItem.d} title={navItem.t} />;
  }
}

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('SmartLab Render Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px] p-4">
          <div className="glass p-10 text-center max-w-md w-full pop">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 grid place-items-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="font-display font-semibold text-white text-lg mb-2">Something went wrong</h2>
            <p className="text-slate-400 text-sm mb-5">An error occurred while loading this view.</p>
            <button className="btn" onClick={() => this.setState({ hasError: false })}>Retry loading</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function ViewLoader({ pageKey, children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, [pageKey]);

  if (!ready) {
    return (
      <div className="space-y-4 stagger">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass h-32 shimmer rounded-2xl" />
        ))}
      </div>
    );
  }

  return <ErrorBoundary key={pageKey}>{children}</ErrorBoundary>;
}

function PageWrapper() {
  const { role, page } = useParams();
  return (
    <ViewLoader pageKey={`${role}-${page}`}>
      <PageContent />
    </ViewLoader>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Aurora />
      <div className="text-center max-w-md pop">
        <h1 className="font-display text-[110px] leading-none font-bold text-gradient float">404</h1>
        <div className="glass p-8 -mt-2">
          <h2 className="font-display text-xl font-semibold text-white mb-2">Page not found</h2>
          <p className="text-slate-400 text-sm mb-5">The requested page does not exist or has been relocated.</p>
          <button className="btn" onClick={() => window.history.back()}>Go back</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // Branded preloader: once per browser session
  const [booting, setBooting] = useState(() => {
    try { return !sessionStorage.getItem('smartlab_boot'); } catch { return true; }
  });
  const done = () => {
    try { sessionStorage.setItem('smartlab_boot', '1'); } catch {}
    setBooting(false);
  };

  return (
    <>
      {booting && <Preloader onComplete={done} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />

        <Route path="/:role" element={<RoleGuard />}>
          <Route path=":page" element={<PageWrapper />} />
          <Route path=":page/:id" element={<RecordDetailPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
