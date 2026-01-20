#!/usr/bin/env python3.11
"""
Script para criar o Cartão Digital Interativo da Dra. Flávia Abreu
PDF com múltiplas páginas e navegação interna
"""

from reportlab.lib.pagesizes import portrait
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white, black
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from PIL import Image
import os

# Configurações
WIDTH = 1080
HEIGHT = 1920
PAGE_SIZE = (WIDTH, HEIGHT)

# Cores da marca (baseado no manual)
COLOR_GOLD = HexColor('#C9A961')  # Dourado
COLOR_ROSE = HexColor('#B8948C')  # Rose/Terracota
COLOR_CREAM = HexColor('#F9F7F2')  # Creme
COLOR_DARK = HexColor('#2C2C2C')  # Texto escuro
COLOR_WHITE = white

# Caminhos dos arquivos
BACKGROUND_IMG = '/home/ubuntu/flavia-portfolio/cartao-digital-background-realistic.png'
FOTO_FLAVIA = '/home/ubuntu/flavia-portfolio/imagens-site/flavia-portfolio/client/public/images/flavia-profile-new.png'
LOGO_ICON = '/home/ubuntu/flavia-portfolio/ICONESEMFUNDO.png'
LOGO_SECUNDARIO = '/home/ubuntu/flavia-portfolio/LOGOSECUNDARIOSEMFUNDO.png'
PATTERN = '/home/ubuntu/flavia-portfolio/PATTERNSEMFUNDO.png'

# Fontes
FONT_DIR = '/home/ubuntu/flavia-portfolio/fonts'
FONT_GREAT_VIBES = os.path.join(FONT_DIR, 'GreatVibes-Regular.ttf')
FONT_PLAYFAIR = os.path.join(FONT_DIR, 'PlayfairDisplay-Regular.ttf')
FONT_LATO = os.path.join(FONT_DIR, 'Lato-Regular.ttf')
FONT_MONTSERRAT = os.path.join(FONT_DIR, 'Montserrat-Regular.ttf')
FONT_MONTSERRAT_SEMIBOLD = os.path.join(FONT_DIR, 'Montserrat-SemiBold.ttf')
FONT_MONTSERRAT_BOLD = os.path.join(FONT_DIR, 'Montserrat-Bold.ttf')
FONT_MONTSERRAT_BLACK = os.path.join(FONT_DIR, 'Montserrat-Black.ttf')

# Dados de contato
WHATSAPP = '5511993905711'
INSTAGRAM = '@draflaviaabreu'
SITE = 'draflaviaabreu.com'

# Tratamentos
TRATAMENTOS = [
    {
        'titulo': 'Harmonização Corporal',
        'desc': 'Melhora do contorno corporal, redução de medidas e valorização das formas.'
    },
    {
        'titulo': 'Diástase Abdominal',
        'desc': 'Recuperação funcional da musculatura abdominal com técnicas específicas.'
    },
    {
        'titulo': 'Lipedema',
        'desc': 'Alívio de dores, redução de inchaço e melhora da qualidade de vida.'
    },
    {
        'titulo': 'Pós-Operatório',
        'desc': 'Aceleração da recuperação, redução de edemas e fibroses.'
    },
    {
        'titulo': 'Gordura Localizada',
        'desc': 'Atuação direta nas áreas de acúmulo com técnicas combinadas.'
    },
    {
        'titulo': 'Celulite, Estrias e Flacidez',
        'desc': 'Melhora da textura da pele, firmeza e aspecto geral.'
    },
    {
        'titulo': 'Massagem Terapêutica',
        'desc': 'Alívio de dores, tensões e estresse físico.'
    }
]


def register_fonts():
    """Registra as fontes customizadas"""
    try:
        pdfmetrics.registerFont(TTFont('GreatVibes', FONT_GREAT_VIBES))
        pdfmetrics.registerFont(TTFont('Playfair', FONT_PLAYFAIR))
        pdfmetrics.registerFont(TTFont('Lato', FONT_LATO))
        pdfmetrics.registerFont(TTFont('Montserrat', FONT_MONTSERRAT))
        pdfmetrics.registerFont(TTFont('Montserrat-SemiBold', FONT_MONTSERRAT_SEMIBOLD))
        pdfmetrics.registerFont(TTFont('Montserrat-Bold', FONT_MONTSERRAT_BOLD))
        pdfmetrics.registerFont(TTFont('Montserrat-Black', FONT_MONTSERRAT_BLACK))
        return True
    except Exception as e:
        print(f'Erro ao registrar fontes: {e}')
        return False


def draw_background_with_overlay(c, img_path):
    """Desenha a imagem de fundo com overlay escuro"""
    c.drawImage(img_path, 0, 0, width=WIDTH, height=HEIGHT, preserveAspectRatio=True, mask='auto')
    # Overlay escuro para contraste
    c.setFillColor(HexColor('#000000'))
    c.setFillAlpha(0.6)
    c.rect(0, 0, WIDTH, HEIGHT, fill=True, stroke=False)
    c.setFillAlpha(1)


def draw_circular_image(c, img_path, x, y, radius, border_color, border_width=8):
    """Desenha uma imagem circular com borda"""
    # Salvar estado
    c.saveState()
    
    # Criar círculo de clipping
    path = c.beginPath()
    path.circle(x, y, radius)
    c.clipPath(path, stroke=0, fill=0)
    
    # Desenhar imagem
    img = Image.open(img_path)
    img_width, img_height = img.size
    aspect = img_width / img_height
    
    if aspect > 1:
        draw_width = radius * 2
        draw_height = draw_width / aspect
    else:
        draw_height = radius * 2
        draw_width = draw_height * aspect
    
    c.drawImage(img_path, x - draw_width/2, y - draw_height/2, 
                width=draw_width, height=draw_height, mask='auto')
    
    # Restaurar estado
    c.restoreState()
    
    # Desenhar borda dourada
    c.setStrokeColor(border_color)
    c.setLineWidth(border_width)
    c.circle(x, y, radius, fill=0, stroke=1)


def draw_button(c, x, y, width, height, text, link=None, page_num=None, font='Helvetica-Bold', font_size=32):
    """Desenha um botão estilizado com link"""
    # Fundo do botão MUITO MAIS OPACO para máxima visibilidade
    c.setFillColor(COLOR_WHITE)
    c.setFillAlpha(0.7)  # Aumentado para 0.7 (muito mais visível)
    c.roundRect(x, y, width, height, 15, fill=True, stroke=False)
    c.setFillAlpha(1)
    
    # Borda MUITO mais visível
    c.setStrokeColor(COLOR_WHITE)
    c.setStrokeAlpha(0.95)  # Quase totalmente opaco
    c.setLineWidth(4)  # Borda mais grossa
    c.roundRect(x, y, width, height, 15, fill=False, stroke=True)
    c.setStrokeAlpha(1)
    
    # Texto do botão ESCURO para contraste máximo com fundo claro
    c.setFont(font, font_size)
    text_width = c.stringWidth(text, font, font_size)
    
    # Texto ESCURO (preto) para contraste com fundo branco
    c.setFillColor(HexColor('#1a1a1a'))
    c.drawString(x + (width - text_width) / 2, y + height / 2 - 10, text)
    
    # Adicionar link
    if link:
        c.linkURL(link, (x, y, x + width, y + height), relative=0)
    elif page_num:
        c.linkRect('', f'page{page_num}', (x, y, x + width, y + height), relative=0)


def create_page_1_menu(c, use_custom_fonts=True):
    """Cria a página 1 - Menu Principal"""
    # Background com overlay
    draw_background_with_overlay(c, BACKGROUND_IMG)
    
    # Foto circular da Dra. Flávia no topo
    foto_y = HEIGHT - 380
    draw_circular_image(c, FOTO_FLAVIA, WIDTH/2, foto_y, 180, COLOR_GOLD, border_width=10)
    
    # Logo secundário (nome da Flávia) em vez de texto
    logo_width = 700
    logo_height = 200
    logo_x = (WIDTH - logo_width) / 2
    logo_y = foto_y - 320
    c.drawImage(LOGO_SECUNDARIO, logo_x, logo_y, width=logo_width, height=logo_height, 
                mask='auto', preserveAspectRatio=True)
    
    # Especialidade
    font_espec = 'Montserrat' if use_custom_fonts else 'Helvetica'
    c.setFont(font_espec, 26)
    c.setFillColor(COLOR_WHITE)
    espec = 'SAÚDE ESTÉTICA E INTEGRATIVA'
    espec_width = c.stringWidth(espec, font_espec, 26)
    c.drawString((WIDTH - espec_width) / 2, logo_y - 40, espec)
    
    # Linha decorativa
    line_y = logo_y - 90
    c.setStrokeColor(COLOR_GOLD)
    c.setLineWidth(2)
    c.line(WIDTH/2 - 100, line_y, WIDTH/2 + 100, line_y)
    
    # Botões de menu (sem Instagram, mais espaçados)
    button_width = 800
    button_height = 100
    button_x = (WIDTH - button_width) / 2
    button_spacing = 130
    
    buttons = [
        {'text': 'TRATAMENTOS', 'page': 2},
        {'text': 'WHATSAPP', 'link': f'https://wa.me/{WHATSAPP}'},
        {'text': 'SITE', 'link': f'https://{SITE}'},
        {'text': 'E-BOOK GRATUITO', 'link': 'https://draflaviaabreu.com/ebook'}
    ]
    
    start_y = line_y - 200
    font_button = 'Montserrat-SemiBold' if use_custom_fonts else 'Helvetica-Bold'
    
    for i, btn in enumerate(buttons):
        y = start_y - (i * button_spacing)
        draw_button(c, button_x, y, button_width, button_height, 
                   btn['text'], 
                   link=btn.get('link'), 
                   page_num=btn.get('page'),
                   font=font_button,
                   font_size=26)
    
    # Call to action no rodapé (ajustado para não sobrepor)
    font_cta = 'Lato' if use_custom_fonts else 'Helvetica'
    c.setFont(font_cta, 22)
    cta = 'Toque nos links para saber mais!'
    cta_width = c.stringWidth(cta, font_cta, 22)
    c.drawString((WIDTH - cta_width) / 2, 150, cta)
    
    # Logo pequeno no canto
    logo_size = 80
    c.drawImage(LOGO_ICON, 50, 50, width=logo_size, height=logo_size, mask='auto')


def create_page_2_tratamentos(c, use_custom_fonts=True):
    """Cria a página 2 - Tratamentos"""
    # Background mais claro para leitura
    c.setFillColor(COLOR_CREAM)
    c.rect(0, 0, WIDTH, HEIGHT, fill=True, stroke=False)
    
    # Pattern de fundo sutil
    c.setFillAlpha(0.05)
    c.drawImage(PATTERN, 0, 0, width=WIDTH, height=HEIGHT, mask='auto')
    c.setFillAlpha(1)
    
    # Título
    font_title = 'Playfair' if use_custom_fonts else 'Times-Bold'
    c.setFillColor(COLOR_DARK)
    c.setFont(font_title, 64)
    titulo = 'Tratamentos'
    titulo_width = c.stringWidth(titulo, font_title, 64)
    c.drawString((WIDTH - titulo_width) / 2, HEIGHT - 150, titulo)
    
    # Linha decorativa
    c.setStrokeColor(COLOR_GOLD)
    c.setLineWidth(3)
    c.line(WIDTH/2 - 150, HEIGHT - 180, WIDTH/2 + 150, HEIGHT - 180)
    
    # Subtítulo
    font_sub = 'Lato' if use_custom_fonts else 'Helvetica'
    c.setFont(font_sub, 26)
    c.setFillColor(COLOR_ROSE)
    subtitulo = 'Protocolos personalizados para você'
    sub_width = c.stringWidth(subtitulo, font_sub, 26)
    c.drawString((WIDTH - sub_width) / 2, HEIGHT - 230, subtitulo)
    
    # Lista de tratamentos
    y_start = HEIGHT - 350
    margin_x = 100
    spacing = 180
    
    font_trat_title = 'Playfair' if use_custom_fonts else 'Times-Bold'
    font_trat_desc = 'Lato' if use_custom_fonts else 'Helvetica'
    
    c.setFillColor(COLOR_DARK)
    
    for i, trat in enumerate(TRATAMENTOS):
        y = y_start - (i * spacing)
        
        # Ícone decorativo
        c.setFillColor(COLOR_GOLD)
        c.circle(margin_x + 30, y + 20, 8, fill=True, stroke=False)
        
        # Título do tratamento
        c.setFont(font_trat_title, 38)
        c.setFillColor(COLOR_DARK)
        c.drawString(margin_x + 70, y + 40, trat['titulo'])
        
        # Descrição
        c.setFont(font_trat_desc, 22)
        c.setFillColor(HexColor('#666666'))
        
        # Quebrar texto em múltiplas linhas se necessário
        max_width = WIDTH - (margin_x * 2) - 70
        words = trat['desc'].split()
        lines = []
        current_line = []
        
        for word in words:
            test_line = ' '.join(current_line + [word])
            if c.stringWidth(test_line, font_trat_desc, 22) <= max_width:
                current_line.append(word)
            else:
                lines.append(' '.join(current_line))
                current_line = [word]
        if current_line:
            lines.append(' '.join(current_line))
        
        for j, line in enumerate(lines):
            c.drawString(margin_x + 70, y - (j * 30), line)
    
    # Botão "Voltar ao Menu"
    button_width = 600
    button_height = 90
    button_x = (WIDTH - button_width) / 2
    button_y = 150
    
    c.setFillColor(COLOR_GOLD)
    c.roundRect(button_x, button_y, button_width, button_height, 15, fill=True, stroke=False)
    
    font_btn = 'Montserrat-SemiBold' if use_custom_fonts else 'Helvetica-Bold'
    c.setFillColor(COLOR_WHITE)
    c.setFont(font_btn, 32)
    btn_text = 'VOLTAR AO MENU'
    btn_width = c.stringWidth(btn_text, font_btn, 32)
    c.drawString(button_x + (button_width - btn_width) / 2, button_y + 30, btn_text)
    
    # Link para página 1
    c.linkRect('', 'page1', (button_x, button_y, button_x + button_width, button_y + button_height), relative=0)
    
    # WhatsApp no rodapé
    c.setFillColor(COLOR_ROSE)
    c.setFont(font_sub, 24)
    footer = 'Agende sua avaliação pelo WhatsApp'
    footer_width = c.stringWidth(footer, font_sub, 24)
    c.drawString((WIDTH - footer_width) / 2, 80, footer)


def main():
    """Função principal para criar o PDF"""
    output_file = '/home/ubuntu/flavia-portfolio/cartao-digital-flavia-abreu.pdf'
    
    # Criar canvas
    c = canvas.Canvas(output_file, pagesize=PAGE_SIZE)
    
    # Registrar fontes customizadas
    use_custom_fonts = register_fonts()
    
    # Página 1 - Menu
    c.bookmarkPage('page1')
    c.addOutlineEntry('Menu Principal', 'page1', level=0)
    create_page_1_menu(c, use_custom_fonts)
    c.showPage()
    
    # Página 2 - Tratamentos
    c.bookmarkPage('page2')
    c.addOutlineEntry('Tratamentos', 'page2', level=0)
    create_page_2_tratamentos(c, use_custom_fonts)
    c.showPage()
    
    # Metadados
    c.setTitle('Cartão Digital - Dra. Flávia Abreu')
    c.setAuthor('Dra. Flávia Abreu')
    c.setSubject('Saúde Estética e Integrativa')
    c.setKeywords(['fisioterapia', 'estética', 'saúde integrativa', 'Alphaville'])
    
    # Salvar PDF
    c.save()
    print(f'PDF criado com sucesso: {output_file}')
    if use_custom_fonts:
        print('✓ Fontes customizadas aplicadas')
    else:
        print('⚠ Usando fontes padrão (fontes customizadas não disponíveis)')


if __name__ == '__main__':
    main()
