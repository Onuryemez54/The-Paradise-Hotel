'use client';
import { FilterValue } from '@/types/i18n/keys';
import { cn } from '@/utils/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface FilterOperationsProps {
  options: { value: FilterValue; label: string }[];
  activeFilter: string;
}

export const FilterOperations = ({
  options,
  activeFilter,
}: FilterOperationsProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(filter: FilterValue) {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div
      data-testid="rooms-filter"
      className="border-primary-800 bg-primary-800 font-body flex border"
    >
      {options.map((option) => (
        <button
          className={cn(
            'font-body hover:bg-primary-700 px-2 py-2 text-xs font-medium transition-colors md:px-4 md:text-sm',
            activeFilter === option.value
              ? 'bg-primary-700 text-primary-100'
              : 'text-primary-200'
          )}
          onClick={() => handleFilter(option.value)}
          key={option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
