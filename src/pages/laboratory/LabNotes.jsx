import { useState } from 'react';
import { UploadCloud, Trash2, Eye, Download, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { DS } from '../../data';
import { Modal } from '../../components/ui';

export default function LabNotes() {
  const [notes, setNotes] = useState(
    DS.notes.rows.map((r) => ({ ...r, sample: true }))
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [uploadType, setUploadType] = useState('Digital');
  const [selectedExp, setSelectedExp] = useState('Bubble sort');
  const [previewNote, setPreviewNote] = useState(null);

  const filteredNotes = notes.filter((x) => {
    const matchesType = filterType === 'All' || x.type === filterType;
    const matchesSearch = JSON.stringify([x.title, x.experiment])
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const downloadNote = (note) => {
    const a = document.createElement('a');
    a.href =
      note.url ||
      URL.createObjectURL(
        new Blob([`SmartLab Note: ${note.title} (${note.experiment})\n\nConcepts, diagrams & handwritten notes.`])
      );
    a.download = note.sample ? `${note.title}.txt` : note.title;
    a.click();
  };

  return (
    <div className="space-y-4">
      {/* Upload and Search Controls */}
      <div className="glass p-4 flex flex-wrap gap-2.5 items-center">
        <div className="relative max-w-xs flex-1">
          <input
            className="inp pl-8"
            placeholder="Search notes & diagrams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={15} className="absolute left-2.5 top-3 text-mute" />
        </div>

        <select
          className="inp !w-auto"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          {['All', 'Digital', 'Handwritten'].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>

        <span className="text-mute text-sm ml-auto">Category:</span>
        <select
          className="inp !w-auto"
          value={uploadType}
          onChange={(e) => setUploadType(e.target.value)}
        >
          <option>Digital</option>
          <option>Handwritten</option>
        </select>

        <select
          className="inp !w-auto"
          value={selectedExp}
          onChange={(e) => setSelectedExp(e.target.value)}
        >
          {DS.experiments.rows.map((r) => (
            <option key={r.id}>{r.title}</option>
          ))}
        </select>

        <label className="btn cursor-pointer">
          <UploadCloud size={16} />
          Upload Scan or PDF
          <input
            type="file"
            hidden
            accept="image/*,.pdf"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setNotes([
                  {
                    id: Date.now(),
                    title: file.name,
                    type: uploadType,
                    experiment: selectedExp,
                    date: new Date().toISOString().slice(0, 10),
                    url: URL.createObjectURL(file),
                    img: file.type.startsWith('image'),
                  },
                  ...notes,
                ]);
                toast.success('Reference note uploaded');
              }
            }}
          />
        </label>
      </div>

      {/* Notes Grid */}
      {!filteredNotes.length && (
        <p className="text-center text-mute py-10">
          No notes match your filters. Upload handwritten notes or digital cheat sheets.
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((item) => (
          <div key={item.id} className="glass p-5">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-navy truncate pr-2">{item.title}</h4>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  item.type === 'Handwritten'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {item.type}
              </span>
            </div>

            <p className="text-xs text-mute mt-1">
              {item.experiment} · {item.date}
            </p>

            <div className="flex gap-2 mt-4 pt-3 border-t border-white/10">
              <button
                className="btn ghost text-xs py-1"
                aria-label="Preview"
                onClick={() => setPreviewNote(item)}
              >
                <Eye size={14} />
                Preview
              </button>
              <button
                className="btn ghost text-xs py-1"
                aria-label="Download"
                onClick={() => downloadNote(item)}
              >
                <Download size={14} />
                Download
              </button>
              <button
                className="btn ghost text-xs py-1 text-red-600 hover:bg-red-50"
                aria-label="Delete"
                onClick={() => {
                  setNotes(notes.filter((y) => y.id !== item.id));
                  toast.success('Note removed');
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Note preview modal */}
      {previewNote && (
        <Modal title={previewNote.title} onClose={() => setPreviewNote(null)}>
          {previewNote.img ? (
            <img
              src={previewNote.url}
              alt={previewNote.title}
              className="rounded-lg max-h-80 mx-auto object-contain"
            />
          ) : previewNote.url ? (
            <div className="text-center py-6">
              <a
                className="btn"
                href={previewNote.url}
                target="_blank"
                rel="noreferrer"
              >
                Open Document in New Tab
              </a>
            </div>
          ) : (
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                <b>Experiment:</b> {previewNote.experiment}
              </p>
              <p>
                <b>Category:</b> {previewNote.type} Reference Note
              </p>
              <p className="text-mute text-xs">
                Includes algorithm notes, pseudocode reference, diagrams, and faculty remarks.
              </p>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
