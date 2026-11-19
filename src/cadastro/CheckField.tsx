import type { CheckFieldDef } from './types';

interface Props {
  field: CheckFieldDef;
  checked: boolean;
  falta: boolean;
  onChange: (v: boolean) => void;
}

export function CheckField({ field: f, checked, falta, onChange }: Props) {
  return (
    <label
      data-id={f.id}
      className={`col-span-full grid cursor-pointer grid-cols-[24px_1fr] items-start gap-3 text-[15px] ${falta ? 'falta text-erro' : ''}`}
    >
      <input
        type="checkbox"
        id={`f-${f.id}`}
        name={f.id}
        checked={checked}
        required={f.req}
        aria-invalid={falta || undefined}
        className="mt-0.5 h-[22px] w-[22px] accent-cacau"
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{f.label}</span>
    </label>
  );
}
