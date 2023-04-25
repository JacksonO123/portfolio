import { useEffect, useState } from "react";
import { type NextPage } from "next";
import { Simulation } from "simulationjs";
import Head from "next/head";
import Image from "next/image";
import { createTriangleDemo } from "~/utils/triangle-demo";
import styles from "./index.module.css";
import projectData from "../data/projects.json";

type UiProjectType = {
  name: string;
  description: string;
  tools: string[];
  link: string;
  filename: string;
  showingDetails: boolean;
};

const Home: NextPage = () => {
  const [projects, setProjects] = useState<UiProjectType[]>([]);

  useEffect(() => {
    setProjects(
      projectData.projects.map(
        (p) =>
          ({
            ...p,
            showingDetails: false,
          } as UiProjectType)
      )
    );

    const canvas = new Simulation("canvas");

    createTriangleDemo(canvas);

    return () => {
      canvas.end();
    };
  }, []);

  const showDetails = (index: number) => index;

  return (
    <>
      <Head>
        <title>Jackson Otto Portfolio</title>
        <meta name="description" content="Jackson Otto Portfolio Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex min-h-screen flex-col gap-12 bg-white p-4">
        <section
          className={`relative h-[350px] w-full overflow-hidden rounded-xl shadow-lg ${
            styles["header-clip-path"] || ""
          }`}
        >
          <canvas id="canvas" />
          <h1 className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-60%] select-none text-8xl font-extralight text-gray-800">
            Jackson Otto
          </h1>
        </section>
        <section
          className={`flex flex-col items-center ${styles["fade-in"] || ""}`}
        >
          <h1 className="mb-5 text-3xl font-light">Projects/Experiments</h1>
          <article className="grid grid-cols-3 gap-5">
            {projects.map((p, index) => {
              const aspectRatio = 984 / 1582;
              const width = 300;
              return (
                <a
                  key={`proj-${index}`}
                  className="flex flex-col rounded-md shadow-md"
                  href={p.link}
                >
                  <Image
                    src={`/assets/${p.filename}`}
                    alt=""
                    width={width}
                    height={width * aspectRatio}
                  />
                  <div className="flex justify-between p-3">
                    <h3>{p.name}</h3>
                    <button
                      className="underline"
                      onClick={() => showDetails(index)}
                    >
                      Details
                    </button>
                  </div>
                </a>
              );
            })}
          </article>
        </section>
        <section className={`flex justify-center ${styles["fade-in"] || ""}`}>
          <h1 className="text-3xl font-light">Experience</h1>
          <ul>
            <li>TypeScript/JavaScript</li>
            <li>Golang</li>
            <li>React</li>
            <li>NextJs</li>
            <li>Java</li>
            <li>Rust</li>
          </ul>
        </section>
      </main>
    </>
  );
};

export default Home;
