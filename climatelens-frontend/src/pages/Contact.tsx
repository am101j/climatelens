// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card } from "@/components/ui/card";
// import { Send, Mail, MessageCircle, User } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import NavBar from "@/components/NavBar";
// import Footer from "@/components/Footer";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: ""
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.name || !formData.email || !formData.message) {
//       toast({
//         title: "Please fill in all fields",
//         description: "All fields are required to send your message.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsSubmitting(true);
    
//     // Simulate form submission
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setFormData({ name: "", email: "", message: "" });
//       toast({
//         title: "Message Sent!",
//         description: "Thank you for your message. We'll get back to you soon.",
//       });
//     }, 1500);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-hero">
//       <NavBar />
      
//       <div className="container mx-auto px-4 py-12">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-foreground mb-4">
//             Get in Touch
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Have questions about climate risks or ClimateLens? We'd love to hear from you.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
//           {/* Contact Information */}
//           <div className="space-y-8">
//             <Card className="p-8 bg-gradient-card shadow-card border-0 rounded-2xl">
//               <h2 className="text-2xl font-bold text-foreground mb-6">
//                 Let's Start a Conversation
//               </h2>
//               <p className="text-muted-foreground leading-relaxed mb-8">
//                 Whether you're curious about climate risks, interested in our technology, or have feedback about ClimateLens, we're here to help. Our team is passionate about making climate data accessible to everyone.
//               </p>

//               <div className="space-y-6">
//                 <div className="flex items-center gap-4">
//                   <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft">
//                     <Mail className="h-6 w-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-foreground">Email</h3>
//                     <p className="text-muted-foreground">hello@climatelens.ai</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20">
//                     <MessageCircle className="h-6 w-6 text-secondary-foreground" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-foreground">Response Time</h3>
//                     <p className="text-muted-foreground">Usually within 24 hours</p>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-8 bg-gradient-card shadow-card border-0 rounded-2xl">
//               <h3 className="text-lg font-semibold text-foreground mb-4">
//                 Common Questions
//               </h3>
//               <div className="space-y-4 text-sm">
//                 <div>
//                   <h4 className="font-medium text-foreground mb-1">How accurate is the climate data?</h4>
//                   <p className="text-muted-foreground">Our platform will integrate with leading climate data providers for maximum accuracy.</p>
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-foreground mb-1">Can I get reports for any location?</h4>
//                   <p className="text-muted-foreground">Yes, we'll support climate risk assessments for properties worldwide.</p>
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-foreground mb-1">Is my data secure?</h4>
//                   <p className="text-muted-foreground">We prioritize data privacy and security in all our systems.</p>
//                 </div>
//               </div>
//             </Card>
//           </div>

//           {/* Contact Form */}
//           <Card className="p-8 bg-gradient-card shadow-card border-0 rounded-2xl">
//             <h2 className="text-2xl font-bold text-foreground mb-6">
//               Send us a Message
//             </h2>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
//                   <User className="h-4 w-4" />
//                   Name
//                 </label>
//                 <Input
//                   id="name"
//                   name="name"
//                   type="text"
//                   placeholder="Your full name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="rounded-xl border-primary/20 focus:border-primary bg-background/50"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
//                   <Mail className="h-4 w-4" />
//                   Email
//                 </label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="your.email@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="rounded-xl border-primary/20 focus:border-primary bg-background/50"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="message" className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
//                   <MessageCircle className="h-4 w-4" />
//                   Message
//                 </label>
//                 <Textarea
//                   id="message"
//                   name="message"
//                   placeholder="Tell us about your questions, feedback, or how we can help..."
//                   rows={6}
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="rounded-xl border-primary/20 focus:border-primary bg-background/50"
//                 />
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full rounded-full bg-gradient-primary border-0 shadow-soft hover:shadow-floating transition-all duration-300"
//               >
//                 {isSubmitting ? (
//                   <div className="flex items-center gap-2">
//                     <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
//                     Sending...
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2">
//                     <Send className="h-4 w-4" />
//                     Send Message
//                   </div>
//                 )}
//               </Button>
//             </form>
//           </Card>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Contact;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Mail, MessageCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const API_BASE = "http://127.0.0.1:8000"; // backend URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to send your message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setFormData({ name: "", email: "", message: "" });
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about climate risks or ClimateLens? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="p-8 bg-gradient-card shadow-card border-0 rounded-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you're curious about climate risks, interested in our technology, or have feedback about ClimateLens, we're here to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">hello@climatelens.ai</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20">
                    <MessageCircle className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Response Time</h3>
                    <p className="text-muted-foreground">Usually within 24 hours</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-gradient-card shadow-card border-0 rounded-2xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <User className="h-4 w-4" /> Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-xl border-primary/20 focus:border-primary bg-background/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-xl border-primary/20 focus:border-primary bg-background/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" /> Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your questions, feedback, or how we can help..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="rounded-xl border-primary/20 focus:border-primary bg-background/50"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-gradient-primary border-0 shadow-soft hover:shadow-floating transition-all duration-300"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" /> Send Message
                  </div>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
