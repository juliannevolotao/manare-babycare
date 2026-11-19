import { useCallback, useEffect, useMemo, useState } from 'react';
import { STEPS, TOTAL_ETAPAS } from './steps';
import type { Answer, Answers, Step } from './types';
import { asList, missingIds } from './validate';

const INTRO_STEP: Step = { kind: 'intro' };

export const STORAGE_KEY = 'manare-cadastro-v1';

interface Saved {
  a: Answers;
  i: number;
}

interface State {
  answers: Answers;
  /** Etapa atual (0 = tela inicial). */
  idx: number;
  /** Última etapa com perguntas visitada, usada em "Continuar de onde parei". */
  ultimo: number;
}

const clampEtapa = (i: number) => Math.min(Math.max(i || 1, 1), STEPS.length - 1);

function load(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const s = raw ? (JSON.parse(raw) as Partial<Saved> | null) : null;
    if (s && s.a && typeof s.a === 'object') return { answers: s.a, idx: 0, ultimo: clampEtapa(Number(s.i)) };
  } catch {
    /* localStorage indisponível ou dado corrompido: começa vazio */
  }
  return { answers: {}, idx: 0, ultimo: 1 };
}

function persist(state: State) {
  try {
    const saved: Saved = { a: state.answers, i: state.ultimo };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  } catch {
    /* sem armazenamento (aba anônima, cota cheia): segue sem salvar */
  }
}

/** Move para a etapa `idx`, atualizando `ultimo` como o site original (só para etapas > 0). */
function go(s: State, idx: number): State {
  return { ...s, idx, ultimo: idx > 0 ? idx : s.ultimo };
}

export function useCadastro() {
  const [state, setState] = useState<State>(load);
  /** Incrementa a cada tentativa de avançar com campos faltando (para rolar até o primeiro). */
  const [tentativa, setTentativa] = useState(0);
  const [mostrarErros, setMostrarErros] = useState(false);
  /** Incrementa a cada troca de etapa feita pelo usuário (para rolar ao topo do cartão). */
  const [navegacao, setNavegacao] = useState(0);

  const { answers, idx } = state;
  const step: Step = STEPS[idx] ?? INTRO_STEP;

  useEffect(() => {
    persist(state);
  }, [state]);

  const missing = useMemo(() => (step.kind === 'form' ? missingIds(step, answers) : []), [step, answers]);

  const setAnswer = useCallback((id: string, value: Answer) => {
    setState((s) => go({ ...s, answers: { ...s.answers, [id]: value } }, s.idx));
  }, []);

  const toggleOption = useCallback((id: string, option: string) => {
    setState((s) => {
      const lista = asList(s.answers[id]);
      const next = lista.includes(option) ? lista.filter((o) => o !== option) : [...lista, option];
      return go({ ...s, answers: { ...s.answers, [id]: next } }, s.idx);
    });
  }, []);

  const navigate = useCallback((update: (s: State) => State) => {
    setState(update);
    setMostrarErros(false);
    setNavegacao((n) => n + 1);
  }, []);

  const avancar = useCallback(() => {
    if (missing.length) {
      setMostrarErros(true);
      setTentativa((n) => n + 1);
      return;
    }
    navigate((s) => go(s, Math.min(s.idx + 1, STEPS.length - 1)));
  }, [missing, navigate]);

  const voltar = useCallback(() => navigate((s) => go(s, Math.max(s.idx - 1, 0))), [navigate]);

  const temRespostas = Object.keys(answers).length > 0;

  const comecar = useCallback(
    () => navigate((s) => go(s, Object.keys(s.answers).length > 0 ? s.ultimo : 1)),
    [navigate],
  );

  const recomecar = useCallback(() => navigate(() => ({ answers: {}, idx: 1, ultimo: 1 })), [navigate]);

  return {
    step,
    idx,
    total: TOTAL_ETAPAS,
    isUltimaEtapa: idx === STEPS.length - 2,
    answers,
    setAnswer,
    toggleOption,
    missing: mostrarErros ? missing : [],
    tentativa,
    navegacao,
    avancar,
    voltar,
    comecar,
    recomecar,
    temRespostas,
  };
}
