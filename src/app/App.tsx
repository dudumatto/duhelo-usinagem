import { motion } from "motion/react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import {
  Cog,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Settings,
  Wrench,
  Factory,
  Clock,
  Award,
  Headphones,
  Cpu,
  ArrowRight,
} from "lucide-react";

const BRAND = "Duhelo Usinagem";
const WHATSAPP_LINK = "https://wa.me/5519982731890?text=Olá%2C%20gostaria%20de%20solicitar%20um%20orçamento%21";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" as const },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
} as const;

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 }
};

export default function App() {
  return (
    <div className="min-h-screen bg-bg-950 selection:bg-primary/30 selection:text-white">
      {/* HEADER / NAV */}
      <header>
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50 bg-bg-950/80 backdrop-blur-xl border-b border-white/5"
          role="navigation"
          aria-label="Navegação principal"
        >
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="text-xl md:text-2xl font-display font-bold text-white tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Cog className="text-white w-5 h-5 animate-spin-slow" />
              </div>
              <span>DUHELO<span className="text-primary"> USINAGEM</span></span>
            </div>
            
            <div className="hidden md:flex items-center gap-10">
              <a href="#servicos" className="text-sm font-medium text-text-400 hover:text-white transition-colors uppercase tracking-widest">
                Serviços
              </a>
              <a href="#capacidades" className="text-sm font-medium text-text-400 hover:text-white transition-colors uppercase tracking-widest">
                Capacidades
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary-dark transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                aria-label="Solicitar orçamento via WhatsApp"
              >
                Orçamento
              </a>
            </div>
          </div>
        </motion.nav>
      </header>

      <main>
        {/* HERO SECTION - Asymmetric Layout */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20" aria-labelledby="hero-title">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-mesh opacity-40" />
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          </div>

          <div className="section-container relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Líder em Usinagem de Precisão
                </div>
                <h1 id="hero-title" className="text-6xl md:text-8xl mb-8 text-white leading-[0.9] text-gradient">
                  Precisão em cada <span className="text-primary">detalhe.</span>
                </h1>
                <p className="text-xl md:text-2xl text-text-400 mb-10 max-w-xl leading-relaxed">
                  Usinagem CNC de alta performance para projetos que exigem excelência técnica e acabamento superior.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary gap-2"
                  >
                    Solicitar orçamento <ArrowRight className="w-5 h-5" />
                  </motion.a>
                  <a href="#servicos" className="btn-outline">
                    Conhecer serviços
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative z-10 aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1713371398485-7bde1bde9def?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjbmMlMjBtYWNoaW5pbmclMjBwcmVjaXNpb24lMjBtZXRhbHxlbnwxfHx8fDE3NzU3NzMxNDF8MA&ixlib=rb-4.1.0&q=80&w=1920"
                  alt={`${BRAND} — Usinagem de precisão em ação`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-950 via-transparent to-transparent opacity-60" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="servicos" className="relative py-24 bg-bg-900 overflow-hidden" aria-labelledby="services-title">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="section-container">
            <motion.div
              {...fadeInUp}
              className="max-w-3xl mb-20"
            >
              <h2 id="services-title" className="text-4xl md:text-6xl mb-6 text-white text-gradient">
                Nossas <span className="text-primary">Especialidades</span>
              </h2>
              <p className="text-xl text-text-400">
                Oferecemos soluções completas em usinagem industrial com tecnologia de ponta e rigoroso controle de qualidade.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  image: "/images/card-usinagem-customizada.png",
                  icon: <Settings className="w-6 h-6" />,
                  title: "Usinagem Customizada",
                  description:
                    "Desenvolvemos peças sob medida de acordo com seu projeto específico. Trabalhamos com desenhos técnicos e especificações personalizadas.",
                  features: ["Projetos personalizados", "Múltiplos materiais", "Prototipagem rápida"],
                },
                {
                  image: "/images/card-servicos-cnc.png",
                  icon: <Cog className="w-6 h-6" />,
                  title: "Serviços CNC",
                  description:
                    "Centros de usinagem CNC de última geração para torneamento, fresamento e furação de alta precisão. Geometrias complexas e acabamento superior.",
                  features: ["Torneamento CNC", "Fresamento multi-eixos", "Tolerâncias rigorosas"],
                },
                {
                  image: "/images/card-fabricacao-metal.png",
                  icon: <Factory className="w-6 h-6" />,
                  title: "Peças Metálicas",
                  description:
                    "Oferecemos soluções na fabricação de componentes em aço carbono, inox, alumínio, bronze, latão e ligas especiais. Unimos um alto controle de qualidade a uma produção versátil, capaz de processar lotes flexíveis sempre garantindo a conformidade por meio de um rigoroso controle dimensional.",
                  features: ["Diversos materiais", "Lotes flexíveis", "Inspeção dimensional"],
                },
                {
                  image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
                  icon: <Wrench className="w-6 h-6" />,
                  title: "Manutenção e Reparo",
                  description:
                    "Recuperação de peças desgastadas, reforma dimensional, retífica e soldagem especializada para prolongar a vida útil de seus componentes.",
                  features: ["Recuperação de peças", "Retífica de precisão", "Soldagem especializada"],
                },
              ].map((service, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden glass-card hover:border-primary/30 transition-all duration-500 flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={`${BRAND} — ${service.title}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-900 to-transparent opacity-60" />
                    <div className="absolute top-6 left-6 w-12 h-12 glass-card border-white/20 flex items-center justify-center text-primary shadow-xl">
                      {service.icon}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-2xl mb-4 text-white group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-text-400 mb-8 flex-1 leading-relaxed">{service.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-text-500">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
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

        {/* WHY CHOOSE US */}
        <section className="py-24 bg-bg-950" aria-labelledby="why-title">
          <div className="section-container">
            <motion.div
              {...fadeInUp}
              className="text-center mb-20"
            >
              <h2 id="why-title" className="text-4xl md:text-6xl mb-6 text-white text-gradient">
                Por que a <span className="text-primary">{BRAND}</span>?
              </h2>
              <p className="text-xl text-text-400 max-w-2xl mx-auto">
                Diferenciais que nos tornam o parceiro ideal para sua produção industrial.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Qualidade Rigorosa",
                  description: "Inspeção dimensional precisa com equipamentos calibrados.",
                },
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: "Agilidade na Entrega",
                  description: "Processos otimizados para prazos curtos e confiáveis.",
                },
                {
                  icon: <Headphones className="w-8 h-8" />,
                  title: "Suporte Técnico",
                  description: "Acompanhamento especializado do desenho à peça pronta.",
                },
                {
                  icon: <Cpu className="w-8 h-8" />,
                  title: "Alta Tecnologia",
                  description: "Maquinário moderno para máxima eficiência produtiva.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="p-8 glass-card border-white/5 hover:bg-white/10 transition-all group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl mb-3 text-white">{item.title}</h3>
                  <p className="text-text-400 leading-relaxed text-sm">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capacidades" className="py-24 bg-bg-900 relative overflow-hidden" aria-labelledby="cap-title">
           <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 blur-[150px] rounded-full" />
           
           <div className="section-container relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 id="cap-title" className="text-4xl md:text-6xl mb-8 text-white leading-tight text-gradient">
                Tecnologia para resultados <span className="text-primary">superiores.</span>
              </h2>
              <div className="space-y-5 mb-10">
                {[
                  "Centros de usinagem multi-eixos",
                  "Controle dimensional rigoroso",
                  "Processos de qualidade certificados",
                  "Prazos combinados com transparência",
                  "Suporte técnico especializado",
                ].map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-lg text-text-400 group-hover:text-white transition-colors">{capability}</span>
                  </motion.div>
                ))}
              </div>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Falar com especialista
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative z-10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1666618090858-fbcee636bd3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjbmMlMjBtYWNoaW5pbmclMjBwcmVjaXNpb24lMjBtZXRhbHxlbnwxfHx8fDE3NzU3NzMxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt={`Tecnologia de ponta na ${BRAND}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full z-0 translate-x-10 translate-y-10" />
            </motion.div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section id="contato" className="py-24 relative overflow-hidden" aria-labelledby="cta-title">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="section-container relative z-10">
            <motion.div
              {...fadeInUp}
              className="glass-card p-10 md:p-20 text-center border-primary/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                <Cog className="w-64 h-64 animate-spin-slow" />
              </div>
              
              <h2 id="cta-title" className="text-4xl md:text-7xl mb-8 text-white text-gradient">
                Vamos desenvolver seu <br className="hidden md:block" /><span className="text-primary">próximo projeto?</span>
              </h2>
              <p className="text-xl text-text-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                Entre em contato e descubra como a {BRAND} pode transformar suas necessidades em peças de alta precisão.
              </p>

              <div className="grid md:grid-cols-3 gap-10 mb-16 max-w-4xl mx-auto">
                {[
                  {
                    icon: <Phone className="w-6 h-6" />,
                    label: "Telefone / WhatsApp",
                    value: "(19) 98273-1890",
                    href: WHATSAPP_LINK
                  },
                  {
                    icon: <Mail className="w-6 h-6" />,
                    label: "E-mail",
                    value: "duhelousinagem@gmail.com",
                    href: "mailto:duhelousinagem@gmail.com"
                  },
                  {
                    icon: <MapPin className="w-6 h-6" />,
                    label: "Localização",
                    value: "Americana, SP",
                    href: "https://maps.google.com/?q=Americana,SP"
                  },
                ].map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {contact.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-text-500 mb-1">{contact.label}</div>
                      <div className="text-text-50 font-medium group-hover:text-primary transition-colors">{contact.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-16 py-6 text-xl shadow-2xl shadow-primary/40"
              >
                Solicitar orçamento agora
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-12 bg-bg-950 border-t border-white/5" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="text-2xl font-display font-bold text-white tracking-tighter">
              DUHELO<span className="text-primary"> USINAGEM</span>
            </div>
            <div className="flex gap-8 text-sm text-text-400">
              <a href="#servicos" className="hover:text-white transition-colors">Serviços</a>
              <a href="#capacidades" className="hover:text-white transition-colors">Capacidades</a>
              <a href="#contato" className="hover:text-white transition-colors">Contato</a>
            </div>
          </div>
          <div className="text-center text-text-500 text-sm border-t border-white/5 pt-8">
            <p>© {new Date().getFullYear()} {BRAND}. Todos os direitos reservados.</p>
            <p className="mt-2 text-xs opacity-50">Especialistas em usinagem CNC de alta precisão.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
