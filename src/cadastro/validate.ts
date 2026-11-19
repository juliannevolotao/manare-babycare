import type { Answer, Answers, FieldDef, FormStep } from './types';

export function isEmpty(v: Answer | undefined): boolean {
  return v == null || (typeof v === 'string' && !v.trim()) || (Array.isArray(v) && !v.length) || v === false;
}

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function asList(v: Answer | undefined): string[] {
  return Array.isArray(v) ? v : [];
}

export function asText(v: Answer | undefined): string {
  return typeof v === 'string' ? v : '';
}

/** Ids dos campos obrigatórios (ou condicionais) ainda vazios, e e-mails inválidos. */
export function missingIds(step: FormStep, a: Answers): string[] {
  const out: string[] = [];
  step.fields.forEach((f: FieldDef) => {
    if (f.type === 'subtit' || f.type === 'termo') return;
    if (f.req && isEmpty(a[f.id])) out.push(f.id);
    if (f.type === 'chips' && f.detail && a[f.id] === f.detail.when && isEmpty(a[f.detail.id])) out.push(f.detail.id);
    if (f.type === 'multi' && f.details) {
      asList(a[f.id]).forEach((o) => {
        const d = f.details?.[o];
        if (d && isEmpty(a[d.id])) out.push(d.id);
      });
    }
    if (f.type === 'email') {
      const v = asText(a[f.id]);
      if (v && !EMAIL.test(v)) out.push(f.id);
    }
  });
  return out;
}
