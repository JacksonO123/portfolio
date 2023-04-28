import { useEffect, useState, type MouseEvent } from "react";
import { Simulation } from "simulationjs";
import { createTriangleDemo } from "~/utils/triangle-demo";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import projectData from "../data/projects.json";
import ExternalLink from "~/icons/external-link";
import Dropdown from "~/components/Dropdown";

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
    console.log("init");
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

    const end = createTriangleDemo(canvas);

    return () => {
      end();
      canvas.end();
    };
  }, []);

  const showDetails = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    setProjects((prev) =>
      prev.map((proj, i) => {
        if (i === index) proj.showingDetails = !proj.showingDetails;
        return proj;
      })
    );
  };

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
          <h1 className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-60%] select-none text-center text-8xl font-light text-gray-800">
            Jackson Otto
          </h1>
        </section>
        <section
          className={`flex flex-col items-center ${styles["fade-in"] || ""}`}
        >
          <h1 className="mb-5 text-3xl font-light">Projects</h1>
          <article className={`w-full ${styles["project-grid"] || ""}`}>
            {projects.map((p, index) => {
              // all images are the same size
              const aspectRatio = 984 / 1582;
              const width = 300;
              return (
                <div
                  key={`proj-${index}`}
                  className="flex h-fit w-[286px] flex-col overflow-hidden rounded-md shadow-md duration-200 ease-in-out hover:translate-y-[-4px] hover:scale-105"
                >
                  <Link href={p.link} className="relative" target="_blank">
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-0 text-white opacity-0 duration-150 hover:bg-opacity-50 hover:opacity-100">
                      <ExternalLink />
                    </div>
                    <Image
                      src={`/assets/${p.filename}`}
                      alt=""
                      width={width}
                      height={width * aspectRatio}
                    />
                  </Link>
                  <div className="flex justify-between p-3">
                    <h3>{p.name}</h3>
                    <button
                      className="underline"
                      onClick={(e) => showDetails(e, index)}
                    >
                      Details
                    </button>
                  </div>
                  <Dropdown open={p.showingDetails} className="p-3">
                    {p.description}
                  </Dropdown>
                </div>
              );
            })}
          </article>
        </section>
        <section
          className={`flex flex-col items-center ${styles["fade-in"] || ""}`}
        >
          <div>
            <h1 className="mb-4 text-3xl font-light">Experience</h1>
            <ul className="ml-4 list-disc">
              <li>TypeScript/JavaScript</li>
              <li>React</li>
              <li>NextJs</li>
              <li>Golang</li>
              <li>Java</li>
              <li>Rust</li>
            </ul>
          </div>
        </section>
      </main>
      <footer className="mt-8 w-full bg-gray-200 p-4">
        <Link
          href="https://mail.google.com/mail/?view=cm&fs=1&to=jacksonotto120@gmail.com"
          className="text-gray-600 underline"
          target="_blank"
        >
          Contact me
        </Link>
      </footer>
    </>
  );
};

export default Home;
