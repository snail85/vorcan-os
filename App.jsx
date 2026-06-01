@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --gold: #C6A969;
  --gold-light: #D4BA7E;
  --gold-pale: #F5EDD8;
  --navy: #0F1921;
  --navy-light: #1A2B38;
  --cream: #E5E0DF;
  --bg: #F4F2EF;
  --surface: #FFFFFF;
  --border: #E2DDD9;
  --text-primary: #0F1921;
  --text-secondary: #5A6472;
  --text-muted: #9BA5AF;
  --radius: 8px;
  --shadow: 0 1px 3px rgba(15,25,33,0.08), 0 1px 2px rgba(15,25,33,0.04);
  --shadow-md: 0 4px 16px rgba(15,25,33,0.12);
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg);
  color: var(--text-primary);
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--cream); border-radius: 3px; }

.btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: var(--radius);
  font-size: 13px; font-weight: 500; cursor: pointer;
  border: none; transition: all 0.15s ease; white-space: nowrap; font-family: inherit;
}
.btn-primary { background: var(--navy); color: #fff; }
.btn-primary:hover { background: var(--navy-light); }
.btn-gold { background: var(--gold); color: var(--navy); }
.btn-gold:hover { background: var(--gold-light); }
.btn-outline { background: transparent; color: var(--text-primary); border: 1px solid var(--border); }
.btn-outline:hover { background: var(--bg); }
.btn-ghost { background: transparent; color: var(--text-secondary); padding: 6px 10px; }
.btn-ghost:hover { background: var(--bg); color: var(--text-primary); }
.btn-sm { padding: 5px 10px; font-size: 12px; }
.btn-icon { padding: 7px; }
.btn-danger { background: #FEE2E2; color: #DC2626; border: 1px solid #FECACA; }
.btn-danger:hover { background: #FECACA; }

.card { background: var(--surface); border-radius: var(--radius); border: 1px solid var(--border); box-shadow: var(--shadow); }

input, textarea, select {
  font-family: inherit; font-size: 13px; background: var(--surface);
  color: var(--text-primary); border: 1px solid var(--border);
  border-radius: 6px; padding: 8px 12px; outline: none; width: 100%;
  transition: border-color 0.15s;
}
input:focus, textarea:focus, select:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(198,169,105,0.12); }
input::placeholder, textarea::placeholder { color: var(--text-muted); }
label { font-size: 12px; font-weight: 500; color: var(--text-secondary); display: block; margin-bottom: 4px; }

.stage-badge { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; }
.stage-Lead          { background: #EDF2F7; color: #4A5568; }
.stage-Qualification { background: #EBF4FF; color: #2B6CB0; }
.stage-Proposal      { background: #FEF3C7; color: #92400E; }
.stage-Negotiation   { background: #FFF0E0; color: #C05621; }
.stage-Won           { background: #F0FFF4; color: #276749; }
.stage-Lost          { background: #FFF5F5; color: #C53030; }
.stage-Archive       { background: #F7FAFC; color: #718096; }

.stat-card { background: var(--surface); border-radius: var(--radius); border: 1px solid var(--border); padding: 20px 24px; }
.stat-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 8px; }
.stat-value { font-size: 30px; font-weight: 700; color: var(--navy); line-height: 1; }
.stat-delta { font-size: 12px; color: var(--text-muted); margin-top: 6px; }

table { width: 100%; border-collapse: collapse; }
th { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); padding: 10px 16px; text-align: left; border-bottom: 1px solid var(--border); background: var(--bg); }
td { padding: 11px 16px; border-bottom: 1px solid var(--border); }
tr:last-child td { border-bottom: none; }
tbody tr:hover td { background: var(--bg); cursor: pointer; }

.modal-overlay { position: fixed; inset: 0; background: rgba(15,25,33,0.45); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 24px; }
.modal { background: var(--surface); border-radius: 12px; box-shadow: var(--shadow-md); width: 100%; max-width: 580px; max-height: 90vh; overflow-y: auto; }
.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid var(--border); }
.modal-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
.modal-footer { padding: 16px 24px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: flex-end; gap: 8px; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-row.full { grid-template-columns: 1fr; }
.form-field { display: flex; flex-direction: column; gap: 4px; }

.drop-zone { border: 2px dashed var(--border); border-radius: var(--radius); padding: 32px; text-align: center; cursor: pointer; transition: all 0.2s; }
.drop-zone:hover, .drop-zone.active { border-color: var(--gold); background: var(--gold-pale); }

.avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--navy); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }

.divider { height: 1px; background: var(--border); }
.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.text-gold { color: var(--gold); }
.text-muted { color: var(--text-muted); }
.text-sm { font-size: 12px; }
