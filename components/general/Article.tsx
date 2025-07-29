export interface ArticleProps {
  paragraphs: string[][];
}

export const Article = ({ paragraphs }: ArticleProps) => {
  return (
    <article className="grid gap-9">
      {paragraphs.map((paragraphTextsArr, idx) => (
        <div key={idx} className="grid gap-2">
          {paragraphTextsArr.map((item, idx2) => (
            <p
              key={`paragraph-${idx}-text-${idx2}`}
              className="text-[0.625rem] lg:text-[0.75rem] leading-[1.5] text-gray-59/80 font-light">
              {item}
            </p>
          ))}
        </div>
      ))}
    </article>
  );
};
