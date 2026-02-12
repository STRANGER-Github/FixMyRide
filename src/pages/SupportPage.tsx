import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, ChevronUp, MessageSquare, Send, ArrowLeft, BookOpen, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const faqs = [
  { q: "How do I request emergency roadside assistance?", a: "Tap the 'Emergency Help' button on your dashboard or use the floating SOS button. Select the service type, confirm your location, and a nearby provider will be dispatched immediately." },
  { q: "How long does it take for a provider to arrive?", a: "Average response time is 4-8 minutes depending on your location and the availability of nearby providers. You can track your provider's location in real-time." },
  { q: "What payment methods are accepted?", a: "We accept all major credit/debit cards, Apple Pay, and Google Pay. You can manage your payment methods in your profile settings." },
  { q: "How do I become a service provider?", a: "Register as a service provider, complete the KYC verification process by uploading your business license and certifications, and wait for admin approval. The process typically takes 24-48 hours." },
  { q: "How do I file a dispute?", a: "Go to your booking history, select the booking in question, and tap 'Report Issue'. Provide details and our support team will review your case within 24 hours." },
];

export default function SupportPage() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [ticketMessage, setTicketMessage] = useState("");

  const filteredFaqs = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <header className="sticky top-0 z-40 glass-strong border-b border-border/50">
        <div className="flex items-center gap-3 px-4 h-14 max-w-lg mx-auto">
          <Link to={-1 as unknown as string} onClick={(e) => { e.preventDefault(); window.history.back(); }}>
            <Button variant="ghost" size="icon" className="h-9 w-9"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h1 className="font-display font-bold text-foreground">Support</h1>
          </div>
        </div>
      </header>

      <div className="p-4 max-w-lg mx-auto space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search FAQ..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary/50 border-border/50" />
        </div>

        {/* FAQ */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> FAQ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {filteredFaqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground pr-4">{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </div>
                  {openFaq === i && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {faq.a}
                    </motion.p>
                  )}
                </button>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Submit Ticket */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" /> Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Can't find what you're looking for? Send us a message.</p>
            <Textarea
              placeholder="Describe your issue..."
              value={ticketMessage}
              onChange={e => setTicketMessage(e.target.value)}
              className="bg-secondary/50 border-border/50 min-h-[100px]"
            />
            <Button className="w-full gap-2" disabled={!ticketMessage.trim()}>
              <Send className="h-4 w-4" /> Submit Ticket
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
