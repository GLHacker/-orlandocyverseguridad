import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, ArrowLeft, Cpu, TrendingUp, Zap, Award, DollarSign } from "lucide-react";
import { Link } from "wouter";
import { APP_TITLE } from "@/const";

export default function Reportaje() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 cyber-gradient opacity-50" />
      <div className="fixed inset-0 cyber-grid opacity-20" />
      <div className="fixed inset-0 scanlines" />

      {/* Navigation */}
      <nav className="relative z-10 border-b border-border/50 backdrop-blur-md bg-background/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-primary glow-cyan" />
              <h1 className="text-2xl font-bold text-primary glow-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {APP_TITLE}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Inicio
                </Button>
              </Link>
              <Link href="/gallery">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Galería
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 py-12">
        <article className="container max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Reportaje Técnico</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Los Mejores Microprocesadores de 2025
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Análisis completo del mercado actual de procesadores: AMD vs Intel, 
              arquitecturas revolucionarias y el futuro de la computación
            </p>

            <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-muted-foreground">
              <span>Por Orlando Cyber Seguridad</span>
              <span>•</span>
              <span>Noviembre 2025</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12 relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-lg" />
            <img 
              src="/images/amd-ryzen-chip.png" 
              alt="AMD Ryzen Processor" 
              className="relative rounded-lg w-full h-auto border border-primary/30"
            />
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            {/* Introduction */}
            <Card className="p-8 mb-8 bg-card/50 backdrop-blur-sm border-border/50">
              <h2 className="text-3xl font-bold mb-4 text-primary glow-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                La Batalla por el Dominio: AMD vs Intel en 2025
              </h2>
              <p className="text-foreground leading-relaxed mb-4">
                La competencia entre AMD e Intel ha alcanzado niveles sin precedentes. Según los últimos datos del tercer trimestre de 2025, 
                Intel mantiene una cuota de mercado del <strong className="text-primary">64.2%</strong> en el segmento de microprocesadores, 
                aunque ha perdido <strong className="text-destructive">1.57 puntos porcentuales</strong> respecto al trimestre anterior. 
                AMD, por su parte, continúa ganando terreno de manera constante, consolidándose como la opción preferida para usuarios 
                que buscan el mejor equilibrio entre rendimiento y precio.
              </p>
              <p className="text-foreground leading-relaxed">
                El veredicto es claro: <strong className="text-primary">AMD gana la batalla de 2025</strong> con victorias en cinco de las 
                siete categorías evaluadas por los principales medios especializados, incluyendo precio, rendimiento en gaming, consumo energético, 
                compatibilidad de plataforma y seguridad.
              </p>
            </Card>

            {/* Top Processors */}
            <h2 className="text-3xl font-bold mb-6 text-primary glow-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Top 5: Los Procesadores Más Potentes para Gaming
            </h2>

            {/* Processor 1 */}
            <Card className="p-6 mb-6 bg-card/50 backdrop-blur-sm border-primary/50 neon-pulse">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      1. AMD Ryzen 7 9800X3D
                    </h3>
                    <span className="text-2xl font-bold text-primary">$480</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Arquitectura:</span>
                      <p className="text-foreground font-semibold">Zen 5</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Núcleos:</span>
                      <p className="text-foreground font-semibold">8 / 16</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Frecuencia:</span>
                      <p className="text-foreground font-semibold">4.7 - 5.2 GHz</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">TDP:</span>
                      <p className="text-foreground font-semibold">120W</p>
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    El <strong className="text-primary">rey indiscutible</strong> del gaming en 2025. Con tecnología 
                    <strong className="text-primary"> 3D V-Cache de segunda generación</strong> que proporciona 93MB de caché L3, 
                    este chip ofrece tasas de fotogramas líderes en la industria. Su eficiencia energética de 120W lo convierte 
                    en la opción perfecta para sistemas de alto rendimiento sin comprometer el consumo.
                  </p>
                </div>
              </div>
            </Card>

            {/* Processor 2 */}
            <Card className="p-6 mb-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      2. AMD Ryzen 7 7800X3D
                    </h3>
                    <span className="text-2xl font-bold text-secondary">$449</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Arquitectura:</span>
                      <p className="text-foreground font-semibold">Zen 4</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Núcleos:</span>
                      <p className="text-foreground font-semibold">8 / 16</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Frecuencia:</span>
                      <p className="text-foreground font-semibold">4.2 - 5.0 GHz</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">TDP:</span>
                      <p className="text-foreground font-semibold">120W</p>
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    La <strong className="text-secondary">opción inteligente</strong> para gamers conscientes del presupuesto. 
                    Alcanza el 87.18% del rendimiento del líder a un precio más accesible. La tecnología 3D V-Cache de primera 
                    generación sigue siendo tremendamente efectiva, ofreciendo un rendimiento excepcional en todos los juegos actuales.
                  </p>
                </div>
              </div>
            </Card>

            {/* Processor 3 */}
            <Card className="p-6 mb-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-accent" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      3. AMD Ryzen 9 7950X3D
                    </h3>
                    <span className="text-2xl font-bold text-accent">$699</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Arquitectura:</span>
                      <p className="text-foreground font-semibold">Zen 4</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Núcleos:</span>
                      <p className="text-foreground font-semibold">16 / 32</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Frecuencia:</span>
                      <p className="text-foreground font-semibold">4.2 - 5.7 GHz</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">TDP:</span>
                      <p className="text-foreground font-semibold">120W</p>
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    El <strong className="text-accent">todoterreno definitivo</strong>. Con 16 núcleos y 32 hilos, este monstruo 
                    ofrece la mejor combinación de rendimiento en gaming y aplicaciones profesionales. Ideal para creadores de 
                    contenido y profesionales que también son gamers entusiastas.
                  </p>
                </div>
              </div>
            </Card>

            {/* Intel Processors */}
            <Card className="p-6 mb-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img src="/images/intel-core-ultra.jpg" alt="Intel Core Ultra" className="w-24 h-24 rounded-lg object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      4. Intel Core i9-14900K
                    </h3>
                    <span className="text-2xl font-bold text-foreground">$549</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Arquitectura:</span>
                      <p className="text-foreground font-semibold">Raptor Lake Refresh</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Núcleos:</span>
                      <p className="text-foreground font-semibold">24 / 32 (8P+16E)</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Frecuencia:</span>
                      <p className="text-foreground font-semibold">3.2 - 6.0 GHz</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">TDP:</span>
                      <p className="text-foreground font-semibold">125W / 253W</p>
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    El <strong>gigante hambriento</strong> de Intel. Ofrece rendimiento sólido con 24 núcleos, pero su consumo 
                    energético de hasta 253W requiere soluciones de refrigeración robustas. A pesar de alcanzar 6.0 GHz, 
                    su rendimiento en gaming no justifica el consumo adicional comparado con las opciones de AMD.
                  </p>
                </div>
              </div>
            </Card>

            {/* Technology Deep Dive */}
            <Card className="p-8 mb-8 bg-card/50 backdrop-blur-sm border-border/50">
              <h2 className="text-3xl font-bold mb-4 text-primary glow-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                La Revolución 3D V-Cache: El Arma Secreta de AMD
              </h2>
              <p className="text-foreground leading-relaxed mb-4">
                La tecnología <strong className="text-primary">3D V-Cache</strong> de AMD ha demostrado ser un cambio de paradigma 
                en el diseño de procesadores para gaming. Esta innovación apila memoria caché adicional directamente sobre el die 
                del procesador, reduciendo dramáticamente la latencia de acceso a datos y mejorando las tasas de fotogramas en 
                juegos que dependen intensivamente de la caché.
              </p>
              <p className="text-foreground leading-relaxed">
                La segunda generación de esta tecnología, implementada en los procesadores Ryzen 9000 X3D, ha refinado el diseño 
                original eliminando las limitaciones que afectaban el rendimiento en aplicaciones de productividad. Ahora, los chips 
                X3D no solo dominan en gaming, sino que también ofrecen rendimiento competitivo en cargas de trabajo profesionales, 
                eliminando la necesidad de compromisos.
              </p>
            </Card>

            {/* Intel Arrow Lake */}
            <Card className="p-8 mb-8 bg-destructive/10 backdrop-blur-sm border-destructive/30">
              <h2 className="text-3xl font-bold mb-4 text-destructive" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Intel Arrow Lake: Una Oportunidad Perdida
              </h2>
              <p className="text-foreground leading-relaxed mb-4">
                El lanzamiento de la arquitectura <strong>Arrow Lake</strong> (Core Ultra 200S) representaba la gran esperanza de 
                Intel para recuperar el liderazgo en gaming. Estos procesadores ofrecen un rendimiento single-threaded excepcional 
                y capacidades multi-threaded impresionantes, especialmente en aplicaciones de productividad y creación de contenido.
              </p>
              <p className="text-foreground leading-relaxed">
                Sin embargo, Arrow Lake ha decepcionado en el aspecto más crítico para muchos entusiastas: <strong className="text-destructive">el gaming</strong>. 
                A pesar de los parches de firmware y actualizaciones del sistema operativo prometidos por Intel, las pruebas 
                independientes demuestran que estos "arreglos" no han mejorado significativamente el rendimiento en juegos.
              </p>
            </Card>

            {/* Buying Guide */}
            <h2 className="text-3xl font-bold mb-6 text-primary glow-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Guía de Compra: ¿Qué Procesador Elegir?
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-bold mb-3 text-primary flex items-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <Award className="w-5 h-5 mr-2" />
                  Para Gaming Puro
                </h3>
                <p className="text-foreground leading-relaxed">
                  Si tu prioridad absoluta es el gaming y tienes el presupuesto, el <strong className="text-primary">AMD Ryzen 7 9800X3D</strong> es 
                  la elección obvia. Para presupuestos más ajustados, el <strong className="text-secondary">Ryzen 7 7800X3D</strong> ofrece 
                  un rendimiento casi idéntico a un precio más accesible.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-bold mb-3 text-accent flex items-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <Zap className="w-5 h-5 mr-2" />
                  Para Creadores de Contenido
                </h3>
                <p className="text-foreground leading-relaxed">
                  El <strong className="text-accent">AMD Ryzen 9 7950X3D</strong> o el <strong>Ryzen 9 9950X</strong> son las opciones ideales, 
                  ofreciendo 16 núcleos que devoran tareas de renderizado, edición de video y compilación de código, mientras mantienen 
                  excelente rendimiento en gaming.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-bold mb-3 text-secondary flex items-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <DollarSign className="w-5 h-5 mr-2" />
                  Para Presupuestos Limitados
                </h3>
                <p className="text-foreground leading-relaxed">
                  El <strong className="text-secondary">AMD Ryzen 7 9700X</strong> ofrece un rendimiento excepcional por su precio, 
                  con la ventaja adicional de un consumo energético mínimo de solo 65W. Perfecto para sistemas eficientes.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-bold mb-3 text-primary flex items-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <Cpu className="w-5 h-5 mr-2" />
                  Para Eficiencia Energética
                </h3>
                <p className="text-foreground leading-relaxed">
                  Los procesadores <strong className="text-primary">AMD Ryzen 9000</strong> en general, y específicamente los modelos 
                  de 65W como el 9700X, ofrecen el mejor balance de rendimiento y consumo energético del mercado actual.
                </p>
              </Card>
            </div>

            {/* Conclusion */}
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/50 border-glow">
              <h2 className="text-3xl font-bold mb-4 text-primary glow-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Conclusión: Una Era Dorada para los Consumidores
              </h2>
              <p className="text-foreground leading-relaxed mb-4">
                El año 2025 representa un momento excepcional para los consumidores de tecnología. La feroz competencia entre AMD e 
                Intel ha resultado en procesadores más potentes, eficientes y asequibles que nunca. AMD ha demostrado que la innovación 
                consistente y la ejecución técnica superior pueden desafiar a gigantes establecidos, mientras que Intel está respondiendo 
                con inversiones masivas y nuevas arquitecturas prometedoras.
              </p>
              <p className="text-foreground leading-relaxed">
                Para los entusiastas de la tecnología, profesionales y gamers, <strong className="text-primary">nunca ha habido un mejor 
                momento</strong> para actualizar o construir un nuevo sistema. Las opciones son abundantes, el rendimiento es extraordinario, 
                y el futuro promete ser aún más emocionante.
              </p>
            </Card>

            {/* Sources */}
            <div className="mt-12 p-6 bg-muted/20 backdrop-blur-sm rounded-lg border border-border/30">
              <h3 className="text-lg font-semibold mb-3 text-muted-foreground">Fuentes:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Tom's Hardware CPU Benchmarks Hierarchy 2025</li>
                <li>• Tom's Hardware Intel vs AMD Feature 2025</li>
                <li>• PassMark CPU Benchmarks</li>
                <li>• Análisis de mercado Q3 2025</li>
              </ul>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 backdrop-blur-md bg-background/30 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-sm text-muted-foreground">
                © 2025 {APP_TITLE}. Reportaje técnico sobre microprocesadores.
              </span>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Inicio
              </Link>
              <Link href="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Galería
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
