import toast from 'react-hot-toast';
import { Building2 } from 'lucide-react';
import { kv } from '../../services/store';
import { notify } from '../../context/Notifications';

export default function CollegeRegistration() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    const existing = kv.get('newcol', []);
    kv.set('newcol', [
      ...existing,
      {
        id: Date.now(),
        name: formData.name,
        city: formData.city,
        students: +formData.students,
        status: 'Active',
      },
    ]);

    e.target.reset();
    toast.success('College workspace created and registered successfully');
    notify(`New college registered: ${formData.name}`);
  };

  return (
    <div className="glass p-6 max-w-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="text-brand" size={22} />
        <h3 className="font-bold text-navy text-lg">Onboard New College Institution</h3>
      </div>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium">
            College / University Name
            <input required name="name" className="inp mt-1" placeholder="e.g. Hyderabad Institute of Technology" />
          </label>
        </div>

        <label className="block text-sm font-medium">
          City / Campus Location
          <input required name="city" className="inp mt-1" placeholder="e.g. Hyderabad" />
        </label>

        <label className="block text-sm font-medium">
          Student License Capacity
          <input required type="number" min={1} name="students" className="inp mt-1" defaultValue={1500} />
        </label>

        <label className="block text-sm font-medium">
          College Admin Email
          <input required type="email" name="email" className="inp mt-1" placeholder="admin@college.edu" />
        </label>

        <label className="block text-sm font-medium">
          University Affiliation
          <input name="aff" className="inp mt-1" placeholder="e.g. JNTU / Autonomous" />
        </label>

        <button className="btn sm:col-span-2 justify-center mt-3">
          Register college
        </button>
      </form>
    </div>
  );
}
