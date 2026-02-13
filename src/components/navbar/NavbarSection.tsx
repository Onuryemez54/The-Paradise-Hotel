'use client';
import { BrandLogo } from '../common/BrandLogo';
import { BrandName } from '../common/BrandName';
import { NavbarScrolled } from './NavbarScrolled';
import { Navigation } from './Navigation';

export const NavbarSection = () => {
  return (
    <NavbarScrolled>
      <BrandLogo>
        <BrandName variant="main" />
      </BrandLogo>
      <Navigation />
    </NavbarScrolled>
  );
};
