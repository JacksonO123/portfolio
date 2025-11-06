import styles from "../pages/index.module.css";

type SectionProps = {
  children: JSX.Element | JSX.Element[];
  title: string;
  description?: string;
};

const Section = ({ children, title, description }: SectionProps) => {
  return (
    <section
      className={`flex flex-col items-center ${styles["fade-in"] || ""}`}
    >
      <div className="w-full max-w-[1130px]">
        <div className="mb-4 space-y-2">
          <h1 className="text-5xl font-light">{title}</h1>
          {description && <div>{description}</div>}
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;
