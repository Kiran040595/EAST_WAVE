"use client";

import { useEffect, useRef } from "react";
import type { BufferGeometry, Line, LineBasicMaterial, WebGLRenderer } from "three";

/** Decorative only: the static SVG remains available until WebGL is ready. */
export default function HeroWave() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = hostRef.current;
    if (!element) return;
    const heroElement = element.closest(".hero");
    if (!heroElement) return;
    const host: HTMLDivElement = element;
    const hero: Element = heroElement;
    const media = window.matchMedia("(min-width: 701px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let disposed = false;
    let sceneCleanup: (() => void) | undefined;
    let generation = 0;

    async function configure() {
      const thisGeneration = ++generation;
      sceneCleanup?.();
      sceneCleanup = undefined;
      host.removeAttribute("data-ready");
      if (!media.matches) return;
      try {
        const THREE = await import("three");
        if (disposed || generation !== thisGeneration || !media.matches) return;
        let renderer: WebGLRenderer;
        try {
          renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
        } catch { return; }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.setAttribute("aria-hidden", "true");
        host.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, 1, .1, 50);
        camera.position.set(0, 0, 12);
        const ribbons = new THREE.Group();
        scene.add(ribbons);
        const segments = 160;
        const lines: Line<BufferGeometry, LineBasicMaterial>[] = [];
        for (let row = 0; row < 17; row++) {
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array((segments + 1) * 3), 3));
          const material = new THREE.LineBasicMaterial({ color: row === 12 ? 0xdb8642 : 0x2cb6ba, transparent: true, opacity: row === 12 ? .22 : .22 + row * .018, depthWrite: false });
          const line = new THREE.Line(geometry, material);
          lines.push(line);
          ribbons.add(line);
        }
        let pointerX = 0, pointerY = 0, currentX = 0, currentY = 0;
        let inView = true, contextLost = false, stopped = false;
        let frame = 0, previousFrame = 0, time = 0;
        function updateGeometry() {
          lines.forEach((line, row) => {
            const positions = line.geometry.attributes.position;
            for (let i = 0; i <= segments; i++) {
              const x = (i / segments - .5) * 16;
              const distanceFromPointer = x - pointerX * 7.2;
              const pointerInfluence = Math.exp(-(distanceFromPointer * distanceFromPointer) / 5.5);
              const y = Math.sin(x * .6 + time * .19 + row * .09) * .63
                + Math.sin(x * 1.03 - time * .12 + row * .04) * .19
                + (row - 8) * .075
                + pointerInfluence * currentY * (.24 + row * .006);
              const z = Math.cos(x * .43 + row * .11 + time * .11) * .4 + (row - 8) * .018;
              positions.setXYZ(i, x, y, z);
            }
            positions.needsUpdate = true;
            line.geometry.computeBoundingSphere();
          });
        }
        function render(now: number) {
          if (stopped || contextLost || !inView || document.hidden) { frame = 0; previousFrame = 0; return; }
          frame = requestAnimationFrame(render);
          if (previousFrame && now - previousFrame < 1000 / 30) return;
          const delta = previousFrame ? Math.min((now - previousFrame) / 1000, .05) : 0;
          previousFrame = now;
          time += delta;
          currentX += (pointerX - currentX) * .06;
          currentY += (pointerY - currentY) * .06;
          ribbons.rotation.set(-.2 + currentY * .035, currentX * .045, -.025);
          ribbons.position.set(currentX * .055, currentY * .045, 0);
          updateGeometry();
          renderer.render(scene, camera);
        }
        function resume() { if (!frame && !stopped && !contextLost && inView && !document.hidden) frame = requestAnimationFrame(render); }
        function resize() {
          const { width, height } = host.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.position.z = Math.max(4, 17 / (2 * Math.tan(Math.PI / 12) * camera.aspect));
          camera.updateProjectionMatrix();
          resume();
        }
        function move(event: Event) {
          const e = event as PointerEvent;
          if (e.pointerType !== "mouse") return;
          const rect = hero!.getBoundingClientRect();
          pointerX = Math.max(-1, Math.min(1, (e.clientX - rect.left) / rect.width * 2 - 1));
          pointerY = Math.max(-1, Math.min(1, (e.clientY - rect.top) / rect.height * 2 - 1));
        }
        function leave() { pointerX = 0; pointerY = 0; }
        function visibility() {
          if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; previousFrame = 0; }
          else resume();
        }
        function loseContext(e: Event) {
          e.preventDefault(); contextLost = true;
          if (frame) cancelAnimationFrame(frame);
          frame = 0; host.removeAttribute("data-ready");
        }
        function restoreContext() { contextLost = false; host.dataset.ready = "true"; resize(); }
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        const intersectionObserver = new IntersectionObserver(entries => {
          inView = entries[0]?.isIntersecting ?? false;
          if (!inView && frame) { cancelAnimationFrame(frame); frame = 0; previousFrame = 0; }
          else resume();
        }, { threshold: 0 });
        intersectionObserver.observe(hero);
        hero.addEventListener("pointermove", move, { passive: true });
        hero.addEventListener("pointerleave", leave);
        document.addEventListener("visibilitychange", visibility);
        renderer.domElement.addEventListener("webglcontextlost", loseContext);
        renderer.domElement.addEventListener("webglcontextrestored", restoreContext);
        resize();
        host.dataset.ready = "true";
        sceneCleanup = () => {
          stopped = true;
          if (frame) cancelAnimationFrame(frame);
          resizeObserver.disconnect(); intersectionObserver.disconnect();
          hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave);
          document.removeEventListener("visibilitychange", visibility);
          renderer.domElement.removeEventListener("webglcontextlost", loseContext);
          renderer.domElement.removeEventListener("webglcontextrestored", restoreContext);
          lines.forEach(line => { line.geometry.dispose(); line.material.dispose(); });
          renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
          host.removeAttribute("data-ready");
        };
      } catch { host.removeAttribute("data-ready"); }
    }
    void configure();
    media.addEventListener("change", configure);
    return () => { disposed = true; generation++; media.removeEventListener("change", configure); sceneCleanup?.(); };
  }, []);

  return <div className="hero-three" ref={hostRef} aria-hidden="true" />;
}


