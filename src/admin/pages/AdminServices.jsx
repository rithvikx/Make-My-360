import { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { PageHeader, AdminTable, Modal, FormField, Input, Textarea, FormActions, C } from '../components/AdminUI';

const EMPTY = { title: '', tagline: '', description: '', features: '', badge: '360°' };

function parseFeatures(str) {
  return str.split('\n').map((s) => s.trim()).filter(Boolean);
}

export default function AdminServices() {
  const { services, updateServices } = useCMS();
  const [modal, setModal] = useState(null); // null | { mode:'add'|'edit', data:{} }

  const openAdd = () => setModal({ mode: 'add', data: { ...EMPTY } });
  const openEdit = (row) => setModal({
    mode: 'edit',
    data: { ...row, features: (row.features || []).join('\n') },
  });
  const closeModal = () => setModal(null);

  const handleSave = (e) => {
    e.preventDefault();
    const { title, tagline, description, features, badge } = modal.data;
    if (!title.trim()) return;
    const item = {
      id: modal.mode === 'edit' ? modal.data.id : Date.now(),
      title: title.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      features: parseFeatures(features),
      badge: badge.trim() || '360°',
    };
    if (modal.mode === 'add') {
      updateServices((prev) => [...prev, item]);
    } else {
      updateServices((prev) => prev.map((s) => (s.id === item.id ? item : s)));
    }
    closeModal();
  };

  const handleDelete = (row) => {
    updateServices((prev) => prev.filter((s) => s.id !== row.id));
  };

  const setField = (key) => (e) =>
    setModal((m) => ({ ...m, data: { ...m.data, [key]: e.target.value } }));

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'tagline', label: 'Tagline', muted: true },
    {
      key: 'features',
      label: 'Features',
      muted: true,
      render: (v) => (
        <span style={{ color: C.muted }}>
          {Array.isArray(v) ? v.length : 0} items
        </span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Manage the service cards shown on the Services section."
        onAdd={openAdd}
        addLabel="Add Service"
      />

      <AdminTable
        columns={columns}
        rows={services}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyText="No services yet. Click 'Add Service' to create one."
      />

      {modal && (
        <Modal
          title={modal.mode === 'add' ? 'Add Service' : 'Edit Service'}
          onClose={closeModal}
          wide
        >
          <form onSubmit={handleSave}>
            <FormField label="Title" required>
              <Input value={modal.data.title} onChange={setField('title')} placeholder="e.g. 360° Virtual Tour" required />
            </FormField>
            <FormField label="Tagline">
              <Input value={modal.data.tagline} onChange={setField('tagline')} placeholder="Short one-liner shown under title" />
            </FormField>
            <FormField label="Description">
              <Textarea value={modal.data.description} onChange={setField('description')} placeholder="2–3 sentence description" rows={3} />
            </FormField>
            <FormField label="Features" hint="One feature per line. These appear as bullet points.">
              <Textarea value={modal.data.features} onChange={setField('features')} placeholder={"Interactive hotspot navigation\nGoogle Street View integration"} rows={5} />
            </FormField>
            <FormField label="Badge Text">
              <Input value={modal.data.badge} onChange={setField('badge')} placeholder="360°" />
            </FormField>
            <FormActions onCancel={closeModal} saveLabel={modal.mode === 'add' ? 'Add Service' : 'Save Changes'} />
          </form>
        </Modal>
      )}
    </div>
  );
}
