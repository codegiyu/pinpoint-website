'use client';

import { GhostBtn } from '@/components/atoms/GhostBtn';
import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import Image from 'next/image';
import {
  Dispatch,
  SetStateAction,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { parseAsString, useQueryStates } from 'nuqs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import capitalize from 'lodash/capitalize';
import { Loader2, X } from 'lucide-react';
import { DropdownOption, HoverDropdown } from '@/components/atoms/HoverDropdown';
import type { ProjectPagination } from '@/lib/api/pinpoint-public-types';
import { appendWorkCards, fetchOurWorksProjects } from '@/lib/api/our-works-projects-client';

export interface ServiceFilterOption {
  slug: string;
  label: string;
}

export interface WorksDisplayProps {
  serviceFilterOptions: ServiceFilterOption[];
  provenSectors: string[];
  initialProjects: WorkCardProps[];
  initialPagination: ProjectPagination;
  pageSize: number;
  initialFilters?: {
    service?: string;
    sector?: string;
  };
}

export const WorksDisplay = ({
  provenSectors,
  serviceFilterOptions,
  initialProjects,
  initialPagination,
  pageSize,
  initialFilters,
}: WorksDisplayProps) => {
  const [openfilter, setOpenFilter] = useState('');
  const [filterLoading, setFilterLoading] = useState<string[]>([]);
  const [moreLoading, setMoreLoading] = useState(false);
  const [items, setItems] = useState(initialProjects);
  const [pagination, setPagination] = useState(initialPagination);
  const [currentPage, setCurrentPage] = useState(1);
  const skipFilterFetchRef = useRef(true);

  const [activeFilters, setActiveFilters] = useQueryStates(
    {
      service: parseAsString.withDefault(initialFilters?.service ?? ''),
      sector: parseAsString.withDefault(initialFilters?.sector ?? ''),
    },
    { shallow: true, history: 'replace' }
  );

  const { allProvenServiceSlugs, allProvenSectors } = useMemo(
    () => ({
      allProvenServiceSlugs: new Set(serviceFilterOptions.map(o => o.slug)),
      allProvenSectors: new Set(provenSectors),
    }),
    [provenSectors, serviceFilterOptions]
  );

  const serviceLabel = useMemo(() => {
    const m = new Map(serviceFilterOptions.map(o => [o.slug, o.label]));
    return (slug: string) => m.get(slug) ?? slug;
  }, [serviceFilterOptions]);

  const hideMoreButton = useMemo(() => {
    return filterLoading.length > 0 || items.length >= pagination.total;
  }, [items.length, pagination.total, filterLoading.length]);

  const loadProjects = useCallback(
    async (page: number, service: string, sector: string, mode: 'replace' | 'append') => {
      const data = await fetchOurWorksProjects({
        page,
        limit: pageSize,
        sector: sector || undefined,
        service: service || undefined,
      });

      setPagination(data.pagination);
      setCurrentPage(page);
      setItems(prev => (mode === 'append' ? appendWorkCards(prev, data.projects) : data.projects));

      return data;
    },
    [pageSize]
  );

  const refetchFromFilters = useCallback(
    async (service: string, sector: string) => {
      setFilterLoading(() => {
        const keys: string[] = [];
        if (service) keys.push('service');
        if (sector) keys.push('sector');
        return keys.length ? keys : ['remove'];
      });

      try {
        await loadProjects(1, service, sector, 'replace');
      } finally {
        setFilterLoading([]);
      }
    },
    [loadProjects]
  );

  const giveMeMore = async () => {
    if (moreLoading || items.length >= pagination.total) return;

    setMoreLoading(true);

    try {
      await loadProjects(currentPage + 1, activeFilters.service, activeFilters.sector, 'append');
    } finally {
      setMoreLoading(false);
    }
  };

  function handleFilterOptionClick(category: string, val: string) {
    if (category !== 'service' && category !== 'sector') return;

    if (category === 'service' && !allProvenServiceSlugs.has(val)) return;
    if (category === 'sector' && !allProvenSectors.has(val)) return;

    setOpenFilter('');
    void setActiveFilters(prev => ({ ...prev, [category]: val }));
  }

  const clearAFilter = (category: string) => {
    if (category !== 'service' && category !== 'sector') return;
    void setActiveFilters(prev => ({ ...prev, [category]: '' }));
  };

  useEffect(() => {
    if (skipFilterFetchRef.current) {
      skipFilterFetchRef.current = false;
      return;
    }

    void refetchFromFilters(activeFilters.service, activeFilters.sector);
  }, [activeFilters.service, activeFilters.sector, refetchFromFilters]);

  const { serviceDropdownOptions, sectorDropdownOptions } = useMemo(() => {
    return {
      serviceDropdownOptions: serviceFilterOptions.map(({ slug, label }) => ({
        text: label,
        onClick: () => handleFilterOptionClick('service', slug),
      })) satisfies DropdownOption[],
      sectorDropdownOptions: provenSectors.map(sector => ({
        text: sector,
        onClick: () => handleFilterOptionClick('sector', sector),
      })) satisfies DropdownOption[],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceFilterOptions, provenSectors]);

  const listHidden = filterLoading.length > 0;
  const showEmptyState = !listHidden && !moreLoading && items.length === 0;

  return (
    <Suspense fallback={null}>
      <section className="w-full grid pb-10 md:pb-[7.5rem]">
        <div
          className="filters-box w-[85.8vw] max-w-[495px] md:max-w-none md:w-[595px] 
          lg:w-[828px] xl:w-[1024px] 2xl:w-[1200px] 3xl:w-[1300px] lg:h-[150px] mx-auto">
          <div className="w-full pt-6 pb-[2.125rem] lg:py-0 grid gap-4">
            <Accordion
              type="single"
              value={openfilter}
              onValueChange={setOpenFilter}
              className="mobile-filters grid md:hidden gap-2">
              <MobileFilterBtn
                name="service"
                options={serviceFilterOptions}
                onOptionClick={handleFilterOptionClick}
                isFiltering={!!filterLoading.find(item => item === 'service')}
                setOpenFilter={setOpenFilter}
              />
              <MobileFilterBtn
                name="sector"
                options={provenSectors}
                onOptionClick={handleFilterOptionClick}
                isFiltering={!!filterLoading.find(item => item === 'sector')}
                setOpenFilter={setOpenFilter}
              />
            </Accordion>
            <div className="md-filters hidden md:grid gap-4">
              <p className="typo-caption-small uppercase">Filter By</p>
              <div className="w-fit flex items-center gap-9 relative">
                <HoverDropdown text="Service" buttons={serviceDropdownOptions} />
                <HoverDropdown text="Sector" buttons={sectorDropdownOptions} />
                {filterLoading.length ? (
                  <Loader2 className="animate-spin absolute top-1/2 -left-10 -translate-y-1/2" />
                ) : null}
              </div>
            </div>
            <div
              className={`w-full ${activeFilters.sector || activeFilters.service ? 'max-h-auto' : 'animate-[hide-filters-wrap_1s_linear_forwards]'} flex flex-col md:flex-row flex-wrap gap-4 overflow-hidden transition-all duration-1000 linear`}>
              <FilterValueDisplay
                value={activeFilters.service ? serviceLabel(activeFilters.service) : ''}
                onClose={() => clearAFilter('service')}
                isActive={!!activeFilters.service}
              />
              <FilterValueDisplay
                value={activeFilters.sector}
                onClose={() => clearAFilter('sector')}
                isActive={!!activeFilters.sector}
              />
            </div>
          </div>
        </div>
        <div
          className="w-[85.8vw] max-w-[495px] md:max-w-none md:w-[90vw] lg:w-[828px] 
          xl:w-[1024px] 2xl:w-[1200px] 3xl:w-[1300px] grid gap-5 mx-auto">
          {showEmptyState ? (
            <div className="w-full flex justify-center py-10">
              <p className="typo-body-7 text-66">No projects available</p>
            </div>
          ) : (
            <ul
              className={`w-full h-auto grid md:grid-cols-2 gap-8 md:gap-8 lg:gap-x-[3.25rem] 
            lg:gap-y-8 xl:gap-y-[clamp(24px,_1.119vw,_32px)] transition-all
            lg:[&>*:nth-child(even)]:translate-y-[-150px] duration-300 ease-in-out
            ${listHidden ? 'opacity-0 max-h-0' : 'opacity-100 max-h-auto'} `}>
              {items.map(work => (
                <WorkCard key={work.id} {...work} />
              ))}
            </ul>
          )}
          <div className="w-full flex justify-center">
            <PinpointBtn
              variant="secondary"
              disabled={moreLoading}
              text="Give me some more"
              onClick={giveMeMore}
              className={`${hideMoreButton ? 'hidden' : 'flex'}`}
              animate
            />
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export interface WorkCardProps {
  id: string;
  name: string;
  image: string;
  services: string[];
  servicesListString: string;
  extraServices: string[];
  sectors: string[];
}

const WorkCard = ({ name, id, image, servicesListString }: WorkCardProps) => {
  return (
    <li className="">
      <GhostBtn linkProps={{ href: `/projects/${id}` }} className="w-full">
        <div className="w-full grid">
          <div className="work-img-box w-full h-[60vw] md:h-[204px] lg:h-[350px] relative">
            <Image src={image} alt={name} className="w-full h-full object-cover" sizes="" fill />
          </div>
          <div
            className="work-texts-box h-auto min-h-[222px] md:min-h-auto bg-white grid gap-[0.625rem] text-start
            xl:gap-[clamp(10px,_0.746vw,_13px)] pt-[1.5625rem] xl:pt-[clamp(25px,_1.866vw,_32px)] 
            px-[1.875rem] lg:px-10 pb-[3.75rem] xl:px-[clamp(51px,_3.806vw,_64px)] md:pb-0 relative">
            <h3 className="typo-h3 xl:text-[clamp(0.9375rem,_1.493vw,_1.1875rem)] font-medium break-words text-wrap">
              {name}
            </h3>
            <p
              className="typo-body-5 md:h-[102px] lg:h-16 xl:h-[100px] 2xl:h-[82px] 
              break-words text-wrap text-dark/75 font-extralight">
              {servicesListString}
            </p>
            <div className="arrow-box w-[3.125rem] h-[3.125rem] lg:hidden absolute bottom-2 right-3"></div>
          </div>
        </div>
      </GhostBtn>
    </li>
  );
};

export interface FilterBtnProps {
  name: string;
  options: string[] | ServiceFilterOption[];
  onOptionClick: (category: string, val: string) => void;
  isFiltering: boolean;
  setOpenFilter: Dispatch<SetStateAction<string>>;
}

const MobileFilterBtn = ({
  name,
  options,
  onOptionClick,
  setOpenFilter,
  isFiltering,
}: FilterBtnProps) => {
  return (
    <AccordionItem value={name} className="border-dark">
      <AccordionTrigger
        className="group py-0"
        onClick={() => setOpenFilter(prev => (prev === name ? '' : name))}>
        <div className="w-full flex items-center justify-between">
          <p className="w-fit typo-tiny no-underline">Filter by {capitalize(name)}</p>
          <div className="w-fit h-4 flex items-center gap-3 relative">
            {isFiltering && <Loader2 className="animate-spin size-4" />}
            <div
              className={`w-4 h-4 max-h-2 group-data-[state=open]:max-h-4 relative transition-all duration-200 ease-linear overflow-hidden`}>
              <X className="absolute inset-0 size-4" />
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="py-0">
        <ul className="grid">
          {options.map((option, idx) => {
            const val = typeof option === 'string' ? option : option.slug;
            const label = typeof option === 'string' ? option : option.label;
            return (
              <button
                key={idx}
                className="w-full h-[35px] flex items-center justify-start cursor-pointer"
                onClick={() => onOptionClick(name, val)}>
                <span className="text-[0.6875rem] leading-none font-semibold uppercase">
                  {label}
                </span>
              </button>
            );
          })}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export interface FilterValueDisplayProps {
  value: string;
  onClose: () => void;
  isActive: boolean;
}

const FilterValueDisplay = ({ value, onClose, isActive }: FilterValueDisplayProps) => {
  return (
    <GhostBtn
      className="w-full md:w-fit"
      wrapClassName={`${isActive ? '' : 'animate-[hide-filter_0.2s_linear_forwards]'} md:w-fit`}
      onClick={onClose}>
      <div className="w-full md:w-fit h-[55px] md:h-auto md:bg-dark md:text-white flex gap-5 items-center justify-between px-5 md:py-[10px] md:px-[15px] border border-dark">
        <span className="typo-caption-small md:text-[9px] lg:text-[11px] md:leading-4 md:tracking-[0.05em] font-medium md:font-normal uppercase md:normal-case">
          {value}
        </span>
        <X className="size-4 md:size-3 stroke-3" />
      </div>
    </GhostBtn>
  );
};
