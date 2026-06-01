import { Building2, Globe, MapPin, Zap, TrendingUp } from 'lucide-react';
import { fmt, initials } from '../lib/data';

export default function Companies({ data }) {
  const { companies, contacts, deals } = data;
  return (
    <div style={{ padding:'28px 32px' }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:22, fontWeight:700, color:'#0F1921' }}>Companies</h1>
        <p style={{ color:'#9BA5AF', fontSize:13, marginTop:2 }}>{companies.length} accounts</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:16 }}>
        {companies.map(co => {
          const coContacts = contacts.filter(c=>c.companyId===co.id);
          const coDeals = deals.filter(d=>d.companyId===co.id);
          const activeDeals = coDeals.filter(d=>!['Lost','Archive'].includes(d.stage));
          const pipeline = activeDeals.reduce((a,b)=>a+b.value,0);
          return (
            <div key={co.id} className="card" style={{ padding:20, cursor:'pointer' }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 12px rgba(15,25,33,0.10)'}
              onMouseLeave={e=>e.currentTarget.style.boxShadow='0 1px 3px rgba(15,25,33,0.08)'}
            >
              <div style={{ display:'flex', alignItems:'flex-start', gap:12, marginBottom:14 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:'#0F1921', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, color:'#C6A969', flexShrink:0 }}>
                  {initials(co.name)}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:700, fontSize:14, color:'#0F1921' }}>{co.name}</div>
                  <div style={{ fontSize:11, color:'#9BA5AF', marginTop:2 }}>{co.industry} · {co.size} employees</div>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:14, paddingBottom:14, borderBottom:'1px solid #F4F2EF' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <MapPin size={11} color="#9BA5AF" />
                  <span style={{ fontSize:12, color:'#5A6472' }}>{co.location}</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <Zap size={11} color="#C6A969" />
                  <span style={{ fontSize:12, color:'#5A6472' }}>Energy spend: <strong style={{ color:'#0F1921' }}>{fmt(co.energySpend)}/yr</strong></span>
                </div>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:18, fontWeight:700, color:'#0F1921' }}>{coContacts.length}</div>
                  <div style={{ fontSize:10, color:'#9BA5AF', textTransform:'uppercase', letterSpacing:'0.05em' }}>Contacts</div>
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:18, fontWeight:700, color:'#0F1921' }}>{activeDeals.length}</div>
                  <div style={{ fontSize:10, color:'#9BA5AF', textTransform:'uppercase', letterSpacing:'0.05em' }}>Active Deals</div>
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:18, fontWeight:700, color:'#C6A969' }}>{fmt(pipeline)}</div>
                  <div style={{ fontSize:10, color:'#9BA5AF', textTransform:'uppercase', letterSpacing:'0.05em' }}>Pipeline</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
