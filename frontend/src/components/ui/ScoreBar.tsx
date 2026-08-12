import { useEffect, useState } from 'react';

interface ScoreBarProps {
  label: string;
  percentage: number;
  color?: string;
}

export default function ScoreBar({ label, percentage }: ScoreBarProps) {
  // Animate the bar from 0 on mount
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(Math.min(percentage, 100)), 80);
    return () => clearTimeout(t);
  }, [percentage]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center justify-between">
        <span className="font-code text-[16px] text-ink uppercase leading-[24px]">{label}</span>
        <span className="font-code text-[16px] text-ink uppercase leading-[24px]">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="bg-cream-light border border-ink h-6 flex items-center px-[3px] py-px">
        <div
          className="bg-ink h-4 transition-all duration-700 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
