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
      <h1 className="mb-10 text-5xl font-light">{title}</h1>
      {children}
    </section>
  );
};

export default Section;
