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
} from "lucide-react";

const BRAND = "Duhelo Usinagem";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl md:text-2xl font-bold text-zinc-50 tracking-tight">
            DUHELO<span className="text-blue-500"> USINAGEM</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#servicos" className="text-zinc-400 hover:text-zinc-50 transition-colors">
              Serviços
            </a>
            <a href="#capacidades" className="text-zinc-400 hover:text-zinc-50 transition-colors">
              Capacidades
            </a>
            <a
              href="#contato"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Contato
            </a>
          </div>
        </div>
      </motion.nav>

      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1713371398485-7bde1bde9def?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjbmMlMjBtYWNoaW5pbmclMjBwcmVjaXNpb24lMjBtZXRhbHxlbnwxfHx8fDE3NzU3NzMxNDF8MA&ixlib=rb-4.1.0&q=80&w=1920"
              alt={`${BRAND} — usinagem de precisão`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/95 to-zinc-950/40" />
          </motion.div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-0">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400 mb-4">
                {BRAND}
              </p>
              <h1 className="text-5xl md:text-7xl mb-6 text-zinc-50">Precisão em cada detalhe</h1>
              <p className="text-xl text-zinc-400 mb-8">
                Usinagem CNC de alta performance para projetos que exigem excelência técnica e acabamento superior.
              </p>
              <motion.a
                href="#contato"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition-colors"
              >
                Solicitar orçamento
              </motion.a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      <section id="servicos" className="py-32 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-zinc-50">Nossos serviços</h2>
            <p className="text-xl text-zinc-400">Soluções completas em usinagem para a indústria</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                image: "/images/card-usinagem-customizada.png",
                icon: <Settings className="w-8 h-8" />,
                title: "Usinagem customizada",
                description:
                  "Desenvolvemos peças sob medida de acordo com seu projeto específico. Trabalhamos com desenhos técnicos e especificações personalizadas, garantindo que cada componente atenda exatamente às suas necessidades.",
                features: ["Projetos personalizados", "Múltiplos materiais", "Prototipagem rápida"],
              },
              {
                image: "/images/card-servicos-cnc.png",
                icon: <Cog className="w-8 h-8" />,
                title: "Serviços CNC",
                description:
                  "Centros de usinagem CNC de última geração para torneamento, fresamento e furação de alta precisão. Operamos equipamentos 3, 4 e 5 eixos para geometrias complexas e acabamento superior.",
                features: ["Torneamento CNC", "Fresamento multi-eixos", "Tolerâncias rigorosas"],
              },
              {
                image: "/images/card-fabricacao-metal.png",
                icon: <Factory className="w-8 h-8" />,
                title: "Fabricação de peças metálicas",
                description:
                  "Produção de componentes metálicos em diversos materiais como aço, alumínio, bronze, latão e ligas especiais. Capacidade para lotes pequenos, médios e grandes com controle dimensional garantido.",
                features: ["Diversos materiais", "Lotes flexíveis", "Inspeção dimensional"],
              },
              {
                image:
                  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
                icon: <Wrench className="w-8 h-8" />,
                title: "Manutenção e reparo",
                description:
                  "Recuperação e reforma de peças desgastadas ou danificadas. Serviços de retífica, soldagem especializada e recuperação dimensional para prolongar a vida útil de seus componentes industriais.",
                features: ["Recuperação de peças", "Retífica de precisão", "Soldagem especializada"],
              },
            ].map((service, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="overflow-hidden bg-zinc-800/50 border border-zinc-700 rounded-xl group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-zinc-900/90 border-b border-zinc-700/80">
                  <ImageWithFallback
                    src={service.image}
                    alt={`${BRAND} — ${service.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/90 text-white shadow-lg backdrop-blur-sm">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl mb-4 text-zinc-50">{service.title}</h3>
                  <p className="text-zinc-400 mb-6 flex-1">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-zinc-500">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-zinc-50">Por que escolher a {BRAND}</h2>
            <p className="text-xl text-zinc-400">Compromisso com excelência em cada etapa do processo</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-10 h-10" />,
                title: "Precisão e controle de qualidade",
                description:
                  "Inspeção dimensional rigorosa com equipamentos de medição de última geração e processos alinhados à boas práticas.",
              },
              {
                icon: <Clock className="w-10 h-10" />,
                title: "Entrega rápida",
                description:
                  "Prazos competitivos e cumprimento alinhado graças ao parque de máquinas e processos otimizados.",
              },
              {
                icon: <Headphones className="w-10 h-10" />,
                title: "Atendimento personalizado",
                description:
                  "Equipe técnica dedicada para acompanhar seu projeto desde o orçamento até a entrega final.",
              },
              {
                icon: <Cpu className="w-10 h-10" />,
                title: "Tecnologia",
                description:
                  "Centros de usinagem CNC multi-eixos, software CAM e automação para máxima precisão e eficiência.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-blue-600/10 border border-blue-600/20 rounded-lg text-blue-500"
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl mb-3 text-zinc-50">{item.title}</h3>
                <p className="text-zinc-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="capacidades" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl mb-8 text-zinc-50">
                Tecnologia de ponta para resultados superiores
              </h2>
              <div className="space-y-6">
                {[
                  "Centros de usinagem multi-eixos",
                  "Controle dimensional rigoroso",
                  "Processos e qualidade documentados",
                  "Prazos de entrega combinados com transparência",
                  "Suporte técnico especializado",
                ].map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <span className="text-lg text-zinc-300">{capability}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-zinc-800 shadow-2xl shadow-black/40">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1666618090858-fbcee636bd3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjbmMlMjBtYWNoaW5pbmclMjBwcmVjaXNpb24lMjBtZXRhbHxlbnwxfHx8fDE3NzU3NzMxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt={`Instalações — ${BRAND}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-600/20 rounded-lg blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contato" className="py-32 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-zinc-50">Vamos desenvolver seu projeto</h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Entre em contato e descubra como a {BRAND} pode transformar suas ideias em realidade.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: <Phone className="w-6 h-6" />,
                  label: "Telefone",
                  value: "(00) 0000-0000",
                },
                {
                  icon: <Mail className="w-6 h-6" />,
                  label: "E-mail",
                  value: "contato@duhelousinagem.com.br",
                },
                {
                  icon: <MapPin className="w-6 h-6" />,
                  label: "Localização",
                  value: "São Paulo, SP",
                },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="text-blue-500">{contact.icon}</div>
                  <div className="text-sm text-zinc-500">{contact.label}</div>
                  <div className="text-zinc-300">{contact.value}</div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="mailto:contato@duhelousinagem.com.br"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition-colors"
            >
              Solicitar orçamento
            </motion.a>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-zinc-500">
          <p>© {new Date().getFullYear()} {BRAND}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
