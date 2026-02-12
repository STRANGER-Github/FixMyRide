import { motion } from "framer-motion";
import { Phone, Shield, MapPin, Heart, AlertTriangle, ArrowLeft, Siren, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const emergencyContacts = [
  { label: "Emergency Services", number: "911", icon: Siren, color: "gradient-emergency emergency-glow" },
  { label: "Roadside Assistance", number: "1-800-222-4357", icon: Shield, color: "gradient-primary neon-glow" },
  { label: "Medical Emergency", number: "911", icon: Heart, color: "bg-destructive" },
];

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-background gradient-mesh">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong border-b border-border/50">
        <div className="flex items-center gap-3 px-4 h-14 max-w-lg mx-auto">
          <Link to={-1 as unknown as string} onClick={(e) => { e.preventDefault(); window.history.back(); }}>
            <Button variant="ghost" size="icon" className="h-9 w-9"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-accent" />
            <h1 className="font-display font-bold text-foreground">Emergency</h1>
          </div>
        </div>
      </header>

      <div className="p-4 max-w-lg mx-auto space-y-6">
        {/* SOS Button */}
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-center pt-4">
          <a href="tel:911" className="block">
            <div className="h-40 w-40 rounded-full gradient-emergency emergency-glow flex flex-col items-center justify-center animate-pulse-glow">
              <Phone className="h-12 w-12 text-accent-foreground mb-1" />
              <span className="text-lg font-display font-bold text-accent-foreground">SOS</span>
              <span className="text-xs text-accent-foreground/80">Tap to Call 911</span>
            </div>
          </a>
        </motion.div>

        {/* Emergency Contacts */}
        <div className="space-y-3">
          <h2 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-wider">Quick Contacts</h2>
          {emergencyContacts.map((contact, i) => (
            <motion.a key={contact.label} href={`tel:${contact.number}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass border-border/50 hover:border-primary/30 transition-colors mb-3">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-full ${contact.color} flex items-center justify-center`}>
                    <contact.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{contact.label}</p>
                    <p className="text-sm text-muted-foreground">{contact.number}</p>
                  </div>
                  <Phone className="h-5 w-5 text-primary" />
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>

        {/* Location Sharing */}
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Share Your Location</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Share your real-time location with emergency contacts for faster assistance.
            </p>
            <Button className="w-full gap-2" variant="outline">
              <Share2 className="h-4 w-4" /> Share Location
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
