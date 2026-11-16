import { Calendar, Check, Phone, Sparkles, type LucideIcon } from "lucide-react";
import { useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { AuditButton, RichText, TextLink } from "./ui";

const VIDEO_URL = "/assets/hero/hero-scrub.mp4";
const VIDEO_BYTES = 11212687;
const POSTER_URL = "/assets/hero/hero-poster.webp";
const SETTLE_URL = "/assets/hero/hero-settle.webp";

// Caption beat bands as scroll-progress ranges (0..1 through the pinned hero).
// Beat 1 opens settled; beats 2-4 ramp in and out; the settle (H1 + CTA) fades in last.
const BANDS: [number, number][] = [
  [0.0, 0.15],
  [0.17, 0.34],
  [0.36, 0.57],
  [0.59, 0.75],
];
const SETTLE_BAND: [number, number] = [0.78, 0.86];

function smoothstep(p: number, e0: number, e1: number) {
  const t = Math.min(1, Math.max(0, (p - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

function bandOpacity(p: number, band: [number, number], first: boolean) {
  const [a, b] = band;
  const f = Math.min(0.02, (b - a) / 3);
  if (first) return 1 - smoothstep(p, b - f, b);
  return smoothstep(p, a, a + f) * (1 - smoothstep(p, b - f, b));
}

// Static-hero gates (the scrub-pipeline's five conditions). Scrub runs only when NONE match;
// each query is also watched so the decision re-evaluates live on resize/rotation/motion flip.
const GATES: { query: string; label: string }[] = [
  { query: "(max-width: 720px)", label: "phone <=720px" },
  { query: "(orientation: portrait) and (max-width: 1024px)", label: "portrait tablet" },
  { query: "(orientation: portrait) and (pointer: coarse)", label: "coarse-pointer portrait" },
  { query: "(orientation: landscape) and (pointer: coarse) and (max-height: 560px)", label: "landscape phone (short)" },
  { query: "(prefers-reduced-motion: reduce)", label: "prefers-reduced-motion" },
];

function useHeroScrub() {
  const compute = () => {
    const hit = GATES.find((g) => window.matchMedia(g.query).matches);
    return hit ? { enabled: false, reason: hit.label } : { enabled: true, reason: "" };
  };
  const [state, setState] = useState(compute);
  useEffect(() => {
    const mqls = GATES.map((g) => window.matchMedia(g.query));
    const update = () => setState(compute());
    mqls.forEach((m) => m.addEventListener("change", update));
    return () => mqls.forEach((m) => m.removeEventListener("change", update));
  }, []);
  return state;
}

// Icons for the scroll-driven "activity" card, keyed to the caption beats (the labels live
// in copy.ts as home.hero.activity so the copy guard covers them).
const ACTIVITY_ICONS: LucideIcon[] = [Phone, Check, Calendar, Sparkles];

function VoiceBars() {
  return (
    <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="voice-bar h-full w-[3px] rounded-full bg-clay" style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
    </span>
  );
}

function ActivityCard({ state }: { state: number }) {
  const { t } = useLanguage();
  const Icon = ACTIVITY_ICONS[state];
  return (
    <div className="inline-flex items-center gap-3 rounded-2xl glass-panel px-4 py-2.5 shadow-lift">
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest text-cream">
        {state === 0 ? (
          <>
            <span className="absolute inset-0 rounded-full bg-clay/40 animate-ping" aria-hidden="true" />
            <span className="absolute -inset-1 rounded-full border border-clay/40" aria-hidden="true" />
          </>
        ) : null}
        <Icon className="relative h-4 w-4" aria-hidden="true" />
      </span>
      {state === 1 ? <VoiceBars /> : null}
      <span className="whitespace-nowrap text-sm font-semibold text-forest">{t.home.hero.activity[state]}</span>
    </div>
  );
}

export function ScrollVideoHero() {
  const { t } = useLanguage();
  const { enabled, reason } = useHeroScrub();
  const [videoFailed, setVideoFailed] = useState(false);

  const stageRef = useRef<HTMLElement>(null);
  const stageElRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const ringWrapRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const captionEls = useRef<Array<HTMLDivElement | null>>([]);
  const settleEl = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start start", "end end"] });

  useEffect(() => {
    if (!enabled) return;
    const videoEl = videoRef.current;
    const stageEl = stageElRef.current;
    const ring = ringRef.current;
    const ringWrap = ringWrapRef.current;
    const poster = posterRef.current;
    if (!videoEl || !stageEl) return;
    const video = videoEl;
    const stage = stageEl;

    let disposed = false;
    let started = false;

    // Paint the poster first; start streaming only after it is in (or failed).
    if (poster) poster.style.backgroundImage = `url("${POSTER_URL}")`;
    const begin = () => {
      if (started) return;
      started = true;
      void loadBlob().catch(failVideo);
    };
    const posterImg = new Image();
    posterImg.onload = begin;
    posterImg.onerror = begin;
    posterImg.src = POSTER_URL;
    const safety = window.setTimeout(begin, 4000);

    async function loadBlob() {
      const ctrl = new AbortController();
      let watchdog = window.setTimeout(() => ctrl.abort(), 20000);
      const res = await fetch(VIDEO_URL, { priority: "low", signal: ctrl.signal });
      if (!res.ok || !res.body) throw new Error("hero video fetch failed");
      const total = Number(res.headers.get("Content-Length")) || VIDEO_BYTES;
      const reader = res.body.getReader();
      const chunks: BlobPart[] = [];
      let got = 0;
      let lastRing = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        window.clearTimeout(watchdog);
        watchdog = window.setTimeout(() => ctrl.abort(), 20000);
        chunks.push(value as unknown as BlobPart);
        got += (value as Uint8Array).length;
        const frac = Math.min(1, got / total);
        const now = performance.now();
        if (now - lastRing > 100 || frac === 1) {
          lastRing = now;
          if (ring) ring.style.strokeDashoffset = String(Math.round(126 * (1 - frac)));
        }
      }
      window.clearTimeout(watchdog);
      if (disposed) return;
      const url = URL.createObjectURL(new Blob(chunks, { type: "video/mp4" }));
      video.src = url;
      video.load();
      video.addEventListener(
        "canplay",
        () => {
          if (ring) ring.style.strokeDashoffset = "0";
          if (ringWrap) ringWrap.style.opacity = "0";
          stage.classList.add("video-ready");
          requestSeek(target * (video.duration || 1));
        },
        { once: true },
      );
    }

    function failVideo() {
      console.error("[hero] scrub video failed to load — falling back to the poster still.");
      setVideoFailed(true);
      if (ringWrap) ringWrap.style.opacity = "0";
      stage.classList.add("video-failed");
    }

    // --- Scroll drive: lerp toward target, gate seeks, rest when converged ---
    let target = 0;
    let shown = 0;
    let rafId: number | null = null;
    let lastTick = 0;
    let seekBusy = false;
    let pendingTime: number | null = null;
    let heroOnScreen = true;
    let lastCaps = "";

    function requestSeek(time: number) {
      if (!video.duration) return;
      if (seekBusy) {
        pendingTime = time;
        return;
      }
      seekBusy = true;
      video.currentTime = time;
    }

    function onSeeked() {
      seekBusy = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        requestSeek(t);
      }
    }

    function onError() {
      seekBusy = false;
      pendingTime = null;
    }

    function applyCaptions(p: number) {
      const vals = BANDS.map((band, i) => bandOpacity(p, band, i === 0).toFixed(3));
      const settle = smoothstep(p, SETTLE_BAND[0], SETTLE_BAND[1]).toFixed(3);
      const key = vals.join(",") + "|" + settle;
      if (key === lastCaps) return;
      lastCaps = key;
      captionEls.current.forEach((el, i) => {
        if (el) el.style.opacity = vals[i];
      });
      if (settleEl.current) settleEl.current.style.opacity = settle;
    }

    function tick(now: number) {
      const dt = Math.min(100, now - (lastTick || now));
      lastTick = now;
      const k = 0.16;
      shown += (target - shown) * (1 - Math.pow(1 - k, dt / 16.667));
      if (Math.abs(target - shown) < 0.0005) {
        shown = target;
        rafId = null;
        lastTick = 0;
      } else {
        rafId = requestAnimationFrame(tick);
      }
      requestSeek(shown * (video.duration || 1));
      applyCaptions(shown);
    }

    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onError);

    const unsub = scrollYProgress.on("change", (p) => {
      target = p;
      if (rafId === null && heroOnScreen) rafId = requestAnimationFrame(tick);
    });

    const io = new IntersectionObserver((entries) => {
      heroOnScreen = entries[0]?.isIntersecting ?? false;
    });
    io.observe(stage);

    applyCaptions(0);

    return () => {
      disposed = true;
      window.clearTimeout(safety);
      unsub();
      io.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
    };
  }, [enabled, scrollYProgress]);

  // Surface the mode decision in dev so a silent fallback can never masquerade as "working".
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.info(
        `[hero] mode=${enabled ? "scrub" : "static"}${enabled ? "" : ` reason=${reason}`} width=${window.innerWidth} videoFailed=${videoFailed}`,
      );
    }
  }, [enabled, reason, videoFailed]);

  const devBadge =
    import.meta.env.DEV && !enabled ? (
      <div className="pointer-events-none fixed bottom-2 left-2 z-[100] rounded-md bg-forest/95 px-2.5 py-1 font-mono text-[11px] leading-tight text-cream shadow-lg">
        HERO · STATIC — {reason}
      </div>
    ) : null;

  if (!enabled) {
    // Static hero: the composed settle frame with the H1 + CTA. No video is fetched.
    return (
      <>
        {devBadge}
        <section className="relative overflow-hidden bg-forest-deep">
          <img
            src={SETTLE_URL}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: "linear-gradient(to right, rgba(8,12,11,0.78) 0%, rgba(8,12,11,0.4) 55%, rgba(8,12,11,0.25) 100%)" }}
        />
        <div className="relative px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:pb-28 lg:pt-40">
          <div className="mx-auto max-w-[1220px]">
            <div className="max-w-xl">
              <h1 className="text-display-xl text-cream balance hero-text-shadow">
                <RichText text={t.home.hero.title} tone="cream" />
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/85 sm:text-xl">{t.home.hero.lead}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <AuditButton className="px-7 py-4" />
                <TextLink to="/our-process" className="text-cream hover:text-white">
                  {t.home.hero.secondary}
                </TextLink>
              </div>
              <p className="mt-4 text-sm text-cream/70">{t.home.hero.micro}</p>
            </div>
          </div>
        </div>
        </section>
      </>
    );
  }

  return (
    <section ref={stageRef} className="relative h-[700vh] bg-forest-deep">
      <div ref={stageElRef} className="sticky top-0 h-screen overflow-hidden bg-forest-deep">
        <div
          ref={posterRef}
          className="absolute inset-0 bg-cover bg-center"
          aria-hidden="true"
          style={{ backgroundImage: `url("${POSTER_URL}")` }}
        />
        <video
          ref={videoRef}
          preload="none"
          muted
          playsInline
          aria-hidden="true"
          tabIndex={-1}
          className="hero-video absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: "radial-gradient(ellipse 120% 90% at 60% 45%, rgba(10,12,12,0) 30%, rgba(10,12,12,0.5) 100%)" }}
        />
        <div
          className="absolute inset-y-0 left-0 w-3/5"
          aria-hidden="true"
          style={{ background: "linear-gradient(to right, rgba(8,12,11,0.72) 0%, rgba(8,12,11,0.38) 55%, rgba(8,12,11,0) 100%)" }}
        />
        <div
          ref={ringWrapRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-cream/80 transition-opacity duration-500"
          aria-hidden="true"
        >
          <svg viewBox="0 0 48 48" className="h-12 w-12">
            <circle
              ref={ringRef}
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="126"
              style={{ strokeDashoffset: 126 }}
            />
          </svg>
        </div>

        <div className="relative z-10 flex h-full items-center px-5 sm:px-8">
          <div className="mx-auto w-full max-w-[1220px]">
            <div className="relative max-w-xl">
              {BANDS.map((_band, i) => (
                <div
                  key={i}
                  data-band={i}
                  ref={(el) => {
                    captionEls.current[i] = el;
                  }}
                  className="absolute inset-0 flex flex-col items-start justify-center"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <p className="max-w-md font-display text-3xl leading-tight text-cream hero-text-shadow sm:text-4xl">
                    {t.home.hero.captions[i]}
                  </p>
                  <div className="mt-6">
                    <ActivityCard state={i} />
                  </div>
                </div>
              ))}
              <div ref={settleEl} data-settle style={{ opacity: 0 }}>
                <h1 className="text-display-xl text-cream balance hero-text-shadow">
                  <RichText text={t.home.hero.title} tone="cream" />
                </h1>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/85 sm:text-xl">{t.home.hero.lead}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <AuditButton className="px-7 py-4" />
                  <TextLink to="/our-process" className="text-cream hover:text-white">
                    {t.home.hero.secondary}
                  </TextLink>
                </div>
                <p className="mt-4 text-sm text-cream/70">{t.home.hero.micro}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
