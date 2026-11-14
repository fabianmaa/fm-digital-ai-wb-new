import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { useId, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { imageSet, type ImageName } from "../constants/site";
import { useLanguage } from "../i18n/LanguageProvider";

export const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

/* ------------------------------------------------------------------ layout */

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("container-x", className)}>{children}</div>;
}

type Tone = "paper" | "sand" | "cream" | "forest";

const toneClasses: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  sand: "bg-sand text-ink",
  cream: "bg-cream text-ink",
  forest: "bg-forest text-cream",
};

export function Section({
  children,
  id,
  tone = "paper",
  className,
  as: Tag = "section",
}: {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  className?: string;
  as?: "section" | "div" | "footer";
}) {
  return (
    <Tag id={id} className={cx("relative py-16 sm:py-24 lg:py-28", toneClasses[tone], className)}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ type */

export function RichText({
  text,
  tone = "ink",
  className,
}: {
  text: string;
  tone?: "ink" | "cream";
  className?: string;
}) {
  const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean);
  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith("[") && part.endsWith("]")) {
          return (
            <em
              key={index}
              className={cx(
                "italic",
                tone === "cream" ? "text-cream/90" : "text-clay",
                "scribble [font-variation-settings:'SOFT'_40,'WONK'_1]",
              )}
            >
              {part.slice(1, -1)}
            </em>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}

export function Eyebrow({
  children,
  tone = "ink",
  className,
}: {
  children: ReactNode;
  tone?: "ink" | "cream";
  className?: string;
}) {
  return <p className={cx("eyebrow", tone === "cream" && "eyebrow-inverse", className)}>{children}</p>;
}

/* ------------------------------------------------------------------ word reveal */

function tokenize(text: string): { word: string; accent: boolean }[] {
  const out: { word: string; accent: boolean }[] = [];
  const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean);
  for (const part of parts) {
    const accent = part.startsWith("[") && part.endsWith("]");
    const inner = accent ? part.slice(1, -1) : part;
    for (const word of inner.split(" ")) {
      if (word) out.push({ word, accent });
    }
  }
  return out;
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const accentClasses = (tone: "ink" | "cream") =>
  tone === "cream" ? "text-cream/90" : "text-clay";
const underlineClasses = (tone: "ink" | "cream") =>
  tone === "cream" ? "bg-cream/50" : "bg-clay/45";

/** Time-based word reveal (enters the viewport as part of a parent stagger). */
function StaggeredWord({ word, accent, tone }: { word: string; accent: boolean; tone: "ink" | "cream" }) {
  return (
    <motion.span
      className={cx(
        "relative inline-block",
        accent && cx("italic", accentClasses(tone), "[font-variation-settings:'SOFT'_40,'WONK'_1]"),
      )}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
      }}
      style={{ marginRight: "0.26em" }}
    >
      {word}
      {accent ? (
        <motion.span
          aria-hidden="true"
          className={cx("scribble-underline", underlineClasses(tone))}
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 0.6, delay: 0.18, ease: EASE_OUT } },
          }}
        />
      ) : null}
    </motion.span>
  );
}

/** Scroll-scrubbed word reveal: opacity/y/underline follow a MotionValue. */
function ScrubbedWord({
  word,
  accent,
  tone,
  progress,
  start,
  end,
}: {
  word: string;
  accent: boolean;
  tone: "ink" | "cream";
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const y = useTransform(progress, [start, end], [16, 0], { clamp: true });
  const opacity = useTransform(progress, [start, end], [0, 1], { clamp: true });
  return (
    <motion.span
      className={cx(
        "relative inline-block",
        accent && cx("italic", accentClasses(tone), "[font-variation-settings:'SOFT'_40,'WONK'_1]"),
      )}
      style={{ y, opacity, marginRight: "0.26em" }}
    >
      {word}
      {accent ? (
        <motion.span aria-hidden="true" className={cx("scribble-underline", underlineClasses(tone))} style={{ scaleX: opacity }} />
      ) : null}
    </motion.span>
  );
}

/**
 * Word-by-word text reveal. With `progress` (a scroll-linked MotionValue) the words
 * reveal sequentially as the value moves 0 → 1; without it they stagger in on entering
 * the viewport. Accent phrases `[...]` render italic with an underline that draws in.
 * Under `prefers-reduced-motion` the text is fully static and legible.
 */
export function RevealWords({
  text,
  tone = "ink",
  className,
  progress,
}: {
  text: string;
  tone?: "ink" | "cream";
  className?: string;
  progress?: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const tokens = tokenize(text);
  const total = Math.max(tokens.length, 1);
  const plain = text.replace(/\[|\]/g, "");

  if (reduce) {
    return <span className={cx("inline-block", className)}>{plain}</span>;
  }

  return (
    <>
      <span className="sr-only">{plain}</span>
      <motion.span
        aria-hidden="true"
        className={cx("inline-block", className)}
        variants={progress ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } } }}
        initial={progress ? undefined : "hidden"}
        whileInView={progress ? undefined : "visible"}
        viewport={progress ? undefined : { once: true, margin: "-40px" }}
      >
        {tokens.map((token, index) =>
          progress ? (
            <ScrubbedWord
              key={`${token.word}-${index}`}
              word={token.word}
              accent={token.accent}
              tone={tone}
              progress={progress}
              start={index / total}
              end={Math.min(1, (index + 0.72) / total)}
            />
          ) : (
            <StaggeredWord key={`${token.word}-${index}`} word={token.word} accent={token.accent} tone={tone} />
          ),
        )}
      </motion.span>
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "ink",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "ink" | "cream";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={tone} className={cx("mb-5", align === "center" && "justify-center")}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={cx(
          "text-display-md balance",
          tone === "cream" ? "text-cream" : "text-ink",
        )}
      >
        <RevealWords text={title} tone={tone} />
      </h2>
      {intro ? (
        <p className={cx("mt-5 max-w-2xl text-lg leading-relaxed", tone === "cream" ? "text-cream/75" : "text-muted", align === "center" && "mx-auto")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ actions */

type ButtonVariant = "primary" | "secondary" | "light" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  light: "btn-light",
  ghost:
    "btn border border-cream/25 px-6 py-3.5 text-cream hover:border-cream hover:bg-cream hover:text-forest",
};

export function Button({
  children,
  to,
  href,
  variant = "primary",
  className,
  arrow = true,
  type = "button",
  onClick,
  disabled,
  ariaLabel,
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  arrow?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const classes = cx(
    "group",
    variantClasses[variant],
    disabled && "pointer-events-none cursor-not-allowed bg-line text-muted/70 shadow-none",
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5" aria-hidden="true" />
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {content}
    </button>
  );
}

/** The single primary action of the site: the free audit. */
export function AuditButton({
  variant = "primary",
  short = false,
  className,
  arrow = true,
}: {
  variant?: ButtonVariant;
  short?: boolean;
  className?: string;
  arrow?: boolean;
}) {
  const { t, lp } = useLanguage();
  return (
    <Button to={lp("/contact")} variant={variant} className={className} arrow={arrow}>
      {short ? t.nav.freeAudit : t.common.freeAudit}
    </Button>
  );
}

export function TextLink({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  const { lp } = useLanguage();
  return (
    <Link to={lp(to)} className={cx("text-link group", className)}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}

/* ------------------------------------------------------------------ motion */

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const MotionTag = as === "li" ? motion.li : as === "article" ? motion.article : motion.div;
  if (reduce) return <MotionTag className={className}>{children}</MotionTag>;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ media */

/**
 * Gentle scroll-linked image movement. Transform-only, disabled when the visitor
 * prefers reduced motion. Keep the distance small so it reads as depth, not motion.
 */
export function Parallax({
  children,
  className,
  distance = 24,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}

export function Photo({
  name,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
}: {
  name: ImageName;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cx("overflow-hidden bg-sand", className)}>
      <img
        src={imageSet(name).split(" ")[0]}
        srcSet={imageSet(name)}
        sizes={sizes}
        alt={alt}
        className={cx("h-full w-full object-cover", imgClassName)}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ accordion */

export type FaqItem = { q: string; a: string };

export function FaqList({ items, tone = "ink" }: { items: FaqItem[]; tone?: "ink" | "cream" }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  const reduce = useReducedMotion();

  return (
    <div className={cx("divide-y", tone === "cream" ? "divide-cream/15" : "divide-line")}>
      {items.map((item, index) => {
        const expanded = open === index;
        const panelId = `${id}-panel-${index}`;
        const buttonId = `${id}-button-${index}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
                className={cx(
                  "flex w-full items-center justify-between gap-6 py-5 text-left transition-colors",
                  tone === "cream" ? "text-cream hover:text-cream/80" : "text-ink hover:text-clay",
                )}
              >
                <span className="font-display text-lg font-medium sm:text-xl">{item.q}</span>
                <span
                  className={cx(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-transform duration-300",
                    tone === "cream" ? "border-cream/30" : "border-line bg-cream",
                    expanded && "rotate-45",
                  )}
                  aria-hidden="true"
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className={cx("max-w-3xl pb-6 pr-10 text-[1.02rem] leading-relaxed", tone === "cream" ? "text-cream/75" : "text-muted")}>
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ misc */

export function ArrowUpRightIcon({ className }: { className?: string }) {
  return <ArrowUpRight className={cx("h-4 w-4", className)} aria-hidden="true" />;
}
