import { describe, it, expect } from '@jest/globals';

function formatNumber(num: number): string {
  if (num >= 1e12) {
    return `$${(num / 1e12).toFixed(2)}T`
  }
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(2)}B`
  }
  if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(2)}M`
  }
  if (num >= 1e3) {
    return `$${(num / 1e3).toFixed(2)}K`
  }
  return `$${num.toFixed(2)}`
}

function formatPrice(price: number): string {
  if (price >= 1) {
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  return `$${price.toFixed(4)}`
}

describe('formatNumber', () => {
  describe('Trillion formatting', () => {
    it('should format numbers >= 1 trillion with T suffix', () => {
      expect(formatNumber(1e12)).toBe('$1.00T');
    });

    it('should format 5.5 trillion correctly', () => {
      expect(formatNumber(5.5e12)).toBe('$5.50T');
    });

    it('should format large trillion numbers with 2 decimal places', () => {
      expect(formatNumber(123.456e12)).toBe('$123.46T');
    });
  });

  describe('Billion formatting', () => {
    it('should format numbers >= 1 billion with B suffix', () => {
      expect(formatNumber(1e9)).toBe('$1.00B');
    });

    it('should format 847.5 billion correctly', () => {
      expect(formatNumber(847.5e9)).toBe('$847.50B');
    });

    it('should format 42.1 billion with 2 decimal places', () => {
      expect(formatNumber(42.1e9)).toBe('$42.10B');
    });

    it('should format 999.99 billion correctly', () => {
      expect(formatNumber(999.99e9)).toBe('$999.99B');
    });
  });

  describe('Million formatting', () => {
    it('should format numbers >= 1 million with M suffix', () => {
      expect(formatNumber(1e6)).toBe('$1.00M');
    });

    it('should format 28.5 million correctly', () => {
      expect(formatNumber(28.5e6)).toBe('$28.50M');
    });

    it('should format 890 million correctly', () => {
      expect(formatNumber(890e6)).toBe('$890.00M');
    });
  });

  describe('Thousand formatting', () => {
    it('should format numbers >= 1 thousand with K suffix', () => {
      expect(formatNumber(1e3)).toBe('$1.00K');
    });

    it('should format 5.5 thousand correctly', () => {
      expect(formatNumber(5.5e3)).toBe('$5.50K');
    });

    it('should format 999.99 thousand correctly', () => {
      expect(formatNumber(999.99e3)).toBe('$999.99K');
    });
  });

  describe('Small numbers formatting', () => {
    it('should format numbers less than 1000 with 2 decimal places', () => {
      expect(formatNumber(999)).toBe('$999.00');
    });

    it('should format 100.50 correctly', () => {
      expect(formatNumber(100.5)).toBe('$100.50');
    });

    it('should format 0 correctly', () => {
      expect(formatNumber(0)).toBe('$0.00');
    });

    it('should format 1.23 correctly', () => {
      expect(formatNumber(1.23)).toBe('$1.23');
    });
  });

  describe('Edge cases', () => {
    it('should handle very small positive numbers', () => {
      expect(formatNumber(0.01)).toBe('$0.01');
    });

    it('should handle boundary between thousands and millions', () => {
      expect(formatNumber(999999)).toBe('$1000.00K');
    });

    it('should handle boundary between millions and billions', () => {
      expect(formatNumber(999999999)).toBe('$1000.00M');
    });
  });
});

describe('formatPrice', () => {
  describe('Prices >= $1', () => {
    it('should format price of $1 with commas and 2 decimals', () => {
      expect(formatPrice(1)).toBe('$1.00');
    });

    it('should format Bitcoin-like prices with commas', () => {
      expect(formatPrice(43250.67)).toBe('$43,250.67');
    });

    it('should format Ethereum-like prices with commas', () => {
      expect(formatPrice(2580.34)).toBe('$2,580.34');
    });

    it('should format large prices with proper comma separation', () => {
      expect(formatPrice(123456.78)).toBe('$123,456.78');
    });

    it('should always show 2 decimal places for prices >= $1', () => {
      expect(formatPrice(100)).toBe('$100.00');
    });

    it('should round to 2 decimal places for prices >= $1', () => {
      expect(formatPrice(99.999)).toBe('$100.00');
    });
  });

  describe('Prices < $1', () => {
    it('should format stablecoin-like prices with 4 decimals', () => {
      expect(formatPrice(0.9999)).toBe('$0.9999');
    });

    it('should format prices like XRP with 4 decimals', () => {
      expect(formatPrice(0.6234)).toBe('$0.6234');
    });

    it('should format prices like Cardano with 4 decimals', () => {
      expect(formatPrice(0.4567)).toBe('$0.4567');
    });

    it('should format very small prices with 4 decimals', () => {
      expect(formatPrice(0.0001)).toBe('$0.0001');
    });

    it('should format 0.5 with 4 decimals', () => {
      expect(formatPrice(0.5)).toBe('$0.5000');
    });
  });

  describe('Edge cases', () => {
    it('should handle price of exactly $1.00', () => {
      expect(formatPrice(1.0)).toBe('$1.00');
    });

    it('should handle price of $0.9999 (just below $1)', () => {
      expect(formatPrice(0.9999)).toBe('$0.9999');
    });

    it('should handle price of $1.0001 (just above $1)', () => {
      expect(formatPrice(1.0001)).toBe('$1.00');
    });

    it('should handle zero price', () => {
      expect(formatPrice(0)).toBe('$0.0000');
    });

    it('should handle very small positive numbers', () => {
      expect(formatPrice(0.00001)).toBe('$0.0000');
    });
  });

  describe('Real cryptocurrency price examples', () => {
    it('should format Bitcoin price correctly', () => {
      const btcPrice = 43250.67;
      expect(formatPrice(btcPrice)).toBe('$43,250.67');
    });

    it('should format Ethereum price correctly', () => {
      const ethPrice = 2580.34;
      expect(formatPrice(ethPrice)).toBe('$2,580.34');
    });

    it('should format Tether price correctly', () => {
      const usdtPrice = 1.0;
      expect(formatPrice(usdtPrice)).toBe('$1.00');
    });

    it('should format BNB price correctly', () => {
      const bnbPrice = 315.78;
      expect(formatPrice(bnbPrice)).toBe('$315.78');
    });

    it('should format Solana price correctly', () => {
      const solPrice = 98.45;
      expect(formatPrice(solPrice)).toBe('$98.45');
    });

    it('should format XRP price correctly', () => {
      const xrpPrice = 0.6234;
      expect(formatPrice(xrpPrice)).toBe('$0.6234');
    });

    it('should format Cardano price correctly', () => {
      const adaPrice = 0.4567;
      expect(formatPrice(adaPrice)).toBe('$0.4567');
    });
  });
});
