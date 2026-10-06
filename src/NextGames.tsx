import { useState } from 'react';
import { AnswerChoices, RoundFooter, RoundIntro, speak, useRoundFeedback } from './GameUI';
import type { ExpansionProps } from './CreativeGames';
import { NextArt, ShapeArt } from './NextArt';
import { animalRounds, comparison, comparisonRounds, cycleRounds, gridPlaces, huntColors, huntPalette, huntRounds, jarRounds, matchRounds, rhymeRounds, savingsRounds, stampRecipes, stampShapes, storyRounds, type HuntColor, type StampShape } from './NextData';
import { numberChoices } from './games';

export function RhymeTime({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const task = rhymeRounds[round % rhymeRounds.length];
  const choices = difficulty === 'gentle' ? [task.other[0], task.match] : [task.other[0], task.match, task.other[1]];
  const instruction = `Which word rhymes with ${task.word}?`;
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={instruction} prompt={`${instruction} ${choices.join(', ')}.`} listenLabel="Hear the whole words" />
    <div className="next-picture"><NextArt item={task.word} /><strong>{task.word}</strong></div>
    {difficulty === 'gentle' && <p className="guide-note">{task.clue}</p>}
    <div className="picture-choices">{choices.map(word => <button key={word} disabled={feedback === 'correct'} aria-label={`Choose ${word}`} onClick={() => check(word === task.match, `${task.word} and ${task.match} rhyme!`)}><NextArt item={word} /><span>{word}</span></button>)}</div>
    <RoundFooter feedback={feedback} success={`${task.word} and ${task.match} rhyme: their endings sound alike.`} retry={`Listen to the endings of the whole words. ${task.word} ... ${task.match}. Try again.`} onNext={() => { setRound(r => r + 1); reset(); }} />
  </div>;
}

export function StoryDetective({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const story = storyRounds[Math.floor(round / 3) % storyRounds.length];
  const task = story.questions[round % 3];
  const text = difficulty === 'gentle' ? story.short : story.long;
  const choices = difficulty === 'gentle' ? [task.answer, ...task.choices.filter(value => value !== task.answer).slice(0, 1)].reverse() : task.choices;
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={task.ask} prompt={`${text} ${task.ask}`} listenLabel="Hear the story and question" />
    <div className="story-card"><NextArt item={story.picture} /><p>{text}</p></div>
    {difficulty === 'gentle' && <p className="guide-note">Look back at the story. It tells you who, what, and where.</p>}
    <AnswerChoices choices={choices} disabled={feedback === 'correct'} onAnswer={value => check(value === task.answer, `The story tells us: ${task.answer}.`)} />
    <RoundFooter feedback={feedback} success={`The story tells us: ${task.answer}.`} retry={`Read or listen again: ${text}`} onNext={() => { setRound(r => r + 1); reset(); }} />
  </div>;
}

export function ColorHunt({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const [color, setColor] = useState<HuntColor>('Red');
  const [fills, setFills] = useState<Partial<Record<StampShape, HuntColor>>>({});
  const [history, setHistory] = useState<typeof fills[]>([]);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const task = huntRounds[difficulty][round % huntRounds[difficulty].length];
  const instruction = task.map((target, i) => `${i ? 'Then color' : 'Color'} the ${target.object} ${target.color.toLowerCase()}.`).join(' ');
  const solved = feedback === 'correct';
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={instruction} prompt={instruction} />
    <p className="guide-note">Choose a named paint, then tap a named shape. Leave the other shapes unpainted.</p>
    <div className="tile-row">{huntPalette.map(name => <button key={name} aria-label={`Paint ${name}`} aria-pressed={color === name} disabled={solved} onClick={() => { setColor(name); speak(name, sound); }}><span className="named-swatch" style={{ background: huntColors[name] }} />{name}</button>)}</div>
    <div className="picture-choices">{stampShapes.map(shape => <button key={shape} disabled={solved} aria-label={`Color ${shape}`} onClick={() => { if (fills[shape] === color) return; setHistory(h => [...h, fills]); setFills(f => ({ ...f, [shape]: color })); }}><ShapeArt shape={shape} color={fills[shape] ? huntColors[fills[shape]] : '#fffdf8'} /><span>{shape}: {fills[shape] ?? 'unpainted'}</span></button>)}</div>
    <div className="game-actions"><button className="secondary-button" disabled={!history.length || solved} onClick={() => { setFills(history[history.length - 1]); setHistory(h => h.slice(0, -1)); }}>Undo paint</button><button className="secondary-button" disabled={!history.length || solved} onClick={() => { setFills({}); setHistory([]); }}>Reset paints</button><button className="primary-button" disabled={solved} onClick={() => check(task.every(t => fills[t.object] === t.color) && stampShapes.every(shape => task.some(t => t.object === shape) || !fills[shape]), 'You followed the color hunt!')}>Check colors</button></div>
    <RoundFooter feedback={feedback} success="You found the shapes and followed their named colors!" retry="Check each named shape and color. Undo or reset to leave the other shapes unpainted." onNext={() => { setRound(r => r + 1); setFills({}); setHistory([]); reset(); }} />
  </div>;
}

export function ShapeStudio({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const [shape, setShape] = useState<StampShape>('circle');
  const [stamps, setStamps] = useState<Partial<Record<number, StampShape>>>({});
  const [history, setHistory] = useState<typeof stamps[]>([]);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const task = stampRecipes[round % stampRecipes.length];
  const instruction = difficulty === 'gentle' ? 'Choose a shape, then tap a square to stamp your picture.' : `Make ${task.name.toLowerCase()}: ${task.stamps.map(s => `${s.shape} at ${gridPlaces[s.place]}`).join('; ')}. Leave other squares empty.`;
  const solved = feedback === 'correct';
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={instruction} prompt={instruction} />
    <div className="tile-row">{stampShapes.map(s => <button key={s} disabled={solved} aria-label={`Stamp ${s}`} aria-pressed={shape === s} onClick={() => { setShape(s); speak(s, sound); }}><ShapeArt shape={s} />{s}</button>)}</div>
    <div className="stamp-grid" aria-label="Nine-square stamp canvas">{gridPlaces.map((place, i) => <button key={place} disabled={solved} aria-label={`Place at ${place}: ${stamps[i] ?? 'empty'}`} onClick={() => { if (stamps[i] === shape) return; setHistory(h => [...h, stamps]); setStamps(s => ({ ...s, [i]: shape })); }}>{stamps[i] && <ShapeArt shape={stamps[i]} />}<span>{place}</span></button>)}</div>
    <div className="game-actions"><button className="secondary-button" disabled={!history.length || solved} onClick={() => { setStamps(history[history.length - 1]); setHistory(h => h.slice(0, -1)); }}>Undo stamp</button><button className="secondary-button" disabled={!history.length || solved} onClick={() => { setStamps({}); setHistory([]); }}>Reset canvas</button><button className="primary-button" disabled={solved || !Object.keys(stamps).length} onClick={() => check(difficulty === 'gentle' || (Object.keys(stamps).length === task.stamps.length && task.stamps.every(s => stamps[s.place] === s.shape)), difficulty === 'gentle' ? 'Your picture is ready!' : 'Your stamps match the recipe!')}>{difficulty === 'gentle' ? 'Finish picture' : 'Check stamps'}</button></div>
    <RoundFooter feedback={feedback} success={difficulty === 'gentle' ? 'Your own little shape picture!' : `${task.name}: every stamp is in its recipe place!`} retry="Compare each shape and named square with the recipe. Undo or reset to make a change." onNext={() => { setRound(r => r + 1); setStamps({}); setHistory([]); reset(); }} />
  </div>;
}

function Group({ count, label, noun = 'berries' }: { count: number; label: string; noun?: string }) {
  return <div className="object-tray" role="img" aria-label={`${label}: ${count} ${noun}`}><strong>{label}</strong><div className="berry-group">{Array.from({ length: count }, (_, i) => <span className={noun === 'tokens' ? 'plain-token' : 'berry'} key={i} />)}</div><span>{count === 0 ? 'Empty group: 0' : `${count} ${noun}`}</span></div>;
}

export function NumberMatch({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const target = matchRounds[difficulty][round % matchRounds[difficulty].length];
  const options = numberChoices(target, 1, difficulty === 'gentle' ? 5 : 10);
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={`Find the group that matches numeral ${target}.`} prompt={`Find ${target} berries. Count each berry once.`} />
    <p className="number-guide" aria-label={`Numeral ${target}`}>{target}</p>
    {difficulty === 'gentle' && <p className="guide-note">Each dot is one berry. Count the dots and match the number.</p>}
    <div className="picture-choices">{options.map(count => <button key={count} aria-label={`Choose group of ${count}`} disabled={feedback === 'correct'} onClick={() => check(count === target, `${target} berries match ${target}!`)}><div className="berry-group" aria-hidden="true">{Array.from({ length: count }, (_, i) => <span className="berry" key={i} />)}</div><span>{count} berries</span></button>)}</div>
    <button className="listen-button" disabled={!('speechSynthesis' in window)} onClick={() => speak(`Count to ${target}: ${Array.from({ length: target }, (_, i) => i + 1).join(', ')}.`, true)}>Hear counting help</button>
    <RoundFooter feedback={feedback} success={`${target} berries and numeral ${target} show the same quantity!`} retry="Count each berry once. Match that total with the numeral." onNext={() => { setRound(r => r + 1); reset(); }} />
  </div>;
}

export function MoreLessSame({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const task = comparisonRounds[difficulty][round % comparisonRounds[difficulty].length];
  const answer = comparison(task.left, task.right);
  return <div className="activity-panel">
    <RoundIntro round={round} instruction="Does group A have more, less, or the same number of berries as group B?" prompt={`Compare group A with group B. Group A has ${task.left}. Group B has ${task.right}.`} />
    <div className="comparison-trays"><Group count={task.left} label="Group A" /><Group count={task.right} label="Group B" /></div>
    {difficulty === 'gentle' && <p className="guide-note">Compare A to B. You can pair one berry from each group. Same means neither has any left over.</p>}
    <AnswerChoices choices={['More', 'Less', 'Same']} disabled={feedback === 'correct'} onAnswer={value => check(value === answer, answer === 'Same' ? 'A and B have the same number of berries.' : `A has ${answer.toLowerCase()} berries than B.`)} />
    <RoundFooter feedback={feedback} success={`${task.left} compared with ${task.right}: group A has ${answer === 'Same' ? 'the same number of berries as' : `${answer.toLowerCase()} berries than`} group B.`} retry="Count A, then B. The question compares A to B, not B to A." onNext={() => { setRound(r => r + 1); reset(); }} />
  </div>;
}

export function AnimalHome({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const task = animalRounds[round % animalRounds.length];
  const options = difficulty === 'gentle' ? [task.home, ...task.choices.filter(c => c !== task.home).slice(0, 1)].reverse() : task.choices;
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={task.context} prompt={`${task.context} Which place is suitable? ${options.join(', ')}.`} />
    <div className="next-picture"><NextArt item={task.animal} /><strong>{task.animal}</strong></div>
    {difficulty === 'gentle' && <p className="guide-note">{task.observation}</p>}
    <AnswerChoices choices={options} disabled={feedback === 'correct'} onAnswer={value => check(value === task.home, task.observation)} />
    {feedback === 'correct' && <p className="science-observation">Observation: {task.observation}</p>}
    <p className="simulation-note">These are specified animals and situations, not a rule that every animal has only one home.</p>
    <RoundFooter feedback={feedback} success={`${task.home} suits this situation.`} retry="Think about this animal's specified need: water, shelter, or saltwater. Try a place that provides it." onNext={() => { setRound(r => r + 1); reset(); }} />
  </div>;
}

export function LifeCycle({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const task = cycleRounds[difficulty][round % cycleRounds[difficulty].length];
  const solved = feedback === 'correct';
  const instruction = `Order the ${task.name.toLowerCase()} stages, starting with ${task.stages[0].toLowerCase()}.`;
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={instruction} prompt={instruction} />
    {difficulty === 'gentle' && <p className="guide-note">Sequence guide: {task.stages.join(' → ')}.</p>}
    <p className="simulation-note">Pictures compress real elapsed time; no waiting is needed here. Species and conditions change how long growth takes.</p>
    <div className="sequence-slots" aria-label="Your life-cycle sequence">{task.stages.map((_, i) => <button key={i} disabled={solved || selected[i] === undefined} aria-label={`Remove stage ${i + 1}`} onClick={() => setSelected(s => s.filter((__, n) => n !== i))}><span>{i + 1}</span>{selected[i] !== undefined ? <><NextArt item={task.art[selected[i]]} /><strong>{task.stages[selected[i]]}</strong></> : 'Empty'}</button>)}</div>
    <div className="picture-choices cycle-choices">{task.stages.map((_, n) => task.stages.length - 1 - n).map(i => <button key={i} disabled={solved || selected.includes(i) || selected.length === task.stages.length} aria-label={`Add stage ${task.stages[i]}`} onClick={() => { setSelected(s => [...s, i]); speak(task.stages[i], sound); }}><NextArt item={task.art[i]} /><span>{task.stages[i]}</span></button>)}</div>
    <div className="game-actions"><button className="secondary-button" disabled={solved || !selected.length} onClick={() => setSelected(s => s.slice(0, -1))}>Undo stage</button><button className="secondary-button" disabled={solved || !selected.length} onClick={() => setSelected([])}>Reset sequence</button><button className="primary-button" disabled={solved || selected.length !== task.stages.length} onClick={() => check(selected.every((value, i) => value === i), task.observation)}>Check sequence</button></div>
    {solved && <p className="science-observation">Observation: {task.observation}</p>}
    <RoundFooter feedback={feedback} success="The stages connect, and new eggs or seeds can begin another cycle." retry={`Begin with ${task.stages[0]}. Think about what grows or changes next. Undo a stage or tap a filled slot.`} onNext={() => { setRound(r => r + 1); setSelected([]); reset(); }} />
  </div>;
}

export function TokenJar({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const tasks = jarRounds[difficulty];
  const task = tasks[round % tasks.length];
  const [amount, setAmount] = useState(task.start);
  const [history, setHistory] = useState<number[]>([]);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const solved = feedback === 'correct';
  const maximum = difficulty === 'gentle' ? 5 : 10;
  const instruction = `Change the jar from ${task.start} to ${task.goal} pretend tokens.`;
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={instruction} prompt={instruction} />
    <p className="simulation-note">These plain pretend tokens are not currency. This is quantity practice, not a shop or payment.</p>
    {difficulty === 'gentle' && <p className="guide-note">Add if the jar has too few. Remove if it has too many. Zero means an empty jar.</p>}
    <Group count={task.goal} label="Goal (one dot per token)" noun="tokens" />
    <TokenDisplay amount={amount} label="Jar" />
    <div className="game-actions"><button className="secondary-button" disabled={solved || amount === maximum} onClick={() => { setHistory(h => [...h, amount]); setAmount(a => a + 1); }}>Add token</button><button className="secondary-button" disabled={solved || amount === 0} onClick={() => { setHistory(h => [...h, amount]); setAmount(a => a - 1); }}>Remove token</button><button className="secondary-button" disabled={solved || !history.length} onClick={() => { setAmount(history[history.length - 1]); setHistory(h => h.slice(0, -1)); }}>Undo token</button><button className="secondary-button" disabled={solved || !history.length} onClick={() => { setAmount(task.start); setHistory([]); }}>Reset jar</button><button className="primary-button" disabled={solved} onClick={() => check(amount === task.goal, `${amount} tokens match the goal!`)}>Check jar</button></div>
    <RoundFooter feedback={feedback} success={`${amount} tokens match the goal, including an empty jar for zero.`} retry="Compare each jar token with a goal dot. Add or remove, then check again." onNext={() => { const next = round + 1; setRound(next); setAmount(tasks[next % tasks.length].start); setHistory([]); reset(); }} />
  </div>;
}

function TokenDisplay({ amount, label }: { amount: number; label: string }) {
  return <div className="token-display" role="img" aria-label={`${label}: ${amount} tokens`}><strong>{label}: {amount} tokens</strong><div className="berry-group">{Array.from({ length: amount }, (_, i) => <span className="plain-token" key={i}>{i + 1}</span>)}</div>{amount === 0 && <span>Empty: zero tokens</span>}</div>;
}

export function SaveSpecial({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const tasks = savingsRounds[difficulty];
  const task = tasks[round % tasks.length];
  const [amount, setAmount] = useState(task.start);
  const [plan, setPlan] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const solved = feedback === 'correct';
  const needed = task.goal - task.start;
  const instruction = `Plan pretend savings for a toy ${task.toy}. Start: ${task.start}. Goal: ${task.goal}.`;
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={instruction} prompt={instruction} />
    <div className="next-picture"><NextArt item={task.toy} /><strong>Pretend toy {task.toy}: goal {task.goal} tokens</strong></div>
    <p className="simulation-note">Pretend planning only: no real purchase, earning requirement, waiting, or family money questions. Saving and spending are choices, not a test of being good.</p>
    {difficulty === 'gentle' && <p className="guide-note">Goal {task.goal} minus start {task.start} leaves {needed} more to plan. Choose that amount, then try contributions.</p>}
    {plan === null ? <div className="savings-plan"><p>How many more tokens are needed from the start?</p><AnswerChoices choices={numberChoices(needed, 0, difficulty === 'gentle' ? 5 : 10)} disabled={false} onAnswer={value => {
      if (value === needed) { setPlan(needed); reset(); speak(`Your plan needs ${needed} more tokens.`, sound); }
      else check(false, '');
    }} /></div> : <>
      <p className="guide-note">Plan: add {plan} more from the start. Remaining now: <strong>{Math.max(0, task.goal - amount)}</strong>. {amount > task.goal && `There are ${amount - task.goal} extra tokens. Undo or remove them to reach the exact goal.`}</p>
      <TokenDisplay amount={amount} label="Savings" />
      <progress max={task.goal} value={Math.min(amount, task.goal)} aria-label={`Savings progress: ${Math.min(amount, task.goal)} of ${task.goal}`} />
      <div className="game-actions">{[1, 2].map(n => <button className="secondary-button" key={n} disabled={solved || amount + n > (difficulty === 'gentle' ? 5 : 10)} onClick={() => { setHistory(h => [...h, amount]); setAmount(a => a + n); }}>Contribute {n} {n === 1 ? 'token' : 'tokens'}</button>)}<button className="secondary-button" disabled={solved || amount <= task.start} onClick={() => { setHistory(h => [...h, amount]); setAmount(a => a - 1); }}>Remove contribution token</button><button className="secondary-button" disabled={solved || !history.length} onClick={() => { setAmount(history[history.length - 1]); setHistory(h => h.slice(0, -1)); }}>Undo contribution</button><button className="secondary-button" disabled={solved} onClick={() => { setAmount(task.start); setPlan(null); setHistory([]); reset(); }}>Reset savings plan</button><button className="primary-button" disabled={solved} onClick={() => check(amount === task.goal, 'The savings match your pretend goal!')}>Check savings goal</button></div>
    </>}
    <RoundFooter feedback={feedback} success={`Start ${task.start} + planned ${needed} = goal ${task.goal}. Remaining: 0. You explored reaching a pretend goal!`} retry={plan === null ? 'Compare start and goal: how many more would fill the gap?' : 'Check the remaining amount. Contributions must reach the goal exactly; undo or remove extras.'} onNext={() => { const next = round + 1; setRound(next); setAmount(tasks[next % tasks.length].start); setPlan(null); setHistory([]); reset(); }} />
  </div>;
}
