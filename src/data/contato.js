const NUMERO = '5585991529273'

// Cada CTA abre o WhatsApp com a mensagem já escrita, para o contato
// chegar com o assunto identificado.
const zap = (texto) => `https://wa.me/${NUMERO}?text=${encodeURIComponent(texto)}`

export const contato = {
  whatsappDev: zap('Olá, Eduardo! Vi seu portfólio e queria falar sobre um projeto.'),
  whatsapp3d: zap('Olá, Eduardo! Vi seu portfólio e queria um orçamento de impressão 3D.'),
  whatsappGeral: zap('Olá, Eduardo! Vi seu portfólio e gostaria de pedir um orçamento.'),
  email: 'eduardotajra2@hotmail.com',
  github: 'https://github.com/eduardotajra',
  linkedin: 'https://www.linkedin.com/in/eduardo-tajra/',
  instagram: 'https://www.instagram.com/eduardotajra/',
  tiktok: 'https://www.tiktok.com/@eduardotajraa?lang=pt-BR',
  youtube: 'https://www.youtube.com/@eduardotajra5',
  x: 'https://x.com/eduardotajra',
}
