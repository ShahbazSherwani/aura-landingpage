import { WhoWeAreGraphic } from "@/components/custom/WhoWeAreGraphic";
import { SectionPill } from "@/components/custom/SectionPill";
import SplitText from "../reactbits/SplitText";

export function WhoWeAre() {
  return (
    <section id="about" className="w-full py-20 sm:py-28 bg-red">
      <div className="container-px mx-auto max-w-350">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid lg:grid-cols-[5fr_5fr] lg:items-center lg:gap-16">
          <WhoWeAreGraphic className="w-full max-w-md lg:max-w-none" />

          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <SectionPill label="Who Are We" />
              <SplitText text="Building Fair Access to Capital" tag="h2" />
            </div>
            <div className="mt-4 flex flex-col gap-2.5">
              <p>
                Aurora was built on a simple belief: funding shouldn't be a
                privilege reserved for the well-connected. Across every market
                we serve, small and growing businesses have the drive, the
                discipline, and the demand. What they don't always have is
                access to capital that understands them.
              </p>
              <p>
                Aurora Vault is the platform that bridges that gap. Lenders
                provide capital directly to Aurora Vault, and our team deploys
                those funds — within the mandate of each lender's selected vault
                — into carefully evaluated real-world lending and investment
                opportunities. Every step is structured, tracked, and built for
                accountability.
              </p>
              <p>
                We're not here to reinvent finance overnight. We're here to make
                it work better, for the businesses that need it, and the people
                willing to back them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
