import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Heart, Star, Volume2 } from 'lucide-react';
import { PictureArt, type Picture } from './Art';

export function speak(text: string, enabled: boolean) {
  if (!enabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.8;
  utterance.lang = 'en-US';
  window.speechSynthesis.speak(utterance);
}

export type GameFeedback = 'none' | 'retry' | 'correct';

export function useRoundFeedback(sound: boolean, onCelebrate: () => void) {
  const [feedback, setFeedback] = useState<GameFeedback>('none');
  const solved = useRef(false);

  function check(correct: boolean, success: string) {
    if (solved.current) return;
    setFeedback(correct ? 'correct' : 'retry');
    if (correct) {
      solved.current = true;
      onCelebrate();
      speak(success, sound);
    } else {
      speak('Good try! Let us try another one.', sound);
    }
  }

  function reset() {
    solved.current = false;
    setFeedback('none');
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  return { feedback, check, reset };
}

export function RoundIntro({ round, instruction, prompt, listenLabel = 'Hear the prompt' }: { round: number; instruction: string; prompt: string; listenLabel?: string }) {
  const instructionRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => { if (round > 0) instructionRef.current?.focus(); }, [round]);
  return <>
    <div className="round-progress" aria-label={`Adventure ${round + 1}`}><span /> Adventure {round + 1} <span /></div>
    <p className="game-instruction" ref={instructionRef} tabIndex={-1}>{instruction}</p>
    <button className="listen-button" disabled={!('speechSynthesis' in window)} onClick={() => speak(prompt, true)}><Volume2 size={17} /> {listenLabel}</button>
  </>;
}

export function RoundFooter({ feedback, success, onNext, retry = 'Good try, little explorer. Try another one!' }: { feedback: GameFeedback; success: string; onNext: () => void; retry?: string }) {
  return <>
    <div className={`answer-feedback ${feedback}`} role="status">{feedback === 'correct' ? <><Star size={21} /><strong>{success}</strong></> : feedback === 'retry' ? <><Heart size={19} /> {retry}</> : <span>Take your time. You've got this.</span>}</div>
    {feedback === 'correct' && <button className="primary-button next-round" onClick={onNext}>Play another <ArrowRight size={18} /></button>}
  </>;
}

export function AnswerChoices({ choices, disabled, onAnswer, dollars = false }: { choices: readonly (string | number)[]; disabled: boolean; onAnswer: (answer: string | number) => void; dollars?: boolean }) {
  return <div className={`answer-options ${dollars ? 'dollar-answers' : ''}`} aria-label="Answer choices">{choices.map(value => <button key={value} disabled={disabled} onClick={() => onAnswer(value)} aria-label={`Choose ${dollars ? `${value} dollars` : value}`}>{dollars ? `$${value}` : value}</button>)}</div>;
}

export function CountObjects({ count, picture, noun, sound, disabled }: { count: number; picture: Picture; noun: string; sound: boolean; disabled: boolean }) {
  const [tapped, setTapped] = useState<number[]>([]);
  return <div className="count-stage" aria-label={`${count} ${noun}s to count`}>{Array.from({ length: count }, (_, i) => <button key={i} aria-label={`Count ${noun} ${i + 1}`} aria-pressed={tapped.includes(i)} disabled={disabled} onClick={() => {
    if (tapped.includes(i)) return;
    const next = [...tapped, i];
    setTapped(next);
    speak(String(next.length), sound);
  }}><PictureArt picture={picture} />{tapped.includes(i) && <span className="count-badge">{tapped.indexOf(i) + 1}</span>}</button>)}</div>;
}
