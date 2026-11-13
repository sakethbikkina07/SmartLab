import { DS } from '../data';
import { kv } from '../services/store';

export const getProgress = () => {
  const track =
    kv.get('track') ||
    DS.experiments.rows.map((r, i) => ({
      st: [4, 1, 2, 3][i % 4],
    }));
  const [a = '0', b = '0'] = String(kv.get('score', '0/0')).split('/');
  return {
    done: track.filter((x) => x.st === 4).length,
    total: track.length,
    score: +a,
    outOf: +b,
  };
};
