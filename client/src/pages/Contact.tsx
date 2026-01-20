import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Instagram, MapPin, Clock, Mail, CheckCircle2, MessageCircle, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { saveContactMessage } from "@/lib/firebase";

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const onSubmit = async (data: any) => {
    try {
      // Salvar mensagem no Firebase
      await saveContactMessage(data);
      
      console.log("Mensagem salva no Firebase:", data);
      setFormData(data);
      setSubmitted(true);
      toast.success("Mensagem enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast.error("Ops! Algo deu errado. Tente novamente.");
    }
  };

  const handleWhatsApp = () => {
    const message = `Olá, meu nome é ${formData.name}. Gostaria de mais informações sobre os tratamentos. Mensagem: ${formData.message}`;
    const whatsappUrl = `https://wa.me/5511993905711?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleBackToSite = () => {
    setSubmitted(false);
    setFormData(null);
    reset();
    window.location.href = '/';
  };

  // Tela de Sucesso
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 to-terracotta-50 px-4">
        <SEO 
          title="Mensagem Enviada"
          description="Sua mensagem foi enviada com sucesso!"
          canonical="/contato"
        />
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
          {/* Ícone de Sucesso */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>

          {/* Título */}
          <h1 className="font-serif text-4xl text-gray-900 mb-4">
            Mensagem Enviada!
          </h1>
          <p className="font-sans text-lg text-gray-600 mb-8">
            Recebi sua mensagem e entrarei em contato em breve.
          </p>

          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* Opção WhatsApp */}
          <p className="font-sans text-base text-gray-700 mb-6">
            Quer conversar agora pelo WhatsApp?
          </p>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleWhatsApp}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Enviar também pelo WhatsApp
            </Button>
            <Button
              onClick={handleBackToSite}
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar ao Site
            </Button>
          </div>

          {/* Informações de Contato */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="font-sans text-sm text-gray-500 mb-4">
              Outras formas de contato:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-600">
              <a href="https://wa.me/5511993905711" target="_blank" className="hover:text-terracotta-600 transition-colors flex items-center gap-2 justify-center">
                <Phone className="w-4 h-4" />
                (11) 99390-5711
              </a>
              <a href="https://instagram.com/draflaviaabreu" target="_blank" className="hover:text-terracotta-600 transition-colors flex items-center gap-2 justify-center">
                <Instagram className="w-4 h-4" />
                @draflaviaabreu
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Formulário de Contato
  return (
    <div className="pt-32 pb-20 bg-[#F9F7F2]">
      <SEO 
        title="Contato e Agendamento"
        description="Agende sua avaliação com a Dra. Flávia Abreu. Atendimento domiciliar em Alphaville, Barueri e região. Entre em contato via WhatsApp."
        canonical="/contato"
      />
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-white rounded-3xl overflow-hidden shadow-xl">
          
          {/* Contact Info */}
          <div className="bg-primary p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-xs font-bold tracking-[0.3em] text-white/70 uppercase mb-4 block">Contato</span>
              <h1 className="font-serif text-4xl md:text-5xl mb-8">
                Vamos conversar?
              </h1>
              <p className="text-white/80 text-lg mb-12 leading-relaxed">
                Sua jornada de cuidado começa com uma conversa. Dê o primeiro passo para o seu bem-estar.
              </p>

              <div className="flex flex-col gap-8">
                <a href="https://wa.me/5511993905711" target="_blank" className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-70">WhatsApp</p>
                    <p className="text-xl font-serif">(11) 99390-5711</p>
                  </div>
                </a>

                <a href="https://instagram.com/draflaviaabreu" target="_blank" className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-70">Instagram</p>
                    <p className="text-xl font-serif">@draflaviaabreu</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-70">Horários</p>
                    <p className="text-lg">Seg - Sex: 08h às 18h</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-70">Localização</p>
                    <p className="text-lg">Aldeia da Serra, Alphaville e Região (Domiciliar)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/images/PATTERNSEMFUNDO.webp')] opacity-10 bg-repeat mix-blend-overlay" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/30 rounded-full blur-3xl" />
          </div>

          {/* Form */}
          <div className="p-12 flex flex-col justify-center">
            <h2 className="font-serif text-3xl text-foreground mb-2">Envie uma mensagem</h2>
            <p className="text-muted-foreground mb-8">
              Preencha o formulário abaixo e entrarei em contato o mais breve possível.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground/80">Nome *</label>
                  <Input 
                    {...register("name", { required: "Nome é obrigatório" })} 
                    placeholder="Seu nome completo" 
                    className="bg-background border-input focus:border-primary transition-colors"
                  />
                  {errors.name && <span className="text-red-500 text-xs">{errors.name.message as string}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground/80">Telefone *</label>
                  <Input 
                    {...register("phone", { required: "Telefone é obrigatório" })} 
                    placeholder="(11) 99999-9999" 
                    className="bg-background border-input focus:border-primary transition-colors"
                  />
                  {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message as string}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground/80">Email (opcional)</label>
                <Input 
                  {...register("email")} 
                  type="email"
                  placeholder="seu@email.com" 
                  className="bg-background border-input focus:border-primary transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground/80">Como posso ajudar? *</label>
                <Textarea 
                  {...register("message", { required: "Mensagem é obrigatória" })} 
                  placeholder="Conte um pouco sobre o que você busca..." 
                  className="min-h-[150px] bg-background border-input focus:border-primary transition-colors resize-none"
                />
                {errors.message && <span className="text-red-500 text-xs">{errors.message.message as string}</span>}
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white mt-4">
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
