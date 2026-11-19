import { CIDADES, EMPRESA, INSTAGRAM_URL, SITE_URL, TELEFONE_E164 } from '../config';
import { PERGUNTAS } from '../data/faq';

/**
 * Dados estruturados (schema.org em JSON-LD) para o Google entender que este é um
 * negócio local de babás em Santos e região, e quais são as perguntas frequentes.
 */
const DADOS = [
  {
    '@context': 'https://schema.org',
    '@type': 'ChildCare',
    '@id': `${SITE_URL}#empresa`,
    name: EMPRESA.nome,
    alternateName: 'Manarê Baby Care – Agência de babás em Santos',
    description:
      'Agência de babás em Santos, São Vicente, Praia Grande e Guarujá. Babás qualificadas, com curso de primeiros socorros, entrevista e teste presencial com a família. Atendimento avulso, mensal, férias e eventos.',
    url: SITE_URL,
    logo: `${SITE_URL}favicon.svg`,
    image: `${SITE_URL}og-image.jpg`,
    telephone: TELEFONE_E164,
    priceRange: '$$',
    address: { '@type': 'PostalAddress', addressLocality: 'Santos', addressRegion: EMPRESA.estado, addressCountry: 'BR' },
    areaServed: CIDADES.map((cidade) => ({ '@type': 'City', name: `${cidade}, ${EMPRESA.estado}` })),
    sameAs: [INSTAGRAM_URL],
    paymentAccepted: 'PIX, cartão de débito, cartão de crédito',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de babá',
      itemListElement: ['Babá avulsa', 'Babá mensal', 'Babá para férias', 'Babá para eventos'].map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name, areaServed: 'Baixada Santista' },
      })),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PERGUNTAS.map((p) => ({
      '@type': 'Question',
      name: p.pergunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: p.formasPagamento ? `${p.resposta} Formas de pagamento: ${p.formasPagamento.join(', ')}.` : p.resposta,
      },
    })),
  },
];

// Escapa "<" para o JSON não fechar a tag <script> por engano.
const JSON_LD = JSON.stringify(DADOS).replace(/</g, '\\u003c');

export function StructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />;
}
