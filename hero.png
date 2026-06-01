import { useState } from 'react';
import { initData } from './lib/data';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Pipeline from './pages/Pipeline';
import Contacts from './pages/Contacts';
import Companies from './pages/Companies';
import Documents from './pages/Documents';
import Outreach from './pages/Outreach';
import DealModal from './components/DealModal';
import NewDealModal from './components/NewDealModal';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [data, setData] = useState(initData);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [newDealOpen, setNewDealOpen] = useState(false);

  const handleNewDeal = (deal) => setData(prev => ({ ...prev, deals: [deal, ...prev.deals] }));

  const pages = {
    dashboard: <Dashboard data={data} />,
    pipeline: <Pipeline data={data} setData={setData} onNewDeal={()=>setNewDealOpen(true)} onSelectDeal={setSelectedDeal} />,
    contacts: <Contacts data={data} setData={setData} />,
    companies: <Companies data={data} />,
    documents: <Documents data={data} setData={setData} />,
    outreach: <Outreach data={data} setData={setData} />,
  };

  return (
    <>
      <Layout page={page} setPage={setPage} onNewDeal={()=>setNewDealOpen(true)}>
        {pages[page]}
      </Layout>

      {selectedDeal && (
        <DealModal
          deal={data.deals.find(d=>d.id===selectedDeal.id)||selectedDeal}
          data={data}
          setData={setData}
          onClose={()=>setSelectedDeal(null)}
        />
      )}

      {newDealOpen && (
        <NewDealModal
          data={data}
          onClose={()=>setNewDealOpen(false)}
          onSave={handleNewDeal}
        />
      )}
    </>
  );
}
