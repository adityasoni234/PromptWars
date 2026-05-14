import { ShieldCheck, FileText, Download, ExternalLink, Activity } from 'lucide-react';
import { useState, useRef } from 'react';

const INITIAL_DOCUMENTS = [
  { id: 1, title: 'Aditya Birla Health Insurance', type: 'Insurance', number: 'ABHI-893041221', expiry: 'Mar 2027', icon: ShieldCheck, color: 'var(--blue)' },
  { id: 2, title: 'Aadhar Card', type: 'Government ID', number: 'xxxx-xxxx-1234', expiry: 'Valid for life', icon: FileText, color: 'var(--amber)' },
  { id: 3, title: 'Recent Lab Reports (CBC)', type: 'Medical', number: 'ABX-990-12', expiry: 'Apr 04 2026', icon: Activity, color: 'var(--green)' }
];

export default function PatientDocuments() {
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newDoc = {
        id: Date.now(),
        title: file.name,
        type: 'Uploaded Document',
        number: `DOC-${Math.floor(Math.random() * 10000)}`,
        expiry: 'User Generated',
        icon: FileText,
        color: 'var(--purple)'
      };
      setDocuments([newDoc, ...documents]);
      // reset input so same file can be uploaded again if needed
      e.target.value = '';
    }
  };

  const handleAction = (action, title) => {
    window.alert(`Mock Action: ${action} triggered for document "${title}"`);
  };

  return (
    <div className="page-wrapper animate-fadeIn">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>My Documents</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>Securely store & access your insurance and IDs</p>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileChange} 
        />
        <button className="btn btn-primary" onClick={() => fileInputRef.current?.click()}>
          <FileText size={16} /> Upload New
        </button>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Linked Documents</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {documents.map(doc => {
            const Icon = doc.icon;
            return (
              <div key={doc.id} style={{ border: '1px solid var(--border)', borderRadius: 16, padding: 20, background: 'var(--bg-input)', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: doc.color, flexShrink: 0 }}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', wordBreak: 'break-word', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{doc.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{doc.type}</div>
                    </div>
                  </div>
                </div>
                
                <div style={{ background: '#fff', borderRadius: 8, padding: '12px 16px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Document Number</div>
                  <div style={{ fontSize: 14, fontFamily: 'Outfit', fontWeight: 600, letterSpacing: 1 }}>{doc.number}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>Validity: <span style={{ color: 'var(--text)' }}>{doc.expiry}</span></div>
                </div>

                <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                  <button onClick={() => handleAction('Download File', doc.title)} className="btn btn-ghost" style={{ flex: 1, padding: '8px', fontSize: 12, background: '#fff' }}>
                    <Download size={14} /> Download
                  </button>
                  <button onClick={() => handleAction('View Full Document', doc.title)} className="btn btn-soft-blue" style={{ flex: 1, padding: '8px', fontSize: 12, background: '#fff' }}>
                    <ExternalLink size={14} /> View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="card" style={{ padding: 20, background: 'var(--green-light)', borderColor: 'var(--border)' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <ShieldCheck size={20} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Government Certified Vault</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              All documents are encrypted end-to-end and securely backed by India's DigiLocker APIs. Doctors can only view these documents during an active consultation session.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
