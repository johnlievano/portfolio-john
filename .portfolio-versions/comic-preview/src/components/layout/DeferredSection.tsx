import { useEffect, useRef, useState, type ReactNode } from 'react';

// Keep anchor targets available while loading distant sections near the viewport.
export const DeferredSection = ({ id, children }: { id?: string; children: ReactNode }) => {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: '600px' });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={root} id={id} style={ready ? undefined : { minHeight: '100vh' }}>{ready && children}</div>;
};
