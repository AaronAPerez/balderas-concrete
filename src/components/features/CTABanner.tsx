import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { contactInfo } from "@/src/lib/constants";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  showPhone?: boolean;
}

export function CTABanner({
  title = "Ready to Start Your Project?",
  subtitle = "Request an estimate today. We'll help bring your vision to life with quality concrete work.",
  showPhone = true,
}: CTABannerProps) {
  return (
    <section className="py-20 lg:py-24 bg-brand-dark">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {title}
          </h2>
          <p className="mt-5 text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button href="/contact" size="lg">
              Get an Estimate
            </Button>
            {showPhone && (
              <a
                href={`tel:${contactInfo.phoneRaw}`}
                className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors text-lg font-medium min-h-11"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{contactInfo.phone}</span>
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
