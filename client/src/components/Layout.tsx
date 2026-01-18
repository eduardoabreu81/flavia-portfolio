import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Instagram, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FloatingWhatsAppButton from "./FloatingWhatsAppButton";
import ScrollToTopButton from "./ScrollToTopButton";
import InstagramFeed from "./InstagramFeed";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Início", href: "/" },
    { name: "Quem Sou", href: "/quem-sou" },
    { name: "Abordagem", href: "/abordagem" },
    { name: "Tratamentos", href: "/tratamentos" },
    { name: "Contato", href: "/contato" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-6"
        )}
      >
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/images/SUBMARCASEMFUNDO.png" 
              alt="Flávia Abreu Logo" 
              className={cn(
                "transition-all duration-500",
                isScrolled ? "h-10 w-10" : "h-16 w-16"
              )}
            />
            <div className={cn(
              "flex flex-col transition-opacity duration-300",
              isScrolled ? "opacity-100" : "opacity-0 md:opacity-100"
            )}>
              <span className="font-serif text-xl tracking-wide text-primary font-medium">Dra. Flávia Abreu</span>
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Saúde Estética e Integrativa</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-sm uppercase tracking-widest hover:text-primary transition-colors relative group py-2",
                  location === link.href ? "text-primary font-medium" : "text-foreground/80"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute bottom-0 left-0 h-[1px] bg-primary transition-all duration-300",
                  location === link.href ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
            <Button 
              variant="outline" 
              className="ml-4 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-full px-6"
              onClick={() => window.open("https://wa.me/5511993905711", "_blank")}
            >
              Agendar
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden transition-all duration-500 flex flex-col justify-center items-center gap-8",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className="font-serif text-3xl text-foreground hover:text-primary transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <Button 
          className="mt-8 bg-primary text-white rounded-full px-8 py-6 text-lg"
          onClick={() => window.open("https://wa.me/5511993905711", "_blank")}
        >
          Agendar Consulta
        </Button>
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Floating Buttons */}
      <FloatingWhatsAppButton />
      <ScrollToTopButton />

      {/* Instagram Feed Section */}
      <InstagramFeed />

      {/* Footer */}
      <footer className="bg-[#F5F2EB] pt-20 pb-10 border-t border-primary/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="flex flex-col items-center md:items-start gap-6">
              <img src="/images/LOGOSECUNDARIOSEMFUNDO.png" alt="Dra. Flávia Abreu" className="h-24 w-auto mb-6 opacity-90" />
              <p className="text-muted-foreground text-center md:text-left max-w-xs leading-relaxed">
                Cuidado corporal com critério, presença e responsabilidade. Transformando vidas através da saúde estética integrativa.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-6">
              <h3 className="font-serif text-xl text-primary">Contato</h3>
              <div className="flex flex-col gap-4 text-muted-foreground text-center md:text-left">
                <a href="https://wa.me/5511993905711" target="_blank" className="hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start">
                  <Phone size={18} /> (11) 99390-5711
                </a>
                <a href="https://instagram.com/draflaviaabreu" target="_blank" className="hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start">
                  <Instagram size={18} /> @draflaviaabreu
                </a>
                <a href="mailto:contato@draflaviaabreu.com" className="hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start">
                  <Mail size={18} /> contato@draflaviaabreu.com
                </a>
                <p>Aldeia da Serra, Alphaville e Região</p>
                <p>Atendimento Domiciliar</p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start gap-6">
              <h3 className="font-serif text-xl text-primary">Horários</h3>
              <div className="flex flex-col gap-2 text-muted-foreground text-center md:text-left">
                <p>Segunda a Sexta: 08h às 18h</p>
                <p className="text-sm italic opacity-80">Horários especiais sob consulta</p>
              </div>
              <div className="mt-4">
                <p className="text-xs uppercase tracking-widest text-primary/60">Registro Profissional</p>
                <p className="text-muted-foreground">Crefito 3 - 108.019-F</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/60 uppercase tracking-wider">
            <p>&copy; {new Date().getFullYear()} Dra. Flávia Abreu. Todos os direitos reservados.</p>
            <p>Design by Manus</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
