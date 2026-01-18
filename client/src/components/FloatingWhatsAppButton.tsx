import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingWhatsAppButton() {
  // Número de telefone formatado para o link do WhatsApp (substituir pelo número real da Dra. Flávia)
  // Usando um placeholder por enquanto, o usuário pode atualizar depois
  const phoneNumber = "5511993905711"; 
  const message = encodeURIComponent("Olá, Dra. Flávia! Gostaria de agendar uma avaliação.");

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] transition-colors duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Falar no WhatsApp"
    >
      <MessageCircle size={32} fill="white" className="text-white" />
    </motion.a>
  );
}
