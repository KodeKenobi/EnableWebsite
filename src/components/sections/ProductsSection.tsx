type ProductSlide = {
  title: string;
  items: string[];
  mediaType: "video" | "image";
  mediaSrc: string;
  mediaAlt: string;
  textSide: "left" | "right";
  brandPrefix: string;
  brandSuffix: string;
};

const productSlides: ProductSlide[] = [
  {
    title: "Alternative Asset Management",
    items: [
      "Hedge Funds",
      "Venture Capital",
      "Private Equity",
      "Credit",
      "Real Estate",
      "FinTech",
    ],
    mediaType: "video",
    mediaSrc: "/videos/products-overview.mp4",
    mediaAlt: "Alternative asset management overview",
    textSide: "left",
    brandPrefix: "LIBREMAX",
    brandSuffix: "CAPITAL",
  },
  {
    title: "Connected Experiences",
    items: [
      "Digital Operations",
      "Automation Platforms",
      "Network Intelligence",
      "Cyber Defense",
      "Compliance",
      "Business Analytics",
    ],
    mediaType: "image",
    mediaSrc: "/images/solutions/solutions.jpg",
    mediaAlt: "Connected enterprise products",
    textSide: "right",
    brandPrefix: "ENABLE",
    brandSuffix: "TECHNOLOGIES",
  },
];

function SlideMedia({ slide }: { slide: ProductSlide }) {
  if (slide.mediaType === "video") {
    return (
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        controls
        poster="/images/solutions/solutions.jpg"
      >
        <source src={slide.mediaSrc} type="video/mp4" />
      </video>
    );
  }

  return (
    <img
      src={slide.mediaSrc}
      alt={slide.mediaAlt}
      className="h-full w-full object-cover"
      loading="lazy"
    />
  );
}

export default function ProductsSection() {
  return (
    <div className="relative isolate">
      {productSlides.map((slide, index) => {
        const textFirst = slide.textSide === "left";
        return (
          <section
            key={`${slide.title}-${index}`}
            id={index === 0 ? "our-products" : undefined}
            className="sticky top-0 box-border h-screen overflow-hidden bg-[#062b3a] pb-8 md:pb-10 lg:pb-12"
            style={{ zIndex: 10 + index * 10 }}
          >
            <div className="grid h-full grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-4 md:gap-y-0">
              <div
                className={`${textFirst ? "md:order-1" : "md:order-2"} flex items-center bg-[#053346] px-8 md:px-16 lg:px-24`}
              >
                <div className="max-w-[30rem]">
                  <h2 className="font-serif text-[clamp(2rem,3.8vw,4.1rem)] font-normal leading-[0.98] tracking-[0.01em] text-white">
                    {slide.title}
                  </h2>
                  <ul className="mt-10 space-y-2 text-[clamp(0.95rem,1.05vw,1.2rem)] leading-[1.35] text-white/92">
                    {slide.items.map((item) => (
                      <li key={item} className="font-serif">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className={`${textFirst ? "md:order-2" : "md:order-1"} relative overflow-hidden bg-[#042638] px-5 pb-10 pt-8 md:px-10 md:pb-16 md:pt-10`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(6,37,55,0)_20%,rgba(1,14,26,0.42)_50%,rgba(6,37,55,0)_78%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(8,52,77,0.28)_0%,rgba(4,25,38,0.78)_100%)]" />

                <div className="relative mx-auto mb-3 h-[58%] w-[85%] max-w-[620px] border border-white/12 bg-black/15 p-2 shadow-[0_24px_40px_rgba(0,0,0,0.4)] sm:mb-4 md:h-[60%] md:w-[82%]">
                  <SlideMedia slide={slide} />
                </div>

                <div className="absolute bottom-8 left-7 text-white md:bottom-12 md:left-10">
                  <p className="text-[clamp(1.95rem,4vw,3.6rem)] font-extrabold tracking-tight">
                    {slide.brandPrefix}
                    <span className="ml-2 font-light tracking-[0.14em]">
                      {slide.brandSuffix}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
