import * as React from 'react';

interface Props {
  alpha: string;
  letters: { [x: string]: number };
  lives: number;
  word: string;
  wordLetters: string[];
  reset: (message: string) => void;
  setLetters: React.Dispatch<React.SetStateAction<{ [x: string]: number }>>;
  setLives: React.Dispatch<React.SetStateAction<number>>;
}

/** Renders a Letter of the Alphabet as a Button */
export default function Letter({
  alpha,
  letters,
  lives,
  wordLetters,
  word,
  reset,
  setLetters,
  setLives
}: Props) {
  const clickLetter = React.useCallback(() => {
    const lettersCopy = { ...letters };
    lettersCopy[alpha] = 1;

    if (wordLetters.includes(alpha)) {
      lettersCopy[alpha] = 2;

      let win = true;

      for (let i = 0; i < wordLetters.length; i++) {
        if (!lettersCopy[wordLetters[i]]) {
          win = false;
          break;
        }
      }

      if (win) {
        reset(
          `Congratulations on winning Guess the Word! The word was ${word}.`
        );
        return;
      }
    } else {
      const livesCopy = lives;

      if (livesCopy - 1 === 0) {
        reset(`You lost! The word was ${word}.`);
        return;
      }

      setLives(lives - 1);
    }

    setLetters(lettersCopy);
  }, [alpha, letters, lives, reset, setLetters, setLives, word, wordLetters]);

  return (
    <button
      type="button"
      className={`w-16 rounded-xl border-2 border-black p-4 dark:border-white ${
        letters[alpha] === 1
          ? 'bg-red-600 dark:bg-black'
          : letters[alpha] === 2
          ? 'bg-green-600'
          : ''
      }`}
      disabled={letters[alpha] === 1 || letters[alpha] === 2}
      onClick={clickLetter}
    >
      {alpha}
    </button>
  );
}
