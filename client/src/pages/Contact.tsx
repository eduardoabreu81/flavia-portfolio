import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Instagram, MapPin, Clock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { saveContactMessage } from "@/lib/firebase";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // Salvar mensagem no Firebase
      await saveContactMessage(data);
      
      console.log("Mensagem salva no Firebase:", data);
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      reset();
      
      // Construct WhatsApp message
      const message = `Olá, meu nome é ${data.name}. Gostaria de mais informações sobre os tratamentos. Mensagem: ${data.message}`;
      const whatsappUrl = `https://wa.me/5511993905711?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast.error("Ops! Algo deu errado. Tente novamente.");
    }
  };

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
                  <label className="text-sm font-medium text-foreground/80">Nome</label>
                  <Input 
                    {...register("name", { required: true })} 
                    placeholder="Seu nome completo" 
                    className="bg-background border-input focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground/80">Telefone</label>
                  <Input 
                    {...register("phone", { required: true })} 
                    placeholder="(11) 99999-9999" 
                    className="bg-background border-input focus:border-primary transition-colors"
                  />
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
                <label className="text-sm font-medium text-foreground/80">Como posso ajudar?</label>
                <Textarea 
                  {...register("message", { required: true })} 
                  placeholder="Conte um pouco sobre o que você busca..." 
                  className="min-h-[150px] bg-background border-input focus:border-primary transition-colors resize-none"
                />
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
