import { useState } from 'react';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, MoreHorizontal, GripVertical } from 'lucide-react';
import { STAGES, fmt, fmtDate, initials } from '../lib/data';

const STAGE_COLORS = { Lead:'#94A3B8', Qualification:'#60A5FA', Proposal:'#C6A969', Negotiation:'#FB923C', Won:'#4ADE80', Lost:'#F87171', Archive:'#CBD5E0' };
const VISIBLE = ['Lead','Qualification','Proposal','Negotiation','Won'];

function DealCard({ deal, companies, contacts, onClick, isDragging }) {
  const co = companies.find(c=>c.id===deal.companyId);
  const ct = contacts.find(c=>c.id===deal.contactId);
  return (
    <div onClick={onClick} style={{
      background:'#fff', border:'1px solid #E2DDD9', borderRadius:8,
      padding:14, cursor:'pointer', opacity: isDragging ? 0.4 : 1,
      boxShadow:'0 1px 3px rgba(15,25,33,0.06)', transition:'box-shadow 0.15s',
      borderLeft: `3px solid ${STAGE_COLORS[deal.stage]}`,
    }}
    onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 12px rgba(15,25,33,0.10)'}
    onMouseLeave={e=>e.currentTarget.style.boxShadow='0 1px 3px rgba(15,25,33,0.06)'}
    >
      <div style={{ fontWeight:600, fontSize:13, color:'#0F1921', marginBottom:4, lineHeight:1.3 }}>{deal.title}</div>
      <div style={{ fontSize:11, color:'#9BA5AF', marginBottom:10 }}>{co?.name}</div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontWeight:700, fontSize:14, color:'#0F1921' }}>{fmt(deal.value)}</span>
        <span style={{ fontSize:11, color:'#9BA5AF' }}>Close {fmtDate(deal.expectedClose)}</span>
      </div>
      {ct && (
        <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:10, paddingTop:10, borderTop:'1px solid #F4F2EF' }}>
          <div style={{ width:20, height:20, borderRadius:'50%', background:'#0F1921', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:700, color:'#fff' }}>{initials(ct.name)}</div>
          <span style={{ fontSize:11, color:'#5A6472' }}>{ct.name}</span>
          <span style={{ marginLeft:'auto', fontSize:11, background:'#F4F2EF', padding:'2px 6px', borderRadius:10, color:'#5A6472' }}>{deal.probability}%</span>
        </div>
      )}
    </div>
  );
}

function SortableCard({ deal, companies, contacts, onSelect }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: deal.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style}>
      <div style={{ display:'flex', alignItems:'flex-start', gap:4 }}>
        <div {...attributes} {...listeners} style={{ paddingTop:14, cursor:'grab', color:'#CBD5E0', flexShrink:0 }}>
          <GripVertical size={14} />
        </div>
        <div style={{ flex:1 }}>
          <DealCard deal={deal} companies={companies} contacts={contacts} onClick={()=>onSelect(deal)} isDragging={isDragging} />
        </div>
      </div>
    </div>
  );
}

export default function Pipeline({ data, setData, onNewDeal, onSelectDeal }) {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint:{ distance:8 } }));
  const { deals, companies, contacts } = data;

  const handleDragStart = ({ active }) => setActiveId(active.id);
  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || active.id === over.id) return;
    const targetStage = over.data?.current?.stage || over.id;
    if (STAGES.includes(targetStage)) {
      setData(prev => ({ ...prev, deals: prev.deals.map(d => d.id===active.id ? {...d,stage:targetStage} : d) }));
    }
  };
  const handleDragOver = ({ active, over }) => {
    if (!over) return;
    const overDeal = deals.find(d=>d.id===over.id);
    if (overDeal && overDeal.stage !== deals.find(d=>d.id===active.id)?.stage) {
      setData(prev => ({ ...prev, deals: prev.deals.map(d => d.id===active.id ? {...d,stage:overDeal.stage} : d) }));
    }
  };

  const activeDeal = activeId ? deals.find(d=>d.id===activeId) : null;

  return (
    <div style={{ height:'calc(100vh - 56px)', display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'20px 28px 16px', borderBottom:'1px solid #E2DDD9', background:'#fff', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <h1 style={{ fontSize:18, fontWeight:700, color:'#0F1921' }}>Pipeline</h1>
          <p style={{ fontSize:12, color:'#9BA5AF', marginTop:2 }}>Drag deals between stages to update status</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={onNewDeal}><Plus size={13} /> New Deal</button>
      </div>
      <div style={{ flex:1, overflowX:'auto', overflowY:'hidden', padding:'20px 24px' }}>
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
          <div style={{ display:'flex', gap:14, height:'100%', minWidth:'fit-content' }}>
            {VISIBLE.map(stage => {
              const stageDeals = deals.filter(d=>d.stage===stage);
              const total = stageDeals.reduce((a,b)=>a+b.value,0);
              return (
                <div key={stage} id={stage} data-stage={stage} style={{ width:260, display:'flex', flexDirection:'column', flexShrink:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12, padding:'0 2px' }}>
                    <div style={{ width:10, height:10, borderRadius:'50%', background:STAGE_COLORS[stage] }} />
                    <span style={{ fontWeight:600, fontSize:12, color:'#0F1921', textTransform:'uppercase', letterSpacing:'0.04em' }}>{stage}</span>
                    <span style={{ marginLeft:'auto', fontSize:11, color:'#9BA5AF', fontWeight:500 }}>{stageDeals.length}</span>
                  </div>
                  <div style={{ fontSize:11, color:'#9BA5AF', marginBottom:10, paddingLeft:18 }}>{fmt(total)}</div>
                  <div style={{ flex:1, overflowY:'auto', background:'#F4F2EF', borderRadius:10, padding:'10px 8px', display:'flex', flexDirection:'column', gap:8, minHeight:100 }} id={`column-${stage}`} data-stage={stage}>
                    <SortableContext items={stageDeals.map(d=>d.id)} strategy={verticalListSortingStrategy}>
                      {stageDeals.map(deal => (
                        <SortableCard key={deal.id} deal={deal} companies={companies} contacts={contacts} onSelect={onSelectDeal} />
                      ))}
                    </SortableContext>
                    {stageDeals.length===0 && (
                      <div style={{ textAlign:'center', color:'#C8C0BB', fontSize:11, padding:'20px 0' }}>Drop here</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <DragOverlay>
            {activeDeal && <DealCard deal={activeDeal} companies={companies} contacts={contacts} onClick={()=>{}} />}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
