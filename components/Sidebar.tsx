const STEPS = [
  { num: 1, label: "YOUR INFO" },
  { num: 2, label: "SELECT PLAN" },
  { num: 3, label: "ADD-ONS" },
  { num: 4, label: "SUMMARY" },
] as const;

interface SidebarProps {
  currentStep: number;
}

export function Sidebar({ currentStep }: SidebarProps) {
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
        {STEPS.map(({ num, label }) => {
          const isActive = num === currentStep;
          return (
            <div key={num} className="sidebar__step">
              <span
                className={`sidebar__number ${isActive ? "sidebar__number--active" : ""}`}
                aria-current={isActive ? "step" : undefined}
              >
                {num}
              </span>
              <div className="sidebar__labels">
                <span className="sidebar__step-label">STEP {num}</span>
                <span className="sidebar__title">{label}</span>
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
