# Guia de Publicação (Deploy) - Dra. Flávia Abreu

Este projeto é um site estático moderno (React + Vite), pronto para ser hospedado em qualquer plataforma de alta performance.

## Opção 1: Netlify (Recomendado)
A maneira mais simples e rápida.

1. Crie uma conta no [Netlify](https://www.netlify.com/).
2. Arraste a pasta `dist` (gerada após o build) para a área de deploy do Netlify.
   - **Nota:** Para gerar a pasta `dist`, execute `npm run build` no seu computador.
3. Ou conecte seu GitHub:
   - Clique em "New site from Git".
   - Selecione este repositório.
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Pronto! O arquivo `_redirects` já está configurado para garantir que as rotas funcionem.

## Opção 2: Vercel
Excelente performance e integração.

1. Crie uma conta na [Vercel](https://vercel.com/).
2. Instale a Vercel CLI ou conecte seu GitHub.
3. Importe o projeto.
4. As configurações padrão (Vite) funcionam automaticamente.
5. O arquivo `vercel.json` incluído garante que as rotas funcionem corretamente.

## Opção 3: Hospedagem Tradicional (Apache/Nginx)
Se for usar HostGator, Locaweb, etc.

1. Execute `npm run build` para gerar a pasta `dist`.
2. Faça upload do conteúdo da pasta `dist` para a pasta `public_html` do seu servidor via FTP.
3. **Importante:** Configure o servidor para redirecionar todas as requisições para `index.html` (SPA Fallback), caso contrário, ao recarregar páginas internas (ex: /tratamentos), dará erro 404.
   - Para Apache, crie um `.htaccess` na raiz com:
     ```apache
     <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /index.html [L]
     </IfModule>
     ```

## Comandos Úteis

- **Instalar dependências:** `npm install`
- **Rodar localmente:** `npm run dev`
- **Gerar versão final:** `npm run build`
