import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_TITLE, getLoginUrl } from "@/const";
import { Upload, FileText, Image, Video, Shield, Cpu, ArrowRight, Zap } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random particles for background animation
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 cyber-gradient opacity-50" />
      <div className="fixed inset-0 cyber-grid opacity-20" />
      <div className="fixed inset-0 scanlines" />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float ${6 + particle.delay}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

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
              {isAuthenticated ? (
                <>
                  <Link href="/gallery">
                    <Button variant="ghost" className="text-foreground hover:text-primary">
                      Galería
                    </Button>
                  </Link>
                  <Link href="/reportaje">
                    <Button variant="ghost" className="text-foreground hover:text-primary">
                      Reportaje
                    </Button>
                  </Link>
                  <Link href="/upload">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 border-glow">
                      <Upload className="w-4 h-4 mr-2" />
                      Subir Archivo
                    </Button>
                  </Link>
                </>
              ) : (
                <a href={getLoginUrl()}>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 border-glow">
                    Iniciar Sesión
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Plataforma de Ciberseguridad</span>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-6 glow-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Comparte de Forma
              <br />
              <span className="text-primary">Segura</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Una plataforma futurista para compartir fotos, videos y documentos con la comunidad de ciberseguridad. 
              Explora el reportaje exclusivo sobre los mejores microprocesadores de 2025.
            </p>

            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={getLoginUrl()}>
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 border-glow text-lg px-8">
                    Comenzar Ahora
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <Link href="/reportaje">
                  <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 text-lg px-8">
                    Ver Reportaje
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 neon-pulse">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Image className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Imágenes
              </h3>
              <p className="text-muted-foreground">
                Comparte capturas de pantalla, diagramas y recursos visuales con la comunidad
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-all duration-300 border-glow-purple">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Videos
              </h3>
              <p className="text-muted-foreground">
                Sube tutoriales, demostraciones y conferencias sobre seguridad informática
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Documentos
              </h3>
              <p className="text-muted-foreground">
                Comparte PDFs, whitepapers y documentación técnica con profesionales
              </p>
            </Card>
          </div>

          {/* Featured Content */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-8 hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-lg" />
                  <img 
                    src="/images/amd-ryzen-chip.png" 
                    alt="AMD Ryzen Processor" 
                    className="relative rounded-lg w-full h-auto border border-primary/30"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="flex items-center space-x-2 mb-4">
                  <Cpu className="w-6 h-6 text-primary" />
                  <span className="text-sm text-primary font-semibold uppercase tracking-wider">Reportaje Exclusivo</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-foreground glow-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Los Mejores Microprocesadores de 2025
                </h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  Un análisis completo de los procesadores más potentes del mercado, incluyendo AMD Ryzen 9800X3D, 
                  Intel Core Ultra, y las últimas innovaciones en arquitectura de chips.
                </p>
                <Link href="/reportaje">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 border-glow">
                    Leer Reportaje Completo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 backdrop-blur-md bg-background/30 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-sm text-muted-foreground">
                © 2025 {APP_TITLE}. Plataforma de ciberseguridad.
              </span>
            </div>
            <div className="flex space-x-6">
              <Link href="/reportaje" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Reportaje
              </Link>
              {isAuthenticated && (
                <Link href="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Galería
                </Link>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
