import { useState } from 'react';
import { X, Building2, User, Calendar, DollarSign, Tag, MessageSquare, FileText, ArrowRight, Trash2, Plus } from 'lucide-react';
import { STAGES, SOURCES, fmt, fmtDate, initials } from '../lib/data';

function ActivityItem({ a }) {
  const icons = { note:'💬', email:'📧', meeting:'📅', call:'📞' };
  return (
    <div style={{ display:'flex', gap:12, padding:'10px 0', borderBottom:'1px solid #F4F2EF' }}>
      <div style={{ fontSize:16, flexShrink:0, marginTop:1 }}>{icons[a.type]||'📝'}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:13, color:'#0F1921' }}>{a.text}</div>
        <div style={{ fontSize:11, color:'#9BA5AF', marginTop:3 }}>{a.user} · {fmtDate(a.date)}</div>
      </div>
    </div>
  );
}

export default function DealModal({ deal, data, setData, onClose }) {
  const [tab, setTab] = useState('overview');
  const [noteText, setNoteText] = useState('');
  const [editing, setEditing] = useState(false);
  const [editDeal, setEditDeal] = useState(deal);

  const co = data.companies.find(c => c.id === deal.companyId);
  const ct = data.contacts.find(c => c.id === deal.contactId);
  const docs = data.documents.filter(d => d.dealId === deal.id);
  const acts = data.activities.filter(a => a.dealId === deal.id);

  const save = () => {
    setData(prev => ({ ...prev, deals: prev.deals.map(d => d.id === deal.id ? editDeal : d) }));
    setEditing(false);
    onClose();
  };

  const addNote = () => {
    if (!noteText.trim()) return;
    const act = { id:'a'+Date.now(), dealId:deal.id, type:'note', text:noteText, date:new Date().toISOString().split('T')[0], user:'Craig' };
    setData(prev => ({ ...prev, activities: [act, ...prev.activities] }));
    setNoteText('');
  };

  const moveStage = (stage) => {
    setData(prev => ({ ...prev, deals: prev.deals.map(d => d.id===deal.id ? {...d,stage} : d) }));
    onClose();
  };

  const deleteDeal = () => {
    if (confirm('Delete this deal?')) {
      setData(prev => ({ ...prev, deals: prev.deals.filter(d => d.id!==deal.id) }));
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth:680 }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
              <span className={`stage-badge stage-${deal.stage}`}>{deal.stage}</span>
              <span style={{ fontSize:12, color:'#9BA5AF' }}>·</span>
              <span style={{ fontSize:12, color:'#9BA5AF' }}>{co?.name || 'No company'}</span>
            </div>
            <h2 style={{ fontSize:18, fontWeight:700, color:'#0F1921', lineHeight:1.2 }}>{deal.title}</h2>
          </div>
          <div style={{ display:'flex', gap:6, flexShrink:0 }}>
            <button className="btn btn-outline btn-sm" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
            <button onClick={onClose} style={{ width:30, height:30, border:'1px solid #E2DDD9', background:'transparent', borderRadius:6, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><X size={14} /></button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', borderBottom:'1px solid #E2DDD9', padding:'0 24px' }}>
          {['overview','documents','activity'].map(t => (
            <button key={t} onClick={()=>setTab(t)} style={{
              padding:'10px 16px', border:'none', background:'transparent', cursor:'pointer',
              fontSize:13, fontWeight:tab===t?600:400, fontFamily:'inherit',
              color:tab===t?'#0F1921':'#9BA5AF',
              borderBottom: tab===t ? '2px solid #C6A969' : '2px solid transparent',
              marginBottom:-1,
            }}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
          ))}
        </div>

        <div style={{ padding:24 }}>
          {tab === 'overview' && (
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
              {/* Key figures */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
                {[
                  { label:'Deal Value', value:fmt(editing?editDeal.value:deal.value) },
                  { label:'Probability', value:(editing?editDeal.probability:deal.probability)+'%' },
                  { label:'Expected Close', value:fmtDate(editing?editDeal.expectedClose:deal.expectedClose) },
                ].map(({label,value})=>(
                  <div key={label} style={{ background:'#F4F2EF', borderRadius:8, padding:'12px 14px' }}>
                    <div style={{ fontSize:11, color:'#9BA5AF', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:4 }}>{label}</div>
                    <div style={{ fontSize:16, fontWeight:700, color:'#0F1921' }}>{value}</div>
                  </div>
                ))}
              </div>

              {editing ? (
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  <div className="form-row">
                    <div className="form-field"><label>Deal Value (£)</label><input type="number" value={editDeal.value} onChange={e=>setEditDeal(p=>({...p,value:+e.target.value}))} /></div>
                    <div className="form-field"><label>Probability (%)</label><input type="number" min="0" max="100" value={editDeal.probability} onChange={e=>setEditDeal(p=>({...p,probability:+e.target.value}))} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-field"><label>Expected Close</label><input type="date" value={editDeal.expectedClose} onChange={e=>setEditDeal(p=>({...p,expectedClose:e.target.value}))} /></div>
                    <div className="form-field"><label>Stage</label>
                      <select value={editDeal.stage} onChange={e=>setEditDeal(p=>({...p,stage:e.target.value}))}>
                        {STAGES.map(s=><option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-field"><label>Notes</label><textarea rows={3} value={editDeal.notes} onChange={e=>setEditDeal(p=>({...p,notes:e.target.value}))} /></div>
                  <div style={{ display:'flex', gap:8 }}>
                    <button className="btn btn-primary" onClick={save}>Save Changes</button>
                    <button className="btn btn-danger btn-sm" onClick={deleteDeal}><Trash2 size={13}/> Delete Deal</button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Company & Contact */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                    <div style={{ border:'1px solid #E2DDD9', borderRadius:8, padding:14 }}>
                      <div style={{ fontSize:11, fontWeight:600, color:'#9BA5AF', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:10 }}>Company</div>
                      {co ? (
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:32, height:32, borderRadius:8, background:'#0F1921', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#C6A969' }}>{initials(co.name)}</div>
                          <div>
                            <div style={{ fontWeight:600, fontSize:13 }}>{co.name}</div>
                            <div style={{ fontSize:11, color:'#9BA5AF' }}>{co.industry} · {co.location}</div>
                          </div>
                        </div>
                      ) : <span style={{ color:'#9BA5AF', fontSize:12 }}>Not linked</span>}
                    </div>
                    <div style={{ border:'1px solid #E2DDD9', borderRadius:8, padding:14 }}>
                      <div style={{ fontSize:11, fontWeight:600, color:'#9BA5AF', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:10 }}>Primary Contact</div>
                      {ct ? (
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:32, height:32, borderRadius:'50%', background:'#C6A969', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#0F1921' }}>{initials(ct.name)}</div>
                          <div>
                            <div style={{ fontWeight:600, fontSize:13 }}>{ct.name}</div>
                            <div style={{ fontSize:11, color:'#9BA5AF' }}>{ct.title}</div>
                          </div>
                        </div>
                      ) : <span style={{ color:'#9BA5AF', fontSize:12 }}>Not linked</span>}
                    </div>
                  </div>

                  {deal.notes && (
                    <div style={{ background:'#F4F2EF', borderRadius:8, padding:14 }}>
                      <div style={{ fontSize:11, fontWeight:600, color:'#9BA5AF', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:6 }}>Notes</div>
                      <p style={{ fontSize:13, color:'#0F1921', lineHeight:1.6 }}>{deal.notes}</p>
                    </div>
                  )}

                  {/* Move stage */}
                  <div>
                    <div style={{ fontSize:11, fontWeight:600, color:'#9BA5AF', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:8 }}>Move to Stage</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                      {STAGES.filter(s=>s!==deal.stage).map(s => (
                        <button key={s} className="btn btn-outline btn-sm" onClick={()=>moveStage(s)} style={{ fontSize:11 }}>→ {s}</button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {tab === 'documents' && (
            <div>
              {docs.length === 0 ? (
                <div style={{ textAlign:'center', padding:'30px', color:'#9BA5AF' }}>
                  <FileText size={32} style={{ marginBottom:8, opacity:0.3 }} />
                  <div style={{ fontSize:13 }}>No documents attached to this deal</div>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {docs.map(doc => (
                    <div key={doc.id} style={{ display:'flex', alignItems:'center', gap:12, padding:12, border:'1px solid #E2DDD9', borderRadius:8 }}>
                      <div style={{ width:36, height:36, borderRadius:6, background:'#FEF3C7', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'#92400E' }}>PDF</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:500, fontSize:13 }}>{doc.name}</div>
                        <div style={{ fontSize:11, color:'#9BA5AF' }}>{doc.type} · {doc.size} · {fmtDate(doc.uploadedAt)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'activity' && (
            <div>
              <div style={{ display:'flex', gap:8, marginBottom:16 }}>
                <input value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Add a note…" onKeyDown={e=>e.key==='Enter'&&addNote()} style={{ flex:1 }} />
                <button className="btn btn-primary btn-sm" onClick={addNote}><Plus size={13}/></button>
              </div>
              {acts.length === 0 ? (
                <div style={{ textAlign:'center', padding:'20px', color:'#9BA5AF', fontSize:13 }}>No activity yet</div>
              ) : (
                acts.map(a => <ActivityItem key={a.id} a={a} />)
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
