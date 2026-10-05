import { AlphabetGarden, PatternPainter, RainbowMixer, SentenceKitchen, type ExpansionProps } from './CreativeGames';
import { CanBuy, NumberTrain, TakeAwayPond, ToyShop } from './NumberMoneyGames';
import { FloatSink, GrowGarden } from './ScienceGames';
import type { ExpansionGameId, GameId } from './games';

export function isExpansionGame(id: GameId): id is ExpansionGameId {
  return id !== 'coloring' && id !== 'letters' && id !== 'numbers' && id !== 'word-builder' && id !== 'sight-words' && id !== 'addition' && id !== 'give-count';
}

export function ExpansionGame({ kind, ...props }: ExpansionProps & { kind: ExpansionGameId }) {
  switch (kind) {
    case 'alphabet-garden': return <AlphabetGarden {...props} />;
    case 'sentence-kitchen': return <SentenceKitchen {...props} />;
    case 'rainbow-mixer': return <RainbowMixer {...props} />;
    case 'pattern-painter': return <PatternPainter {...props} />;
    case 'number-train': return <NumberTrain {...props} />;
    case 'take-away-pond': return <TakeAwayPond {...props} />;
    case 'grow-garden': return <GrowGarden {...props} />;
    case 'float-sink': return <FloatSink {...props} />;
    case 'toy-shop': return <ToyShop {...props} />;
    case 'can-buy': return <CanBuy {...props} />;
  }
}
