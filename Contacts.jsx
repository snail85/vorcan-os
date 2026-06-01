import { useState } from 'react';
import { Send, Plus, Linkedin, Globe, Phone, Mail, Star, TrendingUp, UserCheck } from 'lucide-react';
import { initials, fmtDate } from '../lib/data';

const SIGNALS = ['Job Change','Funding','Hiring','Competitor','Keyword'];
const SENIORITY = ['Founder/C-level','VP','Director','Manager','Other'];

const mockLeads = [
  { id:'l1', name:'David Thornton', title:'Head of Sustainability', company:'BlackRock Mining', signal:'Funding', seniority:'Director', linkedinUrl:'linkedin.com/in/dthornton', icp:88, source:'LinkedIn', addedAt:'2025-06-03', notes:'Company announced £12M Series B. Perfect timing for energy transition.' },
  { id:'l2', name:'Emma Briggs', title:'VP Operations', company:'Atlas Copper', signal:'Job Change', seniority:'VP', linkedinUrl:'linkedin.com/in/ebriggs', icp:82, source:'LinkedIn', addedAt:'2025-06-02', notes:'Joined Atlas 3 weeks ago. Likely reviewing operational costs.' },
  { id:'l3', name:'Nathan Ford', title:'CEO', company:'Pinnacle Resources', signal:'Hiring', seniority:'Founder/C-level', linkedinUrl:'linkedin.com/in/nford', icp:76, source:'Referral', addedAt:'2025-06-01', notes:'Multiple sustainability hires posted this week.' },
];

export default function Outreach({ data, setData }) {
  const [leads, setLeads] = useState(mockLeads);
  const [tab, setTab] = useState('queue');

  const icpColor = (score) => score >= 80 ? '#276749' : score >= 65 ? '#92400E' : '#4A5568';
  const icpBg = (score) => score >= 80 ? '#F0FFF4' : score >= 65 ? '#FEF3C7' : '#F7FAFC';

  return (
    <div style={{ padding:'28px 32px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:700, color:'#0F1921' }}>Outreach & BD</h1>
          <p style={{ color:'#9BA5AF', fontSize:13, marginTop:2 }}>Lead queue, ICP scoring, and outreach tracking</p>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button className="btn btn-outline btn-sm"><Linkedin size={13} /> Import from LinkedIn</button>
          <button className="btn btn-primary btn-sm"><Plus size={13} /> Add Lead</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 }}>
        {[
          { label:'In Queue', value:leads.length, icon:Send, color:'#60A5FA' },
          { label:'High ICP (≥80)', value:leads.filter(l=>l.icp>=80).length, icon:Star, color:'#C6A969' },
          { label:'Converted to Deal', value:2, icon:UserCheck, color:'#4ADE80' },
        ].map(({label,value,icon:Icon,color}) => (
          <div key={label} className="stat-card">
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:36, height:36, borderRadius:8, background:color+'18', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon size={16} color={color} />
              </div>
              <div>
                <div style={{ fontSize:22, fontWeight:700, color:'#0F1921' }}>{value}</div>
                <div style={{ fontSize:11, color:'#9BA5AF', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em' }}>{label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:0, marginBottom:20, background:'#F4F2EF', borderRadius:8, padding:3, width:'fit-content' }}>
        {[['queue','Outreach Queue'],['sent','Sent'],['replied','Replied']].map(([id,label]) => (
          <button key={id} onClick={()=>setTab(id)} style={{
            padding:'6px 16px', borderRadius:6, border:'none', cursor:'pointer', fontFamily:'inherit',
            fontSize:12, fontWeight:tab===id?600:400,
            background: tab===id ? '#fff' : 'transparent',
            color: tab===id ? '#0F1921' : '#9BA5AF',
            boxShadow: tab===id ? '0 1px 3px rgba(15,25,33,0.08)' : 'none',
          }}>{label}</button>
        ))}
      </div>

      {/* Lead cards */}
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {leads.sort((a,b)=>b.icp-a.icp).map(lead => (
          <div key={lead.id} className="card" style={{ padding:18 }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
              <div style={{ width:44, height:44, borderRadius:10, background:'#0F1921', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, color:'#C6A969', flexShrink:0 }}>
                {initials(lead.name)}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                  <span style={{ fontWeight:700, fontSize:14, color:'#0F1921' }}>{lead.name}</span>
                  <span style={{ fontSize:11, padding:'2px 8px', borderRadius:20, fontWeight:600, background:icpBg(lead.icp), color:icpColor(lead.icp) }}>ICP {lead.icp}</span>
                  <span style={{ fontSize:11, background:'#EBF4FF', color:'#2B6CB0', padding:'2px 8px', borderRadius:20, fontWeight:600 }}>{lead.signal}</span>
                </div>
                <div style={{ fontSize:12, color:'#5A6472', marginBottom:6 }}>{lead.title} · {lead.company}</div>
                <div style={{ fontSize:12, color:'#9BA5AF', fontStyle:'italic' }}>{lead.notes}</div>
              </div>
              <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                <button className="btn btn-outline btn-sm" style={{ gap:5 }}>
                  <Linkedin size={12} /> View Profile
                </button>
                <button className="btn btn-gold btn-sm" style={{ gap:5 }}>
                  <Send size={12} /> Draft Message
                </button>
                <button className="btn btn-primary btn-sm" onClick={()=>{
                  const newDeal = { id:'d'+Date.now(), title:'New Deal', companyId:null, contactId:null, stage:'Lead', value:0, probability:20, expectedClose:'', source:lead.source, owner:'Craig', notes:lead.notes, createdAt:new Date().toISOString().split('T')[0] };
                  setData(prev=>({...prev, deals:[...prev.deals,newDeal]}));
                  setLeads(prev=>prev.filter(l=>l.id!==lead.id));
                }} style={{ gap:5 }}>Convert →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
