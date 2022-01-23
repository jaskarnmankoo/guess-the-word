import * as React from 'react';

import Letter from '../components/common/Letter';
import SearchEngineOptimization from '../components/common/SearchEngineOptimization';

import * as UTILS from '../utils';

/** Renders the Guess the Word game */
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
    const randomWord =
      UTILS.ANIMALS[Math.floor(Math.random() * UTILS.ANIMALS.length)];

    wordLetters.current = randomWord.toUpperCase().split('');
    word.current = randomWord;
    setStart(true);
  }, []);

  const phrasalVerbsGame = React.useCallback(() => {
    const randomWord =
      UTILS.PHRASALVERBS[Math.floor(Math.random() * UTILS.PHRASALVERBS.length)];

    wordLetters.current = randomWord.toUpperCase().split('');
    word.current = randomWord;
    setStart(true);
  }, []);

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
                type="button"
                className="game-mode"
                onClick={easyDifficulty}
                disabled={difficulty === 'easy'}
              >
                Easy
              </button>
              <button
                type="button"
                className="game-mode"
                onClick={mediumDifficulty}
                disabled={difficulty === 'medium'}
              >
                Medium
              </button>
              <button
                type="button"
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
                  <button
                    type="button"
                    onClick={animalsGame}
                    className="game-mode"
                  >
                    Animals
                  </button>
                  <button
                    type="button"
                    onClick={phrasalVerbsGame}
                    className="game-mode"
                  >
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
                    key={`guess-${String(letter)}-${String(index)}`}
                  >
                    {letter}
                  </li>
                ))}
              </ul>
            </div>
            <div id="alphabet" className="flex flex-wrap justify-center gap-8">
              {UTILS.ALPHABET.map((alpha) => (
                <React.Fragment key={`alpha-${alpha}`}>
                  <Letter
                    alpha={alpha}
                    letters={letters}
                    lives={lives}
                    word={word.current}
                    wordLetters={wordLetters.current}
                    reset={reset}
                    setLetters={setLetters}
                    setLives={setLives}
                  />
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
