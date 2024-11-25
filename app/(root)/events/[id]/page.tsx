import React from 'react';
import { SearchParamProps } from '@/types';
import { getEventById } from '@/lib/actions/event.actions';

const EventDetails = async ({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await paramsPromise;
  const searchParams = await searchParamsPromise;

  const event = await getEventById(id);
  console.log('Event Details:', event);

  return (
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div></div> {/* Intentionally left empty */}
    </section>
  );
};

export default EventDetails;
