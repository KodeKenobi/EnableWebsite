import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import handbookSource from "../../../README.md?raw";
import { learnHandbookMarkdownComponents } from "./learnHandbookMarkdown.tsx";

export default function LearnHandbookPanel() {
  return (
    <div className="mx-auto w-full max-w-[min(820px,calc(100vw-1.5rem))] pb-20 md:max-w-[min(860px,calc(100vw-2rem))]">
      <header className="mb-12 border-b border-[var(--color-border)]/90 pb-10">
        <p className="type-kicker text-[var(--color-primary-blue)]">Playbook</p>
        <h2 className="section-title-type mt-3 text-[var(--color-fg)]">
          Team handbook
        </h2>
        <p className="section-body-type mt-4 max-w-2xl text-[var(--color-fg)]/80">
          Architecture, patterns, git workflow, and how we ship — sourced live from
          the project{" "}
          <code className="rounded bg-[var(--color-bg-muted)] px-1.5 py-0.5 font-mono text-xs">
            README.md
          </code>{" "}
          so this page stays the single source of truth.
        </p>
      </header>

      <article className="learn-handbook-article">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={learnHandbookMarkdownComponents}
        >
          {handbookSource}
        </ReactMarkdown>
      </article>
    </div>
  );
}
