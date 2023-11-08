import experience from "../data/experience.json";
import Image from "next/image";

const Experience = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <section className="flex max-w-[800px] flex-row flex-wrap justify-center gap-4">
        {experience.experience.map((item, index) => (
          <a
            key={`experience-${index}`}
            className="flex w-fit cursor-pointer flex-row overflow-hidden rounded-md border-[1px] p-2 duration-150 hover:scale-105 active:scale-100"
            style={{
              borderColor: item.color,
              color: item.color,
              background: `${item.color}26`,
            }}
            href={item.link}
          >
            <Image
              src={`/assets/${item.image}`}
              alt=""
              width={50}
              height={50}
              className="rounded-md"
              style={{
                height: "50px",
                width: "auto",
              }}
            />
            <div className="flex select-none items-center pl-5 pr-5">
              {item.text}
            </div>
          </a>
        ))}
      </section>
    </div>
  );
};

export default Experience;
