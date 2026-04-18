import { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { PageHeader, FormField, Input, Textarea, C } from '../components/AdminUI';
import { Save } from 'lucide-react';

export default function AdminAbout() {
  const { about, updateAbout } = useCMS();
  const [form, setForm] = useState({
    headline: about.headline,
    story: about.story.join('\n\n'),
    stats: about.stats.map((s) => `${s.value}|${s.suffix}|${s.label}`).join('\n'),
  });
  const [saved, setSaved] = useState(false);

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    const { headline, story, stats } = form;
    const parsedStats = stats
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [value, suffix, ...rest] = line.split('|');
        return { value: Number(value) || 0, suffix: suffix ?? '', label: rest.join('|') };
      });

    updateAbout({
      headline: headline.trim(),
      story: story.split('\n\n').map((s) => s.trim()).filter(Boolean),
      stats: parsedStats,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            About Page
          </h1>
          <p className="text-sm" style={{ color: C.muted }}>
            Edit the story, headline and stats shown on the About page.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex-shrink-0"
          style={{
            background: saved ? '#00D47E' : C.accent,
            color: '#06070A',
            cursor: 'pointer',
          }}
        >
          <Save size={14} aria-hidden="true" />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <form onSubmit={handleSave}>
        <div
          className="rounded-xl p-6 mb-5"
          style={{ background: '#0E1117', border: `1px solid ${C.border}` }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: C.muted }}>
            Page Content
          </h2>

          <FormField label="Main Headline" required>
            <Input
              value={form.headline}
              onChange={setField('headline')}
              placeholder="Built Because Hyderabad Deserved Better"
              required
            />
          </FormField>

          <FormField
            label="Story Paragraphs"
            hint="Separate each paragraph with a blank line (double Enter)."
          >
            <Textarea
              value={form.story}
              onChange={setField('story')}
              placeholder={"We started Make My 360 after...\n\nA showroom in Gachibowli..."}
              rows={8}
            />
          </FormField>
        </div>

        <div
          className="rounded-xl p-6"
          style={{ background: '#0E1117', border: `1px solid ${C.border}` }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: C.muted }}>
            Stats / Numbers
          </h2>
          <p className="text-xs mb-4" style={{ color: 'rgba(154,164,178,0.6)' }}>
            One stat per line in the format: <code style={{ color: C.accent }}>value|suffix|label</code>
            <br />Example: <code style={{ color: C.accent }}>50|+|Businesses Served</code>
          </p>

          <Textarea
            value={form.stats}
            onChange={setField('stats')}
            placeholder={"50|+|Businesses Served\n5| Cities|Across Telangana\n100|%|Client Retention\n3|+|Years of Experience"}
            rows={5}
          />
        </div>
      </form>

      {/* Live preview */}
      <div
        className="rounded-xl p-6 mt-5"
        style={{ background: '#11141B', border: `1px solid rgba(0,224,255,0.06)` }}
      >
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: C.muted }}>Live Preview</p>
        <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {form.headline || '(No headline)'}
        </h3>
        {form.story.split('\n\n').filter(Boolean).map((p, i) => (
          <p key={i} className="text-sm mb-2" style={{ color: C.muted }}>
            {p}
          </p>
        ))}
        <div className="flex gap-4 mt-4">
          {form.stats.split('\n').filter(Boolean).map((line, i) => {
            const [value, suffix, label] = line.split('|');
            return (
              <div key={i} className="text-center px-3 py-2 rounded-lg" style={{ background: '#06070A' }}>
                <div className="font-bold text-sm" style={{ color: C.accent }}>{value}{suffix}</div>
                <div className="text-xs" style={{ color: C.muted }}>{label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
