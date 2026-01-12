import {
  Wifi,
  Coffee,
  Tv,
  Bath,
  BedDouble,
  Snowflake,
  Dumbbell,
  Car,
  ShieldCheck,
  Utensils,
  DoorOpen,
  Sparkles,
  Waves,
  ConciergeBell,
  Wine,
  Trees,
  Users,
} from 'lucide-react';
import { AmenityItem } from '@/types/amenitiesTypes';
import { AmenitiesKey } from '@/types/i18n/keys';

export const ROOM_AMENITIES: AmenityItem[] = [
  { icon: Wifi, key: AmenitiesKey.WI_FI },
  { icon: Coffee, key: AmenitiesKey.COFFEE },
  { icon: Tv, key: AmenitiesKey.TV },
  { icon: Bath, key: AmenitiesKey.BATH },
  { icon: BedDouble, key: AmenitiesKey.BED },
  { icon: Snowflake, key: AmenitiesKey.AIR_CONDITIONING },
  { icon: Dumbbell, key: AmenitiesKey.FITNESS },
  { icon: Car, key: AmenitiesKey.PARKING },
  { icon: ShieldCheck, key: AmenitiesKey.SECURITY },
  { icon: Utensils, key: AmenitiesKey.DINING_SERVICE },
  { icon: DoorOpen, key: AmenitiesKey.BALCONY },
  { icon: Sparkles, key: AmenitiesKey.HOUSEKEEPING },
];

export const HOTEL_AMENITIES: AmenityItem[] = [
  { icon: Waves, key: AmenitiesKey.OUTDOOR },
  { icon: Bath, key: AmenitiesKey.SPA },
  { icon: Dumbbell, key: AmenitiesKey.FITNESS },
  { icon: Utensils, key: AmenitiesKey.RESTAURANT },
  { icon: Wine, key: AmenitiesKey.BAR },
  { icon: Car, key: AmenitiesKey.PARKING },
  { icon: Wifi, key: AmenitiesKey.WI_FI },
  { icon: ConciergeBell, key: AmenitiesKey.CONCIERGE },
  { icon: BedDouble, key: AmenitiesKey.FAMILY_ROOMS },
  { icon: ShieldCheck, key: AmenitiesKey.SECURITY },
  { icon: Trees, key: AmenitiesKey.FOREST },
  { icon: Users, key: AmenitiesKey.EVENT },
];
