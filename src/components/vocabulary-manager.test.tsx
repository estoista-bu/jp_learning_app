
/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { VocabularyManager } from './vocabulary-manager';
import '@testing-library/jest-dom';

// Since VocabularyManager uses Link from next/link, we need to mock it.
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock the DeckForm component
jest.mock('./deck-form', () => ({
  DeckForm: () => <div data-testid="deck-form">Deck Form</div>,
}));

describe('VocabularyManager Component', () => {

  /**
   * Test case: Renders the component with initial decks.
   * Verifies that the main heading and the default decks ("Greetings", "Food", "Travel") are displayed.
   */
  it('renders the initial decks and title', () => {
    render(<VocabularyManager />);

    expect(screen.getByRole('heading', { name: /My Decks/i })).toBeInTheDocument();
    
    // Check for the mock decks provided in the component's state
    expect(screen.getByText('Greetings')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Travel')).toBeInTheDocument();
  });

  /**
   * Test case: Renders the Kana Practice card.
   * Verifies that the special "Kana Practice" card is present.
   */
  it('renders the Kana Practice card', () => {
    render(<VocabularyManager />);
    expect(screen.getByText('Kana Practice')).toBeInTheDocument();
  });
  
  /**
   * Test case: Opens the "Add New Deck" dialog.
   * Simulates a click on the "Add New Deck" button and verifies that the dialog with the correct title appears.
   */
  it('opens the form dialog when the "Add New Deck" button is clicked', () => {
    render(<VocabularyManager />);

    // The form dialog should not be visible initially.
    expect(screen.queryByText('Create New Deck')).not.toBeInTheDocument();

    // Click the "Add New Deck" button
    const addButton = screen.getByRole('button', { name: /Add New Deck/i });
    fireEvent.click(addButton);

    // Now the dialog title and the mocked form should be visible
    expect(screen.getByRole('heading', { name: 'Create New Deck' })).toBeInTheDocument();
    expect(screen.getByTestId('deck-form')).toBeInTheDocument();
  });
});
