import { NavLink } from "@/components/NavLink";

const TopNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <span className="text-sm font-semibold tracking-tight text-foreground">
          Talent Acquisition <span className="text-primary">Demos</span>
        </span>
        <div className="flex gap-1">
          <NavLink
            to="/workflow-hero"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeClassName="text-foreground bg-secondary"
          >
            Workflow Hero
          </NavLink>
          <NavLink
            to="/personalization-demo"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeClassName="text-foreground bg-secondary"
          >
            Personalization
          </NavLink>
          <NavLink
            to="/docs"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeClassName="text-foreground bg-secondary"
          >
            Docs
          </NavLink>
          <NavLink
            to="/design-system"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeClassName="text-foreground bg-secondary"
          >
            System
          </NavLink>
          <NavLink
            to="/a11y"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeClassName="text-foreground bg-secondary"
          >
            A11y
          </NavLink>
          <NavLink
            to="/case-study"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeClassName="text-foreground bg-secondary"
          >
            Case Study
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
