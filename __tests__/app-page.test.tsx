import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../app/page';

describe('App Page Component', () => {
  describe('Page Rendering', () => {
    it('should render without crashing', () => {
      render(<Page />);
      expect(screen.getByText('워케이션 코리아')).toBeInTheDocument();
    });

    it('should render the main navigation and hero section', () => {
      render(<Page />);
      const title = screen.getByText('워케이션 코리아');
      expect(title).toBeInTheDocument();
    });

    it('should export default function', () => {
      expect(Page).toBeDefined();
      expect(typeof Page).toBe('function');
    });
  });

  describe('Component Integration', () => {
    it('should render city data', () => {
      render(<Page />);
      expect(screen.getByText('제주시')).toBeInTheDocument();
      expect(screen.getByText('부산')).toBeInTheDocument();
      expect(screen.getByText('강릉')).toBeInTheDocument();
    });

    it('should render navigation elements', () => {
      render(<Page />);
      expect(screen.getByText('로그인')).toBeInTheDocument();
      expect(screen.getByText('무료 가입')).toBeInTheDocument();
    });

    it('should render footer information', () => {
      render(<Page />);
      expect(screen.getByText(/Digital Nomads/)).toBeInTheDocument();
      expect(screen.getByText(/© 2026/)).toBeInTheDocument();
    });
  });

  describe('Page Structure', () => {
    it('should render a single component', () => {
      const { container } = render(<Page />);
      const mainContainer = container.querySelector('.min-h-screen');
      expect(mainContainer).toBeInTheDocument();
    });

    it('should have main navigation structure', () => {
      const { container } = render(<Page />);
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });
  });

  describe('Next.js Page Export', () => {
    it('should be a valid React component', () => {
      expect(() => render(<Page />)).not.toThrow();
    });

    it('should have a name', () => {
      expect(Page.name).toBe('Home');
    });
  });
});
