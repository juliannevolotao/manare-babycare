import { DetailInput, FieldWrap, Optional } from './FieldParts';
import { chipClass, labelClass } from './fieldStyles';
import type { Answers, MultiFieldDef } from './types';
import { asList, asText } from './validate';

interface Props {
  field: MultiFieldDef;
  answers: Answers;
  falta: boolean;
  toggle: (id: string, option: string) => void;
  setAnswer: (id: string, v: string) => void;
  onEnter: () => void;
}

/** Várias opções podem ser marcadas; algumas abrem um campo de detalhe. */
export function MultiField({ field: f, answers, falta, toggle, setAnswer, onEnter }: Props) {
  const marcadas = asList(answers[f.id]);
  return (
    <FieldWrap id={f.id} half={f.half} falta={falta}>
      <span id={`l-${f.id}`} className={labelClass(falta)}>
        {f.label}
        {f.opt && <Optional />}
      </span>
      <div className="flex flex-wrap gap-2" role="group" aria-labelledby={`l-${f.id}`}>
        {f.opts.map((o) => {
          const on = marcadas.includes(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              className={`${chipClass(on)} ${on ? "before:content-['✓_']" : ''}`}
              onClick={() => toggle(f.id, o)}
            >
              {o}
            </button>
          );
        })}
      </div>
      {marcadas.map((o) => {
        const d = f.details?.[o];
        if (!d) return null;
        return (
          <DetailInput
            key={d.id}
            detail={d}
            value={asText(answers[d.id])}
            falta={falta}
            onChange={(v) => setAnswer(d.id, v)}
            onEnter={onEnter}
          />
        );
      })}
    </FieldWrap>
  );
}
