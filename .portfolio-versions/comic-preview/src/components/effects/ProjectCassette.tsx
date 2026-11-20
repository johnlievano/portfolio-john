import { GithubLogo } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from 'react';
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={cardRef}
      className={`cassette group ${inView ? 'cassette-in-view' : ''} ${fading ? "cassette-fade-out" : "cassette-fade-in"} ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <div className="cassette-screws" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="cassette-brand" aria-hidden="true"><span>JOHN / ORIGINAL RECORDING</span><strong>TYPE II · C60</strong></div>

      <a
        href={p.link}
        target="_blank"
        rel="noopener noreferrer"
        className="cassette-label"
      >
        <img
          src={p.imageLight}
          alt={p.title}
          width={900}
          height={650}
          loading="lazy"
          decoding="async"
          className="block dark:hidden"
        />
        <img
          src={p.imageDark}
          alt={p.title}
          width={900}
          height={650}
          loading="lazy"
          decoding="async"
          className="hidden dark:block"
        />
      </a>

      <div className="cassette-reels" aria-hidden="true">
        <div className="cassette-spool"><div className="reel" /></div>
        <div className="cassette-tape"><span /> <small>STEREO</small></div>
        <div className="cassette-spool"><div className="reel" /></div>
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
      <div className="cassette-head" aria-hidden="true"><i /><span /><i /></div>
    </div>
  );
};
