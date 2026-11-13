import { Trophy, Flame, Award, Star, Crown, Lock } from 'lucide-react';
import { getProgress as prog } from '../../utils/progress';

export default function GamificationAchievements() {
  const p = prog();
  const totalPoints = 1000 + p.done * 100 + p.score * 50;

  const BADGES = [
    { name: 'First Program', earned: true, desc: 'Executed your first code in workspace', icon: '🚀', color: 'emerald' },
    { name: 'Python Beginner', earned: true, desc: 'Completed initial Python lab experiments', icon: '🐍', color: 'emerald' },
    { name: 'Java Explorer', earned: true, desc: 'Compiled Java class with zero errors', icon: '☕', color: 'amber' },
    { name: 'C Programmer', earned: false, desc: 'Pass all pointer and memory management exercises', icon: '⚙️', color: 'slate' },
    { name: 'Debugging Expert', earned: p.outOf > 0 && p.score === p.outOf, desc: 'Scored 100% on MCQ & test cases', icon: '🔍', color: 'aqua' },
    { name: 'Practical Master', earned: p.done === p.total, desc: 'Completed all experiments in curriculum', icon: '👑', color: 'azure' },
  ];

  const LEADERBOARD = [
    ['Priya Das', 1480, 'CSE'],
    ['Sneha Reddy', totalPoints, 'CSE'],
    ['Neha Rao', 1105, 'CSE'],
    ['Imran Khan', 950, 'CSE'],
    ['Rahul Verma', 880, 'CSE'],
  ].sort((a, b) => b[1] - a[1]);

  const RANK_ICONS = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

  return (
    <div className="space-y-5 stagger">
      <div className="grid lg:grid-cols-3 gap-5">
        {/* XP Card */}
        <div className="glass overflow-hidden">
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={20} />
              <span className="text-sm font-bold">Total Experience</span>
            </div>
            <p className="text-5xl font-extrabold tracking-tight">{totalPoints.toLocaleString()}</p>
            <p className="text-amber-100 text-sm mt-1">XP points earned</p>
          </div>
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-orange-50 border border-orange-100">
              <Flame size={20} className="text-orange-500" />
              <div>
                <p className="text-sm font-bold text-orange-700">5-Day Streak</p>
                <p className="text-xs text-orange-500">Consecutive practice sessions</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-aqua-50 border border-aqua-100">
              <Star size={20} className="text-aqua-500" />
              <div>
                <p className="text-sm font-bold text-aqua-700">Rank #2</p>
                <p className="text-xs text-aqua-400">In your department</p>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="glass p-5 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-aqua-50 border border-aqua-100 grid place-items-center">
              <Award size={15} className="text-aqua-500" />
            </div>
            <h3 className="font-bold text-slate-800">Achievement Badges</h3>
            <span className="ml-auto text-xs font-bold text-slate-400">
              {BADGES.filter((b) => b.earned).length}/{BADGES.length} Earned
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {BADGES.map(({ name, earned, desc, icon }) => (
              <div
                key={name}
                className={`p-3.5 rounded-xl border transition-all duration-200 ${
                  earned
                    ? 'bg-gradient-to-br from-aqua-50 to-azure-50 border-aqua-200'
                    : 'bg-slate-50 border-slate-100 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl leading-none">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">{name}</span>
                      {!earned && <Lock size={11} className="text-slate-400" />}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-snug">{desc}</p>
                    {earned && (
                      <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                        🏅 Earned
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="glass overflow-hidden">
        <div className="px-5 pt-5 pb-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 grid place-items-center">
            <Crown size={15} className="text-amber-500" />
          </div>
          <h3 className="font-bold text-slate-800">Department Leaderboard</h3>
          <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg">
            CSE · Practical Labs
          </span>
        </div>
        <div>
          {LEADERBOARD.map(([name, points, dept], idx) => {
            const isMe = name === 'Sneha Reddy';
            return (
              <div
                key={name}
                className={`flex items-center gap-4 px-5 py-4 border-b border-slate-50 last:border-0 transition-colors ${
                  isMe ? 'bg-aqua-50/50' : ''
                }`}
              >
                <span className="text-lg w-6 text-center">{RANK_ICONS[idx]}</span>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-aqua-100 to-azure-100 text-aqua-700 font-bold text-sm grid place-items-center flex-shrink-0">
                  {name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${isMe ? 'text-aqua-700' : 'text-slate-700'}`}>
                    {name} {isMe && <span className="text-xs font-normal text-aqua-400">(you)</span>}
                  </p>
                  <p className="text-xs text-slate-400">{dept}</p>
                </div>
                <span className="font-mono font-extrabold text-aqua-600">{points.toLocaleString()} XP</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
