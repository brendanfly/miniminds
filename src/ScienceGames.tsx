import { useState } from 'react';
import { LabObjectArt, PlantArt } from './ExpansionArt';
import { floatRounds, gardenRounds, growthStages, type FloatOutcome } from './ExpansionData';
import { RoundFooter, RoundIntro, speak, useRoundFeedback } from './GameUI';
import type { ExpansionProps } from './CreativeGames';

export function FloatSink({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const [prediction, setPrediction] = useState<FloatOutcome | null>(null);
  const [tested, setTested] = useState(false);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const rounds = difficulty === 'gentle' ? floatRounds.slice(0, 3) : floatRounds;
  const task = rounds[round % rounds.length];
  const instruction = `Predict: will this ${task.name.toLowerCase()} float or sink? Then test it.`;
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={instruction} prompt={`${instruction} ${difficulty === 'gentle' ? task.clue : ''}`} />
    <p className="simulation-note">A simplified virtual experiment in still fresh water. Material, shape, trapped air, and water getting inside can change real results. Predictions are ideas to test, not good or bad answers.</p>
    <h3 className="object-name">{task.name}</h3>
    {difficulty === 'gentle' && <p className="material-clue">{task.clue}</p>}
    <div className={`lab-tub ${tested ? task.outcome.toLowerCase() : 'waiting'}`} role="img" aria-label={tested ? `${task.name}: ${task.outcome === 'Float' ? 'floating at the surface' : 'sunk to the bottom'}` : `${task.name} above the tub, not tested`}><LabObjectArt object={task.id} /><span className="water-line" /><span className="tub-label" aria-hidden="true">Fresh water</span></div>
    <div className="tile-row" role="group" aria-label="Your prediction">{(['Float', 'Sink'] as const).map(value => <button key={value} aria-pressed={prediction === value} disabled={tested} onClick={() => setPrediction(value)}>Predict {value.toLowerCase()}</button>)}</div>
    <div className="game-actions"><button className="primary-button" disabled={prediction === null || tested} onClick={() => {
      setTested(true);
      speak(task.observation, sound);
    }}>Test in water</button></div>
    {tested && <div className="science-observation" role="status"><h3>Observation</h3><p>{task.observation}</p><p>You predicted {prediction?.toLowerCase()}. {prediction === task.outcome ? 'The result matched your prediction.' : 'The result was different. That is a discovery, too!'}</p><button className="secondary-button" disabled={feedback === 'correct'} onClick={() => check(true, 'You predicted, tested, and observed. A little scientist!')}>Record observation</button></div>}
    <RoundFooter feedback={feedback} success="You predicted, tested, and observed. A little scientist!" onNext={() => { setRound(r => r + 1); setPrediction(null); setTested(false); reset(); }} />
  </div>;
}

export function GrowGarden({ difficulty, sound, onCelebrate }: ExpansionProps) {
  const [round, setRound] = useState(0);
  const [stage, setStage] = useState(0);
  const [water, setWater] = useState(gardenRounds[0].water);
  const [light, setLight] = useState(gardenRounds[0].light);
  const [prediction, setPrediction] = useState<'grow' | 'care' | null>(null);
  const [observation, setObservation] = useState('');
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const ready = water && light;
  const done = feedback === 'correct';
  const instruction = difficulty === 'gentle' ? 'Use the care guide. Try water and light, predict, then observe each pretend growth step.' : 'Check water and light. Predict whether the plant can grow, then observe and adjust care.';

  function changeCare(kind: 'water' | 'light') {
    if (kind === 'water') setWater(true);
    else setLight(true);
    setPrediction(null);
    setObservation('');
  }
  function observe() {
    const predictionNote = prediction ? `You predicted ${prediction === 'grow' ? 'growth' : 'more care needed'}. ${((prediction === 'grow') === ready) ? 'The result matched.' : 'The result was different; use it to explore.'} ` : '';
    if (!ready) {
      const message = `${predictionNote}No new growth in this step. ${!water && !light ? 'The soil is dry and the plant needs light.' : !water ? 'The soil is dry; add a little water.' : 'The soil is damp; the plant still needs light.'} More water is not the answer when soil is already damp.`;
      setObservation(message);
      setPrediction(null);
      speak(message, sound);
      return;
    }
    const next = stage + 1;
    const message = `${predictionNote}With damp soil and light, the ${growthStages[stage].toLowerCase()} becomes a ${growthStages[next].toLowerCase()} in our simulation. In real life this takes days or weeks.`;
    setStage(next);
    setObservation(message);
    setPrediction(null);
    if (next === 3) check(true, 'You cared for a plant and observed three growth steps!');
    else {
      const conditions = gardenRounds[(round + next) % gardenRounds.length];
      setWater(conditions.water);
      setLight(conditions.light);
      speak(message, sound);
    }
  }
  return <div className="activity-panel">
    <RoundIntro round={round} instruction={instruction} prompt={instruction} />
    <p className="simulation-note">Simplified, pretend time-lapse: real plants take days or weeks, and also need air, nutrients, suitable warmth, and space. Soil should be damp, not flooded. There is no waiting timer here.</p>
    <div className="plant-stage" role="img" aria-label={`Growth stage: ${growthStages[stage]}`}><PlantArt stage={stage} /><h3>{growthStages[stage]} - Step {stage} of 3</h3></div>
    <p className="care-status">Soil: {water ? 'damp, enough water' : 'dry, needs a little water'}. Light: {light ? 'available' : 'needed'}.</p>
    {difficulty === 'gentle' && <p className="material-clue">Care guide: damp soil AND light support growth. If either is missing, the plant needs more care.</p>}
    <div className="tile-row"><button disabled={water || done} onClick={() => changeCare('water')}>Add a little water</button><button disabled={light || done} onClick={() => changeCare('light')}>Give light</button></div>
    <div className="tile-row" role="group" aria-label="Growth prediction"><button aria-pressed={prediction === 'grow'} disabled={done} onClick={() => setPrediction('grow')}>Predict growth</button><button aria-pressed={prediction === 'care'} disabled={done} onClick={() => setPrediction('care')}>Predict more care</button></div>
    <div className="game-actions"><button className="primary-button" disabled={done || prediction === null} onClick={observe}>Observe a pretend time step</button></div>
    {observation && <div className="science-observation" role="status"><h3>Observation</h3><p>{observation}</p>{!done && stage > 0 && <p>Now check the care conditions for the next step.</p>}</div>}
    <RoundFooter feedback={feedback} success="You cared for a plant and observed three growth steps!" onNext={() => {
      const next = round + 1;
      setRound(next); setStage(0); setWater(gardenRounds[next % gardenRounds.length].water); setLight(gardenRounds[next % gardenRounds.length].light); setPrediction(null); setObservation(''); reset();
    }} />
  </div>;
}
