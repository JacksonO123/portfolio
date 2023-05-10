import { type MouseEvent } from "react";
import Image from "next/image";
import ExternalLink from "~/icons/external-link";
import Dropdown from "~/components/Dropdown";
import Link from "next/link";
import { type UiProjectType } from "~/types/projects";

type ProjectsProps = {
  projects: UiProjectType[];
  showDetails: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
};

const Projects = ({ projects, showDetails }: ProjectsProps) => {
  return (
    <>
      {projects.map((p, index) => {
        // all images are the same size
        const aspectRatio = 984 / 1582;
        const width = 300;
        return (
          <div
            key={`proj-${index}`}
            className="flex h-fit w-[286px] flex-col overflow-hidden rounded-md shadow-md duration-200 ease-in-out hover:translate-y-[-4px] hover:scale-105"
          >
            {p.link !== undefined ? (
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
            ) : (
              <Image
                src={`/assets/${p.filename}`}
                alt=""
                width={width}
                height={width * aspectRatio}
              />
            )}
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
    </>
  );
};

export default Projects;
