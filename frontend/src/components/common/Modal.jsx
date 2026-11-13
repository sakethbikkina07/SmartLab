import { X } from 'lucide-react';

const Modal = ({ title, onClose, children, wide = false }) => (
  <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-md fade-in" onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
    <div className={`surface rounded-3xl pop w-full ${wide ? 'max-w-2xl' : 'max-w-md'} p-6 max-h-[90vh] overflow-y-auto`}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-white text-lg">{title}</h3>
        <button onClick={onClose} aria-label="Close" className="grid place-items-center w-8 h-8 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
          <X size={18} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default Modal;
