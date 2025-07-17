/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { Flashcard } from './flashcard';
import type { VocabularyWord } from '@/lib/types';
import '@testing-library/jest-dom';

// Mock the VocabularyForm component as it's not needed for this test
jest.mock('@/components/vocabulary-form', () => ({
    VocabularyForm: () => <div />,
}));


// Define mock functions for the props
const mockOnRemove = jest.fn();
const mockOnEdit = jest.fn();
const mockOnFlip = jest.fn();

// Mock word data to be used in tests
const mockWord: VocabularyWord = {
  id: '1',
  japanese: '日本語',
  reading: 'にほんご',
  meaning: 'Japanese language',
  deckId: '1',
};

describe('Flashcard Component', () => {
    
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  /**
   * Test case: Renders the front of the card correctly.
   * Verifies that the Japanese word is displayed by default.
   */
  it('renders the front of the card with the Japanese word', () => {
    render(
      <Flashcard
        word={mockWord}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
        isFlipped={false}
        onFlip={mockOnFlip}
      />
    );
    expect(screen.getByText(mockWord.japanese)).toBeVisible();
    // The back of the card elements are in the DOM but not visible due to CSS transform
    expect(screen.getByText(mockWord.reading)).not.toBeVisible();
    expect(screen.getByText(mockWord.meaning)).not.toBeVisible();
  });

  /**
   * Test case: Flips the card on click.
   * Simulates a click event and checks if the onFlip function is called.
   */
  it('calls onFlip when the card is clicked', () => {
    render(
      <Flashcard
        word={mockWord}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
        isFlipped={false}
        onFlip={mockOnFlip}
      />
    );
    fireEvent.click(screen.getByText(mockWord.japanese));
    expect(mockOnFlip).toHaveBeenCalledTimes(1);
  });

  /**
   * Test case: Displays the back of the card when isFlipped is true.
   * Renders the card with isFlipped=true and verifies that the reading and meaning are visible.
   */
  it('renders the back of the card with reading and meaning when flipped', () => {
    render(
      <Flashcard
        word={mockWord}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
        isFlipped={true}
        onFlip={mockOnFlip}
      />
    );
    expect(screen.getByText(mockWord.reading)).toBeVisible();
    expect(screen.getByText(mockWord.meaning)).toBeVisible();
  });

  /**
   * Test case: Edit and Remove buttons are present.
   * Checks for the presence of the Edit (Pencil icon) and Remove (X icon) buttons by their ARIA labels.
   */
  it('shows edit and remove buttons', () => {
    render(
      <Flashcard
        word={mockWord}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
        isFlipped={false}
        onFlip={mockOnFlip}
      />
    );
    // There are two sets of buttons (one for front, one for back).
    // We can use getAllByLabelText to confirm they exist.
    expect(screen.getAllByLabelText(`Edit ${mockWord.japanese}`).length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(`Remove ${mockWord.japanese}`).length).toBeGreaterThan(0);
  });
  
  /**
   * Test case: Hides edit/remove buttons for Kana cards.
   * Verifies that when `isKana` is true, the edit and remove buttons are not rendered.
   */
   it('hides edit and remove buttons when isKana is true', () => {
    render(
      <Flashcard
        word={mockWord}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
        isFlipped={false}
        onFlip={mockOnFlip}
        isKana={true}
      />
    );
    expect(screen.queryByLabelText(`Edit ${mockWord.japanese}`)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(`Remove ${mockWord.japanese}`)).not.toBeInTheDocument();
  });

});
