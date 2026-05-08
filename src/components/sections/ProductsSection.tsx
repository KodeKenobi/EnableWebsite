import { productSlides, type ProductSlide } from "../../constants/products.ts";

function SlideMedia({ slide }: { slide: ProductSlide }) {
  if (slide.mediaType === "video") {
    return (
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
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
    <div id="our-products" className="relative isolate">
      {productSlides.map((slide, index) => {
        const textFirst = slide.textSide === "left";
        const mobileTextAlign = textFirst
          ? "items-start text-left mr-auto"
          : "items-end text-right ml-auto";
        return (
          <section
            key={`${slide.title}-${index}`}
            className="sticky top-0 box-border h-[100svh] overflow-hidden bg-[#062b3a] pb-6 md:pb-10 lg:pb-12"
            style={{ zIndex: 10 + index * 10 }}
          >
            {index === 0 ? (
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[25] h-4 bg-[#eceff1]">
                <div className="absolute left-1/2 bottom-0 h-2 w-28 -translate-x-1/2 translate-y-1/2 rounded-sm bg-[var(--color-accent-strong)]" />
              </div>
            ) : null}
            <div className="grid h-full grid-cols-1 gap-y-1.5 md:grid-cols-2 md:gap-x-4 md:gap-y-0">
              <div
                className={`${textFirst ? "md:order-1" : "md:order-2"} flex items-center bg-[#053346] px-5 sm:px-8 md:px-16 lg:px-24`}
              >
                <div className={`flex max-w-[30rem] flex-col ${mobileTextAlign} md:ml-0 md:mr-0 md:items-start md:text-left`}>
                  <h2 className="font-serif text-[clamp(2rem,3.8vw,4.1rem)] font-normal leading-[0.98] tracking-[0.01em] text-white">
                    {slide.title}
                  </h2>
                  <ul className="mt-10 w-full space-y-2 text-[clamp(0.95rem,1.05vw,1.2rem)] leading-[1.35] text-white/92">
                    {slide.items.map((item) => (
                      <li key={item} className="font-serif">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className={`${textFirst ? "md:order-2" : "md:order-1"} relative overflow-hidden bg-[#042638] px-4 pb-8 pt-7 sm:px-5 md:px-10 md:pb-16 md:pt-10`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(6,37,55,0)_20%,rgba(1,14,26,0.42)_50%,rgba(6,37,55,0)_78%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(8,52,77,0.28)_0%,rgba(4,25,38,0.78)_100%)]" />

                <div className="relative mx-auto mb-3 mt-5 h-[56%] w-[92%] max-w-[700px] bg-black/15 p-2 shadow-[0_24px_40px_rgba(0,0,0,0.4)] sm:mb-4 md:mt-7 md:h-[60%] md:w-[88%]">
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
