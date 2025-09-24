import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Hero3D from "./Hero3D";
import heroCarImage from "@/assets/hero-car.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--neon-cyan)) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, hsl(var(--sunset-orange)) 0%, transparent 50%)`
        }} />
      </div>

      <div className="container mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-neon-cyan via-primary to-sunset-orange bg-clip-text text-transparent">
                Emergency
              </span>
              <br />
              <span className="text-foreground">
                Auto Help
              </span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground">
                When You Need It Most
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Get instant access to mechanics, medical help, and fuel delivery. 
              Our futuristic platform connects you with emergency services in real-time.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" className="group" asChild>
              <Link to="/book">
                <Phone className="w-5 h-5 mr-2" />
                Book Emergency Help
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button variant="glass" size="xl" asChild>
              <Link to="/track">
                <MapPin className="w-5 h-5 mr-2" />
                Track Service
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-neon-cyan">24/7</div>
              <div className="text-sm text-muted-foreground">Emergency Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-sunset-orange">5min</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-neon-cyan">10k+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* Right Content - 3D Car or Image */}
        <div className="relative">
          <div className="hidden">
            <Hero3D />
          </div>
          
          {/* Fallback Image for smaller screens */}
          <div className="">
            <img 
              src={heroCarImage} 
              alt="Futuristic Car" 
              className="w-full h-auto animate-float rounded-lg  drop-shadow-2xl"
            />
          </div>
          
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-glow-pulse" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-secondary rounded-full opacity-20 animate-float" />
        </div>
      </div>

    </section>
  );
}