
export const convertUSDToINR = (amountUSD: number, exchangeRate: number = 83.5): number => {
  return Number((amountUSD * exchangeRate).toFixed(2));
};

export const formatCurrency = (amount: number, currency: 'USD' | 'INR' = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency === 'USD' ? 'USD' : 'INR'
  }).format(amount);
};
