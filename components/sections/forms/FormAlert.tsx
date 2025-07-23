import { motion } from 'framer-motion';
import { useState } from 'react';
import { AlertCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function FormAlert() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-[2.125rem] group cursor-pointer aspect-square md:size-[3rem] rounded-full grid place-items-center p-2 border text-black border-gray-300 transition-colors relative overflow-hidden duration-1500  ">
        <span className="sr-only">
          By submitting this form, I accept that the information entered in this form will be
          treated according to Atelier Design&apos;s privacy policy to allow me to contact me
        </span>
        <span className="block text-[3rem] h-fit aspect-square overflow-hidden">
          <motion.span
            transition={{ ease: [0.25, 1, 0.5, 1] }}
            className="block relative h-full top-0 left-0 w-full group-hover:animate-[slideY_0.2s_ease-in-out_forwards]">
            <AlertCircleIcon className="text-xl" />
          </motion.span>
          <motion.span
            transition={{ ease: [0.25, 1, 0.5, 1] }}
            className="block relative h-full top-0 left-0 w-full group-hover:animate-[slideY_0.2s_ease-in-out_forwards]">
            <AlertCircleIcon className="text-xl" />
          </motion.span>
        </span>
      </button>
      <p
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'absolute w-[290px] grid left-180 py-4 px-8 min-h-[150px] place-items-center text-[13px] top-1/2 tracking-normal leading-6 bg-[#f2f2f2] text-gray-600 transform-y-2 transform-x-2 opacity-0 transition-all ease-linear duration-300 before:h-10 before:aspect-6/9 before:bg-[#f2f2f2] before:absolute before:-left-0.5 before:rotate-45 before:-z-10',
          isHovered && '-translate-y-1/2 transform-x-0 opacity-100'
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
    </>
  );
}
