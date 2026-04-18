import { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { PageHeader, AdminTable, Modal, FormField, Input, Select, FormActions, C } from '../components/AdminUI';

const ACCENT_OPTIONS = [
  { label: 'Cyan', value: '#00E0FF' },
  { label: 'Purple', value: '#7C5CFF' },
  { label: 'Green', value: '#00D47E' },
  { label: 'Pink', value: '#FF4D88' },
  { label: 'Gold', value: '#FFB800' },
];

const EMPTY = {
  title: '', industry: '', location: '', label: '', accent: '#00E0FF',
};

export default function AdminPortfolio() {
  const { portfolio, updatePortfolio } = useCMS();
  const [modal, setModal] = useState(null);

  const openAdd = () => setModal({ mode: 'add', data: { ...EMPTY } });
  const openEdit = (row) => setModal({ mode: 'edit', data: { ...row } });
  const closeModal = () => setModal(null);

  const handleSave = (e) => {
    e.preventDefault();
    const { title, industry, location, label, accent } = modal.data;
    if (!title.trim()) return;
    const item = {
      id: modal.mode === 'edit' ? modal.data.id : Date.now(),
      title: title.trim(),
      industry: industry.trim(),
      location: location.trim(),
      label: label.trim(),
      accent,
    };
    if (modal.mode === 'add') {
      updatePortfolio((prev) => [...prev, item]);
    } else {
      updatePortfolio((prev) => prev.map((p) => (p.id === item.id ? item : p)));
    }
    closeModal();
  };

  const handleDelete = (row) => {
    updatePortfolio((prev) => prev.filter((p) => p.id !== row.id));
  };

  const setField = (key) => (e) =>
    setModal((m) => ({ ...m, data: { ...m.data, [key]: e.target.value } }));

  const columns = [
    { key: 'title', label: 'Project Title' },
    { key: 'industry', label: 'Industry', muted: true },
    { key: 'location', label: 'Location', muted: true },
    {
      key: 'accent',
      label: 'Color',
      render: (v) => (
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full inline-block" style={{ background: v }} />
          <span style={{ color: C.muted, fontSize: 12 }}>{v}</span>
        </span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Portfolio"
        subtitle="Projects shown in the horizontal scroll portfolio section."
        onAdd={openAdd}
        addLabel="Add Project"
      />

      <AdminTable
        columns={columns}
        rows={portfolio}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyText="No portfolio items. Click 'Add Project' to start."
      />

      {modal && (
        <Modal
          title={modal.mode === 'add' ? 'Add Project' : 'Edit Project'}
          onClose={closeModal}
        >
          <form onSubmit={handleSave}>
            <FormField label="Project Title" required>
              <Input value={modal.data.title} onChange={setField('title')} placeholder="e.g. Luxury Jewellery Store Tour" required />
            </FormField>
            <FormField label="Industry">
              <Input value={modal.data.industry} onChange={setField('industry')} placeholder="e.g. Jewellery, Real Estate, F&B" />
            </FormField>
            <FormField label="Location">
              <Input value={modal.data.location} onChange={setField('location')} placeholder="e.g. Banjara Hills" />
            </FormField>
            <FormField label="Label / Sub-text">
              <Input value={modal.data.label} onChange={setField('label')} placeholder="e.g. 1,200 sq ft • Multi-floor" />
            </FormField>
            <FormField label="Card Accent Color">
              <Select value={modal.data.accent} onChange={setField('accent')}>
                {ACCENT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label} ({opt.value})</option>
                ))}
              </Select>
            </FormField>
            <FormActions onCancel={closeModal} saveLabel={modal.mode === 'add' ? 'Add Project' : 'Save Changes'} />
          </form>
        </Modal>
      )}
    </div>
  );
}
