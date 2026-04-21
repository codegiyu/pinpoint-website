export interface ContactsGroupProps {
  location: string;
  address?: string;
  tel?: string[];
  email?: string;
  links?: Array<{ label: string; href: string }>;
  inDarkBg?: boolean;
  showOpacity?: boolean;
  noTransitionDelay?: boolean;
}
