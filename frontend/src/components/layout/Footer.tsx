export default function Footer() {
  return (
    <footer className="bg-ink border-t-2 border-ink px-8 py-8">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-cream-dark flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 bg-terminal" />
            </div>
            <span className="font-code font-bold text-cream-dark text-[13px] tracking-[1.3px] uppercase">
              EXPERTOS
            </span>
          </div>
          <p className="font-code text-[#e6e3d4] text-[11px] tracking-[0.6px] opacity-60 max-w-[320px]">
            WID2001 — Degree Recommendation Expert System
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="border border-[#e6e3d4] px-3 py-1.5 flex items-center gap-2 opacity-80">
            <div className="w-4 h-4 bg-accent rounded-sm flex items-center justify-center">
              <span className="text-white text-[9px] font-bold leading-none">4</span>
            </div>
            <span className="font-code text-cream-dark text-[10px] tracking-[1px] uppercase">
              SDG Quality Education
            </span>
          </div>
          <p className="font-code text-[#e6e3d4] text-[11px] tracking-[0.6px] opacity-40">
            Built with knowledge &amp; rules
          </p>
        </div>
      </div>
    </footer>
  );
}
