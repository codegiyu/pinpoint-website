import { cn } from '@/lib/utils';
import { PinpointBtn, PinpointBtnProps } from './PinpointBtn';
import { IconComp, LucideIconComp } from '@/lib/types/general';

interface BaseGhostBtnProps extends Omit<PinpointBtnProps, 'text'> {
  iconClass?: string;
  Icon?: IconComp;
  LucideIcon?: LucideIconComp;
}
interface GhostBtnPropsWithIcon extends BaseGhostBtnProps {
  Icon?: IconComp;
}
interface GhostBtnPropsWithLucideIcon extends BaseGhostBtnProps {
  LucideIcon?: LucideIconComp;
}
export type GhostBtnProps = GhostBtnPropsWithIcon | GhostBtnPropsWithLucideIcon;

export const GhostBtn = ({
  children,
  Icon,
  LucideIcon,
  iconClass,
  className,
  ...props
}: GhostBtnProps) => {
  return (
    <PinpointBtn
      variant="ghost"
      size="icon"
      typo="custom"
      className={cn('p-0 flex-none', className)}
      {...props}>
      {Icon ? (
        <i className={cn('text-2xl text-dark', iconClass)}>
          <Icon />
        </i>
      ) : LucideIcon ? (
        <LucideIcon className={cn('size-4 text-dark', iconClass)} />
      ) : (
        children
      )}
    </PinpointBtn>
  );
};
