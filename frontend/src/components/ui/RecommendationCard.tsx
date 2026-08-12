import type { DegreeRecommendation } from '../../lib/types';

interface RecommendationCardProps {
  recommendation: DegreeRecommendation;
  rank: number;
  isTop: boolean;
}

export default function RecommendationCard({ recommendation, rank }: RecommendationCardProps) {
  return (
    <div className="flex items-start justify-between py-2">
      <div className="flex flex-col gap-0.5">
        <span className="font-code text-muted text-[10px] tracking-[1.2px] leading-[15px]">
          #{rank} MATCH
        </span>
        <h3 className="font-display font-normal text-[20px] leading-[30px] text-ink">
          {recommendation.degree}
        </h3>
      </div>
      <div className="flex flex-col items-end shrink-0 pl-4">
        <span className="font-code font-bold text-sticker-red text-[14px] leading-[21px]">
          {Math.round(recommendation.percentage)}%
        </span>
        <span className="font-code text-muted text-[10px] uppercase leading-[15px]">
          MATCH SCORE
        </span>
      </div>
    </div>
  );
}
