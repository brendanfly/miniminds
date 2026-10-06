import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, FlaskConical, Flower2, Heart, Leaf, LockKeyhole, Paintbrush, RotateCcw, Shapes, ShoppingBasket, Sparkles, Sprout, Star, Volume2, VolumeX, Wallet, X } from 'lucide-react';
import { GardenArt, PictureArt } from './Art';
import { AnswerChoices, CountObjects, RoundFooter, RoundIntro, speak, useRoundFeedback } from './GameUI';
import { KindergartenGame } from './KindergartenGames';
import { ExpansionGame, isExpansionGame } from './ExpansionGames';
import { ExpansionCardArt } from './ExpansionArt';
import { colorRecipes, countChoices, countRounds, filterGames, games, letterRounds, stages, startingDifficulty, type Category, type Difficulty, type GameId, type StageFilter } from './games';

const palette = [
  { name: 'Coral', value: '#e77b68' }, { name: 'Yellow', value: '#edc65e' },
  { name: 'Green', value: '#86ae74' }, { name: 'Blue', value: '#94bcc9' },
  { name: 'Purple', value: '#b8a3d0' }, { name: 'Pink', value: '#e99fba' },
];
const categories: { id: Category; label: string; icon: typeof Shapes }[] = [
  { id: 'all', label: 'All activities', icon: Shapes }, { id: 'coloring', label: 'Coloring', icon: Paintbrush },
  { id: 'reading', label: 'Reading', icon: BookOpen }, { id: 'math', label: 'Math', icon: Shapes },
  { id: 'science', label: 'Science', icon: FlaskConical }, { id: 'money', label: 'Money', icon: Wallet },
];

export default function App() {
  const [category, setCategory] = useState<Category>('all');
  const [stage, setStage] = useState<StageFilter>('all');
  const [activeGame, setActiveGame] = useState<GameId | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('gentle');
  const [sound, setSound] = useState(false);
  const [stars, setStars] = useState(0);
  const [parents, setParents] = useState(false);
  const activitiesRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const soundSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const selectedGame = games.find(game => game.id === activeGame);
  const visibleGames = filterGames(category, stage);

  useEffect(() => {
    titleRef.current?.focus();
    return () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); };
  }, [activeGame]);

  useEffect(() => {
    return () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); };
  }, [difficulty]);

  function openGame(id: GameId) {
    const game = games.find(item => item.id === id);
    if (!game) throw new Error(`Unknown game: ${id}`);
    setDifficulty(startingDifficulty(game, stage));
    setActiveGame(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand" onClick={() => setActiveGame(null)} aria-label="MiniMinds home">
          <span className="brand-mark"><Sprout size={28} strokeWidth={2.2} /></span>
          <span>mini<span className="brand-accent">minds</span><span className="brand-dot">.</span></span>
        </button>
        <nav aria-label="Main navigation">
          <button className={`nav-play ${activeGame === null ? 'current' : ''}`} onClick={() => setActiveGame(null)}>Let's play</button>
          <button className="parent-link" onClick={() => setParents(true)}><LockKeyhole size={15} /> Grown-ups</button>
        </nav>
        <button className="sound-button" aria-label={sound ? 'Turn sound off' : 'Turn sound on'} aria-pressed={sound} disabled={!soundSupported} title={soundSupported ? 'Optional spoken prompts' : 'Spoken prompts are not supported by this browser'} onClick={() => {
          setSound(!sound);
          if (sound && soundSupported) window.speechSynthesis.cancel();
          else speak('Hello, little explorer!', true);
        }}>{sound ? <Volume2 size={20} /> : <VolumeX size={20} />}</button>
      </header>

      <main>
        {activeGame === null ? <>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="eyebrow"><span /> A HAPPY PLACE FOR LITTLE MINDS</div>
              <h1 id="hero-title" ref={titleRef} tabIndex={-1}>Little play.<br />Big <span>discoveries.<svg viewBox="0 0 390 20" aria-hidden="true"><path d="M5 12Q175-1 385 10" /></svg></span></h1>
              <p>A world of colors, letters, and numbers.<br className="desktop-break" /> Made for curious kids and their big imaginations.</p>
              <button className="primary-button" onClick={() => activitiesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Let's explore <ArrowRight size={19} /></button>
              <div className="hero-note"><Heart size={14} /> Little learners, ages 3-7 <span className="note-dot" /> Big smiles welcome</div>
            </div>
            <div className="hero-picture"><span className="hero-orbit" /><GardenArt /><span className="art-caption">a little wonder grows here</span></div>
          </section>

          <section className="activities" ref={activitiesRef} aria-labelledby="activities-title">
            <div className="section-heading">
              <div><div className="eyebrow section-eyebrow">PICK A LITTLE ADVENTURE</div><h2 id="activities-title">What shall we play today?</h2></div>
              <span className="activity-note"><Sparkles size={16} /> Learn a little. Play a lot.</span>
            </div>
            <div className="filter-label">Explore a subject</div>
            <div className="category-tabs" role="group" aria-label="Filter by subject">
              {categories.map(({ id, label, icon: Icon }) => <button key={id} aria-pressed={category === id} className={category === id ? 'selected' : ''} onClick={() => setCategory(id)}><Icon size={17} /> {label}</button>)}
            </div>
            <div className="filter-label">Find your learning stage <span>Ages are a guide, not a limit.</span></div>
            <div className="stage-tabs" role="group" aria-label="Filter by learning stage">
              {stages.map(item => <button key={item.id} aria-pressed={stage === item.id} className={stage === item.id ? 'selected' : ''} onClick={() => setStage(item.id)}>{item.label}{item.age && <span>Ages {item.age}</span>}</button>)}
            </div>
            <div className="catalog-summary" role="status"><span>{visibleGames.length} {visibleGames.length === 1 ? 'adventure' : 'adventures'} to explore</span><span>{stages.find(item => item.id === stage)?.description}</span></div>
            <div className="game-grid">
              {visibleGames.map(game => <button key={game.id} className={`game-card ${game.subject} ${game.id}`} onClick={() => openGame(game.id)} aria-label={`Play ${game.title}`}>
                <div className="card-art">
                  <span className="age-tag">{game.age}</span>
                  <CardArt game={game.id} />
                  <span className="card-play"><ArrowRight size={21} /></span>
                </div>
                <div className="card-copy"><span className="card-category">{game.category}</span><h3>{game.title}</h3><p>{game.subtitle}</p><span className="card-bottom">{game.subject === 'coloring' ? <Paintbrush size={14} /> : game.subject === 'reading' ? <BookOpen size={14} /> : game.subject === 'money' ? <Wallet size={14} /> : <Shapes size={14} />} {game.invitation}<ChevronRight size={16} /></span></div>
              </button>)}
            </div>
            {visibleGames.length === 0 && <div className="empty-catalog"><Sprout size={34} /><h3>More adventures are growing</h3><p>There are no games for this subject and stage yet. Try another stage or explore all subjects.</p><button className="secondary-button" onClick={() => { setCategory('all'); setStage('all'); }}>Show every adventure <ArrowRight size={17} /></button></div>}
          </section>

          <section className="kind-banner" aria-label="Our approach">
            <span className="banner-icon"><Leaf size={26} /></span>
            <div><h3>Small steps. Happy hearts.</h3><p>No timers. No pressure. Just a safe little space to learn through play.</p></div>
            <span className="banner-doodle"><Flower2 size={40} strokeWidth={1.3} /></span>
          </section>
        </> : selectedGame && <section className={`game-screen ${selectedGame.subject} ${activeGame}`} aria-labelledby="game-title">
          <div className="game-topbar"><button className="back-button" onClick={() => setActiveGame(null)}><ArrowLeft size={18} /> All activities</button><span className="session-stars"><Star size={18} /> {stars} happy {stars === 1 ? 'star' : 'stars'}</span></div>
          <div className="game-heading"><div className="eyebrow">YOUR LITTLE ADVENTURE</div><h1 id="game-title" ref={titleRef} tabIndex={-1}>{selectedGame.title}</h1><p className="skill-note">{selectedGame.skills.join(' / ')}</p></div>
          <div className="difficulty-controls" role="group" aria-label="Choose game difficulty">{(['gentle', 'growing'] as const).map(mode => <button key={mode} aria-pressed={difficulty === mode} onClick={() => setDifficulty(mode)}>{selectedGame.modes[mode].label}</button>)}</div>
          <p className="difficulty-note">{selectedGame.modes[difficulty].description} <span>Changing difficulty restarts this activity, not your stars.</span></p>
          {activeGame === 'coloring' ? <ColoringGame key={difficulty} difficulty={difficulty} sound={sound} onCelebrate={() => setStars(s => s + 1)} /> : activeGame === 'letters' || activeGame === 'numbers' ? <LearningGame key={`${activeGame}-${difficulty}`} kind={activeGame} difficulty={difficulty} sound={sound} onCelebrate={() => setStars(s => s + 1)} /> : isExpansionGame(activeGame) ? <ExpansionGame key={`${activeGame}-${difficulty}`} kind={activeGame} difficulty={difficulty} sound={sound} onCelebrate={() => setStars(s => s + 1)} /> : <KindergartenGame key={`${activeGame}-${difficulty}`} kind={activeGame} difficulty={difficulty} sound={sound} onCelebrate={() => setStars(s => s + 1)} />}
        </section>}
      </main>

      <footer><span><Sprout size={16} /> Made for little minds. With a whole lot of love.</span><span>A family playground <Heart size={13} /></span></footer>
      {parents && <ParentPanel onClose={() => setParents(false)} />}
    </div>
  );
}

function CardArt({ game }: { game: GameId }) {
  if (isExpansionGame(game)) return <ExpansionCardArt game={game} />;
  if (game === 'coloring') return <div className="coloring-preview"><span className="art-blob" /><PictureArt picture="flower" /><PictureArt picture="butterfly" /><span className="crayon crayon-one" /><span className="crayon crayon-two" /><span className="tiny-spark">+</span></div>;
  if (game === 'letters') return <div className="letter-preview"><span className="letter-block block-a">A<span className="block-face">..</span></span><span className="letter-block block-b">b<span className="block-face">..</span></span><span className="letter-block block-c">c</span><span className="tiny-spark">+</span></div>;
  if (game === 'word-builder') return <div className="pack-preview word-builder-preview"><PictureArt picture="cat" /><div className="preview-word-tiles"><span>c</span><span>a</span><span>t</span></div><span className="tiny-spark">+</span></div>;
  if (game === 'sight-words') return <div className="pack-preview sight-words-preview"><ShoppingBasket size={87} strokeWidth={1.4} /><span className="preview-word">see</span><PictureArt picture="apple" /><span className="tiny-spark">+</span></div>;
  if (game === 'addition') return <div className="pack-preview addition-preview"><PictureArt picture="apple" /><span>+</span><PictureArt picture="apple" /><ShoppingBasket size={55} strokeWidth={1.4} /></div>;
  if (game === 'give-count') return <div className="pack-preview money-preview"><span className="preview-dollar">$1</span><ArrowRight size={32} /><Heart size={62} strokeWidth={1.4} /><span className="tiny-spark">+</span></div>;
  return <div className="number-preview"><span className="number-one">1</span><span className="number-two">2</span><span className="number-three">3</span><PictureArt picture="flower" /><span className="tiny-spark">+</span></div>;
}

function ColoringGame({ sound, difficulty, onCelebrate }: { sound: boolean; difficulty: Difficulty; onCelebrate: () => void }) {
  const [color, setColor] = useState(palette[0].value);
  const [fills, setFills] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<Record<string, string>[]>([]);
  const [page, setPage] = useState<'flower' | 'house'>('flower');
  const [finished, setFinished] = useState(false);
  const colors = Object.values(fills).length;
  const recipe = colorRecipes[page];
  const matches = recipe.filter(item => fills[item.region] === palette.find(p => p.name === item.color)?.value).length;
  const canFinish = difficulty === 'gentle' ? colors > 0 : matches === recipe.length;
  const recipeText = page === 'flower' ? 'Pink petals, a yellow center, and green leaves and stem.' : 'A coral roof, yellow wall and sun, blue door, purple windows, and green grass.';

  function paint(region: string) {
    if (finished || fills[region] === color) return;
    setHistory(h => [...h, fills]);
    setFills(previous => ({ ...previous, [region]: color }));
  }

  function regionProps(name: string) {
    return {
      fill: fills[name] ?? '#fffdf8',
      role: 'button',
      tabIndex: finished ? -1 : 0,
      'aria-label': `Color ${name}`,
      onClick: () => paint(name),
      onKeyDown: (event: React.KeyboardEvent<SVGElement>) => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); paint(name); }
      },
    };
  }

  return <div className="activity-panel">
    <p className="game-instruction">Pick a color. Tap a shape. Make something wonderful!</p>
    <div className="picture-tabs" aria-label="Choose a coloring picture">{(['flower', 'house'] as const).map(p => <button key={p} aria-pressed={page === p} disabled={finished} onClick={() => { setPage(p); setFills({}); setHistory([]); }}><span>{p === 'flower' ? 'Flower' : 'Little house'}</span></button>)}</div>
    {difficulty === 'growing' && <div className="color-recipe"><h3>Our color recipe</h3><p>{recipeText}</p><button className="listen-button" disabled={!('speechSynthesis' in window)} onClick={() => speak(recipeText, true)}><Volume2 size={17} /> Hear the recipe</button><span role="status">{matches} of {recipe.length} shapes match the recipe.</span></div>}
    <div className="coloring-layout">
      <div className="coloring-paper">
        <svg viewBox="0 0 400 360" className="coloring-canvas" aria-label={`${page} coloring picture`}>
          <g stroke="#616f54" strokeWidth="4" strokeLinejoin="round">
            {page === 'flower' ? <>
              <path {...regionProps('stem')} d="M190 174h20v142h-20Z" />
              <path {...regionProps('left leaf')} d="M190 279q-89 7-95-63 67-4 95 63Z" />
              <path {...regionProps('right leaf')} d="M210 300q89 7 95-63-67-4-95 63Z" />
              {[0, 60, 120, 180, 240, 300].map((angle, i) => <ellipse key={angle} {...regionProps(`petal ${i + 1}`)} cx="200" cy="76" rx="29" ry="43" transform={`rotate(${angle} 200 128)`} />)}
              <circle {...regionProps('flower center')} cx="200" cy="128" r="37" />
              <g fill="#616f54" stroke="none" pointerEvents="none"><circle cx="188" cy="124" r="4" /><circle cx="212" cy="124" r="4" /></g>
              <path d="M190 140q10 10 20 0" fill="none" strokeLinecap="round" pointerEvents="none" />
            </> : <>
              <circle {...regionProps('sun')} cx="323" cy="61" r="30" />
              <path {...regionProps('house wall')} d="M100 157h200v162H100Z" />
              <path {...regionProps('roof')} d="m75 158 125-113 125 113Z" />
              <path {...regionProps('door')} d="M176 231h49v88h-49Z" />
              <path {...regionProps('left window')} d="M119 190h39v43h-39Z" />
              <path {...regionProps('right window')} d="M243 190h39v43h-39Z" />
              <path {...regionProps('grass')} d="M39 319q40-34 76 0 41-23 83 0 49-32 91 0 43-22 73 0v24H39Z" />
              <circle cx="213" cy="274" r="3" fill="#616f54" stroke="none" pointerEvents="none" />
            </>}
          </g>
        </svg>
      </div>
      <div className="palette" aria-label="Colors">{palette.map(p => <button key={p.name} style={{ '--swatch': p.value } as React.CSSProperties} aria-label={p.name} aria-pressed={color === p.value} disabled={finished} onClick={() => { setColor(p.value); speak(p.name, sound); }}><span>{color === p.value && <Check size={24} />}</span></button>)}</div>
    </div>
    <div className="game-actions"><button className="secondary-button" disabled={history.length === 0 || finished} onClick={() => { setFills(history[history.length - 1]); setHistory(h => h.slice(0, -1)); }}><RotateCcw size={17} /> Undo</button><button className="primary-button" disabled={!canFinish || finished} onClick={() => { setFinished(true); onCelebrate(); speak('What a beautiful picture! You made it your own.', sound); }}>All done <Check size={18} /></button></div>
    {finished && <div className="celebration" role="status"><Star size={24} /><strong>A little masterpiece!</strong><span>Your colors make this garden special.</span><button className="secondary-button" onClick={() => { setFinished(false); setFills({}); setHistory([]); }}>Make another <ArrowRight size={17} /></button></div>}
  </div>;
}

function LearningGame({ kind, difficulty, sound, onCelebrate }: { kind: 'letters' | 'numbers'; difficulty: Difficulty; sound: boolean; onCelebrate: () => void }) {
  const [round, setRound] = useState(0);
  const { feedback, check, reset } = useRoundFeedback(sound, onCelebrate);
  const letter = letterRounds[round % letterRounds.length];
  const counts = difficulty === 'gentle' ? countRounds.filter(value => value <= 5) : countRounds;
  const count = counts[round % counts.length];
  const little = kind === 'letters' && difficulty === 'growing';
  const target = little ? letter.letter.toLowerCase() : letter.letter;
  const prompt = kind === 'letters' ? little ? `Find the little letter for big ${letter.letter}. ${letter.letter} is for ${letter.word}.` : `${letter.word} starts with ${letter.letter}. Can you find ${letter.letter}?` : 'Tap each flower to count. How many flowers can you see?';
  const choices = kind === 'letters' ? letter.choices.map(value => little ? value.toLowerCase() : value) : countChoices(count, difficulty === 'gentle' ? 5 : 10);
  const success = kind === 'letters' ? `${letter.letter} is for ${letter.word}. You found it!` : `${count} flowers. Lovely counting!`;

  return <div className="activity-panel learning-panel">
    <RoundIntro round={round} instruction={kind === 'letters' ? little ? `Find the little letter for big ${letter.letter}.` : `Find the letter ${letter.letter} for ${letter.word}.` : 'Tap the flowers to count. How many are there?'} prompt={prompt} />
    {kind === 'letters' ? <div className="letter-stage"><PictureArt picture={letter.picture} /><span>{little ? `${letter.letter} is for ${letter.word}` : letter.word}</span></div> : <CountObjects key={round} count={count} picture="flower" noun="flower" sound={sound} disabled={feedback === 'correct'} />}
    <AnswerChoices choices={choices} disabled={feedback === 'correct'} onAnswer={value => check(kind === 'letters' ? value === target : value === count, success)} />
    <RoundFooter feedback={feedback} success={success} onNext={() => { setRound(r => r + 1); reset(); }} />
  </div>;
}

function ParentPanel({ onClose }: { onClose: () => void }) {
  const [unlocked, setUnlocked] = useState(false);
  const [holding, setHolding] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const modal = dialog.current;
    modal?.showModal();
    return () => {
      if (timer.current) clearTimeout(timer.current);
      modal?.close();
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);
  function stopHolding() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setHolding(false);
  }
  function startHolding() {
    if (timer.current) return;
    setHolding(true);
    timer.current = setTimeout(() => { setUnlocked(true); stopHolding(); }, 3000);
  }
  return <dialog className="parent-dialog" ref={dialog} onCancel={onClose} aria-labelledby="parent-title">
    <button className="dialog-close" aria-label="Close grown-up panel" onClick={onClose}><X size={21} /></button>
    <span className="parent-icon"><LockKeyhole size={25} /></span><h2 id="parent-title">{unlocked ? 'A little note for grown-ups' : 'Hello, grown-up!'}</h2>
    {!unlocked ? <><p>This corner is just for you. Hold the button for 3 seconds to come in.</p><button className={`primary-button parent-hold ${holding ? 'holding' : ''}`} onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); startHolding(); }} onPointerUp={stopHolding} onPointerCancel={stopHolding} onLostPointerCapture={stopHolding} onKeyDown={event => { if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); startHolding(); } }} onKeyUp={stopHolding} onBlur={stopHolding} onContextMenu={event => event.preventDefault()}>{holding ? 'Keep holding...' : 'Hold to open'} <LockKeyhole size={17} /></button></> : <div className="parent-details">
      <p>MiniMinds is a family-made playground for ages 3-7, designed for short, relaxed moments together.</p>
      <h3>Play at their pace</h3><p>Learning-stage filters are suggestions, not age restrictions. Little Explorers starts with gentler modes. Kindergarten Crew adds word building, familiar words, adding, and pretend dollars. Growing Thinkers starts with more challenging modes. Every game lets you change difficulty; doing so restarts the activity, but keeps the tab's stars. There are no timers, penalties, or competitive scores.</p>
      <h3>Learn together</h3><p>There are 27 playable activities. Reading includes letter names/shapes, spelling, familiar words, sentence order, four whole-word rhyme pairs, and three tiny original stories; this is not a full reading or phonics curriculum. Color and stamp recipes name both shapes and colors or positions. Math includes numeral/group matching and more/less/same, with zero and equal groups. Token Jar uses non-currency tokens; savings and shop activities are pretend planning, never real payments or family financial questions. Science explores specified animal needs, reversible life-cycle sequences, plant care, and floating experiments. Animals can use more than one habitat. Cycles compress real elapsed time and vary by species; real plants do not grow instantly. Material and form matter in water. Paint mixing is a simplified model, not a rule for all pigments. Platformers remain proposed.</p>
      <h3>Private by design</h3><p>This prototype has no accounts, ads, analytics, or uploads. Pictures and happy stars live only in this tab and reset when it reloads. Optional spoken prompts use your browser's speech service, which may depend on your device or browser provider.</p>
      <h3>A family pilot, not a public service</h3><p>There is no sign-in or access control yet. Keep it on your home network. Before a public launch, review children's privacy requirements, accessibility, and hosting security.</p>
      <div className="parent-tip"><Heart size={18} /> Try asking, "What did you discover today?"</div>
    </div>}
  </dialog>;
}
