import Link from "next/link";
import { Discord } from "@/components/svgs/discord";
import { Facebook } from "@/components/svgs/facebook";
import { XformerlyTwitter } from "@/components/svgs/x";

const footerColumns = [
  {
    title: "Site Links",
    links: ["Who We Are", "How It Works", "Why Aurora"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms"],
  },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/auroraxp.official", Icon: Facebook },
  { label: "X", href: "https://x.com/auroraxp_", Icon: XformerlyTwitter },
  { label: "Discord", href: "https://discord.gg/cr7sxt6pk", Icon: Discord }
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-black">
      <div className="container-px mx-auto max-w-350 py-12">
        <div className="grid grid-cols-2 gap-8 md:flex md:justify-between md:gap-8">
          <div className="col-span-2 sm:col-span-1">
            <Link href="#top" className="text-3xl text-primary font-black tracking-tight md:text-2xl lg:text-3xl">
              AURORA
            </Link>
            <p className="mt-2 text-sm">
              A Trust-Based Financial Ecosystem Built for the Real World.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-medium">{column.title}</h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm transition-colors hover:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-medium">Follow Us</h3>
            <ul className="mt-3 flex gap-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Aurora on ${label}`}
                    className="inline-block transition-opacity hover:opacity-80"
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-sm">
          © {new Date().getFullYear()} Aurora. All rights reserved.
        </p>
      </div>
    </footer>
  );
}