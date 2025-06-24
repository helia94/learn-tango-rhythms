import React, { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeaderImageProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

const SCROLL_STEP = 300; // px per arrow-tap

const HeaderImage: React.FC<HeaderImageProps> = ({
  imageUrl,
  alt,
  className = "",
}) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  /* centre the image’s midpoint on first paint */
  const center = useCallback(() => {
    if (!wrapper.current || !img.current) return;
    const { clientWidth } = wrapper.current;
    const maxScroll = img.current.scrollWidth - clientWidth;
    wrapper.current.scrollLeft = Math.max(0, maxScroll / 2);
  }, []);

  useEffect(() => {
    if (img.current?.complete) center();
  }, [center]);

  const scroll = (dir: number) =>
    wrapper.current?.scrollBy({ left: dir * SCROLL_STEP, behavior: "smooth" });

  return (
    <div className={`relative ${className}`}>
      {/* left scroll hint (outside image) */}
      <ChevronLeft
        className="pointer-events-none absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 h-6 w-6 opacity-60"
        aria-hidden="true"
      />
      {/* right scroll hint (outside image) */}
      <ChevronRight
        className="pointer-events-none absolute right-0 top-1/2 translate-x-full -translate-y-1/2 h-6 w-6 opacity-60"
        aria-hidden="true"
      />

      <div
        ref={wrapper}
        className="w-full overflow-x-auto overflow-y-hidden touch-pan-x [&::-webkit-scrollbar]:hidden"
      >
        <img
          ref={img}
          src={imageUrl}
          alt={alt}
          onLoad={center}
          className="block min-h-[300px] max-h-[50vh] w-auto max-w-none select-none object-cover"
        />
      </div>
    </div>
  );
};

export default HeaderImage;
