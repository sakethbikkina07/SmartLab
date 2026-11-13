import { INITIAL_DATA, INITIAL_KV } from '../config/defaultData.js';

class MemoryStore {
  constructor() {
    this.data = {};
    for (const [k, v] of Object.entries(INITIAL_DATA)) {
      this.data[k] = [...v.rows];
    }
    this.kv = { ...INITIAL_KV };
  }

  // ── Generic CRUD operations ──
  list(key) {
    if (!this.data[key]) {
      this.data[key] = [];
    }
    return this.data[key];
  }

  findAll(key) {
    return this.list(key);
  }

  get(key, id) {
    const list = this.list(key);
    return list.find((r) => String(r.id) === String(id));
  }

  findById(key, id) {
    return this.get(key, id);
  }

  create(key, item) {
    const list = this.list(key);
    const newItem = {
      id: item.id || (Date.now().toString(36) + Math.random().toString(36).substring(2, 6)),
      ...item,
    };
    list.unshift(newItem);
    return newItem;
  }

  update(key, id, updates) {
    const list = this.list(key);
    const idx = list.findIndex((r) => String(r.id) === String(id));
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    return list[idx];
  }

  remove(key, id) {
    const list = this.list(key);
    const idx = list.findIndex((r) => String(r.id) === String(id));
    if (idx === -1) return false;
    list.splice(idx, 1);
    return true;
  }

  delete(key, id) {
    return this.remove(key, id);
  }

  replace(key, rows) {
    this.data[key] = Array.isArray(rows) ? [...rows] : [];
    return this.data[key];
  }

  // ── Key-Value Store Operations ──
  getKV(key, defaultValue = null) {
    return this.kv[key] !== undefined ? this.kv[key] : defaultValue;
  }

  setKV(key, value) {
    this.kv[key] = value;
    return this.kv[key];
  }

  getAllKV() {
    return { ...this.kv };
  }
}

export const store = new MemoryStore();
export const memoryStore = store;
export default store;
