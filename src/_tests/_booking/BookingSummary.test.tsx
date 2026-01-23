import { beforeEach, describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BookingSummary } from '@/components/common/booking/BookingSummary';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

vi.mock('@/context/PriceRatesContext', () => ({
  useRates: () => ({
    currency: 'USD',
    rate: 1,
  }),
}));

vi.mock('@/hooks/usePrice', () => ({
  usePrice: (totalPrice: number) => ({
    formatPrice: () => `${totalPrice} $`,
    isLoading: false,
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('calls resetAll when clicking reset button, BookingSummary', () => {
  it('calls resetAll on reset button click', async () => {
    const user = userEvent.setup();
    const handleResetMock = vi.fn();

    render(
      <BookingSummary
        totalPrice={500}
        numNights={5}
        numGuests={2}
        handleReset={handleResetMock}
      />
    );

    const resetButton = screen.getByRole('button');
    expect(resetButton).toBeInTheDocument();

    await user.click(resetButton);

    expect(handleResetMock).toHaveBeenCalledTimes(1);
  });
});

describe('BookingSummary integration', () => {
  const Wrapper = () => {
    const [showSummary, setShowSummary] = useState(true);

    if (!showSummary) return <p data-testid="summary-closed">Summary Closed</p>;

    return (
      <BookingSummary
        totalPrice={500}
        numNights={5}
        numGuests={2}
        handleReset={() => setShowSummary(false)}
      />
    );
  };

  it('removes BookingSummary from screen when reset button is clicked', async () => {
    const user = userEvent.setup();

    render(<Wrapper />);

    expect(screen.getByText('500 $')).toBeInTheDocument();

    const resetButton = screen.getByRole('button');
    await user.click(resetButton);

    expect(screen.queryByText('500 $')).not.toBeInTheDocument();

    expect(screen.getByTestId('summary-closed')).toBeInTheDocument();
  });
});
