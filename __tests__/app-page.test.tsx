import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../app/page';

describe('App Page Component', () => {
  describe('Page Rendering', () => {
    it('should render without crashing', () => {
      render(<Page />);
      expect(screen.getByText('암호화폐 순위')).toBeInTheDocument();
    });

    it('should render the CryptoRankingBoard component', () => {
      render(<Page />);
      const title = screen.getByText('암호화폐 순위');
      expect(title).toBeInTheDocument();
    });

    it('should export default function', () => {
      expect(Page).toBeDefined();
      expect(typeof Page).toBe('function');
    });
  });

  describe('Component Integration', () => {
    it('should render all cryptocurrency data', () => {
      render(<Page />);
      expect(screen.getByText('비트코인')).toBeInTheDocument();
      expect(screen.getByText('이더리움')).toBeInTheDocument();
      expect(screen.getByText('테더')).toBeInTheDocument();
    });

    it('should render table headers', () => {
      render(<Page />);
      expect(screen.getByText('순위')).toBeInTheDocument();
      expect(screen.getByText('이름')).toBeInTheDocument();
      expect(screen.getByText('가격')).toBeInTheDocument();
    });

    it('should render footer information', () => {
      render(<Page />);
      expect(screen.getByText(/데이터는 60초마다 업데이트됩니다/)).toBeInTheDocument();
    });
  });

  describe('Page Structure', () => {
    it('should render a single component', () => {
      const { container } = render(<Page />);
      const mainContainer = container.querySelector('.min-h-screen');
      expect(mainContainer).toBeInTheDocument();
    });

    it('should maintain dark theme styling', () => {
      const { container } = render(<Page />);
      const darkBg = container.querySelector('.bg-gray-950');
      expect(darkBg).toBeInTheDocument();
    });
  });

  describe('Next.js Page Export', () => {
    it('should be a valid React component', () => {
      expect(() => render(<Page />)).not.toThrow();
    });

    it('should have a name', () => {
      expect(Page.name).toBe('Page');
    });
  });
});
