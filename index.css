import { useState } from 'react';
import { X } from 'lucide-react';
import { STAGES, SOURCES } from '../lib/data';

export default function NewDealModal({ data, onClose, onSave }) {
  const [form, setForm] = useState({ title:'', companyId:'', contactId:'', stage:'Lead', value:'', probability:20, expectedClose:'', source:'LinkedIn', notes:'' });
  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  const availContacts = data.contacts.filter(c => !form.companyId || c.companyId === form.companyId);

  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave({ ...form, id:'d'+Date.now(), value:+form.value||0, probability:+form.probability||20, owner:'Craig', createdAt:new Date().toISOString().split('T')[0] });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 style={{ fontSize:16, fontWeight:700, color:'#0F1921' }}>New Deal</h2>
          <button onClick={onClose} style={{ width:28,height:28,border:'1px solid #E2DDD9',background:'transparent',borderRadius:6,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}><X size={13}/></button>
        </div>
        <div className="modal-body">
          <div className="form-field"><label>Deal Title *</label><input placeholder="e.g. Energy Transition Roadmap" value={form.title} onChange={e=>set('title',e.target.value)} /></div>
          <div className="form-row">
            <div className="form-field"><label>Company</label>
              <select value={form.companyId} onChange={e=>set('companyId',e.target.value)}>
                <option value="">Select company</option>
                {data.companies.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-field"><label>Contact</label>
              <select value={form.contactId} onChange={e=>set('contactId',e.target.value)}>
                <option value="">Select contact</option>
                {availContacts.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-field"><label>Deal Value (£)</label><input type="number" placeholder="0" value={form.value} onChange={e=>set('value',e.target.value)} /></div>
            <div className="form-field"><label>Probability (%)</label><input type="number" min="0" max="100" value={form.probability} onChange={e=>set('probability',e.target.value)} /></div>
          </div>
          <div className="form-row">
            <div className="form-field"><label>Stage</label>
              <select value={form.stage} onChange={e=>set('stage',e.target.value)}>
                {STAGES.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-field"><label>Source</label>
              <select value={form.source} onChange={e=>set('source',e.target.value)}>
                {SOURCES.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="form-field"><label>Expected Close Date</label><input type="date" value={form.expectedClose} onChange={e=>set('expectedClose',e.target.value)} /></div>
          <div className="form-field"><label>Notes</label><textarea rows={3} placeholder="Initial notes…" value={form.notes} onChange={e=>set('notes',e.target.value)} /></div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Create Deal</button>
        </div>
      </div>
    </div>
  );
}
