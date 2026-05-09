import { Children, type ReactNode, isValidElement } from "react";
import { handbookMarkdownSource } from "./handbookMarkdownSource.ts";

/** Inline markers only — headings in README are plain. */
export function stripInlineMarkdown(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[(.+?)]\([^)]*\)/g, "$1")
    .trim();
}

export function slugifyHandbookHeading(text: string): string {
  const t = stripInlineMarkdown(text)
    .toLowerCase()
    .replace(/[—–]/g, "-")
    .replace(/[.'’:]/g, "")
    .trim();
  const slug = t
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
  return slug || "section";
}

export type HandbookTocItem = {
  level: 2 | 3;
  text: string;
  id: string;
};

let tocCache: HandbookTocItem[] | null = null;

export function getHandbookToc(): HandbookTocItem[] {
  if (tocCache) return tocCache;
  const lines = handbookMarkdownSource.split(/\r?\n/);
  const toc: HandbookTocItem[] = [];

  for (const line of lines) {
    if (line.startsWith("### ") && !line.startsWith("####")) {
      const text = stripInlineMarkdown(line.slice(4).trim());
      if (text) toc.push({ level: 3, text, id: slugifyHandbookHeading(text) });
      continue;
    }
    if (line.startsWith("## ") && !line.startsWith("###")) {
      const text = stripInlineMarkdown(line.slice(3).trim());
      if (text) toc.push({ level: 2, text, id: slugifyHandbookHeading(text) });
    }
  }
  tocCache = toc.slice(0, 100);
  return tocCache;
}

export function handbookHeadingPlainText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }
      if (isValidElement<{ children?: ReactNode }>(child) && child.props.children) {
        return handbookHeadingPlainText(child.props.children);
      }
      return "";
    })
    .join("")
    .trim();
}
