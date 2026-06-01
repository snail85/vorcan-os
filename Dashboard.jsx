export const STAGES = ['Lead','Qualification','Proposal','Negotiation','Won','Lost','Archive'];
export const SOURCES = ['LinkedIn','Referral','Outbound','Inbound','Website','Event'];
export const INDUSTRIES = ['Mining','Energy','Oil & Gas','Manufacturing','Utilities','Other'];
export const DOC_TYPES = ['Proposal','Contract','NDA','Invoice','Receipt','Assessment','Other'];

export const initData = {
  companies: [
    { id:'c1', name:'Harrington Mining Group', industry:'Mining', size:'500+', location:'Perth, WA', energySpend:4200000, website:'harringtonmining.com.au' },
    { id:'c2', name:'Apex Energy Partners', industry:'Energy', size:'201-500', location:'Brisbane, QLD', energySpend:2800000, website:'apexenergy.com.au' },
    { id:'c3', name:'Kestrel Resources', industry:'Mining', size:'51-200', location:'Darwin, NT', energySpend:1100000, website:'kestrelresources.com' },
    { id:'c4', name:'Meridian Coal', industry:'Mining', size:'500+', location:'Hunter Valley, NSW', energySpend:6500000, website:'meridiancoal.com.au' },
    { id:'c5', name:'Solara Utilities', industry:'Utilities', size:'201-500', location:'Adelaide, SA', energySpend:3100000, website:'solarautilities.com.au' },
  ],
  contacts: [
    { id:'p1', name:'James Harrington', title:'CEO', email:'j.harrington@harringtonmining.com.au', phone:'+61 412 000 001', companyId:'c1', linkedin:'linkedin.com/in/jharrington' },
    { id:'p2', name:'Sarah Okafor', title:'CFO', email:'s.okafor@harringtonmining.com.au', phone:'+61 412 000 002', companyId:'c1', linkedin:'linkedin.com/in/sokafor' },
    { id:'p3', name:'Marcus Webb', title:'Head of Operations', email:'m.webb@apexenergy.com.au', phone:'+61 412 000 003', companyId:'c2', linkedin:'linkedin.com/in/mwebb' },
    { id:'p4', name:'Priya Nair', title:'Director, Sustainability', email:'p.nair@kestrelresources.com', phone:'+61 412 000 004', companyId:'c3', linkedin:'linkedin.com/in/pnair' },
    { id:'p5', name:'Tom Bellamy', title:'VP Operations', email:'t.bellamy@meridiancoal.com.au', phone:'+61 412 000 005', companyId:'c4', linkedin:'linkedin.com/in/tbellamy' },
    { id:'p6', name:'Claire Fontaine', title:'COO', email:'c.fontaine@solarautilities.com.au', phone:'+61 412 000 006', companyId:'c5', linkedin:'linkedin.com/in/cfontaine' },
  ],
  deals: [
    { id:'d1', title:'Energy Transition Roadmap', companyId:'c1', contactId:'p1', stage:'Proposal', value:185000, probability:60, expectedClose:'2025-08-30', source:'Referral', owner:'Craig', notes:'Harrington looking to reduce diesel dependency at 3 sites. Strong fit.', createdAt:'2025-05-01' },
    { id:'d2', title:'Emissions Baseline Assessment', companyId:'c2', contactId:'p3', stage:'Negotiation', value:95000, probability:75, expectedClose:'2025-07-15', source:'LinkedIn', owner:'Craig', notes:'Marcus keen to move fast. Legal reviewing contract terms.', createdAt:'2025-04-15' },
    { id:'d3', title:'Operational Efficiency Review', companyId:'c3', contactId:'p4', stage:'Qualification', value:65000, probability:40, expectedClose:'2025-09-30', source:'Outbound', owner:'Craig', notes:'Early stage. Discovery call confirmed next week.', createdAt:'2025-05-20' },
    { id:'d4', title:'Full Transition Strategy', companyId:'c4', contactId:'p5', stage:'Lead', value:320000, probability:20, expectedClose:'2025-11-30', source:'LinkedIn', owner:'Craig', notes:'Largest deal in pipeline. Tom introduced via industry contact.', createdAt:'2025-06-01' },
    { id:'d5', title:'Finance-Ready Roadmap Delivery', companyId:'c5', contactId:'p6', stage:'Won', value:140000, probability:100, expectedClose:'2025-05-30', source:'Referral', owner:'Craig', notes:'Closed. Kick-off scheduled for June.', createdAt:'2025-03-10' },
    { id:'d6', title:'Energy Cost Reduction Study', companyId:'c2', contactId:'p3', stage:'Lost', value:75000, probability:0, expectedClose:'2025-04-30', source:'Inbound', owner:'Craig', notes:'Budget cut. Revisit Q4.', createdAt:'2025-02-20' },
  ],
  documents: [
    { id:'doc1', name:'Harrington_Proposal_v2.pdf', type:'Proposal', dealId:'d1', companyId:'c1', size:'2.4 MB', uploadedAt:'2025-06-01', uploadedBy:'Craig' },
    { id:'doc2', name:'Apex_NDA_Signed.pdf', type:'NDA', dealId:'d2', companyId:'c2', size:'0.8 MB', uploadedAt:'2025-05-18', uploadedBy:'Craig' },
    { id:'doc3', name:'Apex_Contract_Draft.pdf', type:'Contract', dealId:'d2', companyId:'c2', size:'1.2 MB', uploadedAt:'2025-06-03', uploadedBy:'Craig' },
    { id:'doc4', name:'Solara_Contract_Final.pdf', type:'Contract', dealId:'d5', companyId:'c5', size:'1.5 MB', uploadedAt:'2025-05-28', uploadedBy:'Craig' },
    { id:'doc5', name:'Meridian_NDA.pdf', type:'NDA', dealId:'d4', companyId:'c4', size:'0.7 MB', uploadedAt:'2025-06-02', uploadedBy:'Craig' },
  ],
  activities: [
    { id:'a1', dealId:'d1', type:'note', text:'Call with James — confirmed budget approval. Moving to proposal stage.', date:'2025-06-01', user:'Craig' },
    { id:'a2', dealId:'d1', type:'email', text:'Sent proposal v2 for review.', date:'2025-06-01', user:'Craig' },
    { id:'a3', dealId:'d2', type:'meeting', text:'Discovery call with Marcus. 3 sites, ~£2.8M annual energy spend identified.', date:'2025-05-20', user:'Craig' },
    { id:'a4', dealId:'d2', type:'note', text:'NDA signed. Contract under legal review.', date:'2025-06-03', user:'Craig' },
  ],
};

export const fmt = (n) => n ? '£'+Number(n).toLocaleString('en-GB') : '—';
export const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '—';
export const initials = (n) => n ? n.split(' ').map(x=>x[0]).join('').toUpperCase().slice(0,2) : '?';
export const weightedValue = (deals) => deals.filter(d=>!['Won','Lost','Archive'].includes(d.stage)).reduce((s,d)=>s+(d.value*(d.probability/100)),0);
