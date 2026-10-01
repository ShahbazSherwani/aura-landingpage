"use client";

import { useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

import { faqCategories } from "@/lib/faq-content";

const allCategory = "All topics";
const allItems = faqCategories.flatMap((category) =>
  category.items.map((item) => ({ ...item, category: category.title }))
);

export function FullFAQ() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(allCategory);
  const normalizedQuery = query.trim().toLowerCase();
  const visibleCategories = faqCategories
    .filter((category) => activeCategory === allCategory || category.title === activeCategory)
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        const matchesQuery =
          !normalizedQuery ||
          [item.question, ...item.answer, ...(item.bullets ?? []), item.note ?? ""]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);
        return matchesQuery;
      }),
    }))
    .filter((category) => category.items.length > 0);
  const visibleCount = visibleCategories.reduce(
    (count, category) => count + category.items.length,
    0
  );

  return (
    <>
      <section className="container-px mx-auto max-w-350 pb-12 pt-28 sm:pb-16 sm:pt-36">
        <div className="mb-6 flex items-center gap-3 text-sm text-white/60">
          <span className="size-2 rounded-full bg-primary" />
          Aurora Vault / Frequently Asked Questions
        </div>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">
          The details behind <span className="text-primary">the trust.</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed sm:text-xl">
          Everything lenders need to know about vaults, Aura Points, AURA XP,
          returns, and governance. Start with the basics or search for the
          answer you need.
        </p>
      </section>

      <section className="container-px mx-auto max-w-350 pb-24">
        <div className="sticky top-0 z-30 -mx-5 border-y border-white/10 bg-background/90 px-5 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <label className="flex h-12 max-w-2xl items-center gap-3 rounded-md border border-white/15 bg-white/[0.04] px-4 focus-within:border-primary/70">
            <Search aria-hidden="true" className="size-5 shrink-0 text-primary" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions and answers"
              className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="inline-flex size-8 items-center justify-center text-white/60 transition-colors hover:text-primary"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            )}
          </label>
          <div className="faq-topic-scrollbar mt-4 flex gap-2 overflow-x-auto pb-2" aria-label="FAQ topics">
            {[allCategory, ...faqCategories.map((category) => category.title)].map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-md border px-3 py-2 text-sm transition-colors ${
                    activeCategory === category
                      ? "border-primary bg-primary text-background"
                      : "border-white/15 text-white/70 hover:border-primary/60 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>

        <p className="py-8 text-sm text-white/55" aria-live="polite">
          Showing {visibleCount} of {allItems.length} answers
        </p>

        {visibleCategories.length > 0 ? (
          <div className="space-y-12">
            {visibleCategories.map((category) => (
              <section key={category.title} aria-labelledby={`topic-${category.title}`}>
                <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-primary/40 pb-3">
                  <h2
                    id={`topic-${category.title}`}
                    className="text-xl font-bold text-primary sm:text-2xl"
                  >
                    {category.title}
                  </h2>
                  <span className="text-sm text-white/45">
                    {String(category.items.length).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  {category.items.map((item, index) => (
                    <details
                      key={item.question}
                      name="full-aurora-faq"
                      className="group border-b border-white/10"
                    >
                      <summary className="flex cursor-pointer list-none items-start gap-4 py-5 marker:hidden sm:gap-6 sm:py-6 [&::-webkit-details-marker]:hidden">
                        <span className="w-7 shrink-0 pt-1 font-mono text-xs text-primary/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="flex flex-1 items-start justify-between gap-5">
                          <span className="text-base font-medium leading-snug text-white sm:text-lg">
                            {item.question}
                          </span>
                          <ChevronDown
                            aria-hidden="true"
                            className="mt-1 size-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-180"
                          />
                        </span>
                      </summary>
                      <div className="pb-6 pl-11 sm:pl-13">
                        <div className="max-w-4xl space-y-4">
                          {item.answer.map((paragraph) => (
                            <p key={paragraph} className="text-base leading-relaxed sm:text-lg">
                              {paragraph}
                            </p>
                          ))}
                          {item.bullets && (
                            <ul className="space-y-2 border-l border-primary/40 pl-5 text-base leading-relaxed text-white/75 sm:text-lg">
                              {item.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                              ))}
                            </ul>
                          )}
                          {item.note && (
                            <p className="border-l-2 border-primary px-4 py-3 text-sm leading-relaxed text-white/65">
                              {item.note}
                            </p>
                          )}
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="border-y border-white/10 py-16 text-center">
            <h2 className="text-2xl font-medium text-white">No matching answers</h2>
            <p className="mt-3 text-base">Try a different search or choose another topic.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory(allCategory);
              }}
              className="mt-6 rounded-md border border-primary px-4 py-2 text-sm text-primary transition-colors hover:bg-primary hover:text-background"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}