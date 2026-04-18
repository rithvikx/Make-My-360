/**
 * Shared admin UI components:
 *  - PageHeader: title + optional add button
 *  - AdminTable: generic table with Edit/Delete actions
 *  - Modal: overlay with accessible dialog
 *  - FormField: labeled input/textarea/select
 *  - SaveBar: fixed bottom confirm/cancel bar
 */
import { useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

/* ── Token colours (reused inline to avoid Tailwind purge issues) ── */
// eslint-disable-next-line react-refresh/only-export-components
export const C = {
  surface: '#0E1117',
  card: '#11141B',
  border: 'rgba(0,224,255,0.1)',
  borderHover: 'rgba(0,224,255,0.28)',
  text: '#fff',
  muted: '#9AA4B2',
  accent: '#00E0FF',
  danger: '#FF4D4D',
};

/* ── Page Header ────────────────────────────────────────────────── */
export function PageHeader({ title, subtitle, onAdd, addLabel = 'Add New' }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-7">
      <div>
        <h1
          className="text-2xl font-bold text-white"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {title}
        </h1>
        {subtitle && <p className="text-sm mt-1" style={{ color: C.muted }}>{subtitle}</p>}
      </div>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex-shrink-0"
          style={{ background: C.accent, color: '#06070A', cursor: 'pointer' }}
          aria-label={addLabel}
        >
          <Plus size={15} aria-hidden="true" />
          {addLabel}
        </button>
      )}
    </div>
  );
}

/* ── Generic Table ──────────────────────────────────────────────── */
export function AdminTable({ columns, rows, onEdit, onDelete, emptyText = 'No items yet.' }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${C.border}`, background: C.card }}
    >
      {rows.length === 0 ? (
        <div className="py-16 text-center" style={{ color: C.muted }}>
          <p className="text-sm">{emptyText}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}`, background: 'rgba(0,224,255,0.03)' }}>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider"
                    style={{ color: C.muted }}
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-semibold text-xs uppercase tracking-wider" style={{ color: C.muted }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.id ?? i}
                  style={{ borderBottom: i < rows.length - 1 ? `1px solid rgba(0,224,255,0.05)` : 'none' }}
                  className="hover:bg-[rgba(0,224,255,0.02)] transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3.5" style={{ color: col.muted ? C.muted : C.text }}>
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                    </td>
                  ))}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all"
                          style={{ color: C.accent, background: 'rgba(0,224,255,0.06)', cursor: 'pointer' }}
                          aria-label={`Edit row ${row.id}`}
                        >
                          <Pencil size={12} aria-hidden="true" />
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => { if (window.confirm('Delete this item?')) onDelete(row); }}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all"
                          style={{ color: C.danger, background: 'rgba(255,77,77,0.07)', cursor: 'pointer' }}
                          aria-label={`Delete row ${row.id}`}
                        >
                          <Trash2 size={12} aria-hidden="true" />
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ── Modal ──────────────────────────────────────────────────────── */
export function Modal({ title, onClose, children, wide = false }) {
  // Trap focus / ESC
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full rounded-2xl shadow-2xl overflow-hidden"
        style={{
          maxWidth: wide ? 640 : 480,
          background: '#0E1117',
          border: `1px solid ${C.borderHover}`,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: `1px solid ${C.border}` }}
        >
          <h2 className="font-bold text-base text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-[#9AA4B2] hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Form Field ─────────────────────────────────────────────────── */
export function FormField({ label, required, error, children, hint }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: C.muted }}>
        {label}{required && <span style={{ color: C.accent }}> *</span>}
      </label>
      {children}
      {hint && <p className="text-xs mt-1" style={{ color: 'rgba(154,164,178,0.6)' }}>{hint}</p>}
      {error && <p className="text-xs mt-1" style={{ color: C.danger }}>{error}</p>}
    </div>
  );
}

export function Input({ value, onChange, placeholder, type = 'text', required, ...rest }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder-[#9AA4B2] outline-none transition-colors"
      style={{ background: '#06070A', border: `1px solid ${C.border}` }}
      onFocus={(e) => (e.target.style.borderColor = C.accent)}
      onBlur={(e) => (e.target.style.borderColor = C.border)}
      {...rest}
    />
  );
}

export function Textarea({ value, onChange, placeholder, rows = 3, required }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className="w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder-[#9AA4B2] outline-none transition-colors resize-y"
      style={{ background: '#06070A', border: `1px solid ${C.border}` }}
      onFocus={(e) => (e.target.style.borderColor = C.accent)}
      onBlur={(e) => (e.target.style.borderColor = C.border)}
    />
  );
}

export function Select({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none appearance-none"
      style={{ background: '#06070A', border: `1px solid ${C.border}` }}
      onFocus={(e) => (e.target.style.borderColor = C.accent)}
      onBlur={(e) => (e.target.style.borderColor = C.border)}
    >
      {children}
    </select>
  );
}

/* ── Save / Cancel buttons ──────────────────────────────────────── */
export function FormActions({ onCancel, onSave, saveLabel = 'Save' }) {
  return (
    <div className="flex items-center justify-end gap-3 mt-6 pt-4" style={{ borderTop: `1px solid ${C.border}` }}>
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
        style={{ color: C.muted, background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}
      >
        Cancel
      </button>
      <button
        type="submit"
        onClick={onSave}
        className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
        style={{ background: C.accent, color: '#06070A', cursor: 'pointer' }}
      >
        {saveLabel}
      </button>
    </div>
  );
}

/* ── Stat card ──────────────────────────────────────────────────── */
export function StatCard({ icon: Icon, label, value, accent = C.accent }) {
  return (
    <div
      className="rounded-xl p-5 flex items-center gap-4"
      style={{ background: C.card, border: `1px solid ${C.border}` }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}
      >
        <Icon size={18} style={{ color: accent }} aria-hidden="true" />
      </div>
      <div>
        <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {value}
        </div>
        <div className="text-xs" style={{ color: C.muted }}>{label}</div>
      </div>
    </div>
  );
}
