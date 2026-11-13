import { Download, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DigitalLabRecords() {
  const handleExportPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('SmartLab Digital Laboratory Record', 15, 20);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(11);
      const rows = [
        'Student Name: Sneha Reddy (Roll No: 21CS001)',
        'Course: B.Tech CSE · Semester 3',
        'Laboratory: CS301 Python Programming Lab',
        'Experiment Title: Implement Bubble Sort Algorithm',
        'Submitted Code: arr.sort() / def bubble_sort(arr): ...',
        'Execution Output: [12, 25, 34, 64]',
        'Test Results: 5/5 Test Cases Passed',
        'Faculty Evaluation: 10/10 - Excellent implementation & remarks',
        'Evaluated On: 2026-11-01 by Dr. Ananya Iyer',
      ];

      rows.forEach((line, idx) => {
        doc.text(line, 15, 35 + idx * 10);
      });

      doc.save('SmartLab-Digital-Record-21CS001.pdf');
      toast.success('Digital lab record downloaded as PDF');
    } catch {
      toast.error('Failed to export PDF');
    }
  };

  return (
    <div className="space-y-4">
      {/* Printable record card */}
      <div className="glass p-8 bg-white/[0.05] shadow-sm space-y-4" id="digital-record">
        <div className="flex justify-between items-start pb-4 border-b border-navy/10">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="text-brand" size={24} />
              <h2 className="text-2xl font-extrabold text-navy">Digital Laboratory Record</h2>
            </div>
            <p className="text-sm text-mute mt-1">
              Sneha Reddy · 21CS001 · Computer Science & Engineering
            </p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
            Verified & Approved
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          {[
            ['Subject', 'CS301 Python Programming Lab'],
            ['Experiment', 'Experiment 2: Bubble Sort Algorithm'],
            ['Aim', 'Sort numerical array in ascending order via comparison'],
            ['Evaluated On', '2026-11-01'],
            ['Test Cases', '5/5 Passed (100% test coverage)'],
            ['Faculty Grade', '10 / 10 (Grade O)'],
            ['Faculty Remarks', 'Optimal logic, verified time complexity analysis.'],
          ].map(([label, val]) => (
            <div key={label} className="p-2.5 rounded-lg bg-white/[0.05] border border-white/10">
              <p className="text-xs font-semibold text-mute">{label}</p>
              <p className="font-medium text-navy mt-0.5">{val}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs font-bold text-navy mb-1">Submitted Program Source:</p>
          <pre className="p-3 bg-black/40 border border-white/10 text-green-300 font-mono text-xs rounded-xl overflow-x-auto">
{`# Experiment 2: Bubble sort
arr = [64, 34, 25, 12]
for i in range(len(arr)):
    for j in range(0, len(arr) - i - 1):
        if arr[j] > arr[j + 1]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]
print(arr)`}
          </pre>
        </div>

        <div>
          <p className="text-xs font-bold text-navy mb-1">Program Execution Output:</p>
          <pre className="p-3 bg-black/40 border border-white/10 text-green-300 font-mono text-xs rounded-xl">
[12, 25, 34, 64]
          </pre>
        </div>
      </div>

      <button className="btn" onClick={handleExportPDF}>
        <Download size={16} />
        Download Official PDF Record
      </button>
    </div>
  );
}
