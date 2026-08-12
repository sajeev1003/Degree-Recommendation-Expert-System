import { useMemo } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import type { DegreeRecommendation } from '../lib/types';
import RecommendationCard from '../components/ui/RecommendationCard';
import ScoreBar from '../components/ui/ScoreBar';

/** Decorative icon for "Why this fits you" — person silhouette with a checkmark */
const FitIcon = () => (
  <svg viewBox="0 0 67 69" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-0 h-[69px] w-[67px] pointer-events-none opacity-30">
    {/* Head */}
    <circle cx="33" cy="20" r="10" stroke="#1c1c13" strokeWidth="2"/>
    {/* Shoulders / body arc */}
    <path d="M8 62c0-13.807 11.193-25 25-25s25 11.193 25 25" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    {/* Checkmark badge (bottom-right) */}
    <circle cx="52" cy="54" r="10" fill="#1c1c13"/>
    <polyline points="46,54 50,58 58,49" stroke="#e8e4d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/** Thumbnail for ANALYSIS_COMPLETE — CPU chip icon */
const ChipThumb = () => (
  <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <rect width="90" height="90" fill="#e8e4d9"/>
    {/* Chip body */}
    <rect x="24" y="24" width="42" height="42" rx="3" stroke="#1c1c13" strokeWidth="2"/>
    {/* Inner die */}
    <rect x="33" y="33" width="24" height="24" rx="1" fill="#1c1c13" opacity="0.12"/>
    <rect x="33" y="33" width="24" height="24" rx="1" stroke="#1c1c13" strokeWidth="1.5"/>
    {/* Top pins */}
    <line x1="33" y1="24" x2="33" y2="16" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    <line x1="41" y1="24" x2="41" y2="16" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    <line x1="49" y1="24" x2="49" y2="16" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    <line x1="57" y1="24" x2="57" y2="16" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    {/* Bottom pins */}
    <line x1="33" y1="66" x2="33" y2="74" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    <line x1="41" y1="66" x2="41" y2="74" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    <line x1="49" y1="66" x2="49" y2="74" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    <line x1="57" y1="66" x2="57" y2="74" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    {/* Left pins */}
    <line x1="24" y1="33" x2="16" y2="33" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="41" x2="16" y2="41" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="49" x2="16" y2="49" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="57" x2="16" y2="57" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    {/* Right pins */}
    <line x1="66" y1="33" x2="74" y2="33" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    <line x1="66" y1="41" x2="74" y2="41" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    <line x1="66" y1="49" x2="74" y2="49" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    <line x1="66" y1="57" x2="74" y2="57" stroke="#1c1c13" strokeWidth="2" strokeLinecap="round"/>
    {/* Pin 1 marker */}
    <circle cx="27" cy="27" r="2" fill="#1c1c13" opacity="0.4"/>
  </svg>
);

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function ResultsPage() {
  const location = useLocation();
  const { results, name } = (location.state ?? {}) as {
    results?: DegreeRecommendation[];
    name?: string;
  };

  // Stable display-only sequence tag
  const seqTag = useMemo(() => {
    const chars = 'ABCDEF0123456789';
    return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }, []);

  // If no results in state, redirect back to the assessment
  if (!results || results.length === 0) {
    return <Navigate to="/assessment" replace />;
  }

  const top = results[0];
  const others = results.slice(1, 3);

  return (
    <div className="bg-cream min-h-full">
      <div className="mx-auto max-w-[1280px] px-10 pt-10 pb-16 flex flex-col gap-16">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="border-b-2 border-ink pb-[34px] flex items-end justify-between">
          <div className="flex flex-col gap-[15px]">
            <div className="bg-badge-blue border border-ink px-[13px] py-[5px] self-start">
              <span className="font-code text-white text-[10px] leading-[15px]">
                MATCH CONFIRMED
              </span>
            </div>
            <h1 className="font-display font-normal text-[48px] leading-[57.6px] tracking-[-0.48px] text-ink">
              Analysis Complete:
              <br />
              <em className="italic">{top.degree}</em>
            </h1>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="flex flex-col items-end">
              <span className="font-code font-bold text-muted text-[12px] tracking-[1.2px]">
                CONFIDENCE SCORE
              </span>
              <span className="font-code font-bold text-ink text-[18px] leading-[27px]">
                {top.percentage.toFixed(2)}%
              </span>
            </div>
            {/* Print / share icon box */}
            <div className="bg-cream-dark border-2 border-ink size-[48px] flex items-center justify-center shrink-0">
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <rect x="1" y="3" width="18" height="12" rx="1" stroke="#1c1c13" strokeWidth="1.5" />
                <path d="M7 3V1H13V3" stroke="#1c1c13" strokeWidth="1.5" />
                <rect x="4" y="7" width="12" height="1.5" fill="#1c1c13" />
                <rect x="4" y="10" width="8" height="1.5" fill="#1c1c13" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── Grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-12 gap-8">

          {/* Left column — 7 cols */}
          <div className="col-span-7 flex flex-col gap-8">

            {/* SYSTEM_METRICS panel */}
            <div className="bg-[#f7f4e5] border border-ink drop-shadow-[2px_2px_0px_#1c1c13] flex flex-col gap-4 p-[17px]">
              <div className="border-b border-ink pb-[9px] flex items-center justify-between">
                <span className="font-code font-bold text-ink text-[12px] tracking-[1.2px]">
                  SYSTEM_METRICS
                </span>
                <span className="font-code font-bold text-ink text-[12px] tracking-[1.2px]">
                  v.1984.0
                </span>
              </div>

              <div className="flex flex-col gap-4 pb-4">
                {results.slice(0, 3).map((rec, i) => (
                  <ScoreBar
                    key={rec.degree}
                    label={`#${i + 1} ${rec.degree}`}
                    percentage={rec.percentage}
                  />
                ))}
              </div>

              <div className="border-t border-dashed border-ink flex items-center justify-between pt-[9px] pb-2 px-2">
                <span className="font-code text-muted text-[11px] leading-[16.5px]">
                  * BASED ON RULE INFERENCE ENGINE
                </span>
                <span className="font-code text-muted text-[11px] leading-[16.5px]">
                  SEQ: {seqTag}
                </span>
              </div>
            </div>

            {/* "Why this fits you" narrative block */}
            <div className="bg-cream-dark border border-ink p-[33px] relative overflow-hidden flex flex-col gap-4">
              {/* Decorative fit icon */}
              <FitIcon />

              <h2 className="font-display font-normal text-[28px] leading-[42px] text-ink">
                Why this fits you
              </h2>

              <div className="flex flex-col gap-4 max-w-[672px]">
                <p className="font-body text-ink text-[18px] leading-[28.8px] whitespace-pre-line">
                  {top.explanation}
                </p>

                {top.rulesFired.length > 0 && (
                  <div className="flex flex-col gap-2 pt-2">
                    <span className="font-code font-bold text-muted text-[11px] tracking-[1.2px]">
                      KEY FACTORS IDENTIFIED
                    </span>
                    {top.rulesFired.map((rule) => (
                      <div
                        key={rule.ruleId}
                        className="flex items-start justify-between border-b border-border pb-1.5"
                      >
                        <span className="font-code text-ink text-[13px] leading-[20px]">
                          {rule.description}
                        </span>
                        <span className="font-code font-bold text-sticker-red text-[12px] shrink-0 pl-4">
                          +{rule.pointsAdded}pts
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column — 5 cols */}
          <div className="col-span-5 flex flex-col gap-8">

            {/* SUGGESTED CAREER PATHS panel */}
            <div className="bg-[#fdfaea] border-2 border-ink flex flex-col">
              {/* Panel header */}
              <div className="bg-ink px-4 py-2">
                <span className="font-code font-bold text-[#fdfaea] text-[12px] tracking-[1.2px]">
                  SUGGESTED CAREER PATHS
                </span>
              </div>

              {/* Career path rows */}
              <div className="flex flex-col px-4 pt-4">
                {top.careerPaths.length === 0 ? (
                  <p className="font-code text-muted text-[14px] pb-4">
                    No career paths available.
                  </p>
                ) : (
                  top.careerPaths.map((path, i) => (
                    <div
                      key={path}
                      className={[
                        'flex items-start justify-between pb-4',
                        i > 0 ? 'border-t-2 border-ink pt-[18px]' : '',
                      ].join(' ')}
                    >
                      <div className="flex flex-col">
                        <h3 className="font-display font-normal text-[24px] leading-[36px] text-ink">
                          {path}
                        </h3>
                        <span className="font-code text-muted text-[10px] leading-[15px]">
                          CAREER PATHWAY
                        </span>
                      </div>
                      <div className="flex flex-col items-end shrink-0 pl-4">
                        <span className="font-code font-bold text-sticker-red text-[16px] leading-[24px]">
                          #{i + 1}
                        </span>
                        <span className="font-code text-muted text-[10px] uppercase leading-[15px]">
                          SUGGESTED
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Analysis status + other matches panel */}
            <div className="bg-cream-dark border border-ink p-[17px] flex flex-col gap-4">
              {/* Status row */}
              <div className="flex items-start gap-4">
                <div className="border border-ink w-[90px] h-[90px] shrink-0 overflow-hidden relative">
                  <ChipThumb />
                  <div className="absolute inset-0 bg-white mix-blend-saturation" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-code font-bold text-ink text-[12px] tracking-[1.2px]">
                    ANALYSIS_COMPLETE
                  </span>
                  <div className="flex flex-col">
                    <span className="font-code text-ink text-[12px] leading-[15px]">
                      Session: {seqTag.slice(0, 12)}
                    </span>
                    <span className="font-code text-ink text-[12px] leading-[15px]">
                      Status: OPERATIONAL
                    </span>
                    <span className="font-code text-ink text-[12px] leading-[15px]">
                      Matches: {results.length}
                    </span>
                    <span className="font-code text-ink text-[12px] leading-[15px]">
                      Name: {name ?? 'Student'}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0px_0px_5px_0px_rgba(34,197,94,0.5)]" />
                    <div className="w-2 h-2 rounded-full bg-ink opacity-20" />
                    <div className="w-2 h-2 rounded-full bg-ink opacity-20" />
                  </div>
                </div>
              </div>

              {/* Other matches */}
              {others.length > 0 && (
                <div className="border-t border-ink pt-4 flex flex-col gap-1">
                  <span className="font-code font-bold text-muted text-[11px] tracking-[1.2px] pb-1">
                    OTHER MATCHES
                  </span>
                  {others.map((rec, i) => (
                    <RecommendationCard
                      key={rec.degree}
                      recommendation={rec}
                      rank={i + 2}
                      isTop={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Footer actions ────────────────────────────────────────── */}
        <div className="border-t border-ink pt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0px_0px_5px_0px_rgba(34,197,94,0.5)]" />
            <span className="font-code text-muted text-[12px] tracking-[1.2px]">
              ASSESSMENT FINALISED FOR {(name ?? 'STUDENT').toUpperCase()}
            </span>
          </div>
          <Link to="/assessment">
            <button className="bg-ink text-cream font-code text-[14px] px-8 py-4 drop-shadow-[4px_4px_0px_#1c1c13] cursor-pointer hover:opacity-90 transition-opacity">
              Start New Assessment
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
