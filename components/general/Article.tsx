'use client';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export interface ArticleProps {
  paragraphs: string[][];
  textClassName?: string;
  paragraphWrapClassName?: string;
  articleWrapClassName?: string;
}

export const Article = ({
  paragraphs,
  textClassName,
  paragraphWrapClassName,
  articleWrapClassName,
}: ArticleProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 1.05, delay: 2.5 }}
      className={cn('grid gap-9', articleWrapClassName)}>
      {paragraphs.map((paragraphTextsArr, idx) => (
        <div key={idx} className={cn('grid gap-2', paragraphWrapClassName)}>
          {paragraphTextsArr.map((item, idx2) => (
            <p
              key={`paragraph-${idx}-text-${idx2}`}
              className={cn(
                '',
                textClassName ||
                  'text-[0.625rem] lg:text-[0.75rem] leading-[1.5] text-gray-59/80 font-light'
              )}>
              {item}
            </p>
          ))}
        </div>
      ))}
    </motion.article>
  );
};
