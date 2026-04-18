import { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { PageHeader, AdminTable, Modal, FormField, Input, Textarea, FormActions, C } from '../components/AdminUI';

const EMPTY = { question: '', answer: '' };

export default function AdminFAQ() {
  const { faqs, updateFaqs } = useCMS();
  const [modal, setModal] = useState(null);

  const openAdd = () => setModal({ mode: 'add', data: { ...EMPTY } });
  const openEdit = (row) => setModal({ mode: 'edit', data: { ...row } });
  const closeModal = () => setModal(null);

  const handleSave = (e) => {
    e.preventDefault();
    const { question, answer } = modal.data;
    if (!question.trim()) return;
    const item = {
      id: modal.mode === 'edit' ? modal.data.id : Date.now(),
      question: question.trim(),
      answer: answer.trim(),
    };
    if (modal.mode === 'add') {
      updateFaqs((prev) => [...prev, item]);
    } else {
      updateFaqs((prev) => prev.map((f) => (f.id === item.id ? item : f)));
    }
    closeModal();
  };

  const handleDelete = (row) => {
    updateFaqs((prev) => prev.filter((f) => f.id !== row.id));
  };

  const setField = (key) => (e) =>
    setModal((m) => ({ ...m, data: { ...m.data, [key]: e.target.value } }));

  const columns = [
    { key: 'question', label: 'Question' },
    {
      key: 'answer',
      label: 'Answer',
      muted: true,
      render: (v) => (
        <span style={{ color: C.muted }}>{v?.slice(0, 70)}{v?.length > 70 ? '…' : ''}</span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="FAQ"
        subtitle="Frequently asked questions shown on the homepage and FAQ page."
        onAdd={openAdd}
        addLabel="Add Question"
      />

      <AdminTable
        columns={columns}
        rows={faqs}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyText="No FAQs yet. Click 'Add Question' to create one."
      />

      {modal && (
        <Modal
          title={modal.mode === 'add' ? 'Add FAQ' : 'Edit FAQ'}
          onClose={closeModal}
          wide
        >
          <form onSubmit={handleSave}>
            <FormField label="Question" required>
              <Input
                value={modal.data.question}
                onChange={setField('question')}
                placeholder="e.g. How long does a shoot take?"
                required
              />
            </FormField>
            <FormField label="Answer" required>
              <Textarea
                value={modal.data.answer}
                onChange={setField('answer')}
                placeholder="Provide a clear, helpful answer..."
                rows={5}
                required
              />
            </FormField>
            <FormActions onCancel={closeModal} saveLabel={modal.mode === 'add' ? 'Add FAQ' : 'Save Changes'} />
          </form>
        </Modal>
      )}
    </div>
  );
}
