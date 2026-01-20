import {
  Wifi,
  Coffee,
  Tv,
  Bath,
  BedDouble,
  Snowflake,
  ShieldCheck,
  Utensils,
  DoorOpen,
  Sparkles,
  ConciergeBell,
} from 'lucide-react';

import {
  AmenitiesKey,
  FacilityDescKey,
  FacilityTitleKey,
} from '@/types/i18n/keys';
import { Facility, AmenityItem } from '@/types/ui/amenitiesTypes';

export const ROOM_AMENITIES: AmenityItem[] = [
  { icon: Wifi, key: AmenitiesKey.WI_FI },
  { icon: Coffee, key: AmenitiesKey.COFFEE },
  { icon: Tv, key: AmenitiesKey.TV },
  { icon: Bath, key: AmenitiesKey.BATH },
  { icon: BedDouble, key: AmenitiesKey.BED },
  { icon: Snowflake, key: AmenitiesKey.AIR_CONDITIONING },
  { icon: Utensils, key: AmenitiesKey.DINING_SERVICE },
  { icon: DoorOpen, key: AmenitiesKey.BALCONY },
  { icon: Sparkles, key: AmenitiesKey.HOUSEKEEPING },
  { icon: Bath, key: AmenitiesKey.SPA },
  { icon: ConciergeBell, key: AmenitiesKey.CONCIERGE },
  { icon: ShieldCheck, key: AmenitiesKey.SECURITY },
];

export const HOTEL_AMENITIES_GALLERY: Facility[] = [
  {
    src: '/amenities/fitness.webp',
    title: FacilityTitleKey.FITNESS_CENTER,
    description: FacilityDescKey.FITNESS_CENTER,
  },
  {
    src: '/amenities/pool.webp',
    title: FacilityTitleKey.SWIMMING_POOL,
    description: FacilityDescKey.SWIMMING_POOL,
  },
  {
    src: '/amenities/bar.webp',
    title: FacilityTitleKey.HOTEL_BAR,
    description: FacilityDescKey.HOTEL_BAR,
  },
  {
    src: '/amenities/restaurant.webp',
    title: FacilityTitleKey.RESTAURANT,
    description: FacilityDescKey.RESTAURANT,
  },
  {
    src: '/amenities/lib.webp',
    title: FacilityTitleKey.LIBRARY,
    description: FacilityDescKey.LIBRARY,
  },
  {
    src: '/amenities/kid.webp',
    title: FacilityTitleKey.KIDS_AREA,
    description: FacilityDescKey.KIDS_AREA,
  },
  {
    src: '/amenities/outdoor-1.webp',
    title: FacilityTitleKey.OUTDOOR_AREA,
    description: FacilityDescKey.OUTDOOR_AREA,
  },
  {
    src: '/amenities/outdoor-2.webp',
    title: FacilityTitleKey.FIRE_PIT,
    description: FacilityDescKey.FIRE_PIT,
  },
];
