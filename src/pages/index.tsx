import * as React from 'react';

import SearchEngineOptimization from '../components/common/SearchEngineOptimization';

import * as UTILS from '../utils';

export default function Home(): JSX.Element {
  const [difficulty, setDifficulty] = React.useState('');
  const [lives, setLives] = React.useState(6);
  const [letters, setLetters] = React.useState({ ...UTILS.LETTERS });
  const [start, setStart] = React.useState(false);

  const word = React.useRef<string>('');
  const wordLetters = React.useRef<string[]>([]);

  const reset = React.useCallback((message: string): void => {
    alert(message);

    word.current = '';
    wordLetters.current = [];

    setDifficulty('');
    setLives(6);
    setLetters({ ...UTILS.LETTERS });
    setStart(false);
  }, []);

  const easyDifficulty = React.useCallback(() => {
    setDifficulty('easy');
    setLives(10);
  }, []);

  const mediumDifficulty = React.useCallback(() => {
    setDifficulty('medium');
    setLives(6);
  }, []);

  const hardDifficulty = React.useCallback(() => {
    setDifficulty('hard');
    setLives(3);
  }, []);

  const animalsGame = React.useCallback(() => {
    const randomWord = UTILS.getRandom(UTILS.ANIMALS);
    const lettersLocal = UTILS.splitLetters(randomWord);

    wordLetters.current = lettersLocal;
    word.current = randomWord;
    setStart(true);
  }, []);

  const phrasalVerbsGame = React.useCallback(() => {
    const randomWord = UTILS.getRandom(UTILS.PHRASALVERBS);
    const lettersLocal = UTILS.splitLetters(randomWord);

    wordLetters.current = lettersLocal;
    word.current = randomWord;
    setStart(true);
  }, []);

  const clickLetter = (alpha: string): void => {
    const lettersCopy = { ...letters };
    lettersCopy[alpha] = 1;

    if (wordLetters.current.includes(alpha)) {
      lettersCopy[alpha] = 2;

      let win = true;

      for (let i = 0; i < wordLetters.current.length; i++) {
        if (!lettersCopy[wordLetters.current[i]]) {
          win = false;
          break;
        }
      }

      if (win) {
        reset(
          `Congratulations on winning Guess the Word! The word was ${word.current}.`
        );
        return;
      }
    } else {
      const livesCopy = lives;

      if (livesCopy - 1 === 0) {
        reset(`You lost! The word was ${word.current}.`);
        return;
      }

      setLives(lives - 1);
    }

    setLetters(lettersCopy);
  };

  return (
    <>
      <SearchEngineOptimization title="Home" />
      <main className="grid grid-cols-1 text-center">
        {!start ? (
          <>
            <p className="text-xl">
              {!difficulty
                ? 'Choose a difficulty level...'
                : `At ${difficulty.toUpperCase()} difficulty you will have ${lives} lives.`}
            </p>
            <div className="grid grid-cols-3">
              <button
                className="game-mode"
                onClick={easyDifficulty}
                disabled={difficulty === 'easy'}
              >
                Easy
              </button>
              <button
                className="game-mode"
                onClick={mediumDifficulty}
                disabled={difficulty === 'medium'}
              >
                Medium
              </button>
              <button
                className="game-mode"
                onClick={hardDifficulty}
                disabled={difficulty === 'hard'}
              >
                Hard
              </button>
            </div>
            {difficulty && (
              <>
                <p>Choose the category you would like to play!</p>
                <div className="grid grid-cols-2">
                  <button onClick={animalsGame} className="game-mode">
                    Animals
                  </button>
                  <button onClick={phrasalVerbsGame} className="game-mode">
                    Phrasal Verbs
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <p>
              Your lives: <b>{lives}</b>
            </p>
            <div className="flex justify-center">
              <ul className="flex flex-wrap" aria-label="the word to guess">
                {wordLetters.current.map((letter, index) => (
                  <li
                    className={
                      letters[letter] === 2
                        ? 'text-black dark:text-white'
                        : 'text-white dark:text-dark-mode'
                    }
                    key={`guess-${letter}-${index}`}
                  >
                    {letter}
                  </li>
                ))}
              </ul>
            </div>
            <div id="alphabet" className="flex flex-wrap gap-8 justify-center">
              {UTILS.ALPHABET.map((alpha) => (
                <button
                  key={`alpha-${alpha}`}
                  className={`p-4 rounded-xl w-16 border-2 border-black dark:border-white ${
                    letters[alpha] === 1
                      ? 'bg-red-600 dark:bg-black'
                      : letters[alpha] === 2
                      ? 'bg-green-600'
                      : ''
                  }`}
                  disabled={letters[alpha] === 1 || letters[alpha] === 2}
                  onClick={() => clickLetter(alpha)}
                >
                  {alpha}
                </button>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
