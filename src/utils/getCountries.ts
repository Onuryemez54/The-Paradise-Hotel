import { ErrorKey } from '@/types/i18n/keys';

export interface getCountriesResponse {
  name: string;
  flag: string;
}
export const getCountries = async (): Promise<getCountriesResponse[]> => {
  const res = await fetch('https://restcountries.com/v2/all?fields=name,flag', {
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  if (!res.ok) {
    throw new Error(ErrorKey.COUNTRIES_FETCH_FAILED);
  }

  const countries = await res.json();
  return countries as getCountriesResponse[];
};
