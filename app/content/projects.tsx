/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import SafeImage from "../components/safeImage";

export interface Project {
  name: string;
  path: string;
  emoji: string;
  dates: string;
  deployed: boolean;
  featured: boolean;
  url?: string;
  github?: string;
  shortDescription: string;
  longDescription: string;
  cardPhoto: string;
  coverPhotos?: string[];
  skills: string[];
  details: ReactNode;
  future?: ReactNode | null;
}

export const projects: Project[] = [
  {
    name: "Arenius",
    path: "arenius",
    emoji: "🌳",
    dates: "January 2025 - April 2025",
    deployed: false,
    featured: true,
    url: "",
    shortDescription:
      "A carbon-accounting platform to empower small-to-medium sized businesses to track, manage, and reduce their carbon footprint.",
    longDescription:
      "Arenius is a carbon accounting web application designed for small-to-medium sized businesses. It allows users to track their carbon footprint, manage their emissions, and take steps to reduce their impact on the environment. The platform provides a user-friendly interface for businesses to input their data and receive insights into their carbon emissions. Company bank transactions are imported from their 3rd-party accounting software and their carbon footprint is estimated based on assigned carbon emission factors.",
    cardPhoto: "/areniusCover.png",
    coverPhotos: ["/areniusDashboard.png", "/areniusContacts.png"],
    skills: ["Go", "TypeScript", "React"],
    details: (
      <>
        <div className="tablet:flex justify-between">
          <div className="flex flex-col gap-8 mr-8">
            <p>
              This app was developed for a real client as part of Generate at
              Northeastern, a student-led product development studio. As one of
              two tech leads, I managed a team of 5 engineers and created
              tickets, reviewed code, and engineered features. We worked
              alongside a team of designers, helping to bring their visuals to
              life in a responsive and efficient web application.
            </p>
            <p>
              The engineering team began by building the backend in Go and
              integrating with external APIs. Specifically, we integrated with
              Xero, an accounting API, and Climatiq, a carbon accounting API for
              estimating carbon emissions based on financial transactions. Once
              the design team created Figma mockups, we built the front-end
              using React, Next.js, Tailwind, and the shadcn component library.
            </p>
          </div>
          <SafeImage
            src={"/areniusTeam.jpg"}
            alt="Team working on the Arenius project"
            className="tablet:w-2/5 tablet:h-[350px]"
          />
        </div>
        <p>
          This was my first time learning about the carbon accounting space and
          making a data-focused app that revolves around visualizations. It was
          very rewarding to work on this project with my team and complete all
          of the features that we set out to accomplish.
        </p>
      </>
    ),
  },
    {
      name: "Platnm",
      path: "platnm",
      emoji: "🎶",
      dates: "January 2025 - April 2025",
      deployed: false,
      featured: true,
      url: "",
      shortDescription:
        "A carbon-accounting platform to empower small-to-medium sized businesses to track, manage, and reduce their carbon footprint.",
      longDescription:
        "Arenius is a carbon accounting web application designed for small-to-medium sized businesses. It allows users to track their carbon footprint, manage their emissions, and take steps to reduce their impact on the environment. The platform provides a user-friendly interface for businesses to input their data and receive insights into their carbon emissions. Company bank transactions are imported from their 3rd-party accounting software and their carbon footprint is estimated based on assigned carbon emission factors.",
      cardPhoto: "/platnmCover.png",
      coverPhotos: ["/areniusDashboard.png", "/areniusContacts.png"],
      skills: ["Go", "TypeScript", "React"],
      details: (
        <>
          <div className="tablet:flex justify-between">
            <div className="flex flex-col gap-8 mr-8 w-3/5">
              <p>
                This app was developed for a real client as part of Generate at
                Northeastern, a student-led product development studio. As one of
                two tech leads, I managed a team of 5 engineers and created
                tickets, reviewed code, and engineered features. We worked
                alongside a team of designers, helping to bring their visuals to
                life in a responsive and efficient web application.
              </p>
              <p>
                The engineering team began by building the backend in Go and
                integrating with external APIs. Specifically, we integrated with
                Xero, an accounting API, and Climatiq, a carbon accounting API for
                estimating carbon emissions based on financial transactions. Once
                the design team created Figma mockups, we built the front-end
                using React, Next.js, Tailwind, and the shadcn component library.
              </p>
              <p>
                This was my first time learning about the carbon accounting space
                and making a data-focused app that revolves around visualizations.
                It was very rewarding to work on this project with my team and
                complete all of the features that we set out to accomplish.
              </p>
            </div>
            <SafeImage src={"/areniusTeam.jpg"} className=" w-2/5" alt="Team working on the Arenius project" />
          </div>
        </>
      ),
    },
];