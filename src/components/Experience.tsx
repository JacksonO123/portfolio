import experience from "../data/experience.json";
import Image from "next/image";

const Experience = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="mb-10 w-fit text-3xl font-light">Experience</h1>
      <section className="flex flex-row justify-center gap-4">
        {experience.experience.map((item, index) => (
          <div
            key={`experience-${index}`}
            className="flex w-fit cursor-default flex-row overflow-hidden rounded-md border-[1px] p-2"
            style={{
              borderColor: item.color,
              color: item.color,
              background: `${item.color}26`,
            }}
          >
            <Image
              src={`/assets/${item.image}`}
              alt=""
              width={50}
              height={50}
              className="rounded-md"
            />
            <div className="flex items-center pl-5 pr-5">{item.text}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Experience;
