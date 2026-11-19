import type { ReactNode } from 'react';
import { enterAdvances, inputClass } from './fieldStyles';
import type { Detail } from './types';

interface FieldWrapProps {
  id: string;
  half?: boolean;
  falta: boolean;
  children: ReactNode;
}

/** Contêiner de um campo; ocupa a linha inteira ou meia linha (no celular, sempre a linha inteira). */
export function FieldWrap({ id, half, falta, children }: FieldWrapProps) {
  return (
    <div data-id={id} className={`flex flex-col gap-[9px] ${half ? 'col-auto b600:col-span-full' : 'col-span-full'} ${falta ? 'falta' : ''}`}>
      {children}
    </div>
  );
}

export function Optional() {
  return <span className="text-[13px] font-medium text-caramelo">{'  (opcional)'}</span>;
}

interface DetailInputProps {
  detail: Detail;
  value: string;
  falta: boolean;
  onChange: (v: string) => void;
  onEnter: () => void;
}

/** Campo extra que aparece quando uma opção específica é escolhida. */
export function DetailInput({ detail, value, falta, onChange, onEnter }: DetailInputProps) {
  return (
    <div className="mt-1 flex flex-col gap-2 border-l-[3px] border-areia pl-3.5">
      <label htmlFor={`f-${detail.id}`} className="text-sm font-semibold">
        {detail.label}
      </label>
      <input
        id={`f-${detail.id}`}
        name={detail.id}
        type="text"
        placeholder={detail.ph}
        value={value}
        aria-invalid={falta || undefined}
        className={inputClass(falta)}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={enterAdvances(onEnter)}
      />
    </div>
  );
}
