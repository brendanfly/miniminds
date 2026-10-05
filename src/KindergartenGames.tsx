import { useState } from 'react';
import { ArrowRight, Check, Heart, RotateCcw, ShoppingBasket, Wallet } from 'lucide-react';
import { PictureArt } from './Art';
import { AnswerChoices, CountObjects, RoundFooter, RoundIntro, speak, useRoundFeedback } from './GameUI';
import { additionRounds, moneyRounds, numberChoices, sightWordRounds, wordRounds, wordTiles, type Difficulty, type PackGameId } from './games';

type GameProps = { difficulty: Difficulty; sound: boolean; onCelebrate: () => void };

export function KindergartenGame({ kind, ...props }: GameProps & { kind: PackGameId }) {
  switch (kind) {
    case 'word-builder': return <WordBuilder {...props} />;
    case 'sight-words': return <SightWordPicnic {...props} />;
    case 'addition': return <SnackAddition {...props} />;
    case 'give-count': return <GiveCount {...props} />;
  }
}

function WordBuilder({ difficulty, sound, onCelebrate }: GameProps) {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const rounds = wordRounds[difficulty];
  const task = rounds[round % rounds.length];
  const tiles = wordTiles(task.word, difficulty);
  const built = selected.map(i => tiles[i]).join('');
  const success = `${task.word}. You built a word!`;

  return <div className="activity-panel workshop-panel">
    <RoundIntro round={round} instruction={difficulty === 'gentle' ? 'Tap the letters in order to copy the word.' : 'Build the word for this picture. Tap the letters in order.'} prompt={`Build the word ${task.word}. ${difficulty === 'gentle' ? `The letters are ${[...task.word].join(', ')}.` : 'Use the picture to help you.'}`} listenLabel="Hear the word" />
    <div className="word-picture"><span role="img" aria-label={`Picture of a ${task.word}`}><PictureArt picture={task.picture} /></span>{difficulty === 'gentle' && <span className="word-guide" aria-label={`Word guide: ${task.word}`}>{task.word}</span>}</div>
    <div className="word-slots" aria-label={`Your word: ${built || 'empty'}`}>{[...task.word].map((_, i) => <span key={i}>{built[i] ?? <span className="slot-placeholder" aria-hidden="true" />}</span>)}</div>
    <div className="letter-tiles" aria-label="Letter tiles">{tiles.map((tile, i) => <button key={`${round}-${i}`} aria-label={`Add ${tile}`} disabled={feedback === 'correct' || selected.includes(i) || selected.length === task.word.length} onClick={() => { setSelected(s => [...s, i]); speak(tile, sound); }}>{tile}</button>)}</div>
    <div className="game-actions"><button className="secondary-button" disabled={selected.length === 0 || feedback === 'correct'} onClick={() => setSelected(s => s.slice(0, -1))}><RotateCcw size={17} /> Undo letter</button><button className="primary-button" disabled={selected.length !== task.word.length || feedback === 'correct'} onClick={() => check(built === task.word, success)}>Check word <Check size={18} /></button></div>
    <RoundFooter feedback={feedback} success={success} retry="Good try! Undo a letter and try a different order." onNext={() => { setRound(r => r + 1); setSelected([]); reset(); }} />
  </div>;
}

function SightWordPicnic({ difficulty, sound, onCelebrate }: GameProps) {
  const [round, setRound] = useState(0);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const task = sightWordRounds[round % sightWordRounds.length];
  const sentence = [task.before, task.word, task.after].filter(Boolean).join(' ');
  const success = difficulty === 'gentle' ? `You found "${task.word}"! A word for our picnic.` : `${sentence} Lovely reading!`;
  return <div className="activity-panel picnic-panel">
    <RoundIntro round={round} instruction={difficulty === 'gentle' ? 'Find the word on the picnic card.' : 'Choose the word that finishes the sentence.'} prompt={difficulty === 'gentle' ? `Find the word ${task.word}.` : `${sentence} Find ${task.word} to finish the sentence.`} listenLabel={difficulty === 'gentle' ? 'Hear the word' : 'Hear the sentence'} />
    <div className="picnic-scene"><PictureArt picture={task.picture} /><ShoppingBasket size={54} strokeWidth={1.4} /></div>
    {difficulty === 'gentle' ? <div className="sight-word-guide" aria-label={`Word guide: ${task.word}`}>{task.word}</div> : <p className="sentence-card">{task.before} <span className="sentence-blank" aria-label={feedback === 'correct' ? task.word : 'missing word'}>{feedback === 'correct' ? task.word : '____'}</span> {task.after}</p>}
    <AnswerChoices choices={task.choices} disabled={feedback === 'correct'} onAnswer={value => check(value === task.word, success)} />
    <RoundFooter feedback={feedback} success={success} onNext={() => { setRound(r => r + 1); reset(); }} />
  </div>;
}

function SnackAddition({ difficulty, sound, onCelebrate }: GameProps) {
  const [round, setRound] = useState(0);
  const [combined, setCombined] = useState(false);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const rounds = additionRounds[difficulty];
  const task = rounds[round % rounds.length];
  const total = task.left + task.right;
  const success = `${task.left} and ${task.right} make ${total}. Lovely adding!`;
  return <div className="activity-panel addition-panel">
    <RoundIntro round={round} instruction="Bring both groups together. How many apples are there altogether?" prompt={`There are ${task.left} apples in one group and ${task.right} in the other. Put them together. How many apples are there altogether?`} />
    {!combined ? <>
      <div className="snack-groups">
        {[task.left, task.right].map((count, group) => <div className="snack-group" key={group} aria-label={`Group ${group + 1}: ${count} apples`}><div>{Array.from({ length: count }, (_, i) => <PictureArt key={i} picture="apple" />)}</div><span>{count} {count === 1 ? 'apple' : 'apples'}</span></div>)}
        <span className="snack-plus" aria-hidden="true">+</span>
      </div>
      <button className="secondary-button combine-button" onClick={() => { setCombined(true); speak('Now the apples are together. Tap each one to count.', sound); }}><ShoppingBasket size={19} /> Put the apples together <ArrowRight size={17} /></button>
    </> : <><div className="basket-label"><ShoppingBasket size={21} /> Our picnic basket</div><CountObjects key={round} count={total} picture="apple" noun="apple" sound={sound} disabled={feedback === 'correct'} /><p className="manipulation-hint">Tap each apple once to help count.</p></>}
    <AnswerChoices choices={numberChoices(total, 0, difficulty === 'gentle' ? 5 : 10)} disabled={!combined || feedback === 'correct'} onAnswer={value => check(value === total, success)} />
    <RoundFooter feedback={feedback} success={success} onNext={() => { setRound(r => r + 1); setCombined(false); reset(); }} />
  </div>;
}

function GiveCount({ difficulty, sound, onCelebrate }: GameProps) {
  const [round, setRound] = useState(0);
  const [given, setGiven] = useState<number[]>([]);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const rounds = moneyRounds[difficulty];
  const task = rounds[round % rounds.length];
  const remaining = task.start - task.give;
  const ready = given.length === task.give;
  const success = `You started with ${task.start} dollars and gave ${task.give}. You have ${remaining} ${remaining === 1 ? 'dollar' : 'dollars'} left.`;
  const hint = given.length > task.give ? `Move ${given.length - task.give} ${given.length - task.give === 1 ? 'dollar' : 'dollars'} back to your wallet.` : ready ? 'Now count the dollars left in your wallet.' : `Tap ${task.give - given.length} more ${task.give - given.length === 1 ? 'dollar' : 'dollars'} to give.`;

  function token(i: number, inFriend: boolean) {
    return <button key={i} className="dollar-token" disabled={feedback === 'correct'} aria-label={inFriend ? `Return dollar ${i + 1} to wallet` : `Give dollar ${i + 1} to friend`} onClick={() => {
      setGiven(previous => inFriend ? previous.filter(value => value !== i) : [...previous, i]);
      speak(inFriend ? 'Back in your wallet.' : 'One dollar moved to your friend.', sound);
    }}><span aria-hidden="true">$1</span></button>;
  }

  return <div className="activity-panel money-panel">
    <RoundIntro round={round} instruction={`You have $${task.start}. Give $${task.give} to your friend. How much do you keep?`} prompt={`You have ${task.start} pretend dollars. Give ${task.give} to your friend. How many dollars do you have left?`} />
    <span className="pretend-label">Pretend dollars only. No real money.</span>
    <div className="money-trays">
      <section className="money-tray" aria-label="Your wallet"><h3><Wallet size={20} /> Your wallet</h3><div>{Array.from({ length: task.start }, (_, i) => given.includes(i) ? null : token(i, false))}</div>{given.length === task.start && <p>Your wallet is empty.</p>}</section>
      <section className="money-tray friend-tray" aria-label="Your friend's dollars"><h3><Heart size={20} /> Your friend</h3><div>{given.map(i => token(i, true))}</div>{given.length === 0 && <p>Tap a dollar to move it here.</p>}</section>
    </div>
    <p className="manipulation-hint" aria-live="polite">{hint} <span>You can tap a friend's dollar to bring it back.</span></p>
    <AnswerChoices choices={numberChoices(remaining, 0, difficulty === 'gentle' ? 5 : 10)} dollars disabled={!ready || feedback === 'correct'} onAnswer={value => check(value === remaining, success)} />
    <RoundFooter feedback={feedback} success={success} onNext={() => { setRound(r => r + 1); setGiven([]); reset(); }} />
  </div>;
}
