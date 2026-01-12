import { NavLinks } from './NavLinks';

export const DesktopNavigation = () => {
  return (
    <ul className="hidden items-center md:flex md:gap-2 lg:gap-4">
      <NavLinks />
    </ul>
  );
};
