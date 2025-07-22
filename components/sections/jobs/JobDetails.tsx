type JobDetailsProps = {
  profile?: string[];
  offer?: string[];
  jobDescription?: { title: string; text: string }[];
  PS: string;
};

type ListUIProps = {
  heading: string;
  list: string[];
};

type ParagraphUI = {
  title: string;
  text: string;
};

export default function JobDetails({ profile, offer, jobDescription, PS }: JobDetailsProps) {
  return (
    <section className="relative z-10 py-18 md:py-24 bg-gray-f2 w-full h-full">
      <div className="pinpoint-container md:pl-30 grid gap-12 md:gap-16">
        {profile && offer && (
          <>
            <ListUI heading="Profile we are looking for:" list={profile} />
            <ListUI heading="Our Offer" list={offer} />
          </>
        )}

        {jobDescription &&
          jobDescription.map((item, index) => <ParagraphUI {...item} key={index} />)}

        <p className="typo-body-2 tracking-wide italic">{PS}</p>
      </div>
    </section>
  );
}

export const ListUI = ({ heading, list }: ListUIProps) => {
  return (
    <div>
      <h2 className="typo-h2 pb-6">{heading}</h2>
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
        <h2 className="typo-h2">{title}</h2>
        <p className="typo-body-2 tracking-wide">{text}</p>
      </div>
    </>
  );
};
