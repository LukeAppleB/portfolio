import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/data/resume";

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center py-16">
      <div className="container mx-auto px-4">
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Hi, I'm {resumeData.name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8">
            {resumeData.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            {resumeData.summary}
          </p>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            {resumeData.summary2}
          </p>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            {resumeData.summary3}
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <a href="#contact">Get in Touch</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#projects">View Projects</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
