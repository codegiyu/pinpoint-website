import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Info } from 'lucide-react';

export default function FormAlert() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div onMouseLeave={() => setIsHovered(false)} className="relative pr-4">
      <button
        onMouseEnter={() => setIsHovered(true)}
        className="w-[2.125rem] group cursor-pointer aspect-square md:size-[3rem] rounded-full grid place-items-center p-2 border text-black border-gray-300 transition-colors relative overflow-hidden duration-1500  ">
        <span className="sr-only">
          By submitting this form, I accept that the information entered in this form will be
          treated according to Atelier Design&apos;s privacy policy to allow me to contact me
        </span>
        <span className="block text-[3rem] h-fit aspect-square overflow-hidden">
          <motion.span
            transition={{ ease: [0.25, 1, 0.5, 1] }}
            className="block relative h-full top-0 left-0 w-full group-hover:animate-[slideY_0.2s_ease-in-out_forwards]">
            <Info className="text-xl" />
          </motion.span>
          <motion.span
            transition={{ ease: [0.25, 1, 0.5, 1] }}
            className="block relative h-full top-0 left-0 w-full group-hover:animate-[slideY_0.2s_ease-in-out_forwards]">
            <Info className="text-xl" />
          </motion.span>
        </span>
      </button>
      <div
        className={cn(
          'pl-4 absolute top-36 -left-66 md:top-36 md:-left-62 lg:top-1/2 opacity-0 invisible lg:left-14 transition-all ease-linear duration-300 ',
          isHovered && '-translate-y-1/2 opacity-100 visible'
        )}>
        {' '}
        <p
          className={cn(
            ' w-[290px] grid py-4 px-8 min-h-[150px] place-items-center shadow-lg text-[13px] tracking-normal leading-6 bg-[#f2f2f2] text-gray-600 transition-all ease-linear duration-300 before:left-64 before:-top-2 before:bg-[#f2f2f2] before:h-10 before:aspect-6/9 before:absolute lg:before:top-14 lg:before:left-2.5 before:rotate-45 before:-z-10'
          )}>
          <span>
            By submitting this form, I accept that the information entered in this form will be
            treated according to Atelier Design&apos;s
            <Link href="/legal-notice" className="text-black/95 underline px-1">
              privacy policy
            </Link>
            to allow me to contact me
          </span>
        </p>
      </div>
    </div>
  );
}
