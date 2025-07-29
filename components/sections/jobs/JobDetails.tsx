import { FullJobProps } from '@/app/jobs/[job]/page';

type JobDetailsProps = Partial<Pick<FullJobProps, 'profile' | 'offer' | 'jobDescription' | 'Ps'>>;

type ListUIProps = {
  heading: string;
  list: string[];
};

type ParagraphUI = {
  title: string;
  text: string;
};

export interface JobDescription {
  title: string;
  text: string;
}

export default function JobDetails({
  profile = [],
  offer = [],
  jobDescription = [],
  Ps,
}: JobDetailsProps) {
  return (
    <section className="relative z-10 py-18 md:py-24 bg-gray-f2 w-full h-full">
      <div className="pinpoint-container lg:pl-30 grid gap-12 md:gap-16">
        {profile.length > 0 && <ListUI heading="Profile we are looking for:" list={profile} />}
        {offer.length > 0 && <ListUI heading="Our Offer" list={offer} />}

        {jobDescription.length > 0 &&
          jobDescription.map((item, index) => <ParagraphUI {...item} key={index} />)}

        <p className="typo-body-2 tracking-wide italic">{Ps}</p>
      </div>
    </section>
  );
}

export const ListUI = ({ heading, list }: ListUIProps) => {
  return (
    <div>
      <h2 className="typo-h4 pb-6">{heading}</h2>
      <ul className="list-['-'] grid gap-6 typo-body-2 tracking-wide md:pl-4 ">
        {list.map((item, index) => (
          <li key={index} className=" ">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ParagraphUI = ({ title, text }: ParagraphUI) => {
  return (
    <>
      <div className="grid gap-2">
        <h2 className="typo-h4 font-[600]">{title}</h2>
        <p className="typo-body-2 tracking-wide">{text}</p>
      </div>
    </>
  );
};
