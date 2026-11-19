import type { KeyboardEvent } from 'react';

/** Classes e utilitários compartilhados pelos campos do cadastro. */

export function inputClass(falta: boolean): string {
  return `w-full rounded-[14px] border-[1.5px] bg-creme px-[15px] py-[13px] font-[inherit] text-base text-cacau focus:bg-branco focus:outline-none ${
    falta ? 'border-erro' : 'border-linha focus:border-caramelo-claro'
  }`;
}

export function labelClass(falta: boolean): string {
  return `text-[15px] font-semibold leading-[1.4] ${falta ? 'text-erro' : ''}`;
}

export const chipClass = (on: boolean) =>
  `cursor-pointer rounded-full border-[1.5px] px-4 py-2.5 font-[inherit] text-[15px] transition-[background-color,border-color] duration-150 b600:px-3.5 b600:py-[9px] b600:text-sm ${
    on ? 'border-cacau bg-cacau text-creme' : 'border-linha bg-branco text-cacau hover:border-caramelo-claro'
  }`;

/** Tecla Enter em campos de uma linha avança para a próxima etapa. */
export function enterAdvances(onEnter: () => void) {
  return (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnter();
    }
  };
}
