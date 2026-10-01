import { Plus } from "lucide-react";
import Link from "next/link";

import { SectionPill } from "@/components/custom/SectionPill";
import SplitText from "@/components/reactbits/SplitText";

const faqItems = [
  {
    question: "Who runs Aurora Vault?",
    answer: [
      "The Aurora Vault Team consists of professionals with backgrounds across finance, investment management, risk management, technology, cybersecurity, blockchain/Web3 engineering, FinTech platform development, cloud infrastructure, data architecture, and business development.",
      "The technology function includes expertise in secure financial-platform architecture, blockchain and smart-contract integration, digital asset and transaction infrastructure, database and ledger systems, API integrations, identity and access management, DevSecOps, cybersecurity, cloud infrastructure, platform monitoring, disaster recovery, and scalable application development.",
      "Technical responsibilities include maintaining platform security and availability, protecting transaction and participant data, supporting Aura Points and AURA XP infrastructure, maintaining auditable financial and transactional records, managing third-party and blockchain integrations, and ensuring that the platform can scale reliably as lending activity increases.",
      "Each vault is assigned to a designated team member responsible for its management, monitoring, and operational coordination. A team member may oversee multiple vaults.",
    ],
  },
  {
    question:
      "How does Aurora Vault protect its technology infrastructure and participant assets?",
    answer: [
      "Aurora Vault follows a security-by-design approach across its application, infrastructure, blockchain integrations, and financial transaction systems. Technical controls may include role-based access controls, multi-factor authentication, encryption, secure key and secrets management, transaction audit trails, environment segregation, automated monitoring and alerting, vulnerability management, backup and disaster-recovery procedures, and independent security reviews where appropriate.",
      "Blockchain and digital-asset components are designed with controlled permissions and transaction safeguards, while platform activity is logged and monitored to support operational security, financial reconciliation, investigation, and audit requirements.",
      "Security controls and infrastructure practices are reviewed and enhanced as the platform, transaction volumes, and regulatory requirements evolve.",
    ],
  },
  {
    question:
      "How does Aurora Vault ensure the accuracy and integrity of transactions and balances?",
    answer: [
      "Aurora Vault maintains auditable transaction records across USDT contributions, Aura Points issuance and redemption, AURA XP conversions, vault allocations, returns, and withdrawals. The platform uses controlled transaction workflows, validation checks, reconciliation processes, access controls, and system logging to reduce the risk of duplicate, unauthorized, or inconsistent transactions. Where appropriate, automated monitoring and exception handling are used to identify discrepancies for review.",
    ],
  },
  {
    question:
      "What happens if the Aurora Vault platform experiences a technical outage or system failure?",
    answer: [
      "Aurora Vault is designed with business continuity and recovery measures intended to protect platform data and maintain operational resilience. These may include regular backups, redundant infrastructure, monitoring and alerting, controlled recovery procedures, disaster-recovery planning, and documented incident-response processes. Critical transaction records and participant balances are preserved so that platform operations can be restored accurately following a disruption.",
    ],
  },
];

export function FAQ() {
  return (
    <section id="faq" className="w-full py-20 sm:py-28">
      <div className="container-px mx-auto max-w-350">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="flex flex-col items-start gap-5 lg:sticky lg:top-32 lg:h-fit">
          <SectionPill label="FAQ" />
          <SplitText text="Clear Answers. Built-In Trust." tag="h2" />
          <p className="max-w-lg">
            Learn how Aurora Vault is managed, how transactions are protected,
            and what happens when the unexpected occurs.
          </p>
          <span className="mt-2 text-sm font-bold uppercase text-primary">
            {String(faqItems.length).padStart(2, "0")} answers
          </span>
          </div>

          <div className="border-t border-white/10">
          {faqItems.map((item, index) => (
            <details
              key={item.question}
              className="group border-b border-white/10"
              name="aurora-faq"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-start gap-4 py-6 marker:hidden sm:gap-6 sm:py-7 [&::-webkit-details-marker]:hidden">
                <span className="pt-1 font-mono text-xs text-primary/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-1 items-start justify-between gap-5">
                  <span className="text-lg font-medium leading-snug text-white sm:text-xl">
                    {item.question}
                  </span>
                  <Plus
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45"
                  />
                </span>
              </summary>
              <div className="pb-7 pl-9 sm:pl-12">
                <div className="max-w-3xl space-y-4">
                  {item.answer.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-relaxed sm:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </details>
          ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base">
            Looking for more detail? Explore the full guide to lending, vaults,
            Aura Points, returns, and governance.
          </p>
          <Link
            href="/faq"
            className="inline-flex shrink-0 items-center gap-2 rounded-md border border-primary/60 px-4 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-background"
          >
            Explore all FAQs <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}