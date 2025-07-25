import useScrollBlock from '@/lib/hooks/use-scroll-block';
import { usePageStore } from '@/lib/store/usePageStore';
import { useEffect } from 'react';

export const LoadAnimationScreen = ({ name }: { name: string }) => {
  const {
    actions: { setPageLoaded },
  } = usePageStore(state => state);
  const { allowScroll, blockScroll } = useScrollBlock();

  useEffect(() => {
    blockScroll();

    const handleLoad = () => {
      setPageLoaded(true);

      setTimeout(() => {
        allowScroll();
      }, 1000); // Match exit animation duration of this screen
    };

    // If already loaded (from cache)
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full h-screen bg-dark grid place-items-center">
      <h2 className="typo-h3 text-white">{name}</h2>
    </section>
  );
};
