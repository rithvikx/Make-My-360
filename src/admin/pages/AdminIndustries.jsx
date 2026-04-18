import { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { PageHeader, AdminTable, Modal, FormField, Input, Textarea, Select, FormActions, C } from '../components/AdminUI';

const ICON_OPTIONS = [
  'Building2','Gem','Hotel','UtensilsCrossed','ShoppingBag',
  'Bike','Dumbbell','GraduationCap','Cross','Monitor',
  'Briefcase','MapPin','Camera','Home','Heart',
];

const EMPTY = { name: '', description: '', icon: 'Building2' };

export default function AdminIndustries() {
  const { industries, updateIndustries } = useCMS();
  const [modal, setModal] = useState(null);

  const openAdd = () => setModal({ mode: 'add', data: { ...EMPTY } });
  const openEdit = (row) => setModal({ mode: 'edit', data: { ...row } });
  const closeModal = () => setModal(null);

  const handleSave = (e) => {
    e.preventDefault();
    const { name, description, icon } = modal.data;
    if (!name.trim()) return;
    const item = {
      id: modal.mode === 'edit' ? modal.data.id : Date.now(),
      name: name.trim(),
      description: description.trim(),
      icon: icon || 'Building2',
    };
    if (modal.mode === 'add') {
      updateIndustries((prev) => [...prev, item]);
    } else {
      updateIndustries((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    }
    closeModal();
  };

  const handleDelete = (row) => {
    updateIndustries((prev) => prev.filter((i) => i.id !== row.id));
  };

  const setField = (key) => (e) =>
    setModal((m) => ({ ...m, data: { ...m.data, [key]: e.target.value } }));

  const columns = [
    { key: 'name', label: 'Industry Name' },
    { key: 'icon', label: 'Icon', muted: true, render: (v) => <code style={{ color: C.accent, fontSize: 11 }}>{v}</code> },
    { key: 'description', label: 'Description', muted: true, render: (v) => <span style={{ color: C.muted }}>{v?.slice(0, 55)}{v?.length > 55 ? '…' : ''}</span> },
  ];

  return (
    <div>
      <PageHeader
        title="Industries"
        subtitle="Industries that appear in the Industries grid section."
        onAdd={openAdd}
        addLabel="Add Industry"
      />

      <AdminTable
        columns={columns}
        rows={industries}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyText="No industries. Click 'Add Industry' to begin."
      />

      {modal && (
        <Modal
          title={modal.mode === 'add' ? 'Add Industry' : 'Edit Industry'}
          onClose={closeModal}
        >
          <form onSubmit={handleSave}>
            <FormField label="Industry Name" required>
              <Input value={modal.data.name} onChange={setField('name')} placeholder="e.g. Jewellery Store" required />
            </FormField>
            <FormField label="Description">
              <Textarea value={modal.data.description} onChange={setField('description')} placeholder="Short description (1–2 lines)" rows={2} />
            </FormField>
            <FormField label="Icon" hint="Choose a Lucide icon name">
              <Select value={modal.data.icon} onChange={setField('icon')}>
                {ICON_OPTIONS.map((ic) => (
                  <option key={ic} value={ic}>{ic}</option>
                ))}
              </Select>
            </FormField>
            <FormActions onCancel={closeModal} saveLabel={modal.mode === 'add' ? 'Add Industry' : 'Save Changes'} />
          </form>
        </Modal>
      )}
    </div>
  );
}
