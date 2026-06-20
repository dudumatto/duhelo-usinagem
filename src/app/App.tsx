import { motion } from "motion/react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Cog,
  Cpu,
  Drill,
  Factory,
  Headphones,
  Layers3,
  Mail,
  MapPin,
  Phone,
  Ruler,
  Settings,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const BRAND = "Duhelo Usinagem";
const WHATSAPP_LINK =
  "https://wa.me/5519982731890?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%21";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
} as const;

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { staggerChildren: 0.08 },
};

function DuheloLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "brand-lockup brand-lockup-compact" : "brand-lockup"} aria-label={BRAND}>
      <div className={compact ? "brand-mark brand-mark-compact" : "brand-mark"}>
        <Cog className={compact ? "h-5 w-5" : "h-6 w-6"} />
      </div>
      {!compact && (
        <span className="brand-wordmark">
          DUHELO <strong>USINAGEM</strong>
        </span>
      )}
    </div>
  );
}

const services = [
  {
    image: "/images/card-usinagem-customizada.jpg",
    imagePosition: "50% 50%",
    icon: <Settings className="w-6 h-6" />,
    title: "Peça fora de catálogo?",
    mediaLabel: "Fabricação sob desenho ou amostra",
    description:
      "Fabricamos peças sob medida a partir de desenho técnico, amostra ou desenvolvimento interno de acordo com a necessidade.",
    features: ["Peças especiais", "Pequenos lotes", "Controle dimensional", "Leitura de desenho"],
  },
  {
    image: "/images/card-servicos-cnc.jpg",
    imagePosition: "50% 54%",
    icon: <Cog className="w-6 h-6" />,
    title: "Produção com repetibilidade?",
    mediaLabel: "Usinagem CNC para lotes e padrão",
    description:
      "Torneamento e fresamento de alta complexidade, com alta qualidade, acabamento e padrão de medidas exigidas.",
    features: ["Torno CNC", "Fresamento", "Repetibilidade", "Conferência por lote"],
  },
  {
    image: "/images/card-fabricacao-metal.jpg",
    imagePosition: "50% 48%",
    icon: <Factory className="w-6 h-6" />,
    title: "Componente industrial sob medida?",
    mediaLabel: "Componentes para máquinas e dispositivos",
    description:
      "Produzimos itens mecânicos para máquinas, dispositivos, protótipos e reposição conforme aplicação e material.",
    features: ["UHMW e nylon", "Aço carbono e inox", "Alumínio", "Bronze e latão"],
  },
  {
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
    imagePosition: "50% 58%",
    mediaClassName: "service-media service-media-maintenance",
    icon: <Wrench className="w-6 h-6" />,
    title: "Peça desgastada parando máquina?",
    mediaLabel: "Recuperação para reduzir parada",
    description:
      "Recuperamos, ajustamos ou refazemos componentes desgastados para reduzir parada e devolver função ao conjunto.",
    features: ["Recuperação", "Ajustes", "Reforma mecânica e manutenção"],
  },
];

const equipment = [
  {
    icon: <Cpu className="w-7 h-7" />,
    title: "Torno CNC",
    description: "Produção de eixos, buchas, flanges e componentes com repetibilidade e acabamento técnico.",
  },
  {
    icon: <Drill className="w-7 h-7" />,
    title: "Fresa",
    description: "Usinagem de superfícies, rasgos, furos, bases, suportes e geometrias especiais.",
  },
  {
    icon: <Settings className="w-7 h-7" />,
    title: "Torno convencional",
    description: "Flexibilidade para manutenção, ajustes dimensionais, peças únicas e pequenos lotes.",
  },
];

const differentiators = [
  {
    icon: <Ruler className="w-7 h-7" />,
    title: "Controle dimensional",
    description: "Leitura criteriosa do desenho, setup controlado e conferência antes da entrega.",
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: "Prazo responsável",
    description: "Planejamento de produção para atender urgências sem comprometer o acabamento.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: "Material adequado",
    description: "Escolha do processo e do material conforme aplicação, desgaste esperado e necessidade da peça.",
  },
  {
    icon: <Headphones className="w-7 h-7" />,
    title: "Atendimento técnico",
    description: "Contato direto para entender aplicação, medidas críticas e melhor rota de fabricação.",
  },
];


const processSteps = [
  "Análise do desenho ou amostra",
  "Definição de material e processo",
  "Planejamento técnico e usinagem de precisão",
  "Conferência dimensional antes da entrega",
];

const quoteSteps = [
  {
    title: "Envie a referência",
    description: "Desenho técnico, foto, amostra, medidas principais ou a descrição objetiva do problema.",
  },
  {
    title: "Informe a aplicação",
    description: "Material desejado, quantidade, urgência, uso da peça e medidas que não podem variar.",
  },
  {
    title: "Receba orientação técnica",
    description: "A Duhelo avalia processo, material e conferência necessária antes de retornar o orçamento.",
  },
];

const technicalChecks = [
  "Medidas críticas",
  "Material adequado",
  "Tolerância necessária",
  "Acabamento esperado",
  "Aplicação da peça",
  "Conferência antes da entrega",
];

export default function App() {
  return (
    <div className="min-h-screen bg-bg-950 text-text-50 selection:bg-primary/30 selection:text-white">
      <header>
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-bg-950/88 backdrop-blur-xl"
          role="navigation"
          aria-label="Navegação principal"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-6">
            <a href="#topo" className="transition-opacity hover:opacity-90" aria-label="Ir para o início">
              <DuheloLogo />
            </a>

            <div className="hidden items-center gap-7 md:flex">
              {[
                ["Serviços", "#servicos"],
                ["Orçamento", "#orcamento"],
                ["Estrutura", "#estrutura"],
                ["Contato", "#contato"],
              ].map(([label, href]) => (
                <a key={href} href={href} className="nav-link">
                  {label}
                </a>
              ))}
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary btn-small">
                Orçamento
              </a>
            </div>
          </div>
        </motion.nav>
      </header>

      <main id="topo">
        <section className="hero-shell relative flex min-h-screen items-center overflow-hidden pt-24" aria-labelledby="hero-title">
          <div className="absolute inset-0 bg-mesh opacity-70" />
          <div className="absolute inset-0 bg-grid-pattern opacity-35" />
          <div className="absolute left-0 right-0 top-24 h-px steel-line opacity-70" />

          <div className="section-container relative z-10 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
                <div className="eyebrow mb-6">
                  <span className="live-dot" />
                  Usinagem de precisão em Santa Bárbara d'Oeste - SP
                </div>
                <h1 id="hero-title" className="max-w-5xl text-4xl leading-[0.98] text-white sm:text-5xl md:text-7xl xl:text-8xl">
                  {"Usinagem de alta complexidade com qualidade total em acabamentos, produtividade e precis\u00E3o"}
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-text-400 md:text-2xl">
                  Usinagem completa, contamos com torno CNC, torno convencional e fresadoras, prezamos por atender a necessidade de cada cliente na indústria e manutenção.
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <motion.a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="btn-primary">
                    Pedir orçamento técnico <ArrowRight className="h-5 w-5" />
                  </motion.a>
                  <a href="#orcamento" className="btn-outline">
                    O que enviar
                  </a>
                </div>

              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="relative lg:col-span-5"
            >
              <div className="hero-visual">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1713371398485-7bde1bde9def?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjbmMlMjBtYWNoaW5pbmclMjBwcmVjaXNpb24lMjBtZXRhbHxlbnwxfHx8fDE3NzU3NzMxNDF8MA&ixlib=rb-4.1.0&q=80&w=1920"
                  alt={`${BRAND} - máquina CNC em operação`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-950 via-bg-950/18 to-transparent" />
                <div className="scanline" />
                
              </div>
            </motion.div>
          </div>
        </section>

        <section id="servicos" className="relative overflow-hidden bg-bg-900">
          <div className="absolute inset-x-0 top-0 h-px steel-line opacity-70" />
          <div className="section-container">
            <div className="grid gap-6 md:grid-cols-2">
              {services.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="service-card group"
                >
                  <div className={service.mediaClassName ?? "service-media"}>
                    <ImageWithFallback
                      src={service.image}
                      alt={`${BRAND} - ${service.title.replace("?", "")}`}
                      className="service-image"
                      style={{ objectPosition: service.imagePosition }}
                    />
                    <div className="service-image-overlay" />
                    <div className="service-image-frame" />
                    <div className="service-media-label">{service.mediaLabel}</div>
                    <div className="service-icon">
                      {service.icon}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-2xl text-white">{service.title}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-text-400">{service.description}</p>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <div key={feature} className="feature-row">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="orcamento" className="section-band" aria-labelledby="quote-title">
          <div className="section-container">
            <motion.div {...fadeInUp} className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <div className="eyebrow mb-4">Como solicitar orçamento</div>
                <h2 id="quote-title" className="text-4xl leading-tight text-white md:text-6xl">
                  Envie as informações certas para um retorno mais preciso.
                </h2>
              </div>
              <p className="max-w-md text-base leading-relaxed text-text-400 md:text-lg">
                O caminho de orçamento fica mais rápido quando a Duhelo recebe desenho, foto, amostra, material, quantidade e aplicação da peça.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid gap-5 md:grid-cols-3">
              {quoteSteps.map((step, index) => (
                <motion.article key={step.title} variants={fadeInUp} className="glass-card p-7">
                  <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 text-2xl text-white">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-text-400">{step.description}</p>
                </motion.article>
              ))}
            </motion.div>
            <motion.div {...fadeInUp} className="mt-10 flex flex-col items-start justify-between gap-5 rounded-3xl border border-primary/20 bg-bg-800/65 p-6 md:flex-row md:items-center">
              <p className="max-w-2xl text-base leading-relaxed text-text-400">
                Para começar, mande pelo WhatsApp o desenho, foto ou amostra da peça, junto com material, quantidade e aplicação. Se faltar alguma informação, a Duhelo confirma antes de produzir.
              </p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
                Enviar dados da peça <ArrowRight className="h-5 w-5" />
              </a>
            </motion.div>
          </div>
        </section>


        <section id="estrutura" className="section-band" aria-labelledby="structure-title">
          <div className="section-container">
            <motion.div {...fadeInUp} className="mb-14 max-w-3xl">
              <div className="eyebrow mb-4">
                <Cog className="h-4 w-4 text-accent" />
                Estrutura
              </div>
              <h2 id="structure-title" className="text-4xl leading-tight text-white md:text-6xl">
                Estrutura e processo com controle técnico.
              </h2>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
              <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid gap-4">
                {equipment.map((item) => (
                  <motion.article key={item.title} variants={fadeInUp} className="rail-card">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-accent">{item.icon}</div>
                    <div>
                      <h3 className="text-xl text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-400">{item.description}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>

              <motion.div {...fadeInUp} className="process-board">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-accent">Fluxo de trabalho</div>
                    <h3 className="mt-2 text-3xl text-white">Da necessidade à peça pronta</h3>
                  </div>
                  <Layers3 className="hidden h-10 w-10 text-primary md:block" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {processSteps.map((step, index) => (
                    <div key={step} className="process-step">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{step}</strong>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-bg-950" aria-labelledby="checks-title">
          <div className="section-container grid gap-10 lg:grid-cols-12 lg:items-start">
            <motion.div {...fadeInUp} className="lg:col-span-5">
              <div className="eyebrow mb-4">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Avaliação técnica
              </div>
              <h2 id="checks-title" className="text-4xl leading-tight text-white md:text-6xl">
                O que avaliamos antes de produzir.
              </h2>
            </motion.div>
            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
              {technicalChecks.map((check) => (
                <motion.div key={check} variants={fadeInUp} className="feature-row">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                  {check}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-bg-900" aria-labelledby="why-title">
          <div className="section-container">
            <motion.div {...fadeInUp} className="mb-14 text-center">
              <div className="eyebrow mx-auto mb-4 w-fit">Diferenciais</div>
              <h2 id="why-title" className="mx-auto max-w-4xl text-4xl leading-tight text-white md:text-6xl">
                Método técnico antes de promessa vaga.
              </h2>
            </motion.div>

            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {differentiators.map((item) => (
                <motion.article key={item.title} variants={fadeInUp} className="glass-card group p-7">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
                    {item.icon}
                  </div>
                  <h3 className="text-xl text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-400">{item.description}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="contato" className="relative overflow-hidden bg-bg-950" aria-labelledby="cta-title">
          <div className="absolute inset-0 bg-grid-pattern opacity-25" />
          <div className="section-container relative z-10">
            <motion.div {...fadeInUp} className="cta-panel">
              <div className="absolute right-8 top-8 opacity-10">
                <DuheloLogo compact />
              </div>
              <div className="mx-auto max-w-4xl text-center">
                <div className="eyebrow mx-auto mb-5 w-fit">
                  <Award className="h-4 w-4 text-accent" />
                  Solicite uma avaliação técnica
                </div>
                <h2 id="cta-title" className="text-4xl leading-tight text-white md:text-6xl">
                  Envie seu desenho, foto, amostra ou necessidade de manutenção.
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-400">
                  A Duhelo avalia material, quantidade, aplicação e medidas críticas para retornar com orientação técnica e orçamento.
                </p>
              </div>

              <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
                {[
                  {
                    icon: <Phone className="h-6 w-6" />,
                    label: "Telefone / WhatsApp",
                    value: "(19) 98273-1890",
                    href: WHATSAPP_LINK,
                  },
                  {
                    icon: <Mail className="h-6 w-6" />,
                    label: "E-mail",
                    value: "duhelousinagem@gmail.com",
                    href: "mailto:duhelousinagem@gmail.com",
                  },
                  {
                    icon: <MapPin className="h-6 w-6" />,
                    label: "Localização",
                    value: "Santa Bárbara d'Oeste - SP",
                    href: "https://maps.app.goo.gl/SHM2J7MtngiJCkLA8",
                  },
                ].map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="contact-card"
                  >
                    <div className="text-accent">{contact.icon}</div>
                    <span>{contact.label}</span>
                    <strong>{contact.value}</strong>
                  </a>
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <motion.a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="btn-primary px-10 py-5 text-lg">
                  Pedir orçamento técnico <ArrowRight className="h-5 w-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-bg-950 py-10" role="contentinfo">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
          <DuheloLogo />
          <div className="text-center text-sm text-text-500 md:text-right">
            <p>© {new Date().getFullYear()} {BRAND}. Todos os direitos reservados.</p>
            <p className="mt-1">Usinagem, ferramentaria e recuperação de componentes industriais.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
