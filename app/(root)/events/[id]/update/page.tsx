
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';

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

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />

   
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>

       
      </section>
    </>
  );
};

export default EventDetails;