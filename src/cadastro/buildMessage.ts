import type { AnswerFieldDef, Answers, Step } from './types';
import { asList, isEmpty } from './validate';

const pad2 = (n: number) => String(n).padStart(2, '0');

/** "AAAA-MM-DD" → "DD/MM/AAAA (N anos)", com a idade calculada na data `hoje`. */
export function formatBirthDate(v: string, hoje: Date): string {
  if (!v) return '';
  const p = v.split('-');
  if (p.length !== 3) return v;
  const [ano, mes, dia] = p as [string, string, string];
  const nasc = new Date(+ano, +mes - 1, +dia);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  if (hoje < new Date(hoje.getFullYear(), nasc.getMonth(), nasc.getDate())) idade--;
  return `${dia}/${mes}/${ano} (${idade} anos)`;
}

function fieldValue(f: AnswerFieldDef, a: Answers, hoje: Date): string {
  const v = a[f.id];
  if (v === undefined || isEmpty(v)) return '';
  if (f.type === 'date') return formatBirthDate(String(v), hoje);
  if (f.type === 'check') return 'Sim';
  if (f.type === 'multi') {
    const lista = asList(v);
    let t = lista.join(', ');
    if (f.details) {
      lista.forEach((o) => {
        const d = f.details?.[o];
        const extra = d ? a[d.id] : undefined;
        if (d && typeof extra === 'string' && extra) t += `\n   › ${d.label} ${extra}`;
      });
    }
    return t;
  }
  let s = String(v).trim();
  if (f.type === 'chips' && f.detail && v === f.detail.when) {
    const extra = a[f.detail.id];
    if (typeof extra === 'string' && extra) s = (v === 'Outra' ? '' : `${s} — `) + extra.trim();
  }
  return s;
}

/** Monta o texto enviado pelo WhatsApp: seções em *negrito*, idade calculada e assinatura com data. */
export function buildMessage(steps: readonly Step[], a: Answers, hoje: Date = new Date()): string {
  let t = '*CADASTRO DE BABÁ — MANARÊ BABY CARE*\n';
  let sec = '';
  steps.forEach((st) => {
    if (st.kind !== 'form') return;
    if (st.sec !== sec) {
      sec = st.sec;
      t += `\n*${sec.toUpperCase()}*\n`;
    }
    st.fields.forEach((f) => {
      if (f.type === 'subtit') {
        t += `_${f.label}_\n`;
        return;
      }
      if (f.type === 'termo') return;
      const v = fieldValue(f, a, hoje);
      if (!v) return;
      if (f.type === 'textarea') t += `• ${f.label}\n${v}\n`;
      else t += `• ${f.label}: ${v}\n`;
    });
  });
  const nome = typeof a.nome === 'string' ? a.nome.trim() : '';
  t += `\nAssinado por ${nome} em ${pad2(hoje.getDate())}/${pad2(hoje.getMonth() + 1)}/${hoje.getFullYear()}.`;
  return t;
}
