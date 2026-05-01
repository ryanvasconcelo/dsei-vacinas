import { describe, it, expect, beforeEach } from 'vitest';
import { db } from './mockDatabase';

describe('Mock Database Service', () => {
  beforeEach(() => {
    db.reset(); // clear memory state
  });

  it('should soft delete a Polo Base and cascade delete orphan Aldeias', () => {
    const polo = db.polos.add({ nome: 'Polo Test', municipio: 'City' });
    const aldeia = db.aldeias.add({ nome: 'Aldeia Test', poloBaseId: polo.id });
    
    db.polos.softDelete(polo.id);
    
    expect(db.polos.get(polo.id)?.ativo).toBe(false);
    expect(db.aldeias.get(aldeia.id)?.ativo).toBe(false);
  });

  it('should update an existing entity', () => {
    const etnia = db.etnias.add({ nome: 'Etnia Test' });
    db.etnias.update(etnia.id, { nome: 'Etnia Updated' });
    expect(db.etnias.get(etnia.id)?.nome).toBe('Etnia Updated');
  });

  it('should list only active entities by default', () => {
    const e1 = db.etnias.add({ nome: 'E1' });
    const e2 = db.etnias.add({ nome: 'E2' });
    db.etnias.softDelete(e1.id);

    const all = db.etnias.list(true);
    const active = db.etnias.list();

    expect(all.length).toBeGreaterThan(active.length);
    expect(active.find(e => e.id === e1.id)).toBeUndefined();
    expect(active.find(e => e.id === e2.id)).toBeDefined();
  });
});
