// TODO: Implement progress bar component
// Props: current (number), total (number)
// Shows step X of Y with a visual fill bar

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div>
      <span>Step {current} of {total}</span>
    </div>
  );
}
