import { GithubLogo } from "@phosphor-icons/react";
import "./ProjectCassette.css";

export interface ProjectCassetteData {
  id: string;
  title: string;
  category: string;
  desc: string;
  stack: string[];
  link: string;
  github: string;
  imageLight: string;
  imageDark: string;
}

const responsiveSources: Record<string, string> = {
  "/projects/energias_polo_a_tierra.webp": "/projects/energias_polo_a_tierra-504.webp 504w, /projects/energias_polo_a_tierra-700.webp 700w, /projects/energias_polo_a_tierra.webp 973w",
  "/projects/ERP_Template.webp": "/projects/ERP_Template-504.webp 504w, /projects/ERP_Template-700.webp 700w, /projects/ERP_Template.webp 984w",
  "/projects/aurea-template-black.webp": "/projects/aurea-template-black-504.webp 504w, /projects/aurea-template-black-700.webp 700w, /projects/aurea-template-black.webp 1016w",
  "/projects/aurea-banner-black.webp": "/projects/aurea-banner-black-504.webp 504w, /projects/aurea-banner-black-700.webp 700w, /projects/aurea-banner-black.webp 952w",
  "/projects/aurea-template-white.webp": "/projects/aurea-template-white-504.webp 504w, /projects/aurea-template-white-700.webp 700w, /projects/aurea-template-white.webp 1016w",
};

interface ProjectCassetteProps {
  project: ProjectCassetteData;
  index: number;
  hidden?: boolean;
  fading?: boolean;
}

export const ProjectCassette = ({
  project: p,
  index,
  hidden,
  fading,
}: ProjectCassetteProps) => {
  return (
    <div
      className={`cassette group ${fading ? "cassette-fade-out" : "cassette-fade-in"} ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <div className="cassette-screws" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <a
        href={p.link}
        target="_blank"
        rel="noopener noreferrer"
        className="cassette-label"
      >
        <img
          src={p.imageLight}
          srcSet={responsiveSources[p.imageLight]}
          sizes="(min-width: 640px) 504px, calc(100vw - 3rem)"
          alt={p.title}
          loading="lazy"
          decoding="async"
          className="block dark:hidden"
        />
        <img
          src={p.imageDark}
          srcSet={responsiveSources[p.imageDark]}
          sizes="(min-width: 640px) 504px, calc(100vw - 3rem)"
          alt={p.title}
          loading="lazy"
          decoding="async"
          className="hidden dark:block"
        />
        <div className="cassette-label-scan" />
      </a>

      <div className="cassette-reels" aria-hidden="true">
        <div className="reel" />
        <div className="reel" />
      </div>

      <div className="cassette-info">
        <span className="cassette-level">
          LVL {String(index + 1).padStart(2, "0")}
        </span>
        <span className="cassette-category">{p.category}</span>
      </div>

      <h3 className="cassette-title">{p.title}</h3>
      <p className="cassette-desc">{p.desc}</p>

      <div className="cassette-stack">
        {p.stack.map((s) => (
          <span key={s} className="stack-chip">
            {s}
          </span>
        ))}
      </div>

      <div className="cassette-footer">
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          className="cassette-icon-link"
          aria-label={`Ver código de ${p.title} en GitHub`}
        >
          <GithubLogo size={20} />
        </a>
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="cassette-play"
        >
          <span className="play-icon">▶</span> PLAY
        </a>
      </div>
    </div>
  );
};