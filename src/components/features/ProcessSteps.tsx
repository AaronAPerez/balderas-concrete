import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { processSteps } from "@/src/lib/constants";

export function ProcessSteps() {
  return (
    <section className="py-20 lg:py-28 bg-[#6B6B6B]/10">
      <Container>
        <SectionHeading
          title="How We Work"
          subtitle="Our simple 4-step process ensures a smooth experience from start to finish."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {processSteps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector line (hidden on mobile and for last item) */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-slate-200 -translate-x-1/2" />
                // <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-slate-200 dark:bg-slate-700 -translate-x-1/2" />
              )}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-white text-2xl font-bold mb-5">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-brand mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                {/* <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-xs mx-auto"> */}
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
