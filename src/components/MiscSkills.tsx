import misc from "../data/misc.json";
import Image from "next/image";

const Experience = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* <div> */}
      {/*   <h2 className="text-xl">My expertise</h2> */}
      {/*   <div className="flex flex-wrap gap-4"> */}
      {/*     Programming languages, Compilers, Parsers, Web Frameworks, GPU */}
      {/*     Graphics */}
      {/*   </div> */}
      {/* </div> */}
      <div>
        <h2 className="mb-1 text-xl">Web Frameworks I work with</h2>
        <div className="flex flex-wrap gap-4">
          {misc.frameworks.map((item, index) => (
            <div
              key={`misc-${index}`}
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
    </div>
  );
};

export default Experience;
