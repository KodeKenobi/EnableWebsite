import type { FC } from "react";
import { ClientsBand } from "../components/pageSections/ClientsBand.tsx";
import { PartnerLogoRail } from "../components/pageSections/PartnerLogoRail.tsx";
import { PartnersBand } from "../components/pageSections/PartnersBand.tsx";

const introClass =
  "border-b border-[var(--color-border)] bg-white px-6 py-4 section-body-type text-sm text-[var(--color-fg)]";

/** All four `PartnersBand` layouts stacked (placeholders until you pass `marks`). */
export const PartnersLayoutsLearnPreview: FC = () => (
  <div className="bg-[var(--color-bg)] text-[var(--color-fg)]">
    <div className={introClass}>
      <p>
        <strong>PartnersBand</strong> — four shell variants. Logos use the
        child <code className="rounded bg-[var(--color-bg-muted)] px-1">PartnerLogoRail</code>{" "}
        (below: rail alone, then full sections).
      </p>
    </div>
    <div className="border-b border-[var(--color-border)] px-6 py-8">
      <p className="type-kicker mb-3 text-[var(--color-primary-blue)]">
        Child only
      </p>
      <PartnerLogoRail />
    </div>
    {([1, 2, 3, 4] as const).map((layout) => (
      <PartnersBand
        key={layout}
        layout={layout}
        eyebrow="Partners"
        title={`Layout ${layout}`}
        body="Text column ~⅓–⅖ width; logo rail fills the rest. Pass `marks=[{ src, alt }, …]` from CMS or static assets."
      />
    ))}
  </div>
);

/** All four `ClientsBand` layouts stacked (same geometry, client-oriented defaults). */
export const ClientsLayoutsLearnPreview: FC = () => (
  <div className="bg-[var(--color-bg)] text-[var(--color-fg)]">
    <div className={introClass}>
      <p>
        <strong>ClientsBand</strong> — four shell variants matching partners
        geometry; default eyebrow &quot;Clients&quot;. Use the same{" "}
        <code className="rounded bg-[var(--color-bg-muted)] px-1">PartnerLogoRail</code>{" "}
        for client marks.
      </p>
    </div>
    {([1, 2, 3, 4] as const).map((layout) => (
      <ClientsBand
        key={layout}
        layout={layout}
        eyebrow="Clients"
        title={`Layout ${layout}`}
        body="Drop in client logos via `marks` or a custom `logoSlot` for marquees."
      />
    ))}
  </div>
);
