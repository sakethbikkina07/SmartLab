import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Aurora from '../../components/common/Aurora';
import Logo from '../../components/common/Logo';

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <Aurora />
      <div className="glass glow-border !rounded-[1.75rem] p-8 w-full max-w-sm pop">
        <div className="mb-8"><Logo size={34} /></div>

        {!sent ? (
          <>
            <div className="w-12 h-12 rounded-2xl bg-aqua-50 border border-aqua-100 grid place-items-center mb-5">
              <Mail size={22} className="text-aqua-500" />
            </div>
            <h2 className="font-bold text-white text-2xl mb-1.5">Reset password</h2>
            <p className="text-sm text-slate-400 mb-6">Enter your email to receive a password reset link.</p>
            <input
              className="inp mb-4"
              type="email"
              placeholder="Your email address"
              defaultValue="student@smartlab.edu"
            />
            <button
              className="btn w-full justify-center py-3"
              onClick={() => setSent(true)}
            >
              Send reset link
            </button>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 grid place-items-center mb-5">
              <CheckCircle size={22} className="text-emerald-600" />
            </div>
            <h2 className="font-bold text-white text-2xl mb-1.5">Check your inbox</h2>
            <p className="text-sm text-slate-400 mb-6">Reset link sent! Set your new password below:</p>
            <input
              className="inp mb-4"
              type="password"
              placeholder="New password"
            />
            <button
              className="btn w-full justify-center py-3"
              onClick={() => toast.success('Password reset (demo)')}
            >
              Save new password
            </button>
          </>
        )}

        <div className="pt-5 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-aqua-400 hover:text-aqua-300 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
