/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, act } from '@testing-library/react';
import Home from './page';
import { GrammarGuide } from '@/components/grammar-guide';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock the VocabularyManager and GrammarGuide components to isolate the test to the Home component's logic.
jest.mock('@/components/vocabulary-manager', () => ({
  VocabularyManager: () => <div data-testid="vocabulary-manager">Vocabulary Content</div>,
}));
jest.mock('@/components/grammar-guide', () => ({
  __esModule: true,
  GrammarGuide: (props: any) => <div data-testid="grammar-guide" {...props}>Grammar Content</div>,
}));


describe('Home Page', () => {
  /**
   * Test case: Renders the component without crashing.
   * It checks if the main heading "Nihongo Mastery" is present in the document.
   */
  it('renders the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { name: /Nihongo Mastery/i });
    expect(heading).toBeInTheDocument();
  });

  /**
   * Test case: The Vocabulary tab should be active by default.
   * It verifies that the VocabularyManager component is visible upon initial render.
   */
  it('should show Vocabulary tab content by default', () => {
    render(<Home />);
    expect(screen.getByTestId('vocabulary-manager')).toBeVisible();
    // In this setup, GrammarGuide is rendered but hidden by Tabs component logic, not removed from DOM
    expect(screen.getByTestId('grammar-guide')).not.toBeVisible();
  });

  /**
   * Test case: Clicking the Grammar tab should display its content.
   * It simulates a user click on the "Grammar" tab and asserts that the GrammarGuide component becomes visible
   * and the VocabularyManager component is no longer present.
   */
  it('should switch to the Grammar tab when clicked', () => {
    render(<Home />);
    
    // Find the "Grammar" tab button and click it
    const grammarTab = screen.getByRole('tab', { name: /Grammar/i });
    fireEvent.click(grammarTab);

    // After clicking, the GrammarGuide should be visible and VocabularyManager should not
    expect(screen.getByTestId('grammar-guide')).toBeVisible();
    expect(screen.getByTestId('vocabulary-manager')).not.toBeVisible();
  });

  /**
   * Test case: User can switch from Grammar back to Vocabulary.
   * It first switches to the Grammar tab, then simulates a click back to the "Vocabulary" tab,
   * verifying that the content visibility updates correctly.
   */
  it('should switch back to the Vocabulary tab after viewing Grammar', () => {
    render(<Home />);

    // Switch to Grammar
    const grammarTab = screen.getByRole('tab', { name: /Grammar/i });
    fireEvent.click(grammarTab);
    expect(screen.getByTestId('grammar-guide')).toBeVisible();

    // Switch back to Vocabulary
    const vocabularyTab = screen.getByRole('tab', { name: /Vocabulary/i });
    fireEvent.click(vocabularyTab);
    expect(screen.getByTestId('vocabulary-manager')).toBeVisible();
    expect(screen.getByTestId('grammar-guide')).not.toBeVisible();
  });
});
