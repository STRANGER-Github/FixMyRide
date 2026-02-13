import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import Hero3D from "./Hero3D";
import heroCarImage from "@/assets/hero-car.png";

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden">
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
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Your Digital{" "}
              <span className="bg-gradient-to-r from-neon-cyan via-primary to-sunset-orange text-primary neon-text">
                Guardian Angel
              </span>{" "}
              on the Road
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed"
            >
              Instant connection to verified mechanics, fuel delivery, and medical help.
              One tap away from getting back on the road.
            </motion.p>

          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" className="group" asChild>
              <Link to="/auth/user/register">
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
            {/* <Hero3D /> */}
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