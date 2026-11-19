import { DetailInput, FieldWrap, Optional } from './FieldParts';
import { chipClass, labelClass } from './fieldStyles';
import type { Answers, ChipsFieldDef } from './types';
import { asText } from './validate';

interface Props {
  field: ChipsFieldDef;
  answers: Answers;
  falta: boolean;
  setAnswer: (id: string, v: string) => void;
  onEnter: () => void;
}

/** Escolha única entre opções em formato de "chip". */
export function ChipsField({ field: f, answers, falta, setAnswer, onEnter }: Props) {
  const atual = answers[f.id];
  return (
    <FieldWrap id={f.id} half={f.half} falta={falta}>
      <span id={`l-${f.id}`} className={labelClass(falta)}>
        {f.label}
        {f.opt && <Optional />}
      </span>
      <div className="flex flex-wrap gap-2" role="group" aria-labelledby={`l-${f.id}`}>
        {f.opts.map((o) => {
          const on = atual === o;
          return (
            <button key={o} type="button" aria-pressed={on} className={chipClass(on)} onClick={() => setAnswer(f.id, o)}>
              {o}
            </button>
          );
        })}
      </div>
      {f.detail && atual === f.detail.when && (
        <DetailInput
          detail={f.detail}
          value={asText(answers[f.detail.id])}
          falta={falta}
          onChange={(v) => f.detail && setAnswer(f.detail.id, v)}
          onEnter={onEnter}
        />
      )}
    </FieldWrap>
  );
}
