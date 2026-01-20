import { LucideIcon } from 'lucide-react';
import {
  AmenitiesKey,
  FacilityDescKey,
  FacilityTitleKey,
} from '@/types/i18n/keys';

export type AmenityItem = {
  icon: LucideIcon;
  key: AmenitiesKey;
};

export type Facility = {
  src: string;
  title: FacilityTitleKey;
  description: FacilityDescKey;
};
