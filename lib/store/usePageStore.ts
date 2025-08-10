import { create } from 'zustand';
import type { SelectorFn } from '../types/general';
import { useShallow } from 'zustand/react/shallow';

export interface PageStore {
  pageLoaded: boolean;
  lastPathname: string;
  actions: {
    setPageLoaded: (val: boolean) => void;
    setLastPathname: (val: string) => void;
  };
}
type InitialPageStore = Omit<PageStore, 'actions'>;
export type PageStoreKey = keyof InitialPageStore;

const initialData: InitialPageStore = {
  pageLoaded: false,
  lastPathname: '-12',
};

export const useInitPageStore = create<PageStore>()(set => ({
  ...initialData,
  actions: {
    setPageLoaded: pageLoaded => {
      set({ pageLoaded });
    },
    setLastPathname: lastPathname => {
      set({ lastPathname });
    },
  },
}));

export const usePageStore = <T>(selector: SelectorFn<PageStore, T>) => {
  const state = useInitPageStore(useShallow(selector));
  return state;
};
