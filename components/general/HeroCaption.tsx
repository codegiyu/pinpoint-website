export const PageHeroCaption = ({ caption }: { caption: string }) => {
  return (
    <p
      className="w-fit relative typo-caption-small uppercase opacity-80 before:w-full 
      before:h-[1px] before:absolute before:left-0 before:-bottom-2 before:bg-dark/25">
      {caption}
    </p>
  );
};
