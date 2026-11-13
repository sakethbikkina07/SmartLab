import { useState } from 'react';
import toast from 'react-hot-toast';
import { Server, Monitor, HardDrive } from 'lucide-react';
import { DS } from '../../data';

export default function ResourceManagement() {
  const [resources, setResources] = useState(DS.resources.rows);

  const updateResource = (id, updates) => {
    setResources(
      resources.map((x) => (x.id === id ? { ...x, ...updates } : x))
    );
  };

  return (
    <div className="glass p-5 space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-white/10">
        <div>
          <h3 className="font-bold text-navy text-lg flex items-center gap-2">
            <Server className="text-brand" size={20} />
            Laboratory Resource Management
          </h3>
          <p className="text-xs text-mute">
            Track hardware computers, development boards, and equipment allocations across laboratories.
          </p>
        </div>
      </div>

      <div className="divide-y divide-white/10">
        {resources.map((res) => (
          <div
            key={res.id}
            className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
          >
            <div>
              <b className="text-navy text-base">{res.name}</b>
              <p className="text-xs text-mute mt-0.5">
                Type: {res.type} · Location: {res.location}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  res.status === 'Available'
                    ? 'bg-green-100 text-green-700'
                    : res.status === 'Allocated'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {res.status}
              </span>

              <div className="flex flex-wrap gap-1.5">
                <button
                  className="btn ghost text-xs py-1"
                  onClick={() => {
                    updateResource(res.id, { status: 'Allocated' });
                    toast.success(`${res.name} allocated to Python Lab`);
                  }}
                >
                  Allocate
                </button>
                <button
                  className="btn ghost text-xs py-1 text-amber-700"
                  onClick={() => {
                    updateResource(res.id, { status: 'Maintenance' });
                    toast.success(`Maintenance request ticket raised for ${res.name}`);
                  }}
                >
                  Maintenance
                </button>
                <button
                  className="btn ghost text-xs py-1 text-green-700"
                  onClick={() => {
                    updateResource(res.id, { status: 'Available' });
                    toast.success(`${res.name} marked as available`);
                  }}
                >
                  Available
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
