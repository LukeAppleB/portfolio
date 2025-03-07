import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { resumeData } from "@/data/resume";

export function About() {
  return (
    <section id="about" className="py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Background</h3>
                <p className="text-muted-foreground">
                  {resumeData.summary}
                </p>
                <p className="text-muted-foreground">
                  {resumeData.summary2}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Details</h3>
                <dl className="space-y-2">
                  <div className="flex gap-2">
                    <dt className="font-medium">Location:</dt>
                    <dd className="text-muted-foreground">{resumeData.contact.location}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium">Email:</dt>
                    <dd className="text-muted-foreground">{resumeData.contact.email}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
