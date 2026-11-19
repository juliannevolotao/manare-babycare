import { FieldWrap, Optional } from './FieldParts';
import { enterAdvances, inputClass, labelClass } from './fieldStyles';
import type { InputFieldDef } from './types';

interface Props {
  field: InputFieldDef;
  value: string;
  falta: boolean;
  onChange: (v: string) => void;
  onEnter: () => void;
}

export function TextField({ field: f, value, falta, onChange, onEnter }: Props) {
  const common = {
    id: `f-${f.id}`,
    name: f.id,
    placeholder: f.ph,
    autoComplete: f.auto,
    value,
    required: f.req,
    'aria-invalid': falta || undefined,
  };
  return (
    <FieldWrap id={f.id} half={f.half} falta={falta}>
      <label htmlFor={`f-${f.id}`} className={labelClass(falta)}>
        {f.label}
        {f.opt && <Optional />}
      </label>
      {f.type === 'textarea' ? (
        <textarea
          {...common}
          rows={f.rows ?? 4}
          className={`${inputClass(falta)} min-h-[96px] resize-y leading-[1.5]`}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          {...common}
          type={f.type}
          {...(f.type === 'number' ? { min: 0, inputMode: 'numeric' as const } : {})}
          className={inputClass(falta)}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={enterAdvances(onEnter)}
        />
      )}
    </FieldWrap>
  );
}
