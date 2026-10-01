export interface FAQEntry {
  question: string;
  answer: string[];
  bullets?: string[];
  note?: string;
}

export interface FAQCategory {
  title: string;
  items: FAQEntry[];
}

export const faqCategories: FAQCategory[] = [
  {
    title: "Overview",
    items: [
      {
        question: "What is Aurora Vault?",
        answer: [
          "Aurora Vault is a trust-based decentralized lending platform. Lenders provide capital directly to the Aurora Vault Team through structured lending arrangements, and the Aurora Vault Team deploys those borrowed funds into carefully evaluated real-world lending and investment opportunities, in line with the vault mandate each lender selects.",
        ],
      },
      {
        question: "Is Aurora Vault a peer-to-peer lending platform?",
        answer: [
          "No. Aurora Vault does not directly connect individual lenders with individual borrowers. Instead, Aurora Vault itself borrows funds from participating lenders and acts as the counterparty, then deploys that capital into real-world opportunities on the lender's behalf, according to the selected vault's mandate.",
        ],
      },
      {
        question: "What does “trust-based” mean in Aurora Vault's model?",
        answer: [
          "It means Aurora Vault aims to build confidence through transparent mechanisms, defined rules, and consistent execution — controlled token issuance, clear vault structures, and disciplined capital management — rather than relying only on the public identity of individual team members.",
        ],
      },
      {
        question: "What are the two vault categories Aurora Vault offers?",
        answer: [
          "Aurora Vault offers SecureNests, which are backed by collateral, guarantees, or other forms of security and prioritize capital preservation, and TrustBoxes, which fund businesses or opportunities without collateral or guarantees and are designed for lenders seeking higher potential returns in exchange for accepting greater risk.",
        ],
      },
      {
        question: "What kinds of opportunities does Aurora Vault deploy funds into?",
        answer: [
          "Borrowed funds may be deployed into business lending, working capital financing, trade finance, project financing, structured credit, secured lending, strategic private investments, and other approved real-world financial opportunities, depending on the vault selected.",
        ],
      },
    ],
  },
  {
    title: "How It Works",
    items: [
      {
        question: "How do I start lending through Aurora Vault?",
        answer: [
          "You register on the Aurora Vault platform, contribute USDT (which is converted into Aura Points), review the available vaults, and select the one that matches your investment objectives and risk appetite. You then advance funds to Aurora Vault under a contractual lending agreement.",
        ],
      },
      {
        question: "What happens to my funds after I lend them?",
        answer: [
          "Once your funds are advanced to Aurora Vault, the Aurora Vault Team assumes responsibility for allocating and managing that capital exclusively within the investment mandate of your chosen vault. The team monitors, manages, and administers the underlying investments throughout their lifecycle, and returns from those investments are used to meet Aurora Vault's contractual obligations to lenders.",
        ],
      },
      {
        question: "How do I choose which vault my funds go into?",
        answer: [
          "Each vault has its own defined investment mandate, risk profile, and financing strategy. You select the vault whose objectives best align with your own risk appetite and investment goals before lending; this determines how your capital will be deployed.",
        ],
      },
      {
        question: "Who manages the underlying investments?",
        answer: [
          "The Aurora Vault Team is solely responsible for all investment decisions, portfolio management, borrower monitoring, and capital deployment within the parameters of the selected vault. This includes:",
        ],
        bullets: [
          "Sourcing investment opportunities",
          "Performing due diligence and credit underwriting",
          "Financial analysis and portfolio construction",
          "Ongoing monitoring and risk management",
          "Recovery and restructuring activities where necessary",
        ],
      },
      {
        question: "Can I change my vault selection after lending?",
        answer: [
          "Vault selection is made prior to lending funds, and once funds have been lent, Aurora Vault manages that capital solely in accordance with the mandate of the vault originally selected. For specifics on moving between vaults or exit terms, refer to your lending agreement or contact the Aurora Vault Team directly.",
        ],
      },
    ],
  },
  {
    title: "Vaults & Risk",
    items: [
      {
        question: "What is a SecureNest?",
        answer: [
          "A SecureNest is a vault category designed for lenders seeking greater capital protection. Funds are deployed into opportunities supported by collateral, guarantees, or other legally enforceable security, such as collateralized business loans, asset-backed financing, property-backed lending, guaranteed commercial facilities, and secured trade finance. SecureNests are intended to provide relatively stable returns while emphasizing prudent risk management and capital preservation.",
        ],
      },
      {
        question: "What is a TrustBox?",
        answer: [
          "A TrustBox is a vault category for lenders willing to accept a higher level of investment risk in pursuit of enhanced long-term returns. Funds are deployed into opportunities that do not benefit from collateral or third-party guarantees, such as unsecured corporate lending, growth financing, venture debt, equity financing, and private credit. TrustBoxes are intended for participants with a higher risk tolerance and a longer investment horizon.",
        ],
      },
      {
        question: "Which vault type is right for me?",
        answer: [
          "That depends on your own risk appetite and investment objectives. SecureNests suit lenders who prioritize capital preservation and are comfortable with more moderate returns. TrustBoxes suit lenders who are comfortable with greater risk — including the risk of loss — in exchange for the potential for higher returns.",
        ],
        note: "This is general information, not investment advice. Consider your own financial situation, or speak with a qualified advisor, before choosing a vault.",
      },
      {
        question: "Does a SecureNest guarantee I won't lose money?",
        answer: [
          "No. SecureNests are backed by collateral, guarantees, or other security arrangements and are designed to prioritize capital preservation, but no vault, including SecureNests, is described as risk-free or capital-guaranteed. Underlying security arrangements reduce, but do not eliminate, risk.",
        ],
      },
      {
        question: "What happens if a TrustBox investment underperforms?",
        answer: [
          "The Aurora Vault Team's responsibilities include ongoing monitoring, risk management, and recovery or restructuring activities where necessary. Because TrustBoxes are unsecured by design, they carry a higher level of risk, and any liquidation or restructuring decision affecting an underlying opportunity would consider applicable contractual obligations, legal requirements, and the practical ability to execute such actions.",
        ],
      },
    ],
  },
  {
    title: "Aura Points & AURA XP",
    items: [
      {
        question: "What are Aura Points (AURA)?",
        answer: [
          "Aura Points (AURA) is the native blockchain-based token of the Aurora Vault ecosystem. They act as a controlled participation mechanism, regulating how much capital can enter the platform and be allocated into approved vault opportunities. Aura Points are issued only when there is a corresponding requirement to support approved vault funding.",
        ],
      },
      {
        question: "What is AURA XP?",
        answer: [
          "AURA XP is Aurora Vault's native platform unit, an internal valuation and accounting unit, not a blockchain-based token, and not a standalone transferable asset outside the platform. AURA XP is used for vault funding requirements, allocation into SecureNests and TrustBoxes, participant positions, opportunity valuation, pricing, income calculation, performance measurement, and platform reporting.",
        ],
      },
      {
        question: "What's the difference between Aura Points and AURA XP?",
        answer: [
          "Aura Points (AURA) is the blockchain-based participation token you receive when you contribute USDT. AURA XP is the internal unit used to value and account for your position once it's allocated into a specific vault opportunity. The flow is:",
          "AURA XP can only be created by converting Aura Points — it has no independent issuance mechanism.",
        ],
        bullets: ["USDT → Aura Points (AURA) → AURA XP → Selected Vault"],
      },
      {
        question: "What is the USDT-to-Aura Points conversion rate?",
        answer: [
          "The conversion is fixed at 1 USDT = 1 Aura Point (AURA). This fixed rate applies both when you first contribute USDT and whenever Aura Points are converted back into USDT through the Aurora Vault platform.",
        ],
      },
      {
        question: "How is the Aura Points-to-AURA XP rate determined?",
        answer: [
          "Unlike the fixed USDT-to-Aura Points rate, the Aura Points-to-AURA XP conversion rate is variable. It's set based on the prevailing exchange rate applicable to the specific real-world opportunity, taking into account:",
        ],
        bullets: [
          "The currency denomination of the underlying opportunity",
          "Prevailing exchange rates",
          "The valuation of the opportunity",
          "Applicable vault parameters",
        ],
      },
      {
        question: "Can I create AURA XP directly, without Aura Points?",
        answer: [
          "No. AURA XP cannot be independently created, and participants cannot directly acquire AURA XP without first holding Aura Points. Aura Points must be converted into AURA XP to participate in a specific vault opportunity.",
        ],
      },
      {
        question: "Is there a maximum supply of Aura Points?",
        answer: [
          "There's no fixed, predetermined maximum supply. Instead, supply is demand-driven: the total supply of Aura Points is designed to never exceed the amount required to generate the AURA XP needed to fully fund all active and approved vaults. Supply is tied to the number of available vault opportunities, each vault's funding requirement, and the AURA XP capacity each vault needs.",
        ],
      },
      {
        question: "Can Aura Points be created for speculative purposes?",
        answer: [
          "No. Per Aurora Vault's stated tokenomics principles, no Aura Points are created solely for speculative purposes, and no additional Aura Points are released once approved vaults have reached their required funding capacity, or where there is no demand for approved vault opportunities.",
        ],
      },
      {
        question: "Can I trade Aura Points with other participants?",
        answer: [
          "Yes. Aura Points may be traded between participants in a secondary market at mutually agreed prices. Because this trading reflects independent market demand, the secondary market value of Aura Points may differ from the fixed 1 USDT = 1 Aura Point conversion rate available directly through the Aurora Vault platform.",
        ],
      },
      {
        question: "Can I convert Aura Points back to USDT at any time?",
        answer: [
          "Yes. Regardless of any secondary market activity, Aura Points can be converted through the Aurora Vault platform itself at the fixed rate of 1 USDT = 1 Aura Point.",
        ],
      },
      {
        question: "Do Aura Points or AURA XP represent ownership or equity in Aurora Vault?",
        answer: [
          "No. Neither Aura Points nor AURA XP represent equity ownership in Aurora Vault, or ownership of the underlying businesses that receive financing. All participation is structured solely through the contractual lending arrangement between you and Aurora Vault.",
        ],
      },
    ],
  },
  {
    title: "Returns & Rights",
    items: [
      {
        question: "How do I earn returns on Aurora Vault?",
        answer: [
          "Returns are calculated based on your AURA XP allocation within your selected vault, and may come from:",
        ],
        bullets: [
          "Interest income earned from lending activities",
          "Yield generated from the underlying lending instrument",
          "Appreciation or changes in the price of vault participation",
          "Additional returns from approved investment opportunities, at the discretion of the Aurora Vault Team",
        ],
      },
      {
        question: "Are returns guaranteed?",
        answer: [
          "No. Additional returns from approved investment opportunities are provided at the discretion of the Aurora Vault Team and are not guaranteed. All lending and investment activity carries risk, and the degree of that risk varies by vault type.",
        ],
        note: "Past or projected performance is never a promise of future results. Only lend what you can afford to have tied up or, in the case of TrustBoxes, potentially lose.",
      },
      {
        question: "What determines how much I earn?",
        answer: [
          "The amount of income or value appreciation attributable to you depends on the performance of the vault you selected and the terms and conditions of the underlying lending or investment opportunity your capital is deployed into.",
        ],
      },
      {
        question: "What legal rights do I have as a lender?",
        answer: [
          "Your rights arise solely from the contractual lending arrangement you enter into with Aurora Vault. Participation does not grant you any ownership interest in Aurora Vault or in the businesses receiving financing; it establishes a borrower–lender relationship between you and Aurora Vault.",
        ],
      },
    ],
  },
  {
    title: "Team & Trust",
    items: [
      {
        question: "Who runs Aurora Vault?",
        answer: [
          "The Aurora Vault Team consists of professionals with backgrounds across finance, investment management, technology, risk management, and business development. Each vault is assigned to a designated team member responsible for its management, monitoring, and operational coordination; a team member may oversee multiple vaults.",
        ],
      },
      {
        question: "Why does the team remain anonymous?",
        answer: [
          "Aurora Vault's model draws on the idea, referencing Bitcoin's pseudonymous creator, Satoshi Nakamoto, that trust in a financial ecosystem can be built through transparent mechanisms, robust frameworks, and consistent execution, rather than relying solely on individual identity. Team members may initially operate through anonymous profiles that still disclose relevant professional background and expertise.",
        ],
      },
      {
        question: "When will team members be revealed?",
        answer: [
          "Disclosure is progressive and tied to activity: once a designated team member's cumulative total lent value across all vaults under their responsibility reaches US$1 million, that team member is publicly revealed to the Aurora Vault community.",
        ],
      },
      {
        question: "Does anonymity affect accountability?",
        answer: [
          "Aurora Vault's position is that accountability comes from the platform's structure, controlled token issuance, transparent conversion mechanisms, defined vault structures, and disciplined management of borrowed funds, with identity disclosure increasing progressively as individual team members demonstrate responsibility through the lending activity they manage.",
        ],
      },
    ],
  },
  {
    title: "Governance",
    items: [
      {
        question: "What is the Aurora Vault DAO?",
        answer: [
          "The Aurora Vault DAO is the platform's governance mechanism, giving Aura Points holders a way to participate in decisions about the ecosystem's direction, from new lending opportunities to changes affecting existing vaults.",
        ],
      },
      {
        question: "What can I do with my Aura Points in governance?",
        answer: ["As an Aura Points holder, you may use your holdings to:"],
        bullets: [
          "Propose new real-world lending or investment use cases",
          "Vote on new vault opportunities",
          "Vote on the continuation, restructuring, or liquidation of existing use cases",
          "Give feedback on ecosystem improvements and platform enhancements",
          "Take part in other community-driven decisions",
        ],
      },
      {
        question: "How does the proposal and voting process work?",
        answer: [
          "It follows three steps: Submission, where Aura Points holders put forward proposals; Community review, where the community evaluates benefits, risks, impact, and alignment with Aurora Vault's principles; and Voting, which results in a proposal proceeding to implementation, requiring modification, being rejected, or requiring further review.",
        ],
      },
      {
        question: "What governance principles does Aurora Vault follow?",
        answer: ["Governance is built around transparency, community participation, responsible decision-making, and alignment of interests:"],
        bullets: [
          "Transparency: decisions made through visible proposal and voting mechanisms",
          "Community participation: Aura Points holders help shape ecosystem direction",
          "Responsible decision-making: weighing risk, sustainability, and long-term value",
          "Alignment of interests: contributors help shape the platform's future",
        ],
      },
    ],
  },
  {
    title: "Legal & Reporting",
    items: [
      {
        question: "What information will Aurora Vault report to lenders?",
        answer: [
          "Reporting may cover vault objectives, approved investment mandates, credit underwriting, portfolio allocation and construction, deployment status, risk management, recovery or restructuring activities where necessary, and general reporting to participating lenders.",
        ],
      },
      {
        question: "Is confidential borrower information disclosed to lenders?",
        answer: [
          "Not always. Confidential information relating to underlying borrowers or commercial counterparties may be withheld from lenders where required by contractual obligations or applicable law.",
        ],
      },
      {
        question: "Where can I read more details?",
        answer: [
          "This FAQ summarizes the Aurora Vault whitepaper in plain language. For the full legal and structural detail, refer to the whitepaper itself, or reach out to the Aurora Vault Team directly.",
        ],
      },
    ],
  },
];