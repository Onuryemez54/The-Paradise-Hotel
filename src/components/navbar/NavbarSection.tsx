import { BrandLogo } from '../common/BrandLogo';
import { BrandName } from '../common/BrandName';
import { NavbarScrolled } from './NavbarScrolled';
import Navigation from './Navigation';

export const NavbarSection = () => {
  return (
    <NavbarScrolled>
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <BrandLogo showText>
          <BrandName variant="main" />
        </BrandLogo>
        <Navigation />
      </div>
    </NavbarScrolled>
  );
};
