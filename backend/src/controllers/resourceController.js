import { store } from '../models/memoryStore.js';

export const listResources = (req, res) => {
  const { resource } = req.params;
  const data = store.list(resource);
  res.json(data);
};

export const getResourceById = (req, res) => {
  const { resource, id } = req.params;
  const item = store.get(resource, id);
  if (!item) {
    return res.status(404).json({ error: `${resource} record with id ${id} not found` });
  }
  res.json(item);
};

export const createResource = (req, res) => {
  const { resource } = req.params;
  const newItem = store.create(resource, req.body);
  res.status(201).json(newItem);
};

export const updateResource = (req, res) => {
  const { resource, id } = req.params;
  const updated = store.update(resource, id, req.body);
  if (!updated) {
    return res.status(404).json({ error: `${resource} record not found for update` });
  }
  res.json(updated);
};

export const deleteResource = (req, res) => {
  const { resource, id } = req.params;
  const success = store.remove(resource, id);
  if (!success) {
    return res.status(404).json({ error: `${resource} record not found for deletion` });
  }
  res.json({ success: true, message: `Record deleted from ${resource}` });
};

// ── State Key-Value Controller ──
export const getStateKey = (req, res) => {
  const { key } = req.params;
  const val = store.getKV(key, null);
  res.json({ key, value: val });
};

export const setStateKey = (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  const saved = store.setKV(key, value);
  res.json({ key, value: saved });
};

export const getAllState = (req, res) => {
  res.json({
    data: store.data,
    kv: store.getAllKV()
  });
};

export const resourceController = {
  getAll: listResources,
  getById: getResourceById,
  create: createResource,
  update: updateResource,
  remove: deleteResource,
  getState: getStateKey,
  setState: setStateKey,
  getAllState,
  listResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  getStateKey,
  setStateKey
};

export default resourceController;
