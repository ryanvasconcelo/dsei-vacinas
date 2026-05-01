import React, { useState } from 'react';
import EtniaTab from '../components/CadastrosBase/EtniaTab';
import PoloBaseTab from '../components/CadastrosBase/PoloBaseTab';
import AldeiaTab from '../components/CadastrosBase/AldeiaTab';

type Props = { showToast: (msg: string, type?: 'success' | 'error' | 'default') => void };

export default function CadastrosBase({ showToast }: Props) {
  const [tab, setTab] = useState<'etnias' | 'polos' | 'aldeias'>('etnias');

  return (
    <div>
      <div className="bc">
        <span>DSEI-AM</span>
        <span className="bc-sep">›</span>
        <span className="bc-cur">Cadastros Base</span>
      </div>

      <div className="page-header">
        <div>
          <div className="page-title">Cadastros Base</div>
          <div className="page-sub">Gerenciamento de tabelas fundamentais do sistema</div>
        </div>
      </div>

      <div className="tab-bar" style={{ marginBottom: '1.25rem' }}>
        <div className={`tab-item ${tab === 'etnias' ? 'active' : ''}`} onClick={() => setTab('etnias')}>
          Etnias
        </div>
        <div className={`tab-item ${tab === 'polos' ? 'active' : ''}`} onClick={() => setTab('polos')}>
          Polos Base
        </div>
        <div className={`tab-item ${tab === 'aldeias' ? 'active' : ''}`} onClick={() => setTab('aldeias')}>
          Aldeias
        </div>
      </div>

      {tab === 'etnias' && <EtniaTab showToast={showToast} />}
      {tab === 'polos' && <PoloBaseTab showToast={showToast} />}
      {tab === 'aldeias' && <AldeiaTab showToast={showToast} />}
    </div>
  );
}
