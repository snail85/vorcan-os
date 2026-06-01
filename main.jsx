import { useState } from 'react';
import { LayoutDashboard, Kanban, Users, Building2, FileText, Send, Settings, ChevronRight, Bell, Search, Plus } from 'lucide-react';
import { initials } from '../lib/data';

const NAV = [
  { id:'dashboard', label:'Dashboard', icon:LayoutDashboard },
  { id:'pipeline', label:'Pipeline', icon:Kanban },
  { id:'contacts', label:'Contacts', icon:Users },
  { id:'companies', label:'Companies', icon:Building2 },
  { id:'documents', label:'Documents', icon:FileText },
  { id:'outreach', label:'Outreach', icon:Send },
];

export default function Layout({ page, setPage, children, onNewDeal }) {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden' }}>
      {/* Sidebar */}
      <aside style={{ width:220, background:'#0F1921', display:'flex', flexDirection:'column', flexShrink:0, borderRight:'1px solid rgba(255,255,255,0.06)' }}>
        {/* Logo */}
        <div style={{ padding:'20px 20px 16px', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, background:'#C6A969', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:16, color:'#0F1921' }}>V</div>
            <span style={{ color:'#fff', fontWeight:700, fontSize:15, letterSpacing:'-0.02em' }}>VORCAN</span>
          </div>
          <div style={{ color:'rgba(255,255,255,0.35)', fontSize:10, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', marginTop:4, paddingLeft:42 }}>OS</div>
        </div>
        {/* Nav */}
        <nav style={{ flex:1, padding:'12px 10px', overflowY:'auto' }}>
          {NAV.map(({id,label,icon:Icon}) => {
            const active = page === id;
            return (
              <button key={id} onClick={()=>setPage(id)} style={{
                display:'flex', alignItems:'center', gap:10, width:'100%',
                padding:'9px 12px', borderRadius:6, border:'none', cursor:'pointer',
                marginBottom:2, fontFamily:'inherit', fontSize:13, fontWeight:active?600:400,
                background: active ? 'rgba(198,169,105,0.15)' : 'transparent',
                color: active ? '#C6A969' : 'rgba(255,255,255,0.55)',
                transition:'all 0.15s',
              }}
              onMouseEnter={e=>{ if(!active){ e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.color='rgba(255,255,255,0.85)'; }}}
              onMouseLeave={e=>{ if(!active){ e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(255,255,255,0.55)'; }}}
              >
                <Icon size={15} />
                {label}
                {active && <ChevronRight size={12} style={{marginLeft:'auto'}} />}
              </button>
            );
          })}
        </nav>
        {/* User */}
        <div style={{ padding:'14px 16px', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:30, height:30, borderRadius:'50%', background:'#C6A969', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#0F1921', flexShrink:0 }}>CD</div>
            <div>
              <div style={{ color:'#fff', fontSize:12, fontWeight:600 }}>Craig Duncan</div>
              <div style={{ color:'rgba(255,255,255,0.35)', fontSize:11 }}>Admin</div>
            </div>
            <Settings size={13} style={{ marginLeft:'auto', color:'rgba(255,255,255,0.3)', cursor:'pointer' }} />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        {/* Top bar */}
        <header style={{ height:56, background:'#fff', borderBottom:'1px solid #E2DDD9', display:'flex', alignItems:'center', padding:'0 24px', gap:12, flexShrink:0 }}>
          <div style={{ flex:1, display:'flex', alignItems:'center', gap:8, background:'#F4F2EF', borderRadius:6, padding:'7px 12px', maxWidth:320, border:'1px solid #E2DDD9' }}>
            <Search size={13} color="#9BA5AF" />
            <input placeholder="Search deals, contacts, documents…" style={{ border:'none', background:'transparent', outline:'none', fontSize:13, color:'#0F1921', width:'100%', padding:0 }} />
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginLeft:'auto' }}>
            <button className="btn btn-outline btn-sm" style={{ gap:5 }} onClick={onNewDeal}>
              <Plus size={13} /> New Deal
            </button>
            <button style={{ width:32, height:32, borderRadius:6, border:'1px solid #E2DDD9', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <Bell size={14} color="#5A6472" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex:1, overflowY:'auto', padding:0 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
