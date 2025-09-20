import styles from "../pages/index.module.css";

type SectionProps = {
  children: JSX.Element | JSX.Element[];
  title: string;
};

const Section = ({ children, title }: SectionProps) => {
  return (
    <section
      className={`flex flex-col items-center ${styles["fade-in"] || ""}`}
    >
      <div className="w-full max-w-[1000px]">
        <h1 className="mb-4 text-5xl font-light">{title}</h1>
        {children}
      </div>
    </section>
  );
};

export default Section;
