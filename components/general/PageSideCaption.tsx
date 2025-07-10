import { useEffect, useState } from 'react';

export const PageSideCaption = ({
  caption,
  noDefaultOpacity = false,
  className = '',
}: {
  caption: string;
  noDefaultOpacity?: boolean;
  className?: string;
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const { clientWidth: width = 0, clientHeight: height = 0 } =
      document.querySelector('.page-side-caption-text') ?? {};

    setDimensions({ width, height });
  }, []);

  return (
    <div
      className={`page-side-caption fixed top-1/2 left-[4vw] -translate-y-1/2 z-10 
      hidden lg:block ${noDefaultOpacity ? '' : 'opacity-100'} text-dark 
      transition-opacity duration-700 ease-in-out ${className}`}>
      <p
        className={`page-side-caption-text w-max typo-caption-small -rotate-90 
        transform-origin-center scale-115 mix-blend-difference uppercase 
        font-semibold tracking-[0.125em]`}
        style={{
          transform: `translateY(-${(dimensions.width ?? 0) / 2 - (dimensions.height ?? 0) * 1.5}px)`,
        }}>
        {caption}
      </p>
    </div>
  );
};
