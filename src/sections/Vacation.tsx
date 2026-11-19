import praia from '../assets/praia.jpg';
import { Button } from '../components/Button';
import { Section } from '../components/Section';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { MENSAGENS_WHATSAPP, linkWhatsApp } from '../config';

const PACOTES = [
  { nome: 'Manhã', horario: '7h às 12h' },
  { nome: 'Tarde', horario: '13h às 18h' },
  { nome: 'Integral', horario: '9h de atendimento' },
];

export function Vacation() {
  return (
    <Section id="ferias">
      <div className="grid grid-cols-[repeat(2,1fr)] overflow-hidden rounded-[32px] border border-linha bg-branco b860:grid-cols-[repeat(1,1fr)]">
        <img
          src={praia}
          alt="Chapéu de palha, baldinho de praia e protetor solar sobre a toalha"
          width={1200}
          height={1500}
          className="h-full min-h-[360px] w-full object-cover"
        />
        <div className="flex flex-col gap-[22px] px-[52px] py-14 b860:px-7 b860:py-9">
          <span className="eyebrow">Dezembro e janeiro</span>
          <h2 className="text-[clamp(34px,4vw,48px)] leading-[1.06]">Férias na Manarê</h2>
          <p>Enquanto você trabalha, seu filho aproveita as férias com recreação, atividades educativas e cuidado individual.</p>
          <div className="flex flex-col gap-2.5">
            {PACOTES.map((p) => (
              <div
                key={p.nome}
                className="flex justify-between gap-4 rounded-[14px] bg-creme px-5 py-4 tabular-nums last:bg-cacau last:text-creme"
              >
                <strong className="font-semibold">{p.nome}</strong>
                <span>{p.horario}</span>
              </div>
            ))}
          </div>
          <small className="text-sm font-semibold text-caramelo">De segunda a sexta · vagas limitadas</small>
          <Button variant="caramelo" size="lg" className="mt-1" href={linkWhatsApp(MENSAGENS_WHATSAPP.ferias)}>
            <WhatsAppIcon />
            Consultar disponibilidade
          </Button>
        </div>
      </div>
    </Section>
  );
}
