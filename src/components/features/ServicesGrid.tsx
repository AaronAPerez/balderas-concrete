import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { ServiceCard } from "@/src/components/features/ServiceCard";
import { services } from "@/src/lib/constants";

interface ServicesGridProps {
  showAll?: boolean;
  title?: string;
  subtitle?: string;
}

export function ServicesGrid({
  showAll = true,
  title = "Our Concrete Services",
  subtitle = "From driveways to decorative stamped concrete, we deliver quality workmanship for every project.",
}: ServicesGridProps) {
  const displayServices = showAll ? services : services.slice(0, 6);

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
    {/* <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900"> */}
      <Container>
        <SectionHeading title={title} subtitle={subtitle} />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayServices.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.shortDescription}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
