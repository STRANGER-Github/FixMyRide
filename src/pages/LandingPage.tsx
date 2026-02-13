import { Suspense } from "react";
import { motion } from "framer-motion";
import { Shield, Wrench, Fuel, Heart, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroScene from "@/components/3d/HeroScene";
import { Link } from "react-router-dom";

const services = [
  { icon: Wrench, label: "Mechanic", desc: "Flat tire, engine issues & more" },
  { icon: Fuel, label: "Fuel Delivery", desc: "Out of gas? We'll bring it to you" },
  { icon: Heart, label: "Medical Aid", desc: "Emergency medical assistance" },
  { icon: Zap, label: "Jump Start", desc: "Dead battery? Quick jumpstart" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <header className="relative  flex flex-col">
        {/* Nav */}
        <nav className="relative z-20 flex items-center justify-between px-6 py-5 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">
              Fix<span className="text-primary">MyRide</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Link to="/auth/user/login">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/user/register">
              <Button className="gradient-primary text-primary-foreground neon-glow font-semibold">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </nav>

        {/* 3D Background */}
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>

      </header>

      {/* Services Section */}
      <section className="relative py-24 px-6 lg:px-12 gradient-mesh">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl lg:text-5xl font-display font-bold mb-4"
            >
              Services at Your <span className="text-primary">Fingertips</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-muted-foreground text-lg max-w-md mx-auto"
            >
              Whatever your emergency, we've got the right help nearby.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 2}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="glass rounded-2xl p-6 cursor-pointer group"
              >
                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:neon-glow transition-shadow">
                  <service.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2 text-foreground">{service.label}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-3xl lg:text-5xl font-display font-bold text-center mb-16"
          >
            How It <span className="text-primary">Works</span>
          </motion.h2>

          <div className="space-y-12">
            {[
              { step: "01", title: "Request Help", desc: "Tap emergency button, select service type. We detect your location automatically." },
              { step: "02", title: "Get Matched", desc: "Our algorithm finds the nearest verified provider within seconds." },
              { step: "03", title: "Track & Connect", desc: "Watch your helper approach in real-time. Chat or call directly." },
              { step: "04", title: "Back on the Road", desc: "Service completed, pay securely in-app, and rate your experience." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="flex gap-6 items-start"
              >
                <span className="text-4xl font-display font-bold text-primary/20 shrink-0">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-1 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="max-w-4xl mx-auto glass-strong rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 gradient-mesh opacity-50" />
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Ready for <span className="text-primary">Peace of Mind</span>?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Join thousands of drivers who never worry about breakdowns again.
            </p>
            <Link to="/auth/register">
              <Button size="lg" className="gradient-primary neon-glow text-primary-foreground font-bold text-base px-10 h-13">
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md gradient-primary flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">
              Fix<span className="text-primary">MyRide</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 FixMyRide. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
