const calendarioData = [
  {
    faixaEtaria: 'Ao nascer',
    vacinas: [
      { nome: 'BCG', doses: '1 dose', via: 'Intradérmica', obs: 'Ao nascimento, antes da alta hospitalar' },
      { nome: 'Hepatite B', doses: '1ª dose', via: 'Intramuscular', obs: 'Preferencialmente nas primeiras 12h' },
    ],
  },
  {
    faixaEtaria: '1 mês',
    vacinas: [
      { nome: 'Hepatite B', doses: '2ª dose', via: 'Intramuscular', obs: '' },
    ],
  },
  {
    faixaEtaria: '2 meses',
    vacinas: [
      { nome: 'Pentavalente (DTP+Hib+HepB)', doses: '1ª dose', via: 'Intramuscular', obs: '' },
      { nome: 'VIP (Poliomielite inativada)', doses: '1ª dose', via: 'Intramuscular', obs: '' },
      { nome: 'Pneumocócica 10V', doses: '1ª dose', via: 'Intramuscular', obs: '' },
      { nome: 'Rotavírus Humano', doses: '1ª dose', via: 'Oral', obs: 'Não repetir se regurgitar' },
      { nome: 'Meningocócica C', doses: '1ª dose', via: 'Intramuscular', obs: '' },
    ],
  },
  {
    faixaEtaria: '4 meses',
    vacinas: [
      { nome: 'Pentavalente', doses: '2ª dose', via: 'Intramuscular', obs: '' },
      { nome: 'VIP', doses: '2ª dose', via: 'Intramuscular', obs: '' },
      { nome: 'Pneumocócica 10V', doses: '2ª dose', via: 'Intramuscular', obs: '' },
      { nome: 'Rotavírus Humano', doses: '2ª dose', via: 'Oral', obs: '' },
      { nome: 'Meningocócica C', doses: '2ª dose', via: 'Intramuscular', obs: '' },
    ],
  },
  {
    faixaEtaria: '6 meses',
    vacinas: [
      { nome: 'Pentavalente', doses: '3ª dose', via: 'Intramuscular', obs: '' },
      { nome: 'VIP', doses: '3ª dose', via: 'Intramuscular', obs: '' },
      { nome: 'Hepatite B', doses: '3ª dose', via: 'Intramuscular', obs: '' },
      { nome: 'Influenza', doses: '1ª dose', via: 'Intramuscular', obs: 'Campanha anual' },
    ],
  },
  {
    faixaEtaria: '9 meses',
    vacinas: [
      { nome: 'Febre Amarela', doses: '1ª dose', via: 'Subcutânea', obs: 'Especialmente importante DSEI-AM — área endêmica' },
      { nome: 'Meningocócica C', doses: 'Reforço', via: 'Intramuscular', obs: '' },
    ],
  },
  {
    faixaEtaria: '12 meses',
    vacinas: [
      { nome: 'Tríplice Viral (SCR)', doses: '1ª dose', via: 'Subcutânea', obs: '' },
      { nome: 'Pneumocócica 10V', doses: 'Reforço', via: 'Intramuscular', obs: '' },
      { nome: 'Meningocócica C', doses: 'Reforço', via: 'Intramuscular', obs: '' },
    ],
  },
  {
    faixaEtaria: '15 meses',
    vacinas: [
      { nome: 'Varicela', doses: '1ª dose', via: 'Subcutânea', obs: '' },
      { nome: 'Tríplice Viral (SCR)', doses: '2ª dose', via: 'Subcutânea', obs: '' },
      { nome: 'Hepatite A', doses: '1 dose', via: 'Intramuscular', obs: '' },
      { nome: 'DTP (Tríplice bacteriana)', doses: '1º Reforço', via: 'Intramuscular', obs: '' },
      { nome: 'VOP (Poliomielite oral)', doses: '1º Reforço', via: 'Oral', obs: '' },
    ],
  },
  {
    faixaEtaria: '4 anos',
    vacinas: [
      { nome: 'DTP', doses: '2º Reforço', via: 'Intramuscular', obs: '' },
      { nome: 'Varicela', doses: '2ª dose', via: 'Subcutânea', obs: '' },
      { nome: 'VOP', doses: '2º Reforço', via: 'Oral', obs: '' },
    ],
  },
  {
    faixaEtaria: '9 a 14 anos (Meninas)',
    vacinas: [
      { nome: 'HPV Quadrivalente', doses: '2 doses', via: 'Intramuscular', obs: 'Intervalo de 6 meses entre doses' },
    ],
  },
  {
    faixaEtaria: '11 a 14 anos (Meninos)',
    vacinas: [
      { nome: 'HPV Quadrivalente', doses: '2 doses', via: 'Intramuscular', obs: 'Intervalo de 6 meses entre doses' },
    ],
  },
  {
    faixaEtaria: 'A partir de 7 anos',
    vacinas: [
      { nome: 'dT (Dupla adulto)', doses: '3 doses', via: 'Intramuscular', obs: 'Reforço a cada 10 anos' },
      { nome: 'Febre Amarela', doses: 'Dose única', via: 'Subcutânea', obs: 'Se não vacinado na infância' },
    ],
  },
  {
    faixaEtaria: 'Gestantes',
    vacinas: [
      { nome: 'dTpa (Tríplice acelular adulto)', doses: '1 dose', via: 'Intramuscular', obs: 'A partir da 20ª semana, em cada gestação' },
      { nome: 'Influenza', doses: '1 dose', via: 'Intramuscular', obs: 'Em qualquer trimestre' },
      { nome: 'Hepatite B', doses: '3 doses', via: 'Intramuscular', obs: 'Se não vacinada anteriormente' },
    ],
  },
  {
    faixaEtaria: '60 anos ou mais',
    vacinas: [
      { nome: 'Influenza', doses: '1 dose anual', via: 'Intramuscular', obs: 'Campanha anual — priority group' },
      { nome: 'Pneumocócica 23V', doses: '1 dose', via: 'Intramuscular', obs: '' },
      { nome: 'dT', doses: 'Reforço', via: 'Intramuscular', obs: 'A cada 10 anos' },
      { nome: 'Febre Amarela', doses: 'Avaliar', via: 'Subcutânea', obs: 'Avaliar risco-benefício com médico' },
    ],
  },
];

export default function CalendarioVacinal() {
  return (
    <div>
      <div className="bc">
        <span>DSEI-AM</span>
        <span className="bc-sep">›</span>
        <span className="bc-cur">Calendário Vacinal</span>
      </div>

      <div className="page-header">
        <div>
          <div className="page-title">Calendário Nacional de Vacinação 2026</div>
          <div className="page-sub">Baseado na Instrução Normativa SESAI/SAPS 2026 · Referência para populações indígenas</div>
        </div>
      </div>

      <div className="alert alert-info" style={{ marginBottom: '1.25rem' }}>
        <div>
          <strong>Nota Técnica 15/2026:</strong> Para recém-nascidos em aldeias sem documentação, utilizar cadastro temporário com CNS provisório até regularização em até 30 dias.
          Febre Amarela é <strong>prioritária</strong> no território DSEI-AM por ser área endêmica.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {calendarioData.map((grupo, gi) => (
          <div key={gi} className="card">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: '0.75rem' }}>
              <div style={{
                background: '#1A1916', color: '#F7F6F2',
                fontSize: 10, fontWeight: 500,
                padding: '3px 10px', borderRadius: 20,
                letterSpacing: '0.04em', whiteSpace: 'nowrap',
              }}>
                {grupo.faixaEtaria}
              </div>
              <div style={{ height: '0.5px', flex: 1, background: '#EEEEE8' }} />
              <div style={{ fontSize: 10, color: '#888880' }}>{grupo.vacinas.length} vacina(s)</div>
            </div>

            <table className="ds-table" style={{ fontSize: 12 }}>
              <thead>
                <tr>
                  <th>Vacina</th>
                  <th>Dose(s)</th>
                  <th>Via</th>
                  <th>Observação</th>
                </tr>
              </thead>
              <tbody>
                {grupo.vacinas.map((vac, vi) => (
                  <tr key={vi}>
                    <td style={{ fontWeight: 500 }}>{vac.nome}</td>
                    <td>
                      <span className="badge badge-info" style={{ fontSize: 10 }}>
                        <span className="badge-dot" />{vac.doses}
                      </span>
                    </td>
                    <td style={{ fontSize: 11, color: '#888880' }}>{vac.via}</td>
                    <td style={{ fontSize: 11, color: vac.obs.includes('DSEI') || vac.obs.includes('prioritária') ? '#854F0B' : '#888880' }}>
                      {vac.obs || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
