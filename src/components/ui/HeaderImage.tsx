
import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderImageProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

const HeaderImage: React.FC<HeaderImageProps> = ({ 
  imageUrl, 
  alt, 
  className = "" 
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mobile: Carousel with horizontal scroll, centered
    return (
      <div className={className}>
        <Carousel
          opts={{
            align: "center",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            <CarouselItem className="pl-2 md:pl-4 basis-[85%]">
              <div className="rounded-[30px] overflow-hidden shadow-lg">
                <img 
                  src={imageUrl}
                  alt={alt}
                  className="w-full h-auto object-contain"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    );
  }

  // Desktop: Full width header
  return (
    <div className={className}>
      <div className="rounded-[30px] overflow-hidden shadow-lg">
        <img 
          src={imageUrl}
          alt={alt}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default HeaderImage;
