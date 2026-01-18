import { motion } from "framer-motion";
import { Leaf, Activity, Sparkles, Brain, HeartPulse, ShieldCheck } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function Approach() {
  const benefits = [
    { icon: HeartPulse, title: "Saúde e Função", text: "Foco na funcionalidade do corpo, não apenas na estética superficial." },
    { icon: ShieldCheck, title: "Critério Técnico", text: "Avaliação clínica rigorosa antes de qualquer protocolo." },
    { icon: Activity, title: "Individualidade", text: "Protocolos ajustados ao seu corpo, respeitando sua história e limites." },
    { icon: Sparkles, title: "Transparência", text: "Clareza em cada decisão, com expectativas realistas e honestas." },
    { icon: Brain, title: "Consciência", text: "Orientação para o autocuidado consciente e duradouro." },
    { icon: Leaf, title: "Naturalidade", text: "Resultados que valorizam sua beleza natural, sem exageros." }
  ];

  return (
    <div className="pt-32 pb-20">
      <SEO 
        title="Abordagem e Filosofia de Trabalho"
        description="Conheça a filosofia de trabalho da Dra. Flávia Abreu: saúde, função e cuidado consciente. Fisioterapia integrativa com critério técnico e ética."
        canonical="/abordagem"
      />
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4 block">Filosofia</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            Cuidado com Critério e Presença
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Acredito que a verdadeira beleza nasce do equilíbrio. Meu trabalho une a precisão técnica da fisioterapia com uma visão holística do ser humano.
          </p>
        </div>

        {/* How it Works Section */}
        <div className="flex flex-col gap-12 mb-24 max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="font-serif text-3xl mb-6 text-primary">Como Funciona o Atendimento</h2>
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg">
                Todo atendimento começa com avaliação. A partir dela, defino o plano terapêutico mais adequado para aquele corpo, naquele momento.
              </p>
              <p className="text-lg">
                As técnicas e recursos utilizados são escolhidos com critério, de acordo com a necessidade real — nunca por moda ou padronização.
              </p>
              <p className="text-lg">
                O acompanhamento é contínuo, respeitando respostas individuais e ajustes ao longo do processo.
              </p>
            </div>
          </div>
          
          <div className="bg-[#F9F7F2] p-8 md:p-12 rounded-3xl text-center">
            <h3 className="font-serif text-2xl mb-4 text-secondary">Avaliação Individualizada</h3>
            <p className="text-muted-foreground mb-4 text-lg">
              A avaliação é a base de todo tratamento. É nela que observo postura, tecidos, dor, inflamação, histórico e objetivos reais.
            </p>
            <p className="text-muted-foreground mb-6 text-lg">
              Somente após essa etapa é possível indicar qualquer conduta com segurança e coerência.
            </p>
            <p className="font-medium text-primary italic text-xl">
              "Cada corpo pede um caminho diferente. Por isso, aqui, nada começa sem avaliação."
            </p>
          </div>
        </div>

        {/* Diferenciais Reais Section */}
        <div className="bg-[#F5F2EB] rounded-3xl p-8 md:p-16 mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl mb-10 text-center">Diferenciais Reais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ul className="space-y-6 text-muted-foreground">
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                  <p className="text-lg">Atendimento conduzido diretamente por mim</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                  <p className="text-lg">Avaliação clínica antes de qualquer protocolo</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                  <p className="text-lg">Estética como consequência da função</p>
                </li>
              </ul>
              <ul className="space-y-6 text-muted-foreground">
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                  <p className="text-lg">Protocolos ajustados ao corpo, não ao pacote</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                  <p className="text-lg">Clareza e transparência em cada decisão</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                  <p className="text-lg">Ética acima de tendências</p>
                </li>
              </ul>
            </div>
            <div className="mt-12 text-center">
              <p className="font-serif text-2xl italic text-primary">
                "Meu trabalho não é volume. É cuidado."
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-24">
          <h2 className="font-serif text-3xl text-center mb-12">Pilares do Atendimento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-primary/5 group"
              >
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <item.icon size={24} />
                </div>
                <h3 className="font-serif text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center max-w-4xl mx-auto bg-primary/5 p-12 rounded-3xl">
          <h2 className="font-serif text-3xl mb-6 text-primary">Saúde Estética e Integrativa</h2>
          <p className="text-lg text-muted-foreground leading-relaxed italic">
            "Não é sobre padrão de beleza. É sobre saúde, função e cuidado consciente."
          </p>
        </div>
      </div>
    </div>
  );
}
