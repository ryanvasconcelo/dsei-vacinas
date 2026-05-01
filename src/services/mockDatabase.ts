import { etnias, polosBase, aldeias } from '../data/mockData';

export type BaseEntity = {
  id: string;
  nome: string;
  ativo: boolean;
  [key: string]: any;
};

type DbCollection<T extends BaseEntity> = {
  items: T[];
  list: (includeInactive?: boolean) => T[];
  get: (id: string) => T | undefined;
  add: (item: Omit<T, 'id' | 'ativo'>) => T;
  update: (id: string, updates: Partial<T>) => T | undefined;
  softDelete: (id: string) => boolean;
};

class MockDatabase {
  public etnias: DbCollection<BaseEntity>;
  public polos: DbCollection<BaseEntity>;
  public aldeias: DbCollection<BaseEntity & { poloBaseId: string }>;

  constructor() {
    this.etnias = this.createCollection([...etnias]);
    this.polos = this.createCollection([...polosBase]);
    this.aldeias = this.createCollection([...aldeias]);
  }

  private createCollection<T extends BaseEntity>(initialData: T[]): DbCollection<T> {
    return {
      items: initialData,
      list(includeInactive = false) {
        return includeInactive ? this.items : this.items.filter((i) => i.ativo);
      },
      get(id: string) {
        return this.items.find((i) => i.id === id);
      },
      add(item: any) {
        const newItem = {
          ...item,
          id: `ID_${Math.random().toString(36).substring(2, 9)}`,
          ativo: true,
        } as T;
        this.items = [...this.items, newItem];
        return newItem;
      },
      update(id: string, updates: Partial<T>) {
        let updated: T | undefined;
        this.items = this.items.map((i) => {
          if (i.id === id) {
            updated = { ...i, ...updates };
            return updated;
          }
          return i;
        });
        return updated;
      },
      softDelete(id: string) {
        let found = false;
        this.items = this.items.map((i) => {
          if (i.id === id) {
            found = true;
            return { ...i, ativo: false };
          }
          return i;
        });
        return found;
      },
    };
  }

  reset() {
    this.etnias.items = [...etnias];
    this.polos.items = [...polosBase];
    this.aldeias.items = [...aldeias];
  }
}

const db = new MockDatabase();

// Override softDelete for Polo to cascade
const originalPoloDelete = db.polos.softDelete.bind(db.polos);
db.polos.softDelete = (id: string) => {
  const result = originalPoloDelete(id);
  if (result) {
    db.aldeias.items = db.aldeias.items.map((a) => {
      if (a.poloBaseId === id) {
        return { ...a, ativo: false };
      }
      return a;
    });
  }
  return result;
};

export { db };
