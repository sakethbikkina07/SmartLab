import { createContext, useContext, useState, useEffect } from 'react';
import { kv } from '../services/store';

const NotifContext = createContext({ list: [], unread: 0 });

export const useNotifs = () => useContext(NotifContext);

const SEED = [
  { id: 1, t: 'New submission from Rahul Verma', read: false },
  { id: 2, t: 'Practical assessment scheduled for Nov 20', read: false },
  { id: 3, t: 'Manual published: Python Lab', read: true },
];

export const notify = (t) => {
  kv.set('notifs', [
    { id: Date.now(), t, read: false },
    ...kv.get('notifs', SEED),
  ]);
  window.dispatchEvent(new Event('sl-notifs'));
};

export function NotifProvider({ children }) {
  const [list, setList] = useState(() => kv.get('notifs', SEED));

  useEffect(() => {
    const handler = () => setList(kv.get('notifs', SEED));
    window.addEventListener('sl-notifs', handler);
    return () => window.removeEventListener('sl-notifs', handler);
  }, []);

  const save = (l) => {
    kv.set('notifs', l);
    setList(l);
  };

  return (
    <NotifContext.Provider
      value={{
        list,
        unread: list.filter((x) => !x.read).length,
        markAll: () => save(list.map((x) => ({ ...x, read: true }))),
        clear: () => save([]),
      }}
    >
      {children}
    </NotifContext.Provider>
  );
}
