import type { Components } from "react-markdown";

/** Shared markdown mapping: readable “course page” typography (not dashboard-grey). */
export const learnHandbookMarkdownComponents: Components = {
  h1: ({ children, ...props }) => (
    <h1
      className="scroll-mt-32 font-display text-3xl font-normal tracking-tight text-[var(--color-fg-strong)] md:text-4xl"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="scroll-mt-28 mt-12 border-b border-[var(--color-border)] pb-3 font-display text-2xl font-normal text-[var(--color-fg-strong)] first:mt-0"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-8 scroll-mt-28 font-display text-xl font-normal text-[var(--color-fg-strong)]"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mt-6 font-sans text-base font-semibold text-[var(--color-fg)]" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="mt-4 text-[15px] leading-[1.75] text-[var(--color-fg)]/90" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-relaxed text-[var(--color-fg)]/90" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-[15px] leading-relaxed text-[var(--color-fg)]/90" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="marker:text-[var(--color-primary-blue)]/80" {...props}>
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
      className="font-medium text-[var(--color-primary-blue)] underline decoration-[var(--color-primary-blue)]/35 underline-offset-[3px] transition hover:decoration-[var(--color-primary-blue)]"
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
        className="rounded-md bg-[var(--color-bg-muted)] px-1.5 py-0.5 font-mono text-[0.9em] text-[var(--color-fg-strong)]"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className="mt-4 overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-fg-strong)]/95 p-4 text-sm text-[var(--color-fg-inverse)] shadow-inner"
      {...props}
    >
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mt-4 border-l-4 border-[var(--color-warm)] pl-5 italic text-[var(--color-fg)]/85"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="my-12 border-0 border-t border-dashed border-[var(--color-border)]" />
  ),
  table: ({ children, ...props }) => (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-[var(--color-border)] bg-white/90 shadow-sm">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-[var(--color-bg-muted)]/90 text-[var(--color-fg-strong)]" {...props}>
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
    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 text-[var(--color-fg)]/90" {...props}>
      {children}
    </td>
  ),
};
