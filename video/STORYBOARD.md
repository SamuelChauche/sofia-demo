# Storyboard — Sofia Use Case Video (Remotion)

## Format
- **Résolution** : 1920×1080 (16:9)
- **FPS** : 30
- **Durée** : ~50s (1500 frames)
- **Style** : Dark theme fidèle à l'UI Sofia — glassmorphism, fond `#0f0f23`, accents iridescents
- **Palette** : Primaire `#C7866C`, texte `#F2DED6`, off-white `#FBF7F5`, borders `rgba(255,255,255,0.08)`, glass `rgba(0,0,0,0.8)`, iridescence `linear-gradient(135deg, #D790C7, #d37cbf, #ffc6b0, #ffa7b1, #cea2fd)`
- **Typo** : Gotu (titres/display), Montserrat (body) — via `@remotion/google-fonts`

---

## Scènes

### Scène 1 — Hook (0s → 5s | 150 frames)

**Visuel** : Fond `#0f0f23` avec particules PixelBlast (losanges gris). Texte central en Gotu.

**Texte** :
> "Your browsing tells a story."
> "Sofia reads it."

**Animations** :
- Particules PixelBlast en mouvement lent
- Ligne 1 : fade-in + slideUp (frames 10→30), fade-out (frames 70→85)
- Ligne 2 : fade-in + slideUp (frames 45→65), reste visible
- "Sofia" → gradient iridescent clip + glow progressif
- Vignette radiale douce
- Zoom cinématique lent (scale 1→1.03)

---

### Scène 2 — Le problème (5s → 12s | 210 frames)

**Visuel** : Navigateur Chrome avec onglets qui s'empilent de façon chaotique.

**Texte overlay** :
> "Dozens of tabs. Hours of research."
> "But where does all that knowledge go?"

**Animations** :
- Browser chrome apparaît (fade-in, 0→15) avec 3 dots macOS
- 12 onglets slide-in un par un (stagger 8f, anim 12f chacun)
- ~frame 90 : shake + blur (surcharge visuelle)
- Texte overlay fade-in bas (120→175)

**Onglets** :
| Label | Couleur |
|-------|---------|
| GitHub - solidity/sol... | #24292f |
| Ethereum Docs - EIP... | #627EEA |
| YouTube - How to Au... | #FF0000 |
| Twitter / @vitalik... | #1DA1F2 |
| Uniswap - Swap To... | #FF007A |
| Aave - Lending Pro... | #B6509E |
| OpenZeppelin Docs... | #4E5EE4 |
| Etherscan - Contract... | #21325B |
| DefiLlama - TVL An... | #6366F1 |
| Notion - Research N... | #000000 |
| Discord - Ethereum... | #5865F2 |
| Stack Overflow - So... | #F48024 |

---

### Scène 3 — Sofia entre en jeu (12s → 18s | 180 frames)

**Visuel** : L'orbe Sofia (PulseAnimation) apparaît au centre. Les onglets volent vers l'orbe. Des **GroupBentoCards** fidèles au front de la demo émergent — avec favicon, domaine, stats (URLS/ON-CHAIN/TIME), badge LVL, barre de level, dots de certification.

La scène montre le cœur de l'app Sofia : la **page Echoes** du CorePage. Les cards sont en layout bento grid.

**Texte** :
> "Sofia organizes your browsing into **intention groups**"

**Animations** :
- Phase 1 (0→50) : Orbe PulseAnimation apparaît centre (spring scale 0→1, glow)
- Phase 2 (10→80) : Mini-tabs convergent vers l'orbe (interpolate → centre, scale→0)
- Phase 3 (85→180) : 3 GroupBentoCards émergent en stagger (spring)
- En haut : filter chips apparaissent (All, Work, Learning, Fun, Inspiration, Buying) avec couleurs
- Sort buttons : Level, URLs, A-Z, Recent
- Texte fade-in en bas (frame 90+)

**Cards (fidèles à GroupBentoCard)** :
| Domaine | URLS | ON-CHAIN | TIME | LVL | Cert dots |
|---------|------|----------|------|-----|-----------|
| github.com | 15 | 8 | 2h12 | 4 | Work 12 · Learning 3 |
| ethereum.org | 7 | 3 | 45m | 2 | Learning 5 · Work 2 |
| youtube.com | 42 | 0 | 0m | 1 | Fun 0 |

---

### Scène 4 — Certification on-chain (18s → 26s | 240 frames)

**Visuel** : Zoom sur github.com → ouvre la **GroupDetailView** fidèle au front. Header avec favicon + domaine + "Level X" badge. Stats row : URLS / ON-CHAIN / TO CERTIFY. Level progress bar ("X certs to LVL Y"). Puis liste d'URLs avec les tabs "All (X)" / "Uncertified (X)".

Chaque URL a un favicon, titre, date, boutons action (⋮ et ×). On clique sur un bouton → apparition des **intention bubbles** : work / learning / fun / inspiration / buying (fidèle au front). On sélectionne "work" (s'illumine en bleu #3B82F6). Confirmation on-chain.

**Texte** :
> "Certify your expertise **on-chain**"

**Animations** :
- GroupDetailView zoom-in (scale 0.6→1, 0→30)
- Header : "Back" pill + "github.com" en Gotu + "Level 4" badge
- Stats row count-up stagger : "31 URLS" · "8 ON-CHAIN" · "23 TO CERTIFY" (TO CERTIFY en couleur primaire)
- Level bar se remplit (40→70)
- Tabs "All (31)" / "Uncertified (23)" apparaissent
- URLs slide-in stagger (10f) — chaque URL : favicon rond + titre + "Jan 29  <1m"
- Sur une URL, les 5 intention bubbles (work/learning/fun/inspiration/buying) apparaissent en row
- "work" → sélection (fond bleu, texte blanc)
- Bouton iridescent shimmer
- Checkmark ✓ vert + ripple
- ON-CHAIN : 8 → 9

**URLs** :
- Solidity Documentation
- EVM Deep Dive - Ethereum
- OpenZeppelin Contracts v5
- EIP-4337: Account Abstraction
- OpenZeppelin Docs - Upgradeable

---

### Scène 5 — Pulse Analysis & Interests (26s → 34s | 240 frames)

**Visuel** : Deux phases. D'abord on montre le **PulseTab** du CorePage — l'orbe pulse fort, des sessions d'analyse apparaissent avec des triplets (Subject → Predicate → Object). Les triplets utilisent la syntaxe colorée du front : sujet=#60a5fa (bleu), prédicat=#34d399 (vert), objet=#fbbf24 (ambre).

Puis transition vers les **InterestCards** (tab Interest du ProfilePage). Chaque card : titre, badge LVL, barre XP, stats Certs/Domains, dots de certification colorés, favicons de domaines, description AI.

**Texte** :
> "AI-powered analysis reveals your **expertise patterns**"

**Animations** :
- Phase 1 — Pulse (0→100) :
  - Orbe pulse intensément
  - "Pulse Analysis" button apparaît puis s'active
  - Session cards slide-in avec timestamp
  - Triplets apparaissent un par un : "I" (bleu) → "am learning" (vert) → "Solidity" (ambre)
  - Checkboxes de sélection, bouton "Amplify" iridescent
- Phase 2 — Interests (100→240) :
  - Transition slide vers les InterestCards
  - 3 cards slide-in stagger depuis la droite (spring, gap 20f)
  - Chaque card : nom + LVL badge → barre XP fill → stats count-up → cert dots → favicons → AI text

**Interest Cards (fidèles au front)** :

| Interest | LVL | XP | Certs | Domains | Cert breakdown | Favicons | AI Description |
|----------|-----|----|-------|---------|----------------|----------|----------------|
| Software Development | 4 | 155 (25→LVL 5) | 31 | 3 | Work 21 · Learning 6 · Inspiration 4 | github.com, stackoverflow, studio.apollo | "High activity on professional development platforms..." |
| Online Learning | 3 | 60 (40→LVL 4) | 12 | 2 | Learning 2 · Fun 4 · Inspiration 6 | youtube.com, thehackingp... | "Significant visits for inspiration and learning..." |
| Blockchain Exploration | 2 | 35 (15→LVL 3) | 7 | 3 | Work 2 · Learning 2 · Inspiration 2 · Buying 1 | metamask.io, sofia.intuitio..., portal.intuiti... | "Visits for learning and work indicate interest..." |

---

### Scène 6 — Profil & Réputation (34s → 42s | 240 frames)

**Visuel** : Reproduit la **ProfilePage** fidèlement. Le tab Account avec le ProfileHeader : avatar circulaire, nom, wallet address tronquée (0xc634...d551), social icons connectées, puis les stats Level/XP/Signals. En dessous les sub-tabs Stats | Success | Interest | Socials.

On montre ensuite les quêtes/achievements (AchievementsTab) — cards de quêtes avec icônes et badges claimables.

**Texte** :
> "Build your **on-chain reputation**"

**Animations** :
- Tab bar "Account | Community | Activity" apparaît en haut
- ProfileHeader slide-in depuis la droite (spring, 5+)
- Avatar scale bounce
- Nom "Wieedze" fade-in + wallet "0xc634...d551" en muted
- Social icons row pop-in stagger (5 icônes, gap 6f) avec couleurs respectives
- Stats count-up :
  - 🌿 Level : 0 → 8 (avec laurel wreath SVG)
  - Total XP : 0 → 3005
  - Signals : 0 → 203
- Sub-tabs "Stats | Success | Interest | Socials" slide-in
- Switch vers "Success" → badges de quêtes bounce-in stagger :
  - Follow quest, Pulse quest, Signal quest, Trust quest
  - Bouton "Claim XP" iridescent sur les quêtes complétées

---

### Scène 7 — Community & Trust (42s → 48s | 180 frames)

**Visuel** : Reproduit la **CommunityTab** du ProfilePage + la **ResonancePage**. D'abord les filter tabs "Trust Circle | Following | Followers | Explore". Puis les user cards fidèles au front avec avatar, ENS/wallet, signals, market cap, TRUST amount, bouton "Trust" iridescent.

Ensuite transition vers le **CircleFeedTab** de ResonancePage — feed grid de certifications du trust circle. Chaque card : favicon + intention badge coloré, titre de la page certifiée, footer avec nom du membre + vote arrows + timestamp.

**Texte** :
> "Connect with **minds that matter**"

**Animations** :
- Phase 1 — Trust (0→90) :
  - Filter tabs slide-down : "Trust Circle | Following | Followers | Explore"
  - Search bar fade-in : "Search all accounts on Intuition..."
  - User cards slide-in stagger (gap 15f) :
    - passive-records.box — Signals: 3 · Market Cap: 13.855 · 1.036 TRUST
    - 0x5038...F568 — Signals: 1 · Market Cap: 7.07K · 0.489 TRUST
    - alice.eth — Signals: 7 · Market Cap: 24.2K · 2.15 TRUST
  - Boutons "Trust" shimmer iridescent
- Phase 2 — Resonance Feed (90→180) :
  - Category filter chips en haut (All, Work, Learning, Fun, Inspiration, Buying)
  - Feed cards grid slide-in :
    - "vitalik.eth trusted GitHub React" + vote arrows + "1h ago"
    - "sofia.eth learned Ethereum ZK Proofs" + "2d ago"
  - Click member name → brief flash du profil

---

### Scène 8 — CTA / Closing (48s → 53s | 150 frames)

**Visuel** : Retour fond `#0f0f23` avec PixelBlast. Logo Sofia au centre. Tagline. CTA.

**Texte** :
> "Sofia"
> "Your browsing. Your proof. Your reputation."
> "Try the demo → sofia-demo.vercel.app"

**Animations** :
- Logo fade-in + scale bounce (spring, 0→20) + glow iridescent
- "Sofia" en Gotu avec gradient iridescent clip (frame 10+)
- Tagline : 3 morceaux word-by-word (stagger 12f) slideUp
- Bouton CTA spring bounce-in (frame 80+), gradient iridescent shimmer
- Particules PixelBlast accélèrent (speed 1→2)
- Vignette douce

---

## Structure technique

```
video/src/
├── index.ts                    # registerRoot
├── Root.tsx                    # Composition "SofiaDemo" (1506 frames, 30fps, 1920×1080)
├── SofiaDemo.tsx               # TransitionSeries avec 8 scènes + fade transitions (12f)
├── brand.ts                    # Couleurs, fonts, gradients (repris de Global.css du front)
├── scenes/
│   ├── HookScene.tsx           # Scène 1 — Accroche
│   ├── ProblemScene.tsx        # Scène 2 — Chaos d'onglets
│   ├── OrganizeScene.tsx       # Scène 3 — Orbe + GroupBentoCards (Echoes)
│   ├── CertifyScene.tsx        # Scène 4 — GroupDetailView + certification
│   ├── PulseScene.tsx          # Scène 5 — PulseTab + InterestCards
│   ├── ProfileScene.tsx        # Scène 6 — ProfilePage (Account + Achievements)
│   ├── CommunityScene.tsx      # Scène 7 — CommunityTab + ResonanceFeed
│   └── ClosingScene.tsx        # Scène 8 — CTA
└── components/
    ├── ParticleBackground.tsx  # PixelBlast (losanges flottants)
    ├── SofiaOrb.tsx            # Orbe PulseAnimation (cercle + gradient rotatif + glow)
    ├── GroupBentoCard.tsx       # Card domaine fidèle (favicon, stats URLS/ON-CHAIN/TIME, LVL, bar, dots)
    ├── GroupDetailView.tsx      # Détail domaine (header, stats, level bar, URL list, intention bubbles)
    ├── InterestCard.tsx         # Interest card (titre, LVL, XP bar, certs/domains, dots, favicons, AI text)
    ├── TripletDisplay.tsx       # Triplet coloré : sujet(bleu) → prédicat(vert) → objet(ambre)
    ├── ProfileHeader.tsx        # Profil (avatar, nom, wallet, social icons, stats)
    ├── TrustUserCard.tsx        # User card trust (avatar, name, signals, market cap, trust btn)
    ├── FeedCard.tsx             # Card du CircleFeed (favicon, intention badge, titre, member, votes)
    ├── AnimatedCounter.tsx      # Compteur incrémental
    ├── IntentionChips.tsx       # Row de filter chips colorés (All, Work, Learning, Fun...)
    └── BottomNav.tsx            # Bottom navigation bar (5 icônes dock-style)
```

## Approche de fidélité au front

Les composants vidéo reproduisent les **vrais composants** du front Sofia en inline styles :
- `GroupBentoCard` → reproduit `extension/components/ui/GroupBentoCard.tsx`
- `GroupDetailView` → reproduit `extension/components/ui/GroupDetailView.tsx` + `CategoryDetailView.tsx`
- `InterestCard` → reproduit `extension/components/ui/InterestCard.tsx`
- `ProfileHeader` → reproduit `extension/components/ui/ProfileHeader.tsx`
- `TripletDisplay` → reproduit la syntaxe colorée des triplets du `HistoryTab`/`PulseTab`
- `IntentionChips` → reproduit `IntentionBubbleSelector.tsx`
- `BottomNav` → reproduit `BottomNavigation.tsx` (dock avec magnification)

Les couleurs, fonts, border-radius, glassmorphism, spacing sont pris directement des CSS custom properties de `Global.css`.

## Dépendances
- `remotion`, `@remotion/transitions`, `@remotion/google-fonts`, `@remotion/animation-utils` (installés)
- Pas de CSS animations — tout via `interpolate()`, `spring()`, `Easing`
- Pas de Tailwind — inline styles

## Calcul durée
- 8 scènes : 150 + 210 + 180 + 240 + 240 + 240 + 180 + 150 = **1590 frames**
- 7 transitions fade × 12 frames = **84 frames** soustraites
- Total effectif : **1506 frames** = **50.2 secondes**
