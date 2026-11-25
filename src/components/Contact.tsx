import { useId, useState, type FormEvent } from 'react';
import { useLanguage } from '../lib/language';
import { site } from '../content/site';
import { ui } from '../content/ui';
import { Crystal } from './Scene';

type FormValues = {
  name: string;
  email: string;
  organization: string;
  projectType: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormValues, 'required' | 'email'>>;
type SubmitState = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured';

const EMPTY: FormValues = { name: '', email: '', organization: '', projectType: '', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const { t } = useLanguage();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<SubmitState>('idle');
  const idBase = useId();

  const update = (key: keyof FormValues) => (e: { target: { value: string } }) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = 'required';
    if (!values.email.trim()) next.email = 'required';
    else if (!EMAIL_PATTERN.test(values.email.trim())) next.email = 'email';
    if (!values.message.trim()) next.message = 'required';
    return next;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = 'THE IDEA LAB inquiry';
    const payload = {
      ...values,
      _subject: subject,
    };

    if (site.contact.formEndpoint) {
      setState('sending');
      try {
        const res = await fetch(site.contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setState('sent');
          setValues(EMPTY);
        } else {
          setState('error');
        }
      } catch {
        setState('error');
      }
      return;
    }

    if (site.contact.email) {
      const body = [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Organization: ${values.organization}`,
        `Project type: ${values.projectType}`,
        '',
        values.message,
      ].join('\n');
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setState('idle');
      return;
    }

    setState('unconfigured');
  };

  const fieldId = (key: keyof FormValues) => `${idBase}-${key}`;
  const errorText = (key: keyof FieldErrors) => {
    const code = errors[key];
    if (!code) return null;
    return <p className="mt-1.5 text-xs font-medium text-rose-600">{t(code === 'email' ? ui.contact.invalidEmail : ui.contact.required)}</p>;
  };

  return (
    <section id="contact" className="aurora relative overflow-hidden px-5 py-28 md:px-10">
      <div data-parallax="-40" className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="sphere-soft absolute -start-20 top-24 h-80 w-80 opacity-80" />
        <Crystal hue="lilac" className="absolute end-[6%] top-16 hidden h-48 w-36 animate-float lg:block" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div data-reveal>
          <p className="capsule inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-electric">
            <span className="h-1.5 w-1.5 rounded-full bg-sky shadow-[0_0_10px_#39BFEA]" aria-hidden />
            {t(ui.contact.eyebrow)}
          </p>
          <h2 className="text-gradient mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">{t(ui.contact.title)}</h2>
          <p className="mt-5 text-lg font-semibold text-ink md:text-xl">{t(ui.contact.subtitle)}</p>
          <p className="mt-2 text-base text-ink/70">{t(ui.contact.lead)}</p>

          <div className="glass mt-10 max-w-md p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky">{t(ui.contact.emailLabel)}</p>
            {site.contact.email ? (
              <a href={`mailto:${site.contact.email}`} className="mt-2 block break-all text-lg font-semibold text-electric hover:underline">
                {site.contact.email}
              </a>
            ) : (
              <p className="mt-2 text-sm italic text-ink/55">{t(ui.contact.emailPlaceholder)}</p>
            )}
          </div>
        </div>

        <form
          noValidate
          onSubmit={onSubmit}
          data-reveal
          className="glass relative space-y-5 p-6 md:p-10"
          aria-label={t(ui.contact.title)}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor={fieldId('name')} className="mb-2 block text-sm font-semibold text-ink">
                {t(ui.contact.name)} <span className="text-rose-500">*</span>
              </label>
              <input
                id={fieldId('name')}
                className="field"
                value={values.name}
                onChange={update('name')}
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? `${fieldId('name')}-err` : undefined}
              />
              <div id={`${fieldId('name')}-err`}>{errorText('name')}</div>
            </div>
            <div>
              <label htmlFor={fieldId('email')} className="mb-2 block text-sm font-semibold text-ink">
                {t(ui.contact.email)} <span className="text-rose-500">*</span>
              </label>
              <input
                id={fieldId('email')}
                type="email"
                className="field"
                value={values.email}
                onChange={update('email')}
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? `${fieldId('email')}-err` : undefined}
              />
              <div id={`${fieldId('email')}-err`}>{errorText('email')}</div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor={fieldId('organization')} className="mb-2 block text-sm font-semibold text-ink">
                {t(ui.contact.organization)}
              </label>
              <input
                id={fieldId('organization')}
                className="field"
                value={values.organization}
                onChange={update('organization')}
                autoComplete="organization"
              />
            </div>
            <div>
              <label htmlFor={fieldId('projectType')} className="mb-2 block text-sm font-semibold text-ink">
                {t(ui.contact.projectType)}
              </label>
              <select id={fieldId('projectType')} className="field" value={values.projectType} onChange={update('projectType')}>
                <option value="">{t(ui.contact.selectType)}</option>
                {ui.projectTypes.map((type) => (
                  <option key={type.en} value={type.en}>
                    {t(type)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor={fieldId('message')} className="mb-2 block text-sm font-semibold text-ink">
              {t(ui.contact.message)} <span className="text-rose-500">*</span>
            </label>
            <textarea
              id={fieldId('message')}
              rows={6}
              className="field resize-y"
              value={values.message}
              onChange={update('message')}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? `${fieldId('message')}-err` : undefined}
            />
            <div id={`${fieldId('message')}-err`}>{errorText('message')}</div>
          </div>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" disabled={state === 'sending'} className="btn-primary sheen rounded-full px-9 py-4 text-sm font-bold tracking-[0.18em] disabled:opacity-70">
              {state === 'sending' ? t(ui.contact.sending) : t(ui.contact.send)}
            </button>
          </div>

          <div role="status" aria-live="polite" className="min-h-[1.5rem] text-sm font-medium">
            {state === 'sent' && <p className="text-emerald-700">{t(ui.contact.sent)}</p>}
            {state === 'error' && <p className="text-rose-600">{t(ui.contact.failed)}</p>}
            {state === 'unconfigured' && <p className="text-electric">{t(ui.contact.notConnected)}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
