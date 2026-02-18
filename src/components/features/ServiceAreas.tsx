import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { serviceAreas } from "@/src/lib/constants";

export function ServiceAreas() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <Container>
        <SectionHeading
          title="Areas We Serve"
          subtitle="Proudly serving the greater Houston area and surrounding communities."
        />
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {serviceAreas.map((area) => (
            <span
              key={area}
              className="px-4 py-2 bg-white rounded-full text-slate-700 border border-slate-200 text-sm font-medium"
            >
              {area}, TX
            </span>
          ))}
        </div>
        <p className="text-center text-slate-500 text-sm mt-10 max-w-lg mx-auto">
          Don&apos;t see your area? Contact us – we may still be able to help!
        </p>
      </Container>
    </section>
  );
}
