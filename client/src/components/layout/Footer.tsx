import { Github, Linkedin, Mail } from "lucide-react";
import { resumeData } from "@/data/resume";

export function Footer() {
  return (
    <footer className="bg-muted py-8 mt-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Luke Appleby. Hosted on Digital Ocean, SSL + DNS managed by Cloudflare.
          </p>
          <div className="flex gap-4">
            <a
              href={resumeData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href={resumeData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href={`mailto:${resumeData.contact.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
