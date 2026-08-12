import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Assessment', to: '/assessment' },
];

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="bg-cream border-b-2 border-ink px-8 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 no-underline group">
        <div className="w-6 h-6 bg-ink flex items-center justify-center shrink-0">
          <div className="w-2 h-2 bg-terminal" />
        </div>
        <span className="font-code font-bold text-ink text-[14px] tracking-[1.4px] uppercase">
          EXPERTOS
        </span>
        <span className="font-code text-muted text-[12px] tracking-[0.6px]">
          v1.0
        </span>
      </Link>

      <nav className="flex items-center gap-8">
        {NAV_LINKS.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className={[
              'font-code text-[12px] tracking-[1.2px] uppercase no-underline transition-colors',
              pathname === to
                ? 'text-ink font-bold'
                : 'text-muted hover:text-ink',
            ].join(' ')}
          >
            {label}
          </Link>
        ))}
        <Link to="/assessment">
          <button className="bg-ink text-cream font-code font-bold text-[12px] tracking-[1.2px] uppercase px-5 py-2 drop-shadow-[2px_2px_0px_#1c1c13] cursor-pointer border-2 border-ink hover:bg-cream hover:text-ink transition-colors">
            Start Now
          </button>
        </Link>
      </nav>
    </header>
  );
}
