import { useState } from 'react';
import { PictureArt } from './Art';
import { AnswerChoices, RoundFooter, RoundIntro, speak, useRoundFeedback } from './GameUI';
import { buyRounds, pondRounds, toyRounds, trainRounds } from './ExpansionData';
import { numberChoices } from './games';
import type { ExpansionProps } from './CreativeGames';

export function NumberTrain({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const rounds = trainRounds[difficulty];
  const task = rounds[round % rounds.length];
  const ordering = difficulty === 'gentle';
  const target = task.sequence[task.missing];
  const instruction = ordering ? `Build a train counting from ${task.sequence[0]} to ${task.sequence.at(-1)}. Tap the carriages in order.` : 'The train counts from 1 to 10. Find its missing carriage.';
  const success = ordering ? `${task.sequence.join(', ')}. Your train is in counting order!` : `${target} fills the gap. Your train is complete!`;
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={instruction} prompt={instruction} />
    <div className="train-line" aria-label="Your number train">{task.sequence.map((value, i) => <div className="train-carriage" key={i}>{ordering ? selected[i] ?? '?' : i === task.missing ? selected[0] ?? '?' : value}<span className="train-wheels" aria-hidden="true" /></div>)}</div>
    {ordering ? <>
      <div className="tile-row">{[...task.sequence].reverse().map(value => <button key={value} disabled={feedback === 'correct' || selected.includes(value)} aria-label={`Add carriage ${value}`} onClick={() => { setSelected(s => [...s, value]); speak(String(value), sound); }}>{value}</button>)}</div>
      <div className="game-actions"><button className="secondary-button" disabled={!selected.length || feedback === 'correct'} onClick={() => setSelected(s => s.slice(0, -1))}>Undo carriage</button><button className="primary-button" disabled={selected.length !== task.sequence.length || feedback === 'correct'} onClick={() => check(selected.every((value, i) => value === task.sequence[i]), success)}>Check train</button></div>
    </> : <AnswerChoices choices={numberChoices(target, 1, 10)} disabled={feedback === 'correct'} onAnswer={value => { if (typeof value === 'number') { setSelected([value]); check(value === target, success); } }} />}
    <RoundFooter feedback={feedback} success={success} retry={ordering ? 'Undo carriages and try counting in order again.' : 'Look at the numbers on each side of the gap and try again.'} onNext={() => { setRound(r => r + 1); setSelected([]); reset(); }} />
  </div>;
}

export function TakeAwayPond({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const [away, setAway] = useState<number[]>([]);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const rounds = pondRounds[difficulty];
  const task = rounds[round % rounds.length];
  const remaining = task.start - task.away;
  const ready = away.length === task.away;
  const instruction = `Start with ${task.start} ducks. Move ${task.away} to shore. How many stay in the pond?`;
  const success = `${task.start} take away ${task.away} leaves ${remaining} ducks in the pond.`;
  function duck(i: number, onShore: boolean) {
    return <button key={i} disabled={feedback === 'correct'} aria-label={onShore ? `Return duck ${i + 1} to pond` : `Move duck ${i + 1} to shore`} onClick={() => {
      setAway(s => onShore ? s.filter(value => value !== i) : [...s, i]);
      speak(onShore ? 'Back in the pond.' : 'One duck moved to shore.', sound);
    }}><PictureArt picture="duck" /></button>;
  }
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={instruction} prompt={instruction} />
    <div className="pond-trays">
      <section aria-label="Ducks in the pond"><h3>Pond</h3><div>{Array.from({ length: task.start }, (_, i) => away.includes(i) ? null : duck(i, false))}</div>{away.length === task.start && <p>No ducks here.</p>}</section>
      <section aria-label="Ducks on shore"><h3>Shore</h3><div>{away.map(i => duck(i, true))}</div></section>
    </div>
    <p className="manipulation-hint" aria-live="polite">{ready ? 'Now count the ducks still in the pond.' : away.length > task.away ? 'Too many ducks on shore for this task. Tap a shore duck to return it.' : `Move ${task.away - away.length} more to shore.`} <span>Tap a shore duck to bring it back.</span></p>
    <AnswerChoices choices={numberChoices(remaining, 0, difficulty === 'gentle' ? 5 : 10)} disabled={!ready || feedback === 'correct'} onAnswer={value => check(value === remaining, success)} />
    <RoundFooter feedback={feedback} success={success} onNext={() => { setRound(r => r + 1); setAway([]); reset(); }} />
  </div>;
}

export function ToyShop({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const [paid, setPaid] = useState(0);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const rounds = toyRounds[difficulty];
  const task = rounds[round % rounds.length];
  const maximum = difficulty === 'gentle' ? 5 : 10;
  const instruction = `The ${task.name} costs $${task.price}. Pay its exact price with pretend $1 tokens.`;
  const success = `Exactly $${task.price} for the ${task.name}. You matched the price!`;
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={instruction} prompt={instruction} />
    <span className="pretend-label">Pretend dollars only. No real money or shopping.</span>
    <div className="toy-display" role="img" aria-label={`${task.name}, price ${task.price} dollars`}><PictureArt picture={task.picture} /><span>Price: ${task.price}</span></div>
    <section className="payment-tray" aria-label="Pretend payment"><h3>Your payment: ${paid}</h3><div>{Array.from({ length: paid }, (_, i) => <button key={i} className="dollar-token" disabled={feedback === 'correct'} aria-label={`Remove payment dollar ${i + 1}`} onClick={() => setPaid(p => p - 1)}>$1</button>)}</div></section>
    <div className="game-actions"><button className="secondary-button" disabled={paid === maximum || feedback === 'correct'} onClick={() => { setPaid(p => p + 1); speak('One pretend dollar added.', sound); }}>Add $1 token</button><button className="secondary-button" disabled={paid === 0 || feedback === 'correct'} onClick={() => setPaid(p => p - 1)}>Undo dollar</button><button className="primary-button" disabled={paid === 0 || feedback === 'correct'} onClick={() => check(paid === task.price, success)}>Pay exact price</button></div>
    <RoundFooter feedback={feedback} success={success} retry={paid < task.price ? 'Count the price and your tokens. Add more to match the price.' : 'Count the price and your tokens. Return extra tokens to match the price.'} onNext={() => { setRound(r => r + 1); setPaid(0); reset(); }} />
  </div>;
}

export function CanBuy({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const rounds = buyRounds[difficulty];
  const task = rounds[round % rounds.length];
  const enough = task.wallet >= task.price;
  const instruction = `Your pretend wallet has $${task.wallet}. The toy duck costs $${task.price}. Is there enough?`;
  const success = task.wallet === task.price ? 'The amounts are equal. There is exactly enough!' : enough ? 'The wallet has more than the price. There is enough!' : 'The wallet has less than the price. There is not enough for this toy.';
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={instruction} prompt={instruction} />
    <span className="pretend-label">Pretend dollars only. No real money or shopping.</span>
    <div className="compare-panels"><section aria-label="Pretend wallet"><h3>Wallet: ${task.wallet}</h3>{task.wallet === 0 ? <p>The wallet is empty: $0.</p> : <div className="visible-tokens">{Array.from({ length: task.wallet }, (_, i) => <span className="dollar-token" key={i}>$1</span>)}</div>}</section><section aria-label="Toy price"><PictureArt picture="duck" /><h3>Toy duck: ${task.price}</h3>{difficulty === 'gentle' && <div className="visible-tokens">{Array.from({ length: task.price }, (_, i) => <span className="dollar-token" key={i}>$1</span>)}</div>}</section></div>
    <div className="tile-row"><button disabled={feedback === 'correct'} onClick={() => check(enough, success)}>Enough</button><button disabled={feedback === 'correct'} onClick={() => check(!enough, success)}>Not enough</button></div>
    <RoundFooter feedback={feedback} success={success} retry="Compare the wallet with the price. Equal amounts are enough, too." onNext={() => { setRound(r => r + 1); reset(); }} />
  </div>;
}
