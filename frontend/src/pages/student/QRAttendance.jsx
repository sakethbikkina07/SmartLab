import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ScanLine, CheckCircle, Download, Calendar, Users, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { DS } from '../../data';

export default function QRAttendance({ role }) {
  const isFaculty = role === 'faculty';
  const [marked, setMarked] = useState(false);
  const [sessionCode] = useState(
    'SMARTLAB|PYTHON-LAB|2026-11-11|' + Math.random().toString(36).slice(2, 8)
  );

  const [attendanceRecords, setAttendanceRecords] = useState(DS.attendance.rows);
  const presentCount = attendanceRecords.filter((x) => x.status === 'Present').length;
  const pct = Math.round((presentCount / attendanceRecords.length) * 100);

  const exportAttendanceCSV = () => {
    const csv = [
      'student,roll,status',
      ...attendanceRecords.map((x) => `${x.student},${x.roll},${x.status}`),
    ].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'SmartLab-Attendance.csv';
    a.click();
    toast.success('Attendance report exported');
  };

  const history = [
    ['10 Nov, 2026', 'Python Programming Lab', 'Present'],
    ['07 Nov, 2026', 'Python Programming Lab', 'Present'],
    ['03 Nov, 2026', 'Data Structures Lab', 'Absent'],
    ['31 Oct, 2026', 'Python Programming Lab', 'Present'],
  ];

  return (
    <div className="space-y-5 stagger">
      <div className="grid lg:grid-cols-2 gap-5">
        {/* QR Code / Scan Panel */}
        {isFaculty ? (
          <div className="glass overflow-hidden">
            <div className="bg-gradient-to-br from-aqua-500 to-azure-600 p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-aqua-200 text-xs font-semibold uppercase tracking-wider mb-1">Session Active</p>
                  <h3 className="font-bold text-lg">CS301 · Python Lab</h3>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-dot" />
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1.5 text-aqua-200 text-xs">
                  <Users size={13} />
                  <span>{presentCount}/{attendanceRecords.length} Present</span>
                </div>
                <div className="flex items-center gap-1.5 text-aqua-200 text-xs">
                  <Clock size={13} />
                  <span>09:00 AM – 11:00 AM</span>
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col items-center">
              <p className="text-xs text-slate-400 mb-5 text-center max-w-xs">
                Project this QR code on the lab projector. Students scan to mark attendance.
              </p>
              <div className="p-4 rounded-2xl bg-white shadow-lg border border-slate-100">
                <QRCodeSVG value={sessionCode} size={180} />
              </div>
              <div className="mt-5 w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500">Attendance rate</span>
                  <span className="text-xs font-bold text-aqua-600">{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-aqua-400 to-azure-500 transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass overflow-hidden">
            <div className={`p-5 ${marked ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-aqua-500 to-azure-600'} text-white`}>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">Lab Attendance</p>
              <h3 className="font-bold text-lg">CS301 · Python Programming</h3>
              <p className="text-xs opacity-70 mt-1">Scan session QR to mark your presence</p>
            </div>
            <div className="p-6 flex flex-col items-center gap-4">
              <div className={`w-24 h-24 rounded-3xl grid place-items-center transition-all duration-500 ${
                marked
                  ? 'bg-emerald-50 border-2 border-emerald-200'
                  : 'bg-slate-50 border-2 border-dashed border-slate-200'
              }`}>
                {marked ? (
                  <CheckCircle size={40} className="text-emerald-500" />
                ) : (
                  <ScanLine size={36} className="text-slate-300" />
                )}
              </div>

              <div className={`w-full px-4 py-3 rounded-xl text-center text-sm font-bold ${
                marked
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {marked ? '✓ Attendance Marked – Present' : 'Not yet marked'}
              </div>

              {!marked && (
                <button
                  className="btn w-full justify-center"
                  onClick={() => {
                    setMarked(true);
                    toast.success('Attendance recorded via QR scan');
                  }}
                >
                  <ScanLine size={16} />
                  Simulate QR Scan
                </button>
              )}
            </div>
          </div>
        )}

        {/* Attendance History */}
        <div className="glass overflow-hidden">
          <div className="px-5 pt-5 pb-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-aqua-50 border border-aqua-100 grid place-items-center">
              <Calendar size={15} className="text-aqua-500" />
            </div>
            <h3 className="font-bold text-slate-800">Attendance History</h3>
          </div>
          <div>
            {history.map(([date, subject, status]) => (
              <div
                key={date + subject}
                className="flex items-center gap-4 px-5 py-4 border-b border-slate-50 last:border-0"
              >
                <div className={`w-9 h-9 rounded-xl grid place-items-center flex-shrink-0 ${
                  status === 'Present' ? 'bg-emerald-50' : 'bg-rose-50'
                }`}>
                  <CheckCircle size={16} className={status === 'Present' ? 'text-emerald-500' : 'text-rose-400'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{subject}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{date}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${
                  status === 'Present'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Faculty attendance roster */}
      {isFaculty && (
        <div className="glass overflow-hidden">
          <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800">Live Session Roster</h3>
              <p className="text-xs text-slate-400 mt-0.5">{presentCount} of {attendanceRecords.length} students present</p>
            </div>
            <button className="btn ghost !text-xs flex items-center gap-1.5" onClick={exportAttendanceCSV}>
              <Download size={13} />
              Export Report
            </button>
          </div>
          <div>
            {attendanceRecords.map((x) => (
              <div
                key={x.id}
                className="flex items-center gap-4 px-5 py-3.5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-aqua-100 to-azure-100 text-aqua-700 font-bold text-sm grid place-items-center flex-shrink-0">
                  {x.student[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700">{x.student}</p>
                  <p className="text-xs text-slate-400">{x.roll}</p>
                </div>
                <button
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    x.status === 'Present'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                      : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                  }`}
                  onClick={() =>
                    setAttendanceRecords(
                      attendanceRecords.map((y) =>
                        y.id === x.id
                          ? { ...y, status: y.status === 'Present' ? 'Absent' : 'Present' }
                          : y
                      )
                    )
                  }
                >
                  {x.status}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
