import experience from "../data/languages.json";
import Image from "next/image";

const Experience = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-wrap gap-4">
        {experience.experience.map((item, index) => (
          <div
            key={`experience-${index}`}
            className="flex w-fit flex-row overflow-hidden rounded-md border-[1px] p-2"
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
              style={{
                height: "50px",
                width: "auto",
              }}
            />
            <div className="flex select-none items-center pl-5 pr-5">
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
