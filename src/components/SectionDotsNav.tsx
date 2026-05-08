type SectionDotItem = {
  id: string;
  label: string;
};

interface SectionDotsNavProps {
  items: SectionDotItem[];
  activeId: string;
  visible: boolean;
  onNavigate: (id: string) => void;
}

export default function SectionDotsNav({
  items,
  activeId,
  visible,
  onNavigate,
}: SectionDotsNavProps) {
  return (
    <aside
      className={`fixed left-3 top-1/2 z-[70] hidden -translate-y-1/2 transition-all duration-300 lg:block ${
        visible
          ? "pointer-events-auto opacity-100 translate-x-0"
          : "pointer-events-none opacity-0 -translate-x-3"
      }`}
      aria-label="Section navigation"
    >
      <div className="flex flex-col items-center gap-4">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className="group relative flex items-center"
              aria-label={`Go to ${item.label}`}
            >
              <span
                className={`block h-4 w-4 rounded-full transition-all duration-300 ${
                  isActive
                    ? "scale-110 bg-[#4e8dff] shadow-[0_0_0_4px_rgba(78,141,255,0.24)]"
                    : "bg-[#1f4571] group-hover:scale-125 group-hover:bg-[#62a4ff] group-hover:shadow-[0_0_0_6px_rgba(98,164,255,0.22)]"
                }`}
              />
              <span className="pointer-events-none absolute left-7 whitespace-nowrap rounded-md bg-[#123756]/95 px-2 py-1 text-[11px] font-medium tracking-[0.08em] text-white opacity-0 shadow-[0_8px_22px_rgba(0,0,0,0.28)] transition-all duration-250 group-hover:left-8 group-hover:opacity-100">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
