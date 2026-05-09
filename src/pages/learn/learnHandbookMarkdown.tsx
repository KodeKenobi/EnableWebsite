import type { ReactNode } from "react";
import type { Components } from "react-markdown";
import {
  handbookHeadingPlainText,
  slugifyHandbookHeading,
} from "../../learn/handbookDocUtils.ts";

function headingId(children: ReactNode) {
  const plain = handbookHeadingPlainText(children);
  return slugifyHandbookHeading(plain || "section");
}

/** Docs-style typography: site sans only, generous spacing, strong readability. */
export const learnHandbookMarkdownComponents: Components = {
  h1: ({ children, ...props }) => {
    const id = headingId(children);
    return (
      <h1
        id={id}
        className="scroll-mt-36 mb-10 border-b border-[var(--color-border)] pb-6 font-sans text-[1.75rem] font-semibold leading-snug tracking-[-0.02em] text-[var(--color-fg-strong)] md:text-[2rem]"
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    const id = headingId(children);
    return (
      <h2
        id={id}
        className="scroll-mt-36 mt-[3rem] border-b border-[var(--color-border)] pb-3 font-sans text-[1.35rem] font-semibold leading-snug tracking-[-0.015em] text-[var(--color-fg-strong)] first:mt-0 md:text-[1.5rem]"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = headingId(children);
    return (
      <h3
        id={id}
        className="scroll-mt-36 mt-[2.25rem] font-sans text-[1.125rem] font-semibold leading-snug text-[var(--color-fg-strong)]"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => (
    <h4
      className="scroll-mt-36 mt-8 font-sans text-base font-semibold text-[var(--color-fg)]"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p
      className="mb-6 font-sans text-[1rem] leading-[1.82] text-[var(--color-fg)]/[0.88] md:text-[1.0625rem]"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="mb-8 list-disc space-y-3 pl-7 font-sans text-[1rem] leading-[1.82] text-[var(--color-fg)]/[0.88] md:text-[1.0625rem]"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="mb-8 list-decimal space-y-3 pl-7 font-sans text-[1rem] leading-[1.82] text-[var(--color-fg)]/[0.88] md:text-[1.0625rem]"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="ps-1 marker:text-[var(--color-primary-blue)]" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-[var(--color-fg-strong)]" {...props}>
      {children}
    </strong>
  ),
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      className="font-sans font-medium text-[var(--color-primary-blue)] underline decoration-[var(--color-primary-blue)]/30 underline-offset-[3px] transition hover:decoration-[var(--color-primary-blue)]"
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded px-1.5 py-0.5 font-mono text-[0.9em] text-[var(--color-fg-strong)] [background:_color-mix(in_srgb,var(--color-bg-muted)_88%,transparent)]"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className="mb-10 overflow-x-auto rounded-md border border-[var(--color-border)] bg-[#1e1e1e] p-5 font-mono text-[0.9375rem] leading-relaxed text-[#e6e8eb]"
      {...props}
    >
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mb-8 border-l-[3px] border-[var(--color-primary-blue)]/45 bg-[color-mix(in_srgb,var(--color-bg-muted)_35%,transparent)] px-5 py-4 font-sans text-[1rem] leading-[1.8] text-[var(--color-fg)]/[0.88]"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="my-[3.25rem] border-0 border-t border-[var(--color-border)]" />
  ),
  table: ({ children, ...props }) => (
    <div className="mb-10 w-full overflow-x-auto rounded-md border border-[var(--color-border)] bg-white">
      <table
        className="w-full min-w-[560px] border-collapse text-left font-sans text-[0.9375rem]"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-[color-mix(in_srgb,var(--color-bg-muted)_55%,white)] font-sans" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
  tr: ({ children, ...props }) => (
    <tr className="border-b border-[var(--color-border)] last:border-0" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-3.5 align-bottom text-xs font-semibold uppercase tracking-wide text-[var(--color-fg-strong)]"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3.5 text-[var(--color-fg)]/[0.9]" {...props}>
      {children}
    </td>
  ),
};
