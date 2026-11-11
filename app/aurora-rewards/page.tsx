import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import "./rewards.css";

export const metadata: Metadata = {
  title: "Referral & Rewards Program | Aurora XP",
  description: "Discover Aurora XP rewards: a 1,000 AP welcome grant, 100 AP per qualified referral, and a recurring 5% earnings share funded by management.",
  alternates: { canonical: "/aurora-rewards" },
};

export default function RewardsPage() {
  const appUrl = process.env.NEXT_PUBLIC_AURAVAULT_APP_URL || "https://app.auroraxp.io/";
  return <>
    <Header />
    <main className="aurora-rewards">
      <svg width="0" height="0" aria-hidden="true" className="absolute"><defs><linearGradient id="rewards-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2ad9b7" /><stop offset="1" stopColor="#8b6cff" /></linearGradient></defs></svg>
      <header className="hero" id="top">
  <div className="wrap">
    <div className="pill"><i />Referral &amp; Rewards Program</div>
    <h1>Invite Others<span className="l2">Grow Together</span></h1>
    <p className="lead">Aurora XP rewards the people who help build a fairer capital ecosystem. Start with a welcome grant of Aura Points, earn for every person you bring in, and share in their success without taking anything from it.</p>
    <div className="ctas">
      <a className="btn" href="#rewards">See How It Works</a>
      <a className="btn ghost" href="#example">View an Example</a>
    </div>

    <div className="stats">
      <div className="stat"><div className="v">1,000<small>AP</small></div><div className="k">Welcome grant on registration</div></div>
      <div className="stat"><div className="v">100<small>AP</small></div><div className="k">Per referral who joins a fully funded vault</div></div>
      <div className="stat"><div className="v">5<small>%</small></div><div className="k">Of your referrals' earnings, paid alongside theirs</div></div>
      <div className="stat"><div className="v">0<small>%</small></div><div className="k">Deducted from the people you refer</div></div>
    </div>
  </div>
</header>


<section id="rewards">
  <div className="wrap">
    <div className="sec-head">
      <div className="eyebrow">The Program</div>
      <h2>Four Ways Your <span className="grad">Participation Pays</span></h2>
      <p>Every reward is denominated in Aura Points (AP), the unit that tracks your participation across Aurora XP.</p>
    </div>

    <div className="grid4">
      <div className="card">
        <span className="num">01</span>
        <svg className="icon" viewBox="0 0 48 48" fill="none" stroke="url(#rewards-gradient)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="17" width="34" height="24" rx="3"/><path d="M5 17h38v-6H5z"/><path d="M24 11v30"/><path d="M24 11c-3-6-10-6-10-1s10 1 10 1Zm0 0c3-6 10-6 10-1s-10 1-10 1Z"/></svg>
        <h3>Welcome Grant</h3>
        <p>Every new member receives <b style={{"color":"#fff"}}>1,000 AP</b> the moment their registration is complete — capital you can put to work from day one.</p>
        <span className="tag">Granted on registration</span>
      </div>

      <div className="card">
        <span className="num">02</span>
        <svg className="icon" viewBox="0 0 48 48" fill="none" stroke="url(#rewards-gradient)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="9" width="36" height="30" rx="3"/><circle cx="24" cy="24" r="7"/><path d="M24 17v-2M24 33v-2M31 24h2M15 24h2"/><path d="M10 39v3M38 39v3"/></svg>
        <h3>Fund First, Withdraw After</h3>
        <p>The welcome grant is withdrawable only after it has been used to fund a vault. Once that vault's investment returns, the AP that comes back to you is free to withdraw.</p>
        <span className="tag">Unlocks on vault return</span>
      </div>

      <div className="card">
        <span className="num">03</span>
        <svg className="icon" viewBox="0 0 48 48" fill="none" stroke="url(#rewards-gradient)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="17" cy="16" r="6"/><path d="M6 38c0-6 5-11 11-11s11 5 11 11"/><path d="M33 18v12M27 24h12"/></svg>
        <h3>Referral Reward</h3>
        <p>Earn <b style={{"color":"#fff"}}>100 AP</b> for each person you refer who participates in a vault that reaches full funding.</p>
        <span className="tag">Per qualified referral</span>
      </div>

      <div className="card">
        <span className="num">04</span>
        <svg className="icon" viewBox="0 0 48 48" fill="none" stroke="url(#rewards-gradient)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 36 18 24l7 7 16-16"/><path d="M32 15h9v9"/><path d="M6 42h36"/></svg>
        <h3>5% Earnings Share</h3>
        <p>Receive <b style={{"color":"#fff"}}>5% of your referrals' income</b>, credited at the same time they receive theirs. It is paid from management's share — never deducted from the people you refer.</p>
        <span className="tag">Recurring · paid simultaneously</span>
      </div>
    </div>
  </div>
</section>

<section id="lifecycle" style={{"paddingTop":"40px"}}>
  <div className="wrap">
    <div className="sec-head center">
      <div className="eyebrow">Welcome AP</div>
      <h2>From Grant to <span className="grad">Withdrawal</span></h2>
      <p>Your 1,000 AP is built to be deployed, not parked. Here is the path it follows.</p>
    </div>

    <div className="flow">
      <div className="step"><div className="dot">1</div><div><h4>Register</h4><p>Create your Aurora XP account.</p></div></div>
      <div className="step"><div className="dot">2</div><div><h4>Receive 1,000 AP</h4><p>Credited to your balance automatically.</p></div></div>
      <div className="step lock"><div className="dot">3</div><div><h4>Fund a Vault</h4><p>Allocate the AP to a SecureNest or TrustBox vault.</p></div></div>
      <div className="step lock"><div className="dot">4</div><div><h4>Vault Returns</h4><p>The funded opportunity completes and returns are distributed.</p></div></div>
      <div className="step"><div className="dot">5</div><div><h4>Withdraw</h4><p>Returned AP is now available to withdraw.</p></div></div>
    </div>

    <div className="note">
      <svg viewBox="0 0 24 24" fill="none" stroke="#a993ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
      <p><b style={{"color":"#fff"}}>Not withdrawable while idle.</b> Welcome AP that has not yet been used to fund a vault — or is still committed to a vault that has not returned — cannot be withdrawn. The grant is shared income meant to be put to work, which is why it unlocks once it has been invested and returned. <a href="#no-catch" style={{"color":"#2ad9b7"}}>Why this matters →</a></p>
    </div>
  </div>
</section>

<section id="referrals">
  <div className="wrap">
    <div className="sec-head">
      <div className="eyebrow">Referral Rewards</div>
      <h2>Rewarded Once, <span className="grad">Then Again and Again</span></h2>
      <p>Bringing someone into Aurora XP earns you a one-time reward when they commit, and a continuing share every time they earn.</p>
    </div>

    <div className="split">
      <div className="card">
        <div className="eyebrow" style={{"marginBottom":"10px"}}>One-time</div>
        <div className="big">100<small>AP</small></div>
        <p style={{"marginTop":"12px"}}>For every individual you refer who participates in a fully funded vault.</p>
        <ul>
          <li>Triggered when the vault your referral joined reaches full funding</li>
          <li>Earned separately for each referred individual who qualifies</li>
          <li>Separate from, and in addition to, the 5% earnings share</li>
        </ul>
      </div>
      <div className="card">
        <div className="eyebrow" style={{"marginBottom":"10px"}}>Recurring</div>
        <div className="big">5<small>%</small></div>
        <p style={{"marginTop":"12px"}}>Of the income or earnings your referred participants receive.</p>
        <ul>
          <li>Credited at the same moment your referral receives their earnings</li>
          <li>Funded entirely from management's portion of the income</li>
          <li>Your referrals keep 100% of what they would have earned</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section style={{"paddingTop":"40px"}}>
  <div className="wrap source">
    <div>
      <div className="eyebrow">Where the 5% Comes From</div>
      <h2 style={{"fontSize":"clamp(30px,3.8vw,42px)","fontWeight":"500","lineHeight":"1.12"}}>Paid by Management.<br /><span className="grad">Never by Your Referrals.</span></h2>
      <ul className="checks">
        <li><svg viewBox="0 0 24 24" fill="none" stroke="#2ad9b7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span>Your referral's earnings are calculated and paid in full, exactly as they would be without a referrer.</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="#2ad9b7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span>The 5% you receive is carved from Aurora XP management's share of the income.</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="#2ad9b7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span>Both payments are released together, so you share in their returns in real time.</span></li>
      </ul>
    </div>

    <div className="diagram">
      <div className="bar-label"><span>Income generated by your referral's vault position</span></div>
      <div className="bar">
        <div className="seg part">Participant's share<br />paid in full</div>
        <div className="seg mgmt">Management's share</div>
      </div>
      <div className="arrow-row"><div></div><div>
        <svg width="24" height="30" viewBox="0 0 24 30" fill="none" stroke="#8b6cff" strokeWidth="2" strokeLinecap="round"><path d="M12 2v24M5 19l7 7 7-7"/></svg>
      </div></div>
      <div className="split-mgmt">
        <div className="chip"><b>Retained</b>by management</div>
        <div className="chip hl"><b>5% to you</b>of your referral's earnings</div>
      </div>
      <p className="cap">Illustrative only — segment widths are not to scale and do not represent actual income splits.</p>
    </div>
  </div>
</section>

<section id="no-catch">
  <div className="wrap">
    <div className="sec-head">
      <div className="eyebrow">Why There's No Hidden Catch</div>
      <h2>Marketing Budget, <span className="grad">Returned to Participants</span></h2>
      <p>Most platforms spend heavily on advertising, agencies and marketing partners to grow. Aurora XP takes a different route: the money that would have gone to outside marketers is shared with the people who actually take part in the platform.</p>
    </div>

    <div className="compare">
      <div className="model old">
        <div className="eyebrow">The usual model</div>
        <h3>Growth is bought from outsiders</h3>
        <div className="flowline">
          <div className="fl"><b>Management income</b></div>
          <div className="fa">↓</div>
          <div className="fl">Marketing budget</div>
          <div className="fa">↓</div>
          <div className="fl end">Ad platforms, agencies &amp; marketing partners</div>
        </div>
      </div>
      <div className="vs"><span>vs</span></div>
      <div className="model new">
        <div className="eyebrow">The Aurora XP model</div>
        <h3>Growth is shared with participants</h3>
        <div className="flowline">
          <div className="fl"><b>Management income</b></div>
          <div className="fa">↓</div>
          <div className="fl">Portion set aside for growth</div>
          <div className="fa">↓</div>
          <div className="fl end"><b>Welcome AP, referral rewards &amp; 5% share to participants</b></div>
        </div>
      </div>
    </div>

    <div className="grid3">
      <div className="card">
        <svg className="icon" viewBox="0 0 48 48" fill="none" stroke="url(#rewards-gradient)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 30c6-2 10 2 16 0s10-6 16-4"/><path d="M8 22c6-2 10 2 16 0s10-6 16-4"/><circle cx="24" cy="10" r="4"/><path d="M24 38v4"/></svg>
        <h3>Rewards come from income, not from you</h3>
        <p>Every reward is a portion of management's own income being shared back. Nothing is taken from participants' principal or earnings to fund it.</p>
      </div>
      <div className="card">
        <svg className="icon" viewBox="0 0 48 48" fill="none" stroke="url(#rewards-gradient)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 20 24 10l10 10"/><path d="M24 10v22"/><rect x="8" y="32" width="32" height="8" rx="2"/></svg>
        <h3>Paid in exchange for real activity</h3>
        <p>Rewards are tied to income-generating activity: funding vaults and bringing in participants who fund vaults. That activity is what generates the income being shared.</p>
      </div>
      <div className="card">
        <svg className="icon" viewBox="0 0 48 48" fill="none" stroke="url(#rewards-gradient)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="10" y="20" width="28" height="20" rx="3"/><path d="M16 20v-5a8 8 0 0 1 16 0"/><circle cx="24" cy="30" r="3"/></svg>
        <h3>Why the 1,000 AP is invested first</h3>
        <p>The welcome grant is not a giveaway to be cashed out. It is shared income meant to work: once it funds a vault, it generates activity, and when that vault returns, the AP becomes yours to withdraw.</p>
      </div>
    </div>

    <div className="quote">In short: instead of paying outside marketers, management <span>shares a portion of its income</span> with the participants who help the platform grow.</div>
  </div>
</section>

<section id="example">
  <div className="wrap">
    <div className="sec-head">
      <div className="eyebrow">Worked Example</div>
      <h2>What It Looks Like <span className="grad">in Practice</span></h2>
      <p>You register and refer three people. Each joins a vault that becomes fully funded, and each later receives 800 AP in earnings from that vault.</p>
    </div>

    <div className="table-scroll"><table className="table">
      <thead><tr><th>Event</th><th>Basis</th><th>You receive</th></tr></thead>
      <tbody>
        <tr><td>You register</td><td>Welcome grant</td><td className="amt">1,000 AP</td></tr>
        <tr><td>3 referrals join fully funded vaults</td><td>3 × 100 AP</td><td className="amt">300 AP</td></tr>
        <tr><td>Referrals each receive 800 AP in earnings</td><td>5% × 800 AP × 3, from management's share</td><td className="amt">120 AP</td></tr>
        <tr className="total"><td>Total rewards</td><td></td><td className="amt t">1,420 AP</td></tr>
      </tbody>
    </table></div>
    <p className="ex-note">Each referral still receives their full 800 AP. The welcome grant becomes withdrawable once it has funded a vault and that vault has returned. Figures are hypothetical and for illustration only; they are not a projection of returns.</p>
  </div>
</section>

<section id="faq" style={{"paddingTop":"40px"}}>
  <div className="wrap">
    <div className="sec-head center">
      <div className="eyebrow">FAQ</div>
      <h2>Clear Answers. <span className="grad">Built-In Trust.</span></h2>
    </div>
    <div className="faq">
      <details open><summary>When do I receive the 1,000 AP?</summary><p>Immediately upon completing registration. It is credited to your Aurora XP balance automatically.</p></details>
      <details open><summary>Can I withdraw the welcome AP right away?</summary><p>No. It must first be used to fund a vault. When that vault's investment returns, the AP returned to you can be withdrawn.</p></details>
      <details open><summary>Is there a catch?</summary><p>No hidden one. The rewards are a portion of management's income that would otherwise be spent on outside marketing partners. Instead, it is shared with participants in exchange for income-generating activity, and nothing is deducted from anyone's principal or earnings.</p></details>
      <details open><summary>Why must the 1,000 AP be invested before withdrawal?</summary><p>Because the grant comes from shared income tied to platform activity. Funding a vault puts it to work; once that vault returns, the AP can be withdrawn.</p></details>
      <details><summary>What counts as a qualified referral?</summary><p>An individual you referred who participates in a vault that becomes fully funded. You receive 100 AP for each such individual.</p></details>
      <details><summary>Does my referral earn less because of me?</summary><p>No. The 5% share is paid from management's portion of the income. Your referral receives exactly what they would have received without a referrer.</p></details>
      <details><summary>When is the 5% paid?</summary><p>At the same time your referred participant receives their income or earnings, so both payments arrive together.</p></details>
      <details><summary>Is there a limit on referrals?</summary><p>The program rewards each qualified referred individual. Any limits or eligibility conditions are set out in the full program terms.</p></details>
    </div>
  </div>
</section>

<section id="cta" style={{"paddingTop":"20px"}}>
  <div className="wrap">
    <div className="cta">
      <div className="eyebrow">Start Earning</div>
      <h2>Invite. Fund. Earn.</h2>
      <p>Register to receive your 1,000 AP welcome grant, then share your referral link to start building rewards alongside the people you bring in.</p>
      <a className="btn" href={appUrl}>Get Started</a>
    </div>
  </div>
</section>



      <div className="wrap disclaimer"><p>Aura Points (AP) are participation units within the Aurora XP platform. Rewards described here are subject to the full Referral &amp; Rewards Program terms, eligibility checks and applicable laws, and may be amended or withdrawn. Vault participation involves risk, including possible loss of capital; returns are not guaranteed. Nothing on this page is investment advice.</p></div>
    </main>
    <Footer />
  </>;
}
