import { CaseStudySummaryProps } from '@/components/sections/home/CaseStudies';
import { ServiceCardProps } from '@/components/sections/home/WhatWeDo';
import { WorkCardProps } from '@/components/sections/works/WorksDisplay';
import { JobsCTAProps } from '@/components/sections/jobs/JobsCTA';
import {
  ALL_JOBS_DATA,
  ALL_PROJECTS_DATA,
  ALL_SERVICES_DATA,
  AVAILABLE_PACKAGED_SERVICE_IDS,
  AvailablePackagedService,
  AvailableProject,
  AvailableService,
  DEFAULT_WORKS_DISPLAYED,
  selectedCaseStudies,
} from '../constants/texts';
import { FullProjectData } from '@/app/projects/[projectId]/page';
import { RelatedProjectSlideProps } from '@/components/sections/services/RelatedProjects';
import { debounce, formatSlugToText } from './general';

export const getServicesSummary = (): ServiceCardProps[] => {
  return ALL_SERVICES_DATA.map((service, idx, arr) => ({
    name: service.name,
    breakdown: service.breakdownSummary,
    href: `/services/${service.id}`,
    videoUrl: service.videoUrl,
    posterUrl: service.posterUrl,
    isLast: idx === arr.length - 1,
  }));
};

export const getServicesLookup = () =>
  ALL_SERVICES_DATA.reduce<Partial<Record<AvailableService, string>>>((acc, curr) => {
    acc[curr.id] = curr.name;
    return acc;
  }, {});

export const getProvenServicesAndSectors = () => {
  let sectors = new Set<string>();

  ALL_PROJECTS_DATA.forEach(project => {
    sectors = new Set([...sectors, ...project.sectors]);
  });

  return {
    provenServices: ALL_SERVICES_DATA.map(service => service.name),
    provenSectors: Array.from(sectors),
  };
};

export const getAllIndividualServices = () => {
  return [
    "I'm just making enquiries",
    ...ALL_SERVICES_DATA.flatMap(service =>
      service.expertise.breakdown.flatMap(item => item.services)
    ).sort(),
  ];
};

export const getAllServiceIds = () => {
  return ALL_SERVICES_DATA.map(service => ({ service: service.id }));
};

export const getPackageOptionsForService = (
  id: AvailablePackagedService,
  group: AvailableService
) => {
  const serviceGroup = getServiceById(group);
  const packageGroup = serviceGroup?.packagePricing.find(item => item.id === id);

  if (!packageGroup) return [];

  return packageGroup.packages.map(
    item =>
      `${formatSlugToText(item.id)} (₦${item.priceRange[0].toLocaleString()}${item.priceRange[1] ? ' - ' + item.priceRange[1].toLocaleString() : ''}) ${item.priceSuffix ? item.priceSuffix : ''}`
  );
};

export const getServiceById = (id: string) => {
  const service = ALL_SERVICES_DATA.find(service => service.id === id);

  if (!service) return null;

  const otherServices = ALL_SERVICES_DATA.reduce<ServiceCardProps[]>((acc, curr) => {
    if (curr.id !== id) {
      acc.push({
        name: curr.name,
        breakdown: curr.breakdownSummary,
        href: `/services/${curr.id}`,
        videoUrl: curr.videoUrl,
        posterUrl: curr.posterUrl,
      });
    }
    return acc;
  }, []);

  const relatedProjects = ALL_PROJECTS_DATA.reduce<RelatedProjectSlideProps[]>((acc, curr) => {
    if (acc.length < 7 && curr.services.includes(service.id)) {
      acc.push({
        projectId: curr.id,
        name: curr.name,
        image: curr.cardImage,
        description: curr.pageTitle,
      });
    }

    return acc;
  }, []);

  return {
    ...service,
    otherServices,
    relatedProjects,
  };
};

export const getPackagedServicesList = () => {
  return AVAILABLE_PACKAGED_SERVICE_IDS.filter(
    item => !new Set(['make_a_custom_request', 'make_an_enquiry']).has(item)
  );
};

export const getProjectsLookup = () =>
  ALL_PROJECTS_DATA.reduce<Partial<Record<AvailableProject, FullProjectData>>>((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});

export const getProjectsSummary = (): WorkCardProps[] => {
  const servicesLookup = getServicesLookup();

  return ALL_PROJECTS_DATA.map(project => {
    let servicesListString = '';

    project.services.forEach((service, idx, arr) => {
      servicesListString += `${servicesLookup[service]}${idx < arr.length - 1 ? ' | ' : ''}`;
    });

    return {
      id: project.id,
      name: project.name,
      image: project.cardImage,
      services: project.services,
      servicesListString,
      extraServices: project.extraServices,
      sectors: project.sectors,
    };
  });
};

export const getHomeCaseStudySamples = () => {
  const samples: Omit<CaseStudySummaryProps, 'index'>[] = [];
  const projectsLookup = getProjectsLookup();

  for (const id of selectedCaseStudies) {
    const project = projectsLookup[id];

    if (project) {
      samples.push({
        id: project.id,
        title: project.name,
        description: project.descSummary,
        img: project.cardImage,
        imgOnRight: samples.length % 2 === 1,
      });
    }
  }

  return samples;
};

export const getAllProjectIds = () => {
  return ALL_PROJECTS_DATA.map(project => ({ projectId: project.id }));
};

export const filterProjects = async ({
  service,
  sector,
  limit,
}: {
  service?: string;
  sector?: string;
  limit?: string;
}) => {
  const projectsSummary = getProjectsSummary();
  const { provenSectors, provenServices } = getProvenServicesAndSectors();
  const provenSectorsSet = new Set(provenSectors);
  const provenServicesSet = new Set(provenServices);

  await debounce(500);

  if (!service && !sector) {
    return projectsSummary.slice(0, Number(limit) || DEFAULT_WORKS_DISPLAYED);
  }

  if ((service && !provenServicesSet.has(service)) || (sector && !provenSectorsSet.has(sector))) {
    return projectsSummary.slice(0, Number(limit) || DEFAULT_WORKS_DISPLAYED);
  }

  const servicesLookup = getServicesLookup();

  return projectsSummary
    .filter(project => {
      if (!service && !sector) return true;

      const services = new Set(project.services.map(s => servicesLookup[s]));
      const sectors = new Set(project.sectors);

      if (service && sector) return services.has(service) && sectors.has(sector);

      if (service) return services.has(service);

      if (sector) return sectors.has(sector);
    })
    .slice(0, Number(limit) || DEFAULT_WORKS_DISPLAYED);
};

export const getProjectById = (id: string) => {
  const project = ALL_PROJECTS_DATA.find(project => project.id === id);

  if (!project) return null;

  const servicesLookup = getServicesLookup();
  const projectsLookup = getProjectsLookup();

  const relatedProjects: RelatedProjectSlideProps[] = [];
  project.relatedProjects.forEach(id => {
    const project = projectsLookup[id];

    if (project) {
      relatedProjects.push({
        projectId: project.id,
        name: project.name,
        image: project.cardImage,
        description: project.pageTitle,
      });
    }
  });

  const serviceBreakdown: { href: string; text: string }[] = [];
  project.services.forEach(id => {
    const serviceName = servicesLookup[id];

    if (serviceName) {
      serviceBreakdown.push({
        href: `/services/${id}`,
        text: serviceName,
      });
    }
  });

  return {
    ...project,
    relatedProjects,
    serviceBreakdown,
  };
};

export const getJobCards = (): JobsCTAProps[] => {
  return ALL_JOBS_DATA.map(job => ({
    title: job.title,
    description: job.description,
    href: `/jobs/${job.id}`,
  }));
};

export const getAllJobIds = () => {
  return ALL_JOBS_DATA.map(job => ({ job: job.id }));
};

export const getJobById = (id: string) => {
  return ALL_JOBS_DATA.find(job => job.id === id);
};
