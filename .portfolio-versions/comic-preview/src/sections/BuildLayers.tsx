import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './BuildLayers.css';

const previews = [
  { name: 'Áurea', image: '/projects/aurea-banner-black.webp' },
  { name: 'ERP', image: '/projects/ERP_Template.webp' },
  { name: 'Aero', image: '/projects/flight-booking-platform.webp' },
];

export const BuildLayers = () => {
  const section = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(0);
  const [manual, setManual] = useState<boolean | null>(null);
  const { i18n } = useTranslation();
  const en = i18n.language.startsWith('en');
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const expansion = useTransform(scrollYProgress, [0, 0.15, 0.7, 1], [0, 0, 1, 1]);
  const upper = useTransform(expansion, value => `translateZ(${reduced ? 125 : value * 185 + 25}px)`);
  const middle = useTransform(expansion, value => `translateZ(${reduced ? 60 : value * 85 + 12}px)`);
  const topTransform = manual === null ? upper : `translateZ(${manual ? 210 : 25}px)`;
  const midTransform = manual === null ? middle : `translateZ(${manual ? 97 : 12}px)`;

  return (
    <section ref={section} className="build-story" aria-labelledby="build-title">
      <div className="build-sticky">
        <div className="build-heading">
          <p className="build-eyebrow"><span /> {en ? 'FROM IDEA TO EXPERIENCE' : 'DE LA IDEA A LA EXPERIENCIA'}</p>
          <h2 id="build-title">{en ? 'More than' : 'Más que'}<br /><em>{en ? 'what you see.' : 'lo que ves.'}</em></h2>
          <p className="build-intro">{en ? 'Every interface has a story underneath. Explore the layers that bring my projects to life.' : 'Cada interfaz tiene una historia por dentro. Explora las capas que dan vida a mis proyectos.'}</p>
          <button className="build-toggle" onClick={() => setManual(manual === null ? expansion.get() < 0.5 : !manual)}>
            <span aria-hidden="true">↕</span> {en ? 'Assemble / explore' : 'Unir / explorar'}
          </button>
          {manual !== null && <button className="build-auto" onClick={() => setManual(null)}>{en ? 'Follow scrolling again' : 'Volver a seguir el scroll'}</button>}
        </div>

        <div className="build-visual" aria-hidden="true">
          <div className="build-orbit build-orbit-one" />
          <div className="build-orbit build-orbit-two" />
          <div className="build-floor" />
          <div className="build-machine">
            <div className="build-layer build-data">
              <div className="build-circuit" />
              <div className="build-chip"><span>JOHN.DEV</span><strong>CORE</strong><small>DATA · API · LOGIC</small></div>
              <i className="build-node node-a" /><i className="build-node node-b" /><i className="build-node node-c" />
              <span className="build-edge-label">03 / DATA</span>
            </div>
            <motion.div className="build-layer build-code" style={{ transform: midTransform }}>
              <div className="build-windowbar"><span>● ● ●</span><span>experience.tsx</span><span>⌘</span></div>
              <div className="build-code-lines"><span className="code-muted">01 &nbsp; // Built with intention</span><span>02 &nbsp; <b>const</b> experience = {'{'}</span><span>03 &nbsp; &nbsp; design: <em>'thoughtful'</em>,</span><span>04 &nbsp; &nbsp; code: <em>'clean'</em>,</span><span>05 &nbsp; &nbsp; details: <em>'matter'</em></span><span>06 &nbsp; {'}'};</span><span>07 &nbsp; <b>return</b> &lt;SomethingGreat /&gt;;</span></div>
              <span className="build-edge-label">02 / CODE</span>
            </motion.div>
            <motion.div className="build-layer build-interface" style={{ transform: topTransform }}>
              <div className="build-windowbar"><span>● ● ●</span><span>{previews[selected].name.toLowerCase()}.preview</span><span>↗</span></div>
              <img src={previews[selected].image} alt="" width="984" height="660" loading="lazy" />
              <span className="build-edge-label">01 / INTERFACE</span>
            </motion.div>
          </div>
          <span className="build-coordinate">EST. 2025 / COLOMBIA</span>
        </div>

        <div className="build-bottom">
          <div className="build-preview-picker" aria-label={en ? 'Project preview' : 'Vista previa del proyecto'}>
            {previews.map((project, index) => <button key={project.name} onClick={() => setSelected(index)} aria-pressed={selected === index}><span>0{index + 1}</span> {project.name}</button>)}
          </div>
          <p className="build-scroll-note">{en ? 'SCROLL TO EXPLORE' : 'DESLIZA PARA EXPLORAR'} <span aria-hidden="true">↓</span></p>
          <div className="build-progress" aria-hidden="true"><motion.div style={{ scaleX: scrollYProgress }} /></div>
        </div>
      </div>
    </section>
  );
};
