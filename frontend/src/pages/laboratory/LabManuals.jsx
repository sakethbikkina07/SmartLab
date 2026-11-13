import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { UploadCloud, CheckCircle2, FileText, Sparkles, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const EXTRACTED_SAMPLE = {
  Aim: 'To design and implement the Bubble Sort algorithm in Python to sort an array of numerical integers in ascending order.',
  Objectives: '1. Understand comparison-based sorting mechanics.\n2. Measure algorithmic complexity and pass efficiency.\n3. Implement in-place data swapping.',
  Theory: 'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
  Algorithm: '1. Start from the 0th index.\n2. Compare adjacent elements.\n3. If arr[j] > arr[j+1], swap them.\n4. Repeat for all n-1 passes.',
  Procedure: '1. Open the SmartLab Browser Coding Workspace.\n2. Initialize sample test array.\n3. Implement nested sorting loop.\n4. Run against test cases.\n5. Submit for automated evaluation.',
  Tools: 'Python 3.10+, SmartLab Container Sandbox',
  ExpectedOutput: 'Sorted array: [12, 25, 34, 64]',
};

export default function LabManuals() {
  const { role } = useParams();
  const isFaculty = role === 'faculty';

  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');

  const handleExtract = () => {
    setExtractedData({ ...EXTRACTED_SAMPLE });
    toast.success('AI extracted experiment details from manual');
  };

  const handlePublish = () => {
    setIsPublished(true);
    toast.success('Lab manual published to students successfully');
  };

  return (
    <div className="space-y-4">
      {/* Role Banner / Description */}
      <div className="glass p-4 flex flex-wrap justify-between items-center gap-3">
        <div>
          <h2 className="font-bold text-navy text-lg">AI-Powered Digital Lab Manuals</h2>
          <p className="text-xs text-mute">
            {isFaculty
              ? 'Upload syllabus PDF/DOCX to automatically extract experiments, aims, procedures, and learning tasks.'
              : 'Browse approved digital laboratory manuals with aims, procedures, algorithms, and expected outputs.'}
          </p>
        </div>

        {isFaculty && (
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('upload')}
              className={`btn ${activeTab === 'upload' ? '' : 'ghost'}`}
            >
              Upload New Manual
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className={`btn ${activeTab === 'browse' ? '' : 'ghost'}`}
            >
              Browse Published Manuals
            </button>
          </div>
        )}
      </div>

      {/* Faculty Upload Section */}
      {isFaculty && activeTab === 'upload' && (
        <div className="space-y-4">
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files[0]) setUploadedFile(e.dataTransfer.files[0]);
            }}
            className="glass p-8 grid place-items-center text-center cursor-pointer border-dashed border-2 border-brand/40 hover:bg-white/[0.05] transition-all rounded-2xl"
          >
            <UploadCloud size={40} className="text-brand mb-2" />
            <p className="font-semibold text-navy">
              {uploadedFile ? uploadedFile.name : 'Drop a PDF or DOCX manual here, or click to browse'}
            </p>
            <p className="text-xs text-mute mt-1">Supports university syllabus documents up to 50MB</p>
            <input
              type="file"
              accept=".pdf,.docx"
              hidden
              onChange={(e) => {
                if (e.target.files[0]) setUploadedFile(e.target.files[0]);
              }}
            />
          </label>

          <div className="flex gap-2">
            <button
              className="btn"
              disabled={!uploadedFile}
              onClick={handleExtract}
            >
              <Sparkles size={16} />
              AI Extract Experiment Content
            </button>
          </div>

          {extractedData && (
            <div className="glass p-5 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <h3 className="font-bold text-navy flex items-center gap-2">
                  <Sparkles size={18} className="text-brand" />
                  Extracted Experiment Specifications (Editable)
                </h3>
                {isPublished && (
                  <span className="flex items-center gap-1 text-green-700 text-sm font-semibold bg-green-100 px-3 py-1 rounded-full">
                    <CheckCircle2 size={16} /> Published
                  </span>
                )}
              </div>

              {Object.keys(extractedData).map((fieldKey) => (
                <label key={fieldKey} className="block text-sm font-medium">
                  <span className="text-navy">{fieldKey}</span>
                  <textarea
                    className="inp mt-1 font-sans text-sm"
                    rows={fieldKey === 'Theory' || fieldKey === 'Procedure' ? 3 : 2}
                    value={extractedData[fieldKey]}
                    onChange={(e) =>
                      setExtractedData({
                        ...extractedData,
                        [fieldKey]: e.target.value,
                      })
                    }
                  />
                </label>
              ))}

              {/* AI-Suggested Tasks based on manual */}
              <div className="p-4 bg-tint/80 rounded-xl border border-brand/20">
                <h4 className="font-semibold text-navy mb-2 flex items-center gap-1.5">
                  <Sparkles size={16} className="text-brand" /> AI-Generated Practice Tasks
                </h4>
                <ul className="list-disc ml-5 text-sm space-y-1 text-slate-700">
                  <li>Sort an array of 10 randomly generated integers and count swap passes.</li>
                  <li>Modify algorithm to support descending order sorting.</li>
                  <li>Implement early-exit condition when zero swaps are detected.</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-2">
                <button className="btn" onClick={handlePublish}>
                  Approve & Publish to Students
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Published Manual Viewer (Students + Faculty Browse) */}
      {(activeTab === 'browse' || !isFaculty) && (
        <div className="space-y-4">
          <div className="glass p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-brand uppercase tracking-wider bg-brand/10 px-2.5 py-1 rounded-full">
                  Experiment 2 · Python Lab
                </span>
                <h3 className="text-xl font-extrabold text-navy mt-2">Bubble Sort Implementation</h3>
                <p className="text-sm text-mute">Course Code: CS301 · Verified by Dr. Ananya Iyer</p>
              </div>
              <button
                className="btn ghost text-xs"
                onClick={() => toast.success('Manual downloaded as PDF')}
              >
                <FileText size={15} />
                Download PDF
              </button>
            </div>

            <div className="space-y-4 text-sm divide-y divide-white/10">
              <div className="pt-2">
                <b className="text-navy">Aim:</b>
                <p className="text-slate-700 mt-1">{EXTRACTED_SAMPLE.Aim}</p>
              </div>

              <div className="pt-3">
                <b className="text-navy">Theory & Principles:</b>
                <p className="text-slate-700 mt-1">{EXTRACTED_SAMPLE.Theory}</p>
              </div>

              <div className="pt-3">
                <b className="text-navy">Algorithm:</b>
                <pre className="bg-white/[0.05] p-3 rounded-xl mt-1 text-xs font-mono text-slate-800 whitespace-pre-wrap">
                  {EXTRACTED_SAMPLE.Algorithm}
                </pre>
              </div>

              <div className="pt-3">
                <b className="text-navy">Step-by-step Procedure:</b>
                <pre className="bg-white/[0.05] p-3 rounded-xl mt-1 text-xs font-mono text-slate-800 whitespace-pre-wrap">
                  {EXTRACTED_SAMPLE.Procedure}
                </pre>
              </div>

              <div className="pt-3 grid sm:grid-cols-2 gap-4">
                <div>
                  <b className="text-navy">Required Tools:</b>
                  <p className="text-slate-700 mt-1">{EXTRACTED_SAMPLE.Tools}</p>
                </div>
                <div>
                  <b className="text-navy">Expected Output:</b>
                  <p className="text-slate-700 mt-1 font-mono text-xs">{EXTRACTED_SAMPLE.ExpectedOutput}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
