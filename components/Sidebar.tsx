const STEPS = [
  { num: 1, label: "YOUR INFO", description: "Your information" },
  { num: 2, label: "SELECT PLAN", description: "Select plan" },
  { num: 3, label: "ADD-ONS", description: "Add-ons" },
  { num: 4, label: "SUMMARY", description: "Summary" },
] as const;

interface SidebarProps {
  currentStep: number;
  onStepSelect?: (step: number) => void;
}

export function Sidebar({ currentStep, onStepSelect }: SidebarProps) {
  const displayedStep = currentStep;
  const maxReachable = displayedStep;

  return (
    <aside
      className="sidebar"
      style={{
        backgroundImage: "url(/assets/images/bg-sidebar-desktop.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <nav className="sidebar__steps" aria-label="Form steps">
        {STEPS.map(({ num, label, description }) => {
          const isActive = num === displayedStep;
          const isReachable = num <= maxReachable;
          const content = (
            <>
              <span
                className={`sidebar__number ${isActive ? "sidebar__number--active" : ""}`}
                aria-hidden
              >
                {num}
              </span>
              <div className="sidebar__labels">
                <span className="sidebar__step-label">STEP {num}</span>
                <span className="sidebar__title">{label}</span>
              </div>
            </>
          );

          if (onStepSelect && isReachable) {
            return (
              <button
                key={num}
                type="button"
                className="sidebar__step sidebar__step--button"
                onClick={() => onStepSelect(num)}
                aria-label={`Step ${num} of 4: ${description}`}
                aria-current={isActive ? "step" : undefined}
              >
                {content}
              </button>
            );
          }

          return (
            <div
              key={num}
              className="sidebar__step"
              aria-label={`Step ${num} of 4: ${description}`}
              aria-current={isActive ? "step" : undefined}
            >
              {content}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
