import { AlphabetGarden, PatternPainter, RainbowMixer, SentenceKitchen, type ExpansionProps } from './CreativeGames';
import { CanBuy, NumberTrain, TakeAwayPond, ToyShop } from './NumberMoneyGames';
import { FloatSink, GrowGarden } from './ScienceGames';
import { AnimalHome, ColorHunt, LifeCycle, MoreLessSame, NumberMatch, RhymeTime, SaveSpecial, ShapeStudio, StoryDetective, TokenJar } from './NextGames';
import type { ExpansionGameId, GameId } from './games';

export function isExpansionGame(id: GameId): id is ExpansionGameId {
  return id !== 'coloring' && id !== 'letters' && id !== 'numbers' && id !== 'word-builder' && id !== 'sight-words' && id !== 'addition' && id !== 'give-count';
}

export function ExpansionGame({ kind, ...props }: ExpansionProps & { kind: ExpansionGameId }) {
  switch (kind) {
    case 'rhyme-time': return <RhymeTime {...props} />;
    case 'story-detective': return <StoryDetective {...props} />;
    case 'color-hunt': return <ColorHunt {...props} />;
    case 'shape-studio': return <ShapeStudio {...props} />;
    case 'number-match': return <NumberMatch {...props} />;
    case 'more-less-same': return <MoreLessSame {...props} />;
    case 'animal-home': return <AnimalHome {...props} />;
    case 'life-cycle': return <LifeCycle {...props} />;
    case 'token-jar': return <TokenJar {...props} />;
    case 'save-special': return <SaveSpecial {...props} />;
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
