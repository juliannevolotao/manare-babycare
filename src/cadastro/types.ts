/** Valor de uma resposta: texto, lista de opções marcadas ou caixa de seleção. */
export type Answer = string | string[] | boolean;
export type Answers = Record<string, Answer | undefined>;

/** Campo de texto extra que aparece quando uma opção específica é escolhida. */
export interface Detail {
  id: string;
  label: string;
  ph?: string;
}

interface AnswerFieldBase {
  id: string;
  label: string;
  /** Obrigatório. */
  req?: boolean;
  /** Mostra "(opcional)" ao lado do rótulo. */
  opt?: boolean;
  /** Ocupa meia linha no desktop. */
  half?: boolean;
}

export type InputType = 'text' | 'tel' | 'email' | 'date' | 'number' | 'textarea';

export interface InputFieldDef extends AnswerFieldBase {
  type: InputType;
  ph?: string;
  auto?: string;
  rows?: number;
}

export interface ChipsFieldDef extends AnswerFieldBase {
  type: 'chips';
  opts: readonly string[];
  detail?: Detail & { when: string };
}

export interface MultiFieldDef extends AnswerFieldBase {
  type: 'multi';
  opts: readonly string[];
  details?: Readonly<Record<string, Detail>>;
}

export interface CheckFieldDef extends AnswerFieldBase {
  type: 'check';
}

export interface SubtitDef {
  type: 'subtit';
  label: string;
}

export interface TermoDef {
  type: 'termo';
  label: string;
}

export type AnswerFieldDef = InputFieldDef | ChipsFieldDef | MultiFieldDef | CheckFieldDef;
export type FieldDef = AnswerFieldDef | SubtitDef | TermoDef;

export interface IntroStep {
  kind: 'intro';
}

export interface FormStep {
  kind: 'form';
  sec: string;
  title: string;
  sub?: string;
  fields: readonly FieldDef[];
}

export interface FimStep {
  kind: 'fim';
}

export type Step = IntroStep | FormStep | FimStep;

export function isAnswerField(f: FieldDef): f is AnswerFieldDef {
  return f.type !== 'subtit' && f.type !== 'termo';
}
