import borboletaCreme from '../assets/borboleta-creme.svg';
import { Button } from '../components/Button';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { INSTAGRAM_USUARIO, MENSAGENS_WHATSAPP, WHATSAPP_EXIBICAO, linkWhatsApp } from '../config';

export function Contact() {
  return (
    <section id="contato" className="bg-cacau py-[104px] text-center text-creme">
      <div data-reveal-group className="wrap flex flex-col items-center gap-6">
        <img src={borboletaCreme} alt="" aria-hidden="true" className="w-16" />
        <h2 className="text-[clamp(38px,5vw,62px)] leading-[1.05] [&_em]:text-areia">
          Vamos <em>conversar?</em>
        </h2>
        <p className="max-w-[520px] text-lg text-areia">
          Conte a rotina da sua família. Respondemos sem compromisso e indicamos o melhor formato para vocês.
        </p>
        <Button variant="areia" href={linkWhatsApp(MENSAGENS_WHATSAPP.geral)}>
          <WhatsAppIcon />
          Chame no WhatsApp
        </Button>
        <span className="text-[15px] text-areia">
          WhatsApp: {WHATSAPP_EXIBICAO} · Instagram: @{INSTAGRAM_USUARIO}
        </span>
      </div>
    </section>
  );
}
