/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { formatSlugToText } from '@/lib/utils/general';
import { motion } from 'motion/react';
import { parseAsString, useQueryStates } from 'nuqs';
import { useEffect, useMemo } from 'react';

const alternatives = ['make_a_custom_request', 'make_an_enquiry'] as const;

export const FormSwitches = ({
  servicesList,
  allowedPackagedServiceIds,
}: {
  servicesList: string[];
  allowedPackagedServiceIds: string[];
}) => {
  const allowedSet = useMemo(
    () => new Set<string>([...allowedPackagedServiceIds, ...alternatives]),
    [allowedPackagedServiceIds]
  );

  const [queries, setQueries] = useQueryStates({
    service: parseAsString.withDefault('make_an_enquiry'),
    package: parseAsString.withDefault(''),
  });

  useEffect(() => {
    if (!queries.service) {
      setQueries({ service: 'make_an_enquiry', package: '' }, { shallow: false });
    }
  }, [queries.service]);

  useEffect(() => {
    if (queries.service && !allowedSet.has(queries.service)) {
      setQueries({ service: 'make_an_enquiry', package: '' }, { shallow: false });
    }
  }, [allowedSet, queries.service]);

  return (
    <section className="w-full bg-white pb-16">
      <motion.div
        initial={{ opacity: 0, translateY: 50 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        viewport={{ once: true }}
        className="form-page-container">
        <div className="w-full grid gap-3 mb-10">
          <p className="typo-body-7 text-gray-59">
            Please select one from the services below you would like to request from us
          </p>
          <div className="w-full flex flex-wrap gap-1">
            {servicesList.map((service, idx) => (
              <PinpointBtn
                key={idx}
                variant={queries.service === service ? 'default' : 'secondary'}
                size="small"
                typo="small"
                text={formatSlugToText(service)}
                onClick={() => setQueries({ service, package: '' }, { shallow: false })}
                animate
              />
            ))}
          </div>
        </div>
        <div className="w-full grid gap-1">
          <p className="typo-body-7 text-gray-59">Alternatively, you can also choose to...</p>
          <div className="w-full flex flex-wrap gap-1">
            {alternatives.map((service, idx) => (
              <PinpointBtn
                key={idx}
                variant={queries.service === service ? 'default' : 'secondary'}
                size="small"
                typo="small"
                text={formatSlugToText(service)}
                onClick={() => setQueries({ service, package: '' }, { shallow: false })}
                animate
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
