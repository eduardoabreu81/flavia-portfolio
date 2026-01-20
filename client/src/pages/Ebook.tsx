import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { Download, CheckCircle2, BookOpen } from "lucide-react";
import { saveEbookLead } from "@/lib/firebase";

export default function Ebook() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      // Salvar lead no Firebase
      await saveEbookLead(data);
      
      console.log("Lead capturado e salvo no Firebase:", data);
      
      setIsSubmitted(true);
      toast.success("Obrigada! Seu e-book está pronto para download.");
      reset();
      
      // Redirecionar para o Google Drive após 2 segundos
      setTimeout(() => {
        window.open("https://drive.google.com/file/d/1UXAu0XQ3YrIPyh4p5gDToMaY2jj16xg4/view?usp=sharing", "_blank");
      }, 2000);
      
    } catch (error) {
      console.error("Erro ao salvar lead:", error);
      toast.error("Ops! Algo deu errado. Tente novamente.");
    }
  };

  return (
    <>
      <SEO 
        title="E-book Gratuito: Por Que Seu Corpo Não Responde aos Tratamentos?"
        description="Descubra o que ninguém explica sobre dor, inflamação e estética quando o cuidado não começa pela função. E-book gratuito da Dra. Flávia Abreu."
        canonical="/ebook"
      />
      
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#F9F7F2] to-white">
        <div className="container max-w-6xl">
          
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            
            {/* Left: E-book Cover */}
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="/images/ebook-cover.jpg" 
                  alt="Capa do E-book: Por Que Seu Corpo Não Responde aos Tratamentos?"
                  className="w-full h-auto"
                  onError={(e) => {
                    // Fallback: usar primeira página do PDF como capa
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Fallback: Capa customizada se não houver imagem */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90 flex flex-col items-center justify-center p-12 text-white">
                  <BookOpen size={80} className="mb-6 opacity-90" />
                  <h3 className="font-serif text-4xl text-center mb-4">
                    Por Que Seu Corpo Não Responde aos Tratamentos?
                  </h3>
                  <p className="text-center text-white/90 text-lg">
                    O que ninguém explica sobre dor, inflamação e estética
                  </p>
                  <div className="mt-8 px-6 py-2 bg-white/20 rounded-full">
                    <span className="text-sm font-medium">E-BOOK GRATUITO</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10" />
            </div>
            
            {/* Right: Form or Success Message */}
            <div>
              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4 block">
                      E-book Gratuito
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
                      Por Que Seu Corpo Não Responde aos Tratamentos?
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                      O que ninguém explica sobre dor, inflamação e estética quando o cuidado não começa pela função.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-muted-foreground">
                          Entenda por que tantos tratamentos falham
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-muted-foreground">
                          Descubra o papel da dor e da inflamação no corpo
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-muted-foreground">
                          Aprenda a identificar sinais que estão sendo ignorados
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-muted-foreground">
                          Clareza sobre estética que respeita a função
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Form */}
                  <div className="bg-white p-8 rounded-2xl shadow-xl border border-primary/10">
                    <h3 className="font-serif text-2xl text-foreground mb-2">
                      Baixe Grátis Agora
                    </h3>
                    <p className="text-muted-foreground mb-6 text-sm">
                      Preencha os dados abaixo para receber acesso imediato ao e-book.
                    </p>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground/80 mb-2 block">
                          Nome Completo *
                        </label>
                        <Input 
                          {...register("name", { required: "Nome é obrigatório" })}
                          placeholder="Seu nome completo"
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-foreground/80 mb-2 block">
                          E-mail *
                        </label>
                        <Input 
                          {...register("email", { 
                            required: "E-mail é obrigatório",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "E-mail inválido"
                            }
                          })}
                          type="email"
                          placeholder="seu@email.com"
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-foreground/80 mb-2 block">
                          WhatsApp (opcional)
                        </label>
                        <Input 
                          {...register("phone")}
                          type="tel"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                      >
                        <Download className="mr-2 w-5 h-5" />
                        Baixar E-book Gratuito
                      </Button>
                      
                      <p className="text-xs text-muted-foreground text-center mt-4">
                        Seus dados estão seguros e não serão compartilhados.
                      </p>
                    </form>
                  </div>
                </>
              ) : (
                /* Success Message */
                <div className="bg-white p-12 rounded-2xl shadow-xl border border-primary/10 text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-serif text-3xl text-foreground mb-4">
                    Tudo Pronto!
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Seu e-book está sendo aberto em uma nova aba. Se não abrir automaticamente, clique no botão abaixo.
                  </p>
                  <Button 
                    onClick={() => window.open("https://drive.google.com/file/d/1UXAu0XQ3YrIPyh4p5gDToMaY2jj16xg4/view?usp=sharing", "_blank")}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    <Download className="mr-2 w-5 h-5" />
                    Abrir E-book
                  </Button>
                  <p className="text-sm text-muted-foreground mt-6">
                    Boa leitura! 📖
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* About Section */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl text-foreground mb-6">
              Sobre a Autora
            </h2>
            <div className="flex flex-col items-center gap-6">
              <img 
                src="/images/flavia-profile-new.png" 
                alt="Dra. Flávia Abreu"
                className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
              />
              <div>
                <h3 className="font-serif text-2xl text-primary mb-2">
                  Dra. Flávia Abreu
                </h3>
                <p className="text-muted-foreground mb-4">
                  Fisioterapeuta Dermatofuncional
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Especialista em Saúde Estética e Integrativa, com formação em Dermatofuncional, 
                  Harmonização Corporal, Lipedema e Pós-Operatórios. Atendimento domiciliar 
                  personalizado em Alphaville, Barueri e região.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
