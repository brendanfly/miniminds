import { useState } from 'react';
import { PictureArt } from './Art';
import { AnswerChoices, RoundFooter, RoundIntro, speak, useRoundFeedback } from './GameUI';
import { alphabetRounds, mixingRecipes, mixPaints, paintColors, patternPieces, patternRounds, patternTask, primaryPaints, sentenceRounds, type PrimaryPaint } from './ExpansionData';
import type { Difficulty } from './games';

export type ExpansionProps = { difficulty: Difficulty; sound: boolean; onCelebrate: () => void };

export function AlphabetGarden({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const task = alphabetRounds[round % alphabetRounds.length];
  const target = difficulty === 'gentle' ? task.letter : task.letter.toLowerCase();
  const instruction = difficulty === 'gentle' ? `Match the shape ${task.letter} to grow a flower.` : `Find the lowercase partner for ${task.letter} to grow a flower.`;
  const success = `${task.letter} and ${task.letter.toLowerCase()} are a letter pair. Your flower blooms!`;
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={instruction} prompt={instruction} listenLabel="Hear the letter name" />
    <div className="alphabet-plot"><span className="big-letter" aria-label={`Uppercase guide: ${task.letter}`}>{task.letter}</span>{feedback === 'correct' ? <PictureArt picture="flower" /> : <span className="seed-soil">A little seed is waiting.</span>}</div>
    <AnswerChoices choices={task.choices.map(letter => difficulty === 'gentle' ? letter : letter.toLowerCase())} disabled={feedback === 'correct'} onAnswer={value => check(value === target, success)} />
    <RoundFooter feedback={feedback} success={success} onNext={() => { setRound(r => r + 1); reset(); }} />
  </div>;
}

export function SentenceKitchen({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const task = sentenceRounds[round % sentenceRounds.length];
  const sentence = task.words.join(' ');
  const tiles = difficulty === 'gentle' ? [...task.words].reverse() : [task.words[2], task.distractor, task.words[0], task.words[1]];
  const built = selected.map(i => tiles[i]).join(' ');
  const instruction = `${task.meaning} Tap the words in order.`;
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={instruction} prompt={`Make this sentence: ${sentence}`} listenLabel="Hear the sentence" />
    {difficulty === 'gentle' && <p className="sentence-guide" aria-label={`Sentence guide: ${sentence}`}>{sentence}</p>}
    <div className="sentence-slots" aria-label={`Your sentence: ${built || 'empty'}`}>{task.words.map((_, i) => <button key={i} disabled={feedback === 'correct' || selected[i] === undefined} aria-label={`Remove word ${i + 1}`} onClick={() => setSelected(s => s.filter((__, index) => index !== i))}>{tiles[selected[i]] ?? '____'}</button>)}</div>
    <div className="tile-row" aria-label="Word tiles">{tiles.map((word, i) => <button key={i} disabled={feedback === 'correct' || selected.includes(i) || selected.length === task.words.length} aria-label={`Add word ${word}`} onClick={() => { setSelected(s => [...s, i]); speak(word, sound); }}>{word}</button>)}</div>
    <div className="game-actions"><button className="secondary-button" disabled={!selected.length || feedback === 'correct'} onClick={() => setSelected(s => s.slice(0, -1))}>Undo word</button><button className="primary-button" disabled={selected.length !== task.words.length || feedback === 'correct'} onClick={() => check(built === sentence, `${sentence} You made a sentence!`)}>Check sentence</button></div>
    {feedback === 'correct' && <div className="sentence-illustration" role="img" aria-label={`Illustration: ${sentence}`}><PictureArt picture={task.picture} /></div>}
    <RoundFooter feedback={feedback} success={`${sentence} You made a sentence!`} retry="Try a different order or word. Tap a filled slot to remove it." onNext={() => { setRound(r => r + 1); setSelected([]); reset(); }} />
  </div>;
}

export function RainbowMixer({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const [scoops, setScoops] = useState<PrimaryPaint[]>([]);
  const [result, setResult] = useState<ReturnType<typeof mixPaints> | null>(null);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const target = mixingRecipes[round % mixingRecipes.length];
  const instruction = difficulty === 'gentle' ? 'Choose two equal scoops of pretend paint. What will you discover?' : `Make ${target} using two equal scoops of pretend paint.`;
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={instruction} prompt={instruction} />
    <p className="simulation-note">Our simplified paint model: red + yellow = orange, yellow + blue = green, red + blue = purple. Two scoops of the same color stay that color. Real pigments and amounts can mix differently.</p>
    <div className="tile-row paint-options">{primaryPaints.map(color => <button key={color} disabled={scoops.length === 2 || feedback === 'correct'} onClick={() => { setScoops(s => [...s, color]); setResult(null); speak(color, sound); }} aria-label={`Add ${color} paint`}><span style={{ background: paintColors[color] }} />{color}</button>)}</div>
    <div className="mixing-bowl" aria-label={`Paint scoops: ${scoops.join(' and ') || 'empty'}`}>{scoops.length ? scoops.join(' + ') : 'Your mixing bowl'}</div>
    <div className="game-actions"><button className="secondary-button" disabled={!scoops.length || feedback === 'correct'} onClick={() => { setScoops(s => s.slice(0, -1)); setResult(null); }}>Undo scoop</button><button className="primary-button" disabled={scoops.length !== 2 || feedback === 'correct'} onClick={() => {
      const mixed = mixPaints(scoops[0], scoops[1]);
      setResult(mixed);
      check(difficulty === 'gentle' || mixed === target, `You discovered ${mixed}!`);
    }}>Mix paints</button></div>
    {result && <div className="paint-result" role="img" aria-label={`Mixed paint: ${result}`}><span style={{ background: paintColors[result] }} />{result}</div>}
    <RoundFooter feedback={feedback} success={`You discovered ${result}!`} retry={`That mixture makes ${result}. Undo a scoop and explore a recipe for ${target}.`} onNext={() => { setRound(r => r + 1); setScoops([]); setResult(null); reset(); }} />
  </div>;
}

export function PatternPainter({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const units = patternRounds[difficulty];
  const task = patternTask(units[round % units.length]);
  const instruction = 'Look at the repeating shapes. Which labeled shape comes next?';
  const success = `${patternPieces[task.answer].label} comes next. You found the repeating pattern!`;
  function piece(index: number) {
    const item = patternPieces[index];
    return <><span className={`pattern-shape ${item.shape}`} style={{ background: item.color }} aria-hidden="true" /><span>{item.label}</span></>;
  }
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={instruction} prompt={`${task.shown.map(i => patternPieces[i].label).join(', ')}. What comes next?`} />
    <div className="pattern-strip" aria-label="Pattern to complete">{task.shown.map((index, i) => <div className="pattern-piece" key={i}>{piece(index)}</div>)}<div className="pattern-piece missing-piece">{feedback === 'correct' ? piece(task.answer) : '?'}</div></div>
    <div className="tile-row pattern-choices" aria-label="Pattern choices">{patternPieces.map((item, i) => <button key={item.label} disabled={feedback === 'correct'} aria-label={`Choose ${item.label}`} onClick={() => check(i === task.answer, success)}>{piece(i)}</button>)}</div>
    <RoundFooter feedback={feedback} success={success} onNext={() => { setRound(r => r + 1); reset(); }} />
  </div>;
}
