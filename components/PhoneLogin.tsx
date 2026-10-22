'use client';
import { useState, useEffect } from 'react';
export default function PhoneLogin() {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState<any>(null);
  useEffect(()=>{ const p=localStorage.getItem('kpata_phone'); const n=localStorage.getItem('kpata_name'); if(p){ setUser({phone:p,name:n}); } },[]);
  const save=()=>{ if(phone.length<11) return alert('Enter 080...'); localStorage.setItem('kpata_phone',phone); localStorage.setItem('kpata_name',name); setUser({phone,name}); };
  if(user) return <div style={{background:'#f0fdf4',border:'1px solid #86efac',padding:'8px 12px',borderRadius:'8px',fontSize:'13px'}}>✓ {user.name} ({user.phone}) - Same number on any device = same progress <button onClick={()=>{localStorage.clear(); setUser(null)}} style={{color:'#dc2626',marginLeft:'8px'}}>Change</button></div>;
  return <div style={{background:'white',border:'1px solid #e5e7eb',padding:'12px',borderRadius:'8px',display:'flex',gap:'8px',flexWrap:'wrap'}}><input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" style={{border:'1px solid #ddd',padding:'6px 8px',borderRadius:'6px'}}/><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="08031234567 - Your ID across devices" style={{border:'1px solid #ddd',padding:'6px 8px',borderRadius:'6px'}}/><button onClick={save} style={{background:'black',color:'white',padding:'7px 14px',borderRadius:'6px'}}>Save Progress</button><span style={{fontSize:'11px',color:'#6b7280'}}>No OTP cost - FREE - Same phone on laptop = same progress</span></div>;
}