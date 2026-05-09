import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { handbookMarkdownSource } from "../../learn/handbookMarkdownSource.ts";
import { learnHandbookMarkdownComponents } from "./learnHandbookMarkdown.tsx";

export default function LearnHandbookPanel() {
  return (
    <div className="w-full min-w-0 max-w-none pb-28">
      <p className="mb-14 max-w-[68ch] font-sans text-[0.8125rem] leading-relaxed text-[var(--color-fg)]/[0.58]">
        This page renders the repository{" "}
        <code className="rounded px-1.5 py-0.5 font-mono text-[0.8125rem] text-[var(--color-fg-strong)] [background:_color-mix(in_srgb,var(--color-bg-muted)_75%,transparent)]">
          README.md
        </code>{" "}
        at build time. Use the outline in the left nav to jump to sections.
      </p>

      <article className="w-full max-w-none [&_p+p]:mt-0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={learnHandbookMarkdownComponents}
        >
          {handbookMarkdownSource}
        </ReactMarkdown>
      </article>
    </div>
  );
}
