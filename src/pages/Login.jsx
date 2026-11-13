import {useState} from 'react';import {useNavigate,Navigate,Link} from 'react-router-dom';import {FlaskConical,Eye,EyeOff} from 'lucide-react';
import {useAuth,DEMO} from '../context/Auth';import {ROLES} from '../config';
export default function Login(){
 const {user,login}=useAuth();const nav=useNavigate();const [role,setR]=useState('student');const [show,setS]=useState(false);
 if(user)return <Navigate to={`/${user.role}/dashboard`}/>;
 return <div className="min-h-screen grid lg:grid-cols-2 gap-6 p-4 items-center max-w-6xl mx-auto">
  <section className="p-6"><div className="flex items-center gap-3"><div className="bg-brand p-3 rounded-2xl text-white"><FlaskConical/></div><span className="text-2xl font-extrabold text-navy">SmartLab</span></div>
   <h1 className="text-4xl lg:text-5xl font-extrabold text-navy mt-8 leading-tight">From Record-Oriented Labs to Implementation-Oriented Learning.</h1>
   <p className="text-mute mt-4 max-w-md">AI-powered practical laboratory automation and continuous assessment for engineering colleges.</p></section>
  <form className="glass p-8 space-y-4 max-w-md w-full justify-self-center" onSubmit={e=>{e.preventDefault();login(role);nav(`/${role}/dashboard`)}}>
   <h2 className="text-xl font-bold text-navy">Sign in</h2>
   <div className="grid grid-cols-3 gap-2">{Object.entries(ROLES).map(([k,v])=><button type="button" key={k} onClick={()=>setR(k)} className={`text-xs font-semibold py-2 rounded-xl border ${role===k?'bg-brand text-white border-brand':'bg-white/[0.05] border-white/10'}`}>{v}</button>)}</div>
   <label className="block text-sm font-medium">Email<input className="inp mt-1" value={DEMO[role].email} readOnly/></label>
   <label className="block text-sm font-medium">Password<div className="relative"><input className="inp mt-1" type={show?'text':'password'} defaultValue="demo1234"/><button type="button" className="absolute right-3 top-4 text-mute" onClick={()=>setS(!show)} aria-label="Toggle password">{show?<EyeOff size={16}/>:<Eye size={16}/>}</button></div></label>
   <button className="btn w-full justify-center">Sign in as {ROLES[role]}</button>
   <Link to="/forgot" className="text-sm text-brand font-semibold">Forgot password?</Link><p className="text-xs text-mute">Demo authentication stored in localStorage. Not production security.</p></form></div>}
