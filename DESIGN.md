---
name: Duhelo Usinagem
description: Folha de desenho técnico — papel claro, nanquim azul-marinho, cotas e carimbo.
colors:
  paper: "#f4f4f0"
  paper-panel: "#ebebe4"
  paper-sheet: "#fbfbf8"
  ink: "#16182b"
  ink-secondary: "#3c4055"
  ink-tertiary: "#5d6175"
  drawing-navy: "#2b2f8f"
  action-blue: "#0a68ad"
  action-blue-hover: "#08548c"
  action-blue-press: "#064474"
  logo-cyan: "#1fa0e0"
typography:
  display:
    fontFamily: "Archivo, Archivo Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6.4vw, 5.75rem)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.6vw, 3.9rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  data:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "0.06em"
rounded:
  hairline: "2px"
  control: "4px"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  section: "clamp(56px, 8vw, 112px)"
  cell: "14px"
components:
  button-primary:
    backgroundColor: "{colors.action-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
    padding: "0.9em 1.5em"
    height: "54px"
  button-primary-hover:
    backgroundColor: "{colors.action-blue-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.9em 1.5em"
  button-on-ink:
    backgroundColor: "{colors.logo-cyan}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
  title-block-cell:
    backgroundColor: "{colors.paper-sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "10px 14px 12px"
---

# Design System: Duhelo Usinagem

## Overview

A página é uma **folha de desenho técnico**: o cliente da Duhelo manda desenho, foto ou amostra, e o site fala a mesma língua da prancha. Margem com régua de zonas (1–8 no topo, A–G na lateral), vistas cotadas em SVG, lista de peças com balões numerados, notas numeradas e o carimbo (title block) com os dados da empresa. Claro por escolha de cena: o comprador lê no celular, em galpão ou escritório, sob luz do dia.

Fotos reais de peças usinadas são a prova; desenhos SVG são geometria exata, nunca ilustração. Um único momento de movimento: o desenho do topo se traça ao carregar.

## Colors

### Primary
- **Action Blue `#0a68ad`**: só ações (WhatsApp/orçamento) e links. Branco sobre ele passa AA.

### Secondary
- **Drawing Navy `#2b2f8f`** (azul-marinho do logo): linhas de cota, hachura, destaque do título, numeração das notas, placas de chamada sobre fotos.
- **Logo Cyan `#1fa0e0`**: botão sobre o bloco escuro de contato, seleção de texto, área "a recuperar" nos desenhos.

### Neutral
- **Paper `#f4f4f0`** fundo · **Paper Sheet `#fbfbf8`** dentro de vistas, tabelas e carimbo · **Paper Panel `#ebebe4`** faixa de notas.
- **Ink `#16182b`** texto e linhas visíveis · **Ink Secondary `#3c4055`** texto corrido · **Ink Tertiary `#5d6175`** rótulos de dados.

### Named Rules
- **Azul racionado:** se não é clicável, não é Action Blue.

## Typography

- **Archivo** (variável, eixo de largura), auto-hospedada. Títulos 800 em largura condensada (`font-stretch` 72–85%), como letreiro técnico.
- **Martian Mono** apenas para cotas, rótulos de carimbo e dados; nunca para texto corrido, etiquetas ou botões.

### Hierarchy
Display (h1) → Headline (h2) → títulos de linha 1.6–2.35rem → corpo 1.0625rem → dados 11px maiúsculos.

## Layout

Folha com borda de 1.5px e moldura `--frame` (6–16px). Zonas A–G marcam cada seção (na margem no desktop, em aba no celular). Seções separadas por réguas finas; listas em linhas com régua, não em cards. Desktop: hero 1.12fr/1fr; linhas de serviço alternam texto e mídia.

## Elevation & Depth

Plano, como papel. Profundidade só por borda de nanquim (1–1.5px). Sem sombras decorativas; o botão primário tem só uma sombra de "aresta".

## Shapes

Cantos retos ou 2–4px. Círculos só para balões de item.

## Components

### Buttons
Primário Action Blue com ícone do WhatsApp; ghost com borda de nanquim que inverte no hover; no bloco escuro, o primário usa Logo Cyan com texto Ink.

### Chips
Etiquetas de especificação: borda 1px Ink, fundo Paper Sheet, Archivo 600, 0.875rem.

### Cards / Containers
Vista (`.view-panel`) com etiqueta preta no canto ("DESENHO"/"PEÇA"); carimbo (`.title-block`) e processo em grade de células com rótulo mono + valor.

### Navigation
Cabeçalho fixo em papel translúcido com régua de zonas; no celular, logo + botão WhatsApp fixo que aparece depois do topo.

### Desenho técnico (assinatura)
SVG com linhas visíveis Ink 1.8, linhas de centro traço-ponto navy, hachura 45° navy, cotas navy 0.9 com setas, textos Martian Mono.

## Do's and Don'ts

### Do:
- Usar fotos reais da Duhelo; marcar detalhes com balão, linha de chamada e placa navy.
- Manter nome, telefone e site idênticos no site, no JSON-LD e no Perfil da Empresa no Google.

### Don't:
- Rótulos acima de títulos (eyebrows), gradientes, brilho/glow, cards de ícone iguais.
- Inventar números, clientes, prazos ou certificações.
