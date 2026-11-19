import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../components/Button';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { WHATSAPP_EXIBICAO, linkWhatsApp } from '../config';
import { buildMessage } from '../cadastro/buildMessage';
import { CheckField } from '../cadastro/CheckField';
import { ChipsField } from '../cadastro/ChipsField';
import { MultiField } from '../cadastro/MultiField';
import { TextField } from '../cadastro/TextField';
import { STEPS } from '../cadastro/steps';
import type { FieldDef, FormStep } from '../cadastro/types';
import { useCadastro } from '../cadastro/useCadastro';
import { asText } from '../cadastro/validate';

const INTRO = [
  'Leva cerca de 20 minutos, uma pergunta de cada vez.',
  'Suas respostas ficam salvas neste aparelho: você pode parar e continuar depois.',
  'Responda com sinceridade e de forma completa. Respostas falsas ou incompletas desclassificam.',
  'No final, você envia tudo pelo WhatsApp da Manarê. O envio não garante contratação.',
];

const h2Class = 'mb-2 text-[clamp(28px,3.4vw,36px)] leading-[1.12]';
const subClass = 'mb-[26px] text-base text-cacau-suave';
const voltaClass = 'cursor-pointer border-none bg-transparent px-1 py-2.5 text-[15px] font-semibold text-caramelo';

/** Ids que deixam o campo marcado em vermelho: o próprio campo e seus campos de detalhe. */
function relatedIds(f: FieldDef): string[] {
  if (f.type === 'chips' && f.detail) return [f.id, f.detail.id];
  if (f.type === 'multi' && f.details) return [f.id, ...Object.values(f.details).map((d) => d.id)];
  return 'id' in f ? [f.id] : [];
}

export function Cadastro() {
  const c = useCadastro();
  const boxRef = useRef<HTMLDivElement>(null);

  // Ao trocar de etapa, leva o topo do cartão para perto do topo da tela (abaixo do cabeçalho fixo).
  useLayoutEffect(() => {
    if (!c.navegacao || !boxRef.current) return;
    const top = boxRef.current.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: Math.max(top, 0) });
  }, [c.navegacao]);

  // Ao tentar avançar com campos faltando, rola até o primeiro deles.
  useEffect(() => {
    if (!c.tentativa) return;
    boxRef.current?.querySelector('.falta')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [c.tentativa]);

  return (
    <div id="cadastro">
      <section className="pb-[88px] pt-10 b600:pb-16 b600:pt-4">
        <div className="wrap">
          <a href="#seja-baba" className="mb-4 inline-flex items-center gap-2 text-[15px] font-semibold text-caramelo">
            ← Voltar
          </a>
          <div
            ref={boxRef}
            id="cad-box"
            data-reveal
            aria-live="polite"
            className="mx-auto max-w-[720px] rounded-[28px] border border-linha bg-branco px-9 pb-7 pt-[34px] b600:rounded-[22px] b600:px-5 b600:pb-5 b600:pt-6"
          >
            {c.step.kind === 'intro' && <Intro temRespostas={c.temRespostas} onComecar={c.comecar} onRecomecar={c.recomecar} />}
            {c.step.kind === 'form' && <FormView step={c.step} c={c} />}
            {c.step.kind === 'fim' && <Fim c={c} />}
          </div>
        </div>
      </section>
    </div>
  );
}

type CadastroState = ReturnType<typeof useCadastro>;

function Intro({ temRespostas, onComecar, onRecomecar }: { temRespostas: boolean; onComecar: () => void; onRecomecar: () => void }) {
  return (
    <>
      <span className="eyebrow">Processo seletivo</span>
      <h2 className={`${h2Class} mt-3`}>Cadastro de babá Manarê</h2>
      <p className={subClass}>Esta é a primeira etapa do processo seletivo. Depois dela vêm a entrevista e os treinamentos.</p>
      <ul className="mb-[26px] mt-1 flex flex-col gap-3">
        {INTRO.map((t, i) => (
          <li key={t} className="grid grid-cols-[28px_1fr] gap-3 text-base">
            <b className="font-display text-[22px] font-normal leading-[1.1] text-caramelo-claro">{i + 1}</b>
            <span>{t}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2.5">
        <Button variant="cacau" onClick={onComecar}>
          {temRespostas ? 'Continuar de onde parei' : 'Começar'}
        </Button>
        {temRespostas && (
          <Button variant="linha" onClick={onRecomecar}>
            Começar do zero
          </Button>
        )}
      </div>
    </>
  );
}

function Progress({ sec, label, value, total, percent }: { sec: string; label: string; value: number; total: number; percent: number }) {
  return (
    <>
      <div className="mb-2.5 flex justify-between gap-3 text-[13px] font-semibold tracking-[.04em] text-caramelo">
        <span>{sec}</span>
        <span>{label}</span>
      </div>
      <div
        role="progressbar"
        aria-label="Progresso do cadastro"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={value}
        className="mb-[30px] h-1.5 overflow-hidden rounded-[3px] bg-linha"
      >
        <i className="block h-full rounded-[3px] bg-caramelo-claro transition-[width] duration-[350ms] ease-in-out" style={{ width: `${percent}%` }} />
      </div>
    </>
  );
}

function FormView({ step, c }: { step: FormStep; c: CadastroState }) {
  const n = Math.min(c.idx, c.total);
  const missing = c.missing;
  return (
    <>
      <Progress sec={step.sec} label={`Etapa ${n} de ${c.total}`} value={n - 1} total={c.total} percent={Math.round(((n - 1) / c.total) * 100)} />
      <h2 className={h2Class}>{step.title}</h2>
      {step.sub ? <p className={subClass}>{step.sub}</p> : <div className="h-[18px]" />}
      <div className="grid grid-cols-[repeat(2,1fr)] gap-x-4 gap-y-[22px] b600:grid-cols-[repeat(1,1fr)]">
        {step.fields.map((f, i) => {
          const falta = relatedIds(f).some((id) => missing.includes(id));
          switch (f.type) {
            case 'subtit':
              return (
                <div key={`subtit-${i}`} className="col-span-full mt-1.5 font-display text-[22px]">
                  {f.label}
                </div>
              );
            case 'termo':
              return (
                <div key={`termo-${i}`} className="col-span-full rounded-2xl bg-creme px-5 py-[18px] text-[15px] leading-[1.6]">
                  {f.label}
                </div>
              );
            case 'check':
              return <CheckField key={f.id} field={f} checked={c.answers[f.id] === true} falta={falta} onChange={(v) => c.setAnswer(f.id, v)} />;
            case 'chips':
              return <ChipsField key={f.id} field={f} answers={c.answers} falta={falta} setAnswer={c.setAnswer} onEnter={c.avancar} />;
            case 'multi':
              return (
                <MultiField key={f.id} field={f} answers={c.answers} falta={falta} toggle={c.toggleOption} setAnswer={c.setAnswer} onEnter={c.avancar} />
              );
            default:
              return (
                <TextField key={f.id} field={f} value={asText(c.answers[f.id])} falta={falta} onChange={(v) => c.setAnswer(f.id, v)} onEnter={c.avancar} />
              );
          }
        })}
      </div>
      <div id="cad-erro" role="alert" className="mt-[18px] min-h-5 text-sm font-semibold text-erro">
        {missing.length ? 'Preencha os campos marcados para continuar.' : ''}
      </div>
      <div className="mt-3.5 flex items-center justify-between gap-3">
        <button type="button" className={voltaClass} onClick={c.voltar}>
          ← Voltar
        </button>
        <span className="text-[13px] text-cacau-suave">Salvo neste aparelho</span>
        <Button variant="cacau" onClick={c.avancar}>
          {c.isUltimaEtapa ? 'Concluir' : 'Continuar'}
        </Button>
      </div>
    </>
  );
}

function Fim({ c }: { c: CadastroState }) {
  const texto = useMemo(() => buildMessage(STEPS, c.answers), [c.answers]);
  const [aviso, setAviso] = useState('');

  const copiar = () => {
    const fazer = navigator.clipboard?.writeText ? navigator.clipboard.writeText(texto) : Promise.reject(new Error('sem clipboard'));
    fazer.then(
      () => setAviso(`Respostas copiadas. Agora é só colar na conversa com a Manarê: ${WHATSAPP_EXIBICAO}.`),
      () => setAviso('Não foi possível copiar automaticamente. Selecione o texto acima e copie.'),
    );
  };


  return (
    <>
      <Progress sec="Pronto" label="Concluído" value={c.total} total={c.total} percent={100} />
      <h2 className={h2Class}>Tudo pronto!</h2>
      <p className={subClass}>Confira suas respostas e envie pelo WhatsApp da Manarê. Entraremos em contato para agendar a entrevista.</p>
      <div
        tabIndex={0}
        aria-label="Resumo das respostas"
        className="mb-5 mt-1.5 max-h-[300px] overflow-auto whitespace-pre-wrap rounded-2xl bg-creme px-5 py-[18px] font-body text-sm leading-[1.55]"
      >
        {texto}
      </div>
      <div className="flex flex-wrap gap-2.5">
        <Button variant="cacau" href={linkWhatsApp(texto)}>
          <WhatsAppIcon />
          Enviar pelo WhatsApp
        </Button>
        <Button variant="linha" onClick={copiar}>
          Copiar respostas
        </Button>
      </div>
      <div role="status" className="mt-2.5 min-h-5 text-sm font-semibold text-ok">
        {aviso}
      </div>
      <p className="mt-4 text-sm text-cacau-suave">Se o WhatsApp abrir sem o texto completo, toque em "Copiar respostas" e cole na conversa.</p>
      <div className="mt-3.5 flex items-center justify-between gap-3">
        <button type="button" className={voltaClass} onClick={c.voltar}>
          ← Revisar respostas
        </button>
        <span />
      </div>
    </>
  );
}
