import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Component from '../crypto-ranking-board';

describe('CryptoRankingBoard Component', () => {
  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      render(<Component />);
      expect(screen.getByText('암호화폐 순위')).toBeInTheDocument();
    });

    it('should render the main title with Bitcoin icon', () => {
      render(<Component />);
      const title = screen.getByText('암호화폐 순위');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('text-2xl', 'font-bold', 'text-white');
    });

    it('should render the footer text', () => {
      render(<Component />);
      expect(screen.getByText(/데이터는 60초마다 업데이트됩니다/)).toBeInTheDocument();
      expect(screen.getByText(/Powered by CoinAPI/)).toBeInTheDocument();
    });
  });

  describe('Table Structure', () => {
    it('should render table with correct headers', () => {
      render(<Component />);
      expect(screen.getByText('순위')).toBeInTheDocument();
      expect(screen.getByText('이름')).toBeInTheDocument();
      expect(screen.getByText('가격')).toBeInTheDocument();
      expect(screen.getByText('24시간 변동률')).toBeInTheDocument();
      expect(screen.getByText('시가총액')).toBeInTheDocument();
      expect(screen.getByText('거래량 (24시간)')).toBeInTheDocument();
    });

    it('should render all 8 cryptocurrency rows', () => {
      render(<Component />);
      const bitcoinRow = screen.getByText('비트코인');
      const ethereumRow = screen.getByText('이더리움');
      const tetherRow = screen.getByText('테더');
      const bnbRow = screen.getByText('바이낸스 코인');
      const solanaRow = screen.getByText('솔라나');
      const xrpRow = screen.getByText('리플');
      const usdcRow = screen.getByText('USD 코인');
      const cardanoRow = screen.getByText('카르다노');

      expect(bitcoinRow).toBeInTheDocument();
      expect(ethereumRow).toBeInTheDocument();
      expect(tetherRow).toBeInTheDocument();
      expect(bnbRow).toBeInTheDocument();
      expect(solanaRow).toBeInTheDocument();
      expect(xrpRow).toBeInTheDocument();
      expect(usdcRow).toBeInTheDocument();
      expect(cardanoRow).toBeInTheDocument();
    });
  });

  describe('Cryptocurrency Data Display', () => {
    it('should display Bitcoin with correct symbol and rank', () => {
      render(<Component />);
      expect(screen.getByText('비트코인')).toBeInTheDocument();
      expect(screen.getByText('BTC')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should display Ethereum with correct symbol and rank', () => {
      render(<Component />);
      expect(screen.getByText('이더리움')).toBeInTheDocument();
      expect(screen.getByText('ETH')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should display all cryptocurrency symbols', () => {
      render(<Component />);
      const symbols = ['BTC', 'ETH', 'USDT', 'BNB', 'SOL', 'XRP', 'USDC', 'ADA'];
      symbols.forEach(symbol => {
        expect(screen.getByText(symbol)).toBeInTheDocument();
      });
    });

    it('should display ranks from 1 to 8', () => {
      render(<Component />);
      for (let rank = 1; rank <= 8; rank++) {
        expect(screen.getByText(rank.toString())).toBeInTheDocument();
      }
    });
  });

  describe('Price Formatting', () => {
    it('should display Bitcoin price with comma separator', () => {
      render(<Component />);
      expect(screen.getByText('$43,250.67')).toBeInTheDocument();
    });

    it('should display Ethereum price with comma separator', () => {
      render(<Component />);
      expect(screen.getByText('$2,580.34')).toBeInTheDocument();
    });

    it('should display stablecoin prices (USDT, USDC) as $1.00', () => {
      render(<Component />);
      const dollarOnes = screen.getAllByText('$1.00');
      expect(dollarOnes.length).toBeGreaterThanOrEqual(2);
    });

    it('should display XRP price with 4 decimal places', () => {
      render(<Component />);
      expect(screen.getByText('$0.6234')).toBeInTheDocument();
    });

    it('should display Cardano price with 4 decimal places', () => {
      render(<Component />);
      expect(screen.getByText('$0.4567')).toBeInTheDocument();
    });

    it('should display Solana price correctly', () => {
      render(<Component />);
      expect(screen.getByText('$98.45')).toBeInTheDocument();
    });
  });

  describe('24h Change Display', () => {
    it('should display positive changes with + prefix', () => {
      render(<Component />);
      expect(screen.getByText('+2.45%')).toBeInTheDocument();
      expect(screen.getByText('+3.67%')).toBeInTheDocument();
      expect(screen.getByText('+5.23%')).toBeInTheDocument();
    });

    it('should display negative changes without extra prefix', () => {
      render(<Component />);
      expect(screen.getByText('-1.23%')).toBeInTheDocument();
      expect(screen.getByText('-2.87%')).toBeInTheDocument();
    });

    it('should display small positive changes correctly', () => {
      render(<Component />);
      expect(screen.getByText('+0.02%')).toBeInTheDocument();
      expect(screen.getByText('+1.89%')).toBeInTheDocument();
    });

    it('should display small negative changes correctly', () => {
      render(<Component />);
      expect(screen.getByText('-0.01%')).toBeInTheDocument();
    });
  });

  describe('24h Change Color Coding', () => {
    it('should apply green styling to positive changes', () => {
      const { container } = render(<Component />);
      const positiveChange = screen.getByText('+2.45%');
      const badge = positiveChange.closest('.bg-green-900\\/30');
      expect(badge).toBeTruthy();
    });

    it('should apply red styling to negative changes', () => {
      const { container } = render(<Component />);
      const negativeChange = screen.getByText('-1.23%');
      const badge = negativeChange.closest('.bg-red-900\\/30');
      expect(badge).toBeTruthy();
    });

    it('should show TrendingUp icon for positive changes', () => {
      const { container } = render(<Component />);
      const trendingUpIcons = container.querySelectorAll('svg.lucide-trending-up');
      expect(trendingUpIcons.length).toBeGreaterThan(0);
    });

    it('should show TrendingDown icon for negative changes', () => {
      const { container } = render(<Component />);
      const trendingDownIcons = container.querySelectorAll('svg.lucide-trending-down');
      expect(trendingDownIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Market Cap Display', () => {
    it('should display Bitcoin market cap in billions', () => {
      render(<Component />);
      expect(screen.getByText('$847.50B')).toBeInTheDocument();
    });

    it('should display Ethereum market cap in billions', () => {
      render(<Component />);
      expect(screen.getByText('$310.20B')).toBeInTheDocument();
    });

    it('should display Tether market cap in billions', () => {
      render(<Component />);
      expect(screen.getByText('$95.80B')).toBeInTheDocument();
    });

    it('should display smaller market caps correctly', () => {
      render(<Component />);
      expect(screen.getByText('$47.30B')).toBeInTheDocument();
      expect(screen.getByText('$43.90B')).toBeInTheDocument();
      expect(screen.getByText('$35.20B')).toBeInTheDocument();
      expect(screen.getByText('$32.10B')).toBeInTheDocument();
      expect(screen.getByText('$16.20B')).toBeInTheDocument();
    });
  });

  describe('Volume Display', () => {
    it('should display Bitcoin volume in billions', () => {
      render(<Component />);
      expect(screen.getByText('$28.50B')).toBeInTheDocument();
    });

    it('should display Ethereum volume in billions', () => {
      render(<Component />);
      expect(screen.getByText('$15.20B')).toBeInTheDocument();
    });

    it('should display Tether volume in billions', () => {
      render(<Component />);
      expect(screen.getByText('$42.10B')).toBeInTheDocument();
    });

    it('should display volumes in billions format', () => {
      render(<Component />);
      const volumeTexts = [
        '$28.50B', '$15.20B', '$42.10B', '$1.80B',
        '$2.10B', '$1.50B', '$5.80B', '$890.00M'
      ];
      volumeTexts.forEach(text => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
    });
  });

  describe('Cryptocurrency Images', () => {
    it('should render images for all cryptocurrencies', () => {
      const { container } = render(<Component />);
      const images = container.querySelectorAll('img');
      expect(images.length).toBe(8);
    });

    it('should have correct alt text for Bitcoin', () => {
      render(<Component />);
      const btcImage = screen.getByAltText('비트코인');
      expect(btcImage).toBeInTheDocument();
    });

    it('should have correct alt text for Ethereum', () => {
      render(<Component />);
      const ethImage = screen.getByAltText('이더리움');
      expect(ethImage).toBeInTheDocument();
    });

    it('should have correct src paths for images', () => {
      const { container } = render(<Component />);
      const btcImage = screen.getByAltText('비트코인');
      expect(btcImage).toHaveAttribute('src', '/coin/bitcoin.png');
    });

    it('should have rounded styling on images', () => {
      const { container } = render(<Component />);
      const images = container.querySelectorAll('img');
      images.forEach(img => {
        expect(img).toHaveClass('rounded-full');
      });
    });
  });

  describe('Responsive Design Classes', () => {
    it('should have hidden class on market cap column for mobile', () => {
      const { container } = render(<Component />);
      const marketCapHeader = screen.getByText('시가총액').closest('th');
      expect(marketCapHeader).toHaveClass('hidden', 'md:table-cell');
    });

    it('should have hidden class on volume column for mobile/tablet', () => {
      const { container } = render(<Component />);
      const volumeHeader = screen.getByText('거래량 (24시간)').closest('th');
      expect(volumeHeader).toHaveClass('hidden', 'lg:table-cell');
    });

    it('should have responsive table wrapper', () => {
      const { container } = render(<Component />);
      const tableWrapper = container.querySelector('.overflow-x-auto');
      expect(tableWrapper).toBeInTheDocument();
    });
  });

  describe('Styling and Theme', () => {
    it('should have dark theme background', () => {
      const { container } = render(<Component />);
      const mainDiv = container.querySelector('.bg-gray-950');
      expect(mainDiv).toBeInTheDocument();
    });

    it('should have dark theme card', () => {
      const { container } = render(<Component />);
      const card = container.querySelector('.bg-gray-900');
      expect(card).toBeInTheDocument();
    });

    it('should have alternating row backgrounds', () => {
      const { container } = render(<Component />);
      const evenRow = container.querySelector('.bg-gray-900\\/20');
      const oddRow = container.querySelector('.bg-gray-900\\/40');
      expect(evenRow).toBeInTheDocument();
      expect(oddRow).toBeInTheDocument();
    });

    it('should have hover effect on rows', () => {
      const { container } = render(<Component />);
      const rows = container.querySelectorAll('tbody tr');
      rows.forEach(row => {
        expect(row).toHaveClass('hover:bg-gray-800/30');
      });
    });

    it('should have gradient background on Bitcoin icon', () => {
      const { container } = render(<Component />);
      const iconDiv = container.querySelector('.bg-gradient-to-r.from-orange-500.to-yellow-500');
      expect(iconDiv).toBeInTheDocument();
    });
  });

  describe('Table Layout', () => {
    it('should have 6 column headers', () => {
      const { container } = render(<Component />);
      const headers = container.querySelectorAll('thead th');
      expect(headers.length).toBe(6);
    });

    it('should have 8 data rows', () => {
      const { container } = render(<Component />);
      const rows = container.querySelectorAll('tbody tr');
      expect(rows.length).toBe(8);
    });

    it('should have correct text alignment for headers', () => {
      render(<Component />);
      const rankHeader = screen.getByText('순위').closest('th');
      const priceHeader = screen.getByText('가격').closest('th');

      expect(rankHeader).toHaveClass('text-left');
      expect(priceHeader).toHaveClass('text-right');
    });
  });

  describe('Data Accuracy', () => {
    it('should display exact Bitcoin data', () => {
      render(<Component />);
      expect(screen.getByText('비트코인')).toBeInTheDocument();
      expect(screen.getByText('BTC')).toBeInTheDocument();
      expect(screen.getByText('$43,250.67')).toBeInTheDocument();
      expect(screen.getByText('+2.45%')).toBeInTheDocument();
      expect(screen.getByText('$847.50B')).toBeInTheDocument();
      expect(screen.getByText('$28.50B')).toBeInTheDocument();
    });

    it('should display exact Ethereum data', () => {
      render(<Component />);
      expect(screen.getByText('이더리움')).toBeInTheDocument();
      expect(screen.getByText('ETH')).toBeInTheDocument();
      expect(screen.getByText('$2,580.34')).toBeInTheDocument();
      expect(screen.getByText('-1.23%')).toBeInTheDocument();
      expect(screen.getByText('$310.20B')).toBeInTheDocument();
      expect(screen.getByText('$15.20B')).toBeInTheDocument();
    });

    it('should display exact Solana data', () => {
      render(<Component />);
      expect(screen.getByText('솔라나')).toBeInTheDocument();
      expect(screen.getByText('SOL')).toBeInTheDocument();
      expect(screen.getByText('$98.45')).toBeInTheDocument();
      expect(screen.getByText('+5.23%')).toBeInTheDocument();
      expect(screen.getByText('$43.90B')).toBeInTheDocument();
      expect(screen.getByText('$2.10B')).toBeInTheDocument();
    });
  });

  describe('Card Component Integration', () => {
    it('should use Card component with proper styling', () => {
      const { container } = render(<Component />);
      const card = container.querySelector('.bg-gray-900.border-gray-800');
      expect(card).toBeInTheDocument();
    });

    it('should have CardHeader with border', () => {
      const { container } = render(<Component />);
      const header = container.querySelector('.border-b.border-gray-800');
      expect(header).toBeInTheDocument();
    });

    it('should have CardContent with zero padding', () => {
      const { container } = render(<Component />);
      const content = container.querySelector('.p-0');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have alt text for all images', () => {
      render(<Component />);
      const coinNames = [
        '비트코인', '이더리움', '테더', '바이낸스 코인',
        '솔라나', '리플', 'USD 코인', '카르다노'
      ];
      coinNames.forEach(name => {
        expect(screen.getByAltText(name)).toBeInTheDocument();
      });
    });

    it('should have semantic table structure', () => {
      const { container } = render(<Component />);
      expect(container.querySelector('table')).toBeInTheDocument();
      expect(container.querySelector('thead')).toBeInTheDocument();
      expect(container.querySelector('tbody')).toBeInTheDocument();
    });

    it('should use proper heading hierarchy', () => {
      const { container } = render(<Component />);
      const title = screen.getByText('암호화폐 순위');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('text-2xl');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero change percentage', () => {
      render(<Component />);
      const zeroChanges = screen.getAllByText(/[+-]0\.\d+%/);
      expect(zeroChanges.length).toBeGreaterThan(0);
    });

    it('should render without errors when all data is present', () => {
      expect(() => render(<Component />)).not.toThrow();
    });

    it('should maintain consistent rank order', () => {
      const { container } = render(<Component />);
      const ranks = Array.from(container.querySelectorAll('tbody tr td:first-child')).map(
        td => td.textContent
      );
      expect(ranks).toEqual(['1', '2', '3', '4', '5', '6', '7', '8']);
    });
  });

  describe('Number Formatting Edge Cases', () => {
    it('should handle various number ranges in display', () => {
      const { container } = render(<Component />);

      const billionValues = screen.getAllByText(/\$\d+\.\d{2}B/);
      expect(billionValues.length).toBeGreaterThan(0);

      const millionValues = screen.getAllByText(/\$\d+\.\d{2}M/);
      expect(millionValues.length).toBeGreaterThan(0);
    });

    it('should format all numeric values with dollar sign', () => {
      const { container } = render(<Component />);
      const priceElements = container.querySelectorAll('td span.font-semibold');

      priceElements.forEach(element => {
        if (element.textContent) {
          expect(element.textContent.startsWith('$')).toBe(true);
        }
      });
    });

    it('should display market caps consistently', () => {
      render(<Component />);

      expect(screen.getByText('$847.50B')).toBeInTheDocument();
      expect(screen.getByText('$310.20B')).toBeInTheDocument();
      expect(screen.getByText('$95.80B')).toBeInTheDocument();
    });

    it('should format all percentage changes with % symbol', () => {
      const { container } = render(<Component />);
      const percentageElements = screen.getAllByText(/%$/);

      expect(percentageElements.length).toBe(8);
    });
  });
});
