import { useState } from 'react';
import { saveEbookLead } from '../lib/firebase';

export default function Ebook() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await saveEbookLead(formData.name, formData.email, formData.phone, 'landing_page');
      setSubmitted(true);
      
      // Redirecionar para o Google Drive após 2 segundos
      setTimeout(() => {
        window.location.href = 'https://drive.google.com/file/d/1UXAu0XQ3YrIPyh4p5gDToMaY2jj16xg4/view?usp=sharing';
      }, 2000);
    } catch (error) {
      console.error('Erro ao salvar lead:', error);
      alert('Erro ao processar sua solicitação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white flex items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <div className="w-20 h-20 bg-terracotta-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-terracotta-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-4xl text-gray-900 mb-4">
            Obrigada!
          </h1>
          <p className="font-sans text-lg text-gray-600 mb-2">
            Seu e-book está sendo preparado...
          </p>
          <p className="font-sans text-sm text-gray-500">
            Você será redirecionada em instantes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #F9F7F2 0%, #F5F1E8 25%, #F9F7F2 50%, #F2EDE3 75%, #F9F7F2 100%)'
    }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/ebook-hero.webp" 
            alt="Mulher em momento de reflexão" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream-900/90 via-cream-900/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            {/* Título Principal */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
              Por que seu corpo não responde aos tratamentos?
            </h1>

            {/* Subtítulo com fundo semi-transparente */}
            <div className="bg-black/40 backdrop-blur-sm px-6 py-4 rounded-lg mb-8 inline-block">
              <p className="font-sans text-xl md:text-2xl text-white leading-relaxed">
                O que ninguém explica sobre dor, inflamação e estética quando o cuidado não começa pela função.
              </p>
            </div>

            {/* CTA Button */}
            <a 
              href="#formulario" 
              className="inline-block bg-terracotta-600 hover:bg-terracotta-700 text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Baixar E-book Gratuito
            </a>
          </div>
        </div>
      </section>

      {/* Introdução - Copy Melhorado */}
      <section className="py-20 bg-gradient-to-b from-cream-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="font-sans text-2xl text-gray-800 leading-relaxed mb-8 font-light">
              Você já tentou procedimentos diferentes, seguiu protocolos, investiu tempo e dinheiro.
            </p>
            <p className="font-sans text-2xl text-gray-800 leading-relaxed mb-8 font-light">
              Mas os resultados não se sustentam. E a frustração se acumula.
            </p>
            <p className="font-sans text-2xl text-gray-900 font-medium leading-relaxed mb-10">
              Este eBook não foi criado para vender soluções rápidas.<br />
              Ele foi criado para trazer <span className="text-terracotta-600">clareza</span>.
            </p>
            
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border-l-4 border-terracotta-600 shadow-lg">
              <ul className="space-y-5 font-sans text-xl text-gray-800 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-terracotta-600 mr-4 text-2xl font-bold">•</span>
                  <span><strong>Clareza</strong> sobre por que tantos tratamentos falham.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-terracotta-600 mr-4 text-2xl font-bold">•</span>
                  <span><strong>Clareza</strong> sobre o papel da inflamação crônica no corpo.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-terracotta-600 mr-4 text-2xl font-bold">•</span>
                  <span><strong>Clareza</strong> sobre a diferença entre tratar sintomas e cuidar da causa.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* O que você vai aprender */}
      <section className="py-20 relative overflow-hidden" style={{
        background: 'linear-gradient(to bottom, #ffffff 0%, #F9F7F2 50%, #ffffff 100%)'
      }}>
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 text-center mb-4">
              O que você vai aprender
            </h2>
            <p className="font-sans text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
              Seis capítulos que conectam função, inflamação e resultados reais.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border-2 border-gold-400 shadow-[0_8px_30px_rgb(218,165,32,0.3)] hover:shadow-[0_12px_40px_rgb(218,165,32,0.5)] transition-all duration-300">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mb-6 shadow-lg border-2 border-gold-300">
                  <span className="text-gray-900 text-2xl font-bold">1</span>
                </div>
                <h3 className="font-serif text-2xl text-gray-900 mb-3 leading-tight">
                  Por que dor e inchaço não surgem do nada
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed">
                  Entenda os sinais que o corpo envia antes de manifestar sintomas visíveis.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border-2 border-gold-400 shadow-[0_8px_30px_rgb(218,165,32,0.3)] hover:shadow-[0_12px_40px_rgb(218,165,32,0.5)] transition-all duration-300">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mb-6 shadow-lg border-2 border-gold-300">
                  <span className="text-gray-900 text-2xl font-bold">2</span>
                </div>
                <h3 className="font-serif text-2xl text-gray-900 mb-3 leading-tight">
                  Como a inflamação silenciosa sabota resultados estéticos
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed">
                  Descubra por que procedimentos não funcionam em corpos inflamados.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border-2 border-gold-400 shadow-[0_8px_30px_rgb(218,165,32,0.3)] hover:shadow-[0_12px_40px_rgb(218,165,32,0.5)] transition-all duration-300">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mb-6 shadow-lg border-2 border-gold-300">
                  <span className="text-gray-900 text-2xl font-bold">3</span>
                </div>
                <h3 className="font-serif text-2xl text-gray-900 mb-3 leading-tight">
                  Por que um corpo inflamado não responde bem a estímulos
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed">
                  A relação entre sistema nervoso, estresse e resposta tecidual.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border-2 border-gold-400 shadow-[0_8px_30px_rgb(218,165,32,0.3)] hover:shadow-[0_12px_40px_rgb(218,165,32,0.5)] transition-all duration-300">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mb-6 shadow-lg border-2 border-gold-300">
                  <span className="text-gray-900 text-2xl font-bold">4</span>
                </div>
                <h3 className="font-serif text-2xl text-gray-900 mb-3 leading-tight">
                  A diferença prática entre tratar sintomas e cuidar da causa
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed">
                  Como mudar a lógica de intervenção para obter resultados sustentáveis.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border-2 border-gold-400 shadow-[0_8px_30px_rgb(218,165,32,0.3)] hover:shadow-[0_12px_40px_rgb(218,165,32,0.5)] transition-all duration-300">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mb-6 shadow-lg border-2 border-gold-300">
                  <span className="text-gray-900 text-2xl font-bold">5</span>
                </div>
                <h3 className="font-serif text-2xl text-gray-900 mb-3 leading-tight">
                  Por que avaliação não é detalhe, é fundamento
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed">
                  O que uma avaliação funcional revela sobre seu corpo e seus limites.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border-2 border-gold-400 shadow-[0_8px_30px_rgb(218,165,32,0.3)] hover:shadow-[0_12px_40px_rgb(218,165,32,0.5)] transition-all duration-300">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mb-6 shadow-lg border-2 border-gold-300">
                  <span className="text-gray-900 text-2xl font-bold">6</span>
                </div>
                <h3 className="font-serif text-2xl text-gray-900 mb-3 leading-tight">
                  Como reconhecer quando insistir começa a custar caro
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed">
                  Sinais de que é hora de mudar de estratégia, não de intensidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Para quem é este conteúdo */}
      <section className="py-20 bg-gradient-to-b from-white to-cream-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Para quem é */}
            <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-lg border border-terracotta-200/30">
              <h2 className="font-serif text-3xl text-gray-900 mb-8">
                Para quem este conteúdo é
              </h2>
              <ul className="space-y-5">
                {[
                  'Mulheres que sentem que o corpo não responde mais como antes',
                  'Quem já investiu em tratamentos estéticos sem resultados duradouros',
                  'Quem convive com dor crônica, inchaço ou desconforto recorrente',
                  'Quem busca autocuidado consciente, não por urgência ou desespero'
                ].map((item, index) => (
                  <li key={index} className="flex items-start font-sans text-lg text-gray-700">
                    <svg className="w-6 h-6 text-terracotta-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* O que não é */}
            <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="font-serif text-3xl text-gray-900 mb-8">
                O que este eBook não é
              </h2>
              <ul className="space-y-5">
                {[
                  'Não é um manual de execução técnica',
                  'Não é um protocolo pronto para aplicar sozinha',
                  'Não promete resultados rápidos ou milagrosos',
                  'Não substitui avaliação profissional individualizada'
                ].map((item, index) => (
                  <li key={index} className="flex items-start font-sans text-lg text-gray-700">
                    <svg className="w-6 h-6 text-gray-400 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-6 bg-gradient-to-r from-terracotta-50 to-gold-50 rounded-xl border-l-4 border-terracotta-600">
                <p className="font-serif text-xl text-gray-900 mb-2 font-medium">
                  O que ele oferece
                </p>
                <p className="font-sans text-lg text-gray-700 leading-relaxed">
                  Perspectiva. Consciência. Um novo jeito de olhar para o próprio corpo — e para as escolhas que você faz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre a Autora + Formulário */}
      <section id="formulario" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Imagem do bem-estar */}
            <div className="order-2 md:order-1">
              <img 
                src="/images/ebook-wellness.webp" 
                alt="Cuidado e bem-estar" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>

            {/* Formulário */}
            <div className="order-1 md:order-2">
              <div className="bg-gradient-to-br from-cream-50 to-gold-50/30 p-8 md:p-10 rounded-2xl shadow-2xl border border-gold-200/50">
                <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
                  Baixe o eBook gratuito
                </h2>
                <p className="font-sans text-lg text-gray-600 mb-8">
                  E comece a entender o que o seu corpo vem tentando avisar.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                      WhatsApp (opcional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-rose-400 hover:bg-rose-500 text-cream-900 font-medium py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processando...
                      </span>
                    ) : (
                      'Quero receber o eBook'
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    Este material é informativo e educacional. Não substitui avaliação profissional individualizada.
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Info da Autora (abaixo do formulário) */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl text-gray-900 mb-8 text-center">
              Sobre a autora
            </h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-cream-50 p-8 rounded-2xl shadow-lg">
              <img 
                src="/images/flavia-profile-new.webp" 
                alt="Dra. Flávia Abreu" 
                className="w-40 h-40 rounded-full object-cover border-4 border-gold-400 shadow-lg flex-shrink-0"
              />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-4xl md:text-5xl text-rose-600 mb-2" style={{ fontFamily: 'Great Vibes, cursive' }}>
                  Dra. Flávia Abreu
                </h3>
                <p className="font-sans text-base text-gray-600 mb-4">
                  Fisioterapeuta Dermatofuncional
                </p>
                <p className="font-sans text-lg text-gray-700 leading-relaxed mb-4">
                  Meu trabalho é baseado em escuta, avaliação funcional e respeito ao tempo do corpo.
                </p>
                <p className="font-sans text-lg text-gray-700 leading-relaxed">
                  Sem atalhos. Sem promessas irreais. Com processo, coerência e ciência.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Simples */}
      <footer className="bg-cream-900 text-cream-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img 
            src="/images/logo-secundario.webp" 
            alt="Dra. Flávia Abreu" 
            className="h-20 w-auto mx-auto mb-4 opacity-90"
          />
          <p className="font-sans text-sm mb-2">
            Saúde Estética e Integrativa
          </p>
          <p className="font-sans text-xs mt-4 text-cream-300">
            © {new Date().getFullYear()} Dra. Flávia Abreu - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
