// React and Next.js imports
import Link from "next/link";

// Third-party library imports
import Balancer from "react-wrap-balancer";

// UI component imports
import { Section, Container } from "@/components/craft";

// Icon imports
import { Coins, ArrowRight } from "lucide-react";

type FeatureText = {
  icon: JSX.Element;
  title: string;
  description: string;
  href?: string;
  cta?: string;
};

const featureText: FeatureText[] = [
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Game of thrones",
    href: "/",
    description:
      "Game of Thrones is a fantasy drama television series based on George R.R. Martin's book series A Song of Ice and Fire",
    cta: "See More",
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Atomic Habits",
    href: "/",
    description:
      "Atomic Habits by James Clear is a bestselling self-help book that focuses on how small, consistent changes can lead to remarkable results over time.",
    cta: "See More",
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: "To kill a mockingbird",
    href: "/",
    description:
      "To Kill a Mockingbird by Harper Lee is a classic novel set in the racially segregated town of Maycomb, Alabama, during the 1930s. ",
    cta: "See More",
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: "The alchemist",
    href: "/",
    description:
      "The Alchemist by Paulo Coelho is a philosophical novel that tells the story of Santiago, a young Andalusian shepherd who dreams of finding a hidden treasure near the Egyptian pyramids.",
    cta: "See More",
  },
];

const Feature = () => {
  return (
    <Section className="border-t my-12 mx-12 pt-12">
      <Container className="not-prose">
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl">
            <Balancer>
              About
            </Balancer>
          </h3>
          <h4 className="text-2xl font-light opacity-70">
            <Balancer>
              Book Hub is a platform or application designed to help users easily discover, read, organize, and share books. 
            </Balancer>
          </h4>

          <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-4">
            {featureText.map(
              ({ icon, title, description, href, cta }, index) => (
                <Link
                  href={`${href}`}
                  className="flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2 hover:mb-2"
                  key={index}
                >
                  <div className="grid gap-4">
                    {icon}
                    <h4 className="text-xl text-primary">{title}</h4>
                    <p className="text-base opacity-75">{description}</p>
                  </div>
                  {cta && (
                    <div className="flex h-fit items-center text-sm font-semibold">
                      <p>{cta}</p> <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </Link>
              ),
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Feature;
