import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, Heart, Fuel, Shield, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import mechanicIcon from "@/assets/mechanic-icon.png";
import medicalIcon from "@/assets/medical-icon.png";
import fuelIcon from "@/assets/fuel-icon.png";

const services = [
  {
    title: "Emergency Mechanic",
    description: "24/7 roadside assistance and repairs by certified mechanics",
    icon: mechanicIcon,
    features: ["Battery Jump", "Tire Change", "Engine Diagnostics", "Towing Service"],
    price: "Starting at $50",
    iconComponent: Wrench,
    color: "neon-cyan",
  },
  {
    title: "Medical Emergency",
    description: "Immediate medical assistance with qualified healthcare professionals",
    icon: medicalIcon,
    features: ["First Aid", "Emergency Transport", "Medical Consultation", "Ambulance Service"],
    price: "Starting at $100",
    iconComponent: Heart,
    color: "sunset-orange",
  },
  {
    title: "Fuel Delivery",
    description: "Emergency fuel delivery to your exact location",
    icon: fuelIcon,
    features: ["Petrol Delivery", "Diesel Supply", "CNG Service", "Express Delivery"],
    price: "Starting at $25",
    iconComponent: Fuel,
    color: "neon-cyan",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Rapid Response",
    description: "Average 5-minute response time for emergency bookings",
  },
  {
    icon: Shield,
    title: "Verified Providers",
    description: "All service providers are thoroughly vetted and certified",
  },
  {
    icon: MapPin,
    title: "Real-time Tracking",
    description: "Track your service provider's location in real-time",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-cyan to-sunset-orange bg-clip-text text-transparent">
              Emergency Services
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional help when you need it most. Our platform connects you with verified 
            service providers for any roadside emergency.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="glass-strong rounded-2xl p-8 hover:scale-105 transition-smooth group cursor-pointer"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Service Icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto relative">
                  <img 
                    src={service.icon} 
                    alt={service.title}
                    className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-sunset-orange/20 rounded-full blur-xl" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 text-sm">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center justify-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="pt-4">
                  <div className="text-lg font-semibold text-primary mb-4">
                    {service.price}
                  </div>
                  <Button 
                    variant="futuristic" 
                    className="w-full group"
                    asChild
                  >
                    <Link to="/book">
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="glass rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Why Choose <span className="text-primary">FixMyRide</span>?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="text-center space-y-4"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center glow-cyan">
                  <benefit.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">
                  {benefit.title}
                </h4>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}