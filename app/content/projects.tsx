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
  presentation?: string;
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
    name: "Castaway",
    path: "castaway",
    emoji: "🌊",
    dates: "September 2024 - HackMIT Hackathon (24 hours)",
    deployed: true,
    featured: true,
    github: "https://github.com/zcroft27/HackMIT", // Update with actual GitHub link
    url: "https://castaway.zachlearns.com", // Update with actual URL if available
    presentation: "https://docs.google.com/presentation/d/1E-Um59pwTsa_ibuUGHLUgs7x7qayE2lM8ecwt0gIbNU/edit?usp=sharing",
    shortDescription:
      "An anonymous digital message-in-a-bottle platform built in 24 hours that fosters human connection through daily self-improvement tasks and affirmations shared across virtual oceans.",
    longDescription:
      "Castaway is a web application built during HackMIT that creates virtual oceans where users can anonymously share and discover daily self-improvement messages. Inspired by the 'small steps' mental health movement exemplified by creators like @thecagedmuse on TikTok and platforms like the Unsent Project, Castaway transforms the isolating journey of personal growth into a shared human experience. The platform features multiple themed oceans (Big Blue Ocean, reflections, gratitude), personal oceans for individual goal-tracking, and a whimsical pixel-art interface with animated floating bottles. Built with accessibility at its core, the platform requires no account creation for basic functionality, reducing barriers to participation while maintaining user privacy through anonymous messaging.",
    cardPhoto: "/castawayHome.jpeg", // Update with actual image
    coverPhotos: ["/castawayHome.jpeg", "/castawayExplore.jpeg", "/castawayScribe.png", "/castawayLogo.png"],
    skills: ["Go", "Fiber", "TypeScript", "React", "PostgreSQL", "Supabase", "Docker", "PGX Driver", "Axios", "Content Moderation", "Database Design"],
    details: (
      <>
        <div className="tablet:flex justify-between">
          <div className="flex flex-col gap-8 mr-8">
            <p>
              During the intensive 24-hour HackMIT hackathon, I served as a full-stack engineer on a four-person team building Castaway, an anonymous messaging platform designed to make personal growth less isolating. The project was born from recognizing two trends: the growing online movement of taking small daily steps for self-improvement when larger changes feel overwhelming, and the human need for authentic, anonymous connection exemplified by projects like the Unsent Project.
            </p>
            <p>
              <strong>Database Architecture & Backend Development:</strong> I created the entire Supabase PostgreSQL database architecture, carefully designing schemas to handle the complex relationships between bottles, oceans, tags, and users. One of the first challenges was modeling these relationships correctly - bottles can have only one tag but exist in multiple oceans, while oceans can have multiple tags. Additionally, I needed to track seen bottles per user to prevent duplicates. Through careful discussion and implementation examples, I designed a schema that preserved all meaningful relationships while maintaining query efficiency.
            </p>
            <p>
              On the backend, I implemented comprehensive authentication using Supabase Auth that supports both anonymous browsing and registered user features. I developed all ocean-related endpoints including ocean creation, retrieval, and navigation between themed oceans. A critical safety feature I built was the content checking system that validates all user-entered messages before they enter any ocean, ensuring the platform remains a positive space for personal growth. The backend was built using Go with Fiber for request handling and PGX driver for database connections, leveraging Go&apos;s channels and context for clean endpoint implementation.
            </p>
            <p>
              <strong>Frontend User Experience & Navigation:</strong> My frontend contributions focused on creating intuitive, delightful user experiences. I developed the complete authentication flow, including sign-in, registration, and the ability to create personal oceans. The navigation system I built ensures correct routing based on login status - different functionality becomes available for logged-in users while maintaining a seamless experience for anonymous visitors. This required multiple iterations of routing prototypes to achieve intuitive user flows.
            </p>
            <p>
              The Explore page was one of my most challenging and rewarding contributions. I designed and implemented an organic map-like interface by splitting the screen into naturally-shaped polygons with smoothed edges, creating distinct sections for each themed ocean. This required complex geometric calculations and CSS styling to achieve the organic look that fit our pixelated aesthetic. I also implemented the waypoint navigation system that guides users between different oceans, making exploration feel like a journey across an actual map.
            </p>
            <p>
              <strong>Special Features & Technical Innovations:</strong> I created the &quot;whirlpool&quot; feature - a unique navigation element that randomly transports users to other personal oceans, maintaining the serendipitous nature of discovery while preserving privacy (users cannot search for specific personal oceans). I also added the animated duck companion that enhances the whimsical ocean atmosphere, bringing life to the interface. The personal ocean feature I developed allows users to maintain their own space for daily goals, affirmations, and reminders, with these oceans being publicly visible but only writable by the owner - reinforcing the message that many others are also working on growth and no one is alone in their journey.
            </p>
            <p>
              <strong>Technical Challenges Overcome:</strong> Creating the organic sectioning on the Explore page required innovative approaches to polygon generation and edge smoothing to achieve a natural, map-like appearance within our pixel-art theme. Implementing proper bottle movement that looked organic rather than mechanical involved numerous iterations to find the right combination of drift speed and bobbing motion. The dual-mode system supporting both anonymous and authenticated users required careful state management and middleware implementation to ensure smooth transitions and appropriate feature access. Content moderation posed unique challenges in balancing user safety with the anonymous nature of the platform, which I solved through backend validation checks that filter inappropriate content before database insertion.
            </p>
            <p>
              <strong>Impact & Design Philosophy:</strong> Castaway embodies the principle that small actions can create significant change. By removing barriers to entry (no login required) and fostering anonymous yet meaningful connections, we created a platform where users feel safe to share their struggles and victories. The combination of themed public oceans and personal growth spaces bridges individual improvement with collective support. In just 24 hours, we built not just a technical solution but a digital space that addresses the very real human need for connection during personal growth journeys.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <p>
            The platform&apos;s architecture demonstrates how thoughtful design can create meaningful user experiences. The landing page presents a vast ocean filled with floating messages - clicking any bottle unfurls an anonymous message like &quot;I am grateful for the warmth of the sun.&quot; Users seeking specific themes can navigate to the Explore page via the sailboat icon, discovering oceans dedicated to reflections, gratitude, daily goals, and more. The bottle icon in the bottom corner allows users to cast their own messages into the digital seas, participating in the collective journey of self-improvement.
          </p>
        </div>
      </>
    ),
    future: (
      <>
        <div className="space-y-4">
          <p><strong>Planned enhancements include:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>AI-Powered Moderation:</strong> Implement LLM-based content checking to ensure messages align with ocean themes and maintain supportive content while reducing false positives in the current filter system</li>
            <li><strong>Gamification Elements:</strong> Daily streak tracking and achievement system to encourage consistent engagement with self-improvement messages</li>
            <li><strong>Enhanced Personal Ocean Management:</strong> Ability to archive completed goals, organize bottles by date/category, and track personal growth over time</li>
            <li><strong>Community Moderation:</strong> Crowdsourced reporting system for content that bypasses automated filters, maintaining platform quality through community involvement</li>
            <li><strong>Smart Ocean Discovery:</strong> Machine learning-based recommendation system to suggest relevant oceans based on interaction patterns and selected themes</li>
            <li><strong>Anonymous Gratitude System:</strong> Allow users to &quot;thank&quot; message senders without breaking anonymity, fostering positive feedback loops</li>
            <li><strong>Mobile Applications:</strong> Native iOS and Android apps with offline message drafting and push notifications for daily inspiration</li>
            <li><strong>Analytics Dashboard:</strong> Personal growth insights showing message patterns, most impactful themes, and progress visualization while maintaining complete anonymity</li>
            <li><strong>Expanded Ocean Types:</strong> Specialized oceans for specific communities (students, parents, professionals) and time-based oceans (morning motivation, evening reflection)</li>
          </ul>
          <p className="mt-4">
            These enhancements would transform Castaway from a hackathon project into a comprehensive platform for personal growth, while maintaining the core principles of accessibility, anonymity, and human connection that make it unique.
          </p>
        </div>
      </>
    )
  },
  {
    name: "Arenius",
    path: "arenius",
    emoji: "🌳",
    dates: "January 2025 - April 2025",
    deployed: false,
    featured: true,
    github: "https://github.com/GenerateNU/arenius",
    shortDescription:
      "A carbon-accounting platform to empower small-to-medium sized businesses to track, manage, and reduce their carbon footprint.",
    longDescription:
      "Arenius is a carbon accounting web application designed for small-to-medium sized businesses. It allows users to track their carbon footprint, manage their emissions, and take steps to reduce their impact on the environment. The platform provides a user-friendly interface for businesses to input their data and receive insights into their carbon emissions. Company bank transactions are imported from their 3rd-party accounting software and their carbon footprint is estimated based on assigned carbon emission factors.",
    cardPhoto: "/areniusDashboard.jpeg",
    coverPhotos: ["/areniusDashboard.jpeg", "/areniusGraphs.jpeg", "/areniusLogin.jpeg", "/areniusContacts.jpeg", "/areniusContact.jpeg", "/areniusLogin.jpeg", "/areniusScope.jpeg", "/AreniusReconciliation.jpeg", "/areniusDatePicker.jpeg"],
    skills: ["Go", "TypeScript", "React", "Supabase", "Xero API", "ClimatIQ API"],
    details: (
      <>
        <div className="tablet:flex justify-between">
          <div className="flex flex-col gap-8 mr-8">
          <p>
              As an engineer on the Arenius project at Generate (Northeastern&apos;s student-led product development studio), I focused on building robust backend systems and creating intuitive data visualizations. Working with a cross-functional team of designers and engineers, we delivered a fully-functional carbon accounting platform that helps businesses understand and reduce their environmental impact.
            </p>
            <p>
              My key contributions included implementing a secure authentication system using Supabase Auth that enabled user registration, login, password reset, and account deletion. I created a critical automated data synchronization system using a cron job that runs nightly to import new transactions and contacts from Xero, ensuring users always have up-to-date information. On the frontend, I handled cookie management and middleware to maintain user sessions and implemented batch updates to optimize performance.
            </p>
            <p>
              I also developed several key data visualization components, including the contact details page, top emissions factors graph, and contact distribution tree map. To enhance user experience, I added loading spinners and tooltips throughout the application, making complex carbon accounting data more accessible and understandable for users.
            </p>
          </div>
          <SafeImage
            src={"/areniusTeam.jpeg"}
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
    name: "Husky404",
    path: "husky404",
    emoji: "🐶",
    dates: "Oct 2024 - Dec 2024",
    deployed: true,
    featured: false,
    github: "https://github.com/adescoteaux1/Husky404",
    url: "https://cs4530-f24-508.onrender.com",
    shortDescription:
    "An enhanced Stack Overflow clone with Markdown/LaTeX support, SSO authentication system, and comprehensive accessibility features to improve user experience.",
  longDescription:
    "Husky404 is a feature-rich Stack Overflow clone built for a Software Engineering course project. As part of a four-person development team, I helped implement three major features: a Markdown editor with LaTeX support for professional content formatting, a secure authentication system with role-based access control, and comprehensive accessibility options. The platform enables users to create, edit, and save posts with live previews, manage their profiles securely, and customize their browsing experience with personalized accessibility settings.",
  cardPhoto: "/huskyHome.png",
  coverPhotos: ["/huskyHome.png", "/huskyTags.png", "/huskyQuestion.png", "/huskyAccessibility.png", "/huskyLatex.png", "/huskyPreview.png", "/huskyManage.png"],
  skills: ["TypeScript", "React", "Node.js", "MongoDB", "Material UI", "Markdown", "LaTeX"],
  details: (
    <>
      <div className="tablet:flex justify-between">
        <div className="flex flex-col gap-8 mr-8">
          <p>
            As part of a four-person development team for our Software Engineering course, I contributed to building Husky404, an enhanced Stack Overflow clone with advanced features that dramatically improve content creation and user experience. We followed agile methodologies with regular sprint planning, reviews, and retrospectives to ensure consistent progress and quality.
          </p>
          <p>
            My primary contributions focused on the authentication system and user management functionality. I implemented a secure user authentication system that supports multiple roles (standard users, moderators, and owners) with appropriate permission controls. For moderators, I created specialized actions allowing them to pin important questions, lock posts to prevent further answers, and delete inappropriate content. For owners, I developed an account management interface that enables searching through user accounts and assigning different roles.
          </p>
          <p>
            I also contributed to the profile page implementation, creating a personalized dashboard where users can view their activity, access their previously created posts, and manage draft content. The user-specific settings storage system I helped develop ensures that accessibility preferences (including theme selection, font size, and screen reader settings) persist across sessions, providing a consistent experience for returning users.
          </p>
          <p>
            During the development process, we transitioned from our original UI components to Material UI to improve screen reader compatibility and overall accessibility. This required refactoring existing code while maintaining functionality, a challenge that improved my skills in component migration and accessibility implementation. The final product delivers a professional platform with seven theme options, customizable font sizes, and built-in screen reader support.
          </p>
          </div>
        </div>
      </>
    ),
  },
    {
      name: "Platnm",
      path: "platnm",
      emoji: "🎶",
      dates: "Sept 2024 - Dec 2024",
      deployed: false,
      featured: true,
      github: "https://github.com/GenerateNU/platnm",
      url: "",
      shortDescription:
        "A social music platform that allows users to discover, rate, and review music while connecting with friends through shared musical interests and personalized recommendations.",
      longDescription:
        "Platnm is a social musicmobile application that transforms how users discover and engage with music. As part of the engineering team, I implemented core social features including the following system, personalized recommendations, and review functionality. The app integrates with Spotify's API to expand the music database dynamically and provides a social feed where users can interact with reviews from people they follow, view detailed statistics, and engage through comments and voting.",
      cardPhoto: "/platnmFeed.png",
      coverPhotos: ["/platnmFeed.png", "/platnmSong.png", "/platnmSearch.png", "/platnmSongReview.png", "/platnmFriend.png", "/platnmUser.png"],
      skills: ["Go", "TypeScript", "React Native", "Supabase", "Spotify API"],
      details: (
        <>
          <div className="tablet:flex justify-between">
            <div className="flex flex-col gap-8 mr-8">
              <p>
                As an engineer on the Platnm project at Generate, I implemented core social networking functionality that powers the platform&apos;s user experience. I developed the entire following/unfollowing system on both the backend and frontend, allowing users to connect with friends and discover new music through their network.
              </p>
              <p>
                I created the recommendation engine that suggests new music and users to follow based on listening habits and social connections. To enhance the review system, I built features for drafting reviews, adding tags, and managing the review lifecycle. One of the most technically challenging aspects was implementing Spotify API integration that automatically pulls in new songs and artists when search results in our database fell below five items, significantly expanding our music catalog without manual intervention.
              </p>
              <p>
                The social feed was another key contribution, showing reviews from followed users and enabling interactions through upvotes/downvotes and comments. I also developed the media statistics page that breaks down reviews by category (your reviews, friends&apos; reviews, and all reviews) for every song with detailed statistics for each grouping. These features created a dynamic, engaging platform where users can discover new music through their social connections and meaningful reviews.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      name: "BuJo Bullet Journal",
      path: "bujo-journal",
      emoji: "📝",
      dates: "March 2024 - April 2024",
      deployed: false,
      featured: false,
      github: "https://github.com/adescoteaux1/BulletJournal",
      shortDescription:
        "A digital bullet journal application that helps users organize their weekly schedule with a clean, visually appealing interface and intuitive task management system.",
      longDescription:
        "The BuJo Bullet Journal App is a Java-based desktop application designed to bring the functionality of a traditional bullet journal to digital form. Built using JavaFX, the application follows SOLID principles and implements a robust MVC architecture. Users can create, edit, and organize tasks and events throughout their week, mark completion status, and save their journals as .bujo files for later use. The clean purple-lilac theme creates a positive environment that encourages productivity and organization.",
      cardPhoto: "/bujoWeek.png",
      coverPhotos: ["/bujoWeek.png", "/bujoData.png", "/bujoEvent.png"],
      skills: ["Java", "JavaFX", "FXML", "Object-Oriented Design", "MVC Architecture", "SOLID Principles"],
      details: (
        <>
          <div className="flex flex-col gap-8">
            <p>
              As part of CS3200 Object Oriented Design, I collaborated with teammates to create the BuJo Bullet Journal App, a digital organization tool that brings the functionality of a traditional bullet journal to desktop users. This project challenged us to apply SOLID principles and implement a clean MVC architecture while delivering an intuitive user experience.
            </p>
            <p>
              The application features a weekly view where users can visualize their schedule with tasks and events organized by day. Each action (task or event) includes a name, optional description, and assigned day, with events having start and end times and tasks having completion status. All tasks appear in a dedicated Task Queue that serves as a to-do list, allowing users to quickly track their progress throughout the week.
            </p>
            <p>
              My primary contributions included implementing the View components using JavaFX and FXML, designing the user interface with a light purple-lilac theme, and ensuring the application followed the Single Responsibility and Interface Segregation principles. I developed the UserInputView class that handles the initial scene where users can create or load journals, as well as the event and task creation interfaces that validate user input before passing data to the controller.
            </p>
            <p>
              A key technical achievement was establishing a clean separation between the view, controller, and model components, allowing for extensibility while maintaining a closed core codebase. The project demonstrates how effective object-oriented design can lead to a maintainable and flexible application structure, with classes like Event and Task extending an abstract Action class to share common functionality while implementing their unique behaviors.
            </p>
          </div>
        </>
      ),
    }
];