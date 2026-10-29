# Graph Report - dev-quest  (2026-10-28)

## Corpus Check
- Corpus is ~16,538 words - fits in a single context window. You may not need a graph.

## Summary
- 343 nodes · 608 edges · 31 communities (11 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 500 input · 500 output

## Community Hubs (Navigation)
- API Client and Network Layer
- Presentation and Onboarding Flow
- Core Runtime Dependencies
- Tooling and Build Configuration
- Dashboard and Roadmap Views
- Authentication Pages and Forms
- UI Animation and Styling Utilities
- TypeScript Configuration
- Next.js and Icon Configuration
- Interactive GSAP Carousels
- Typewriter Text Animation Engine
- PostCSS Styling Setup
- Authentication Data Types
- Brand Logo With Name
- Brand Icon Logo
- Backend Developer Graphic
- Navigation Arrow Left Icon
- Navigation Arrow Right Icon
- Verification Check Icon
- Intern Experience Level Badge
- Junior Experience Level Badge
- Mid-level Experience Level Badge
- Senior Experience Level Badge
- Fullstack Developer Graphic
- Clean Logo Asset
- Roadmaps Mascot Art
- Robot Profile Avatar Icon
- Dashboard Preview Screenshot
- Web Developer Workspace Graphic
- Mobile Developer Workspace Graphic
- Project Documentation & Setup

## God Nodes (most connected - your core abstractions)
1. `react` - 24 edges
2. `next` - 19 edges
3. `compilerOptions` - 16 edges
4. `useUserPreferences()` - 11 edges
5. `lucide-react` - 9 edges
6. `AreaSelectedScreen()` - 9 edges
7. `DashboardMain()` - 8 edges
8. `PresentationPage()` - 8 edges
9. `PracticeAreaCarousel()` - 8 edges
10. `AuthLoginForm()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `useLogin()` --calls--> `usePostApiVversionAuthLogin()`  [EXTRACTED]
  src/Features/Auth/Hooks/useLogin.ts → src/api/generated/hooks/auth-v1/auth-v1.ts
- `useRegister()` --calls--> `usePostApiVversionAuthRegister()`  [EXTRACTED]
  src/Features/Auth/Hooks/useRegister.ts → src/api/generated/hooks/auth-v1/auth-v1.ts
- `AuthFormRegisterSide()` --calls--> `TypewriterText()`  [EXTRACTED]
  src/Features/Auth/Register/Components/AuthFormRegisterSide.tsx → src/Features/Auth/Login/Components/TypewriterText.tsx
- `DashboardPage()` --calls--> `DashboardMain()`  [EXTRACTED]
  src/app/Dashboard/page.tsx → src/Features/Dashboard/DashboardView.tsx
- `DashboardMain()` --calls--> `CriarRoadmapView()`  [EXTRACTED]
  src/Features/Dashboard/DashboardView.tsx → src/Features/Dashboard/Views/CreateRoadmapView.tsx

## Import Cycles
- None detected.

## Communities (31 total, 20 thin omitted)

### Community 0 - "API Client and Network Layer"
Cohesion: 0.06
Nodes (44): ApiError, customFetch(), getPostApiVversionAiCompletionMutationKey(), getPostApiVversionAiCompletionMutationOptions(), getPostApiVversionAiCompletionUrl(), postApiVversionAiCompletion(), PostApiVversionAiCompletionMutationBody, PostApiVversionAiCompletionMutationError (+36 more)

### Community 1 - "Presentation and Onboarding Flow"
Cohesion: 0.10
Nodes (38): WelcomePage(), getLanguagesByArea(), LanguageCarousel(), AnimatedPhrase(), AnimatedPhraseProps, Phase, PHRASES, AreaSelectedScreen() (+30 more)

### Community 2 - "Core Runtime Dependencies"
Cohesion: 0.08
Nodes (30): dependencies, @hookform/resolvers@^5.9.1, lucide-react@^1.28.0, next@16.2.12, next-themes@^0.4.6, react@19.2.4, react-dom@19.2.4, react-hook-form@^7.86.0 (+22 more)

### Community 3 - "Tooling and Build Configuration"
Cohesion: 0.08
Nodes (31): eslintConfig, devDependencies, babel-plugin-react-compiler@1.0.0, eslint@^9, eslint-config-next@16.2.12, orval@^8.41.0, tailwindcss@^4, @tailwindcss/postcss@^4 (+23 more)

### Community 4 - "Dashboard and Roadmap Views"
Cohesion: 0.12
Nodes (19): DashboardPage(), HeaderDashboard(), CartaRoadmap(), CartaRoadmapProps, DEFAULT_NEXT_STEPS, LEVEL_LABELS, CartaDeConviteRoadmap(), CartaDeConviteRoadmapProps (+11 more)

### Community 5 - "Authentication Pages and Forms"
Cohesion: 0.15
Nodes (15): lucide-react, CardError(), CardErrorProps, CardSuccess(), CardSuccessProps, useLogin(), useRegister(), AuthLoginForm() (+7 more)

### Community 6 - "UI Animation and Styling Utilities"
Cohesion: 0.10
Nodes (21): clsx@^2.1.1, framer-motion@^14.6.0, tailwind-merge@^3.7.0, clsx, framer-motion, tailwind-merge, AREA_LANGUAGES_MAP, BACKEND_LANGUAGES (+13 more)

### Community 7 - "TypeScript Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Next.js and Icon Configuration"
Cohesion: 0.20
Nodes (11): nextConfig, react-icons@^5.7.0, next, react-icons, LandingPage(), columns, Footer(), socials (+3 more)

### Community 9 - "Interactive GSAP Carousels"
Cohesion: 0.15
Nodes (15): gsap@^3.15.0, gsap, CardItem, DEFAULT_CARD_IMAGES, DEFAULT_CARD_VIDEOS, FAN_POSITIONS, getHeightMultiplier(), getResponsiveMultiplier() (+7 more)

### Community 10 - "Typewriter Text Animation Engine"
Cohesion: 0.36
Nodes (10): animateText(), countAllUnits(), countUnits(), isWhitespace(), splitChars(), splitWords(), TypewriterMode, TypewriterText() (+2 more)

## Knowledge Gaps
- **18 isolated node(s):** `Next.js Frontend Workspace`, `Logocomnomesemfundo`, `Logosemfundo`, `Logosemfundo`, `Roadmaps Mascot Art` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 126 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Core Runtime Dependencies` to `Presentation and Onboarding Flow`, `Tooling and Build Configuration`, `Dashboard and Roadmap Views`, `Authentication Pages and Forms`, `UI Animation and Styling Utilities`, `Next.js and Icon Configuration`, `Interactive GSAP Carousels`, `Typewriter Text Animation Engine`?**
  _High betweenness centrality (0.297) - this node is a cross-community bridge._
- **What connects `Next.js Frontend Workspace`, `Logocomnomesemfundo`, `Logosemfundo` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `API Client and Network Layer` be split into smaller, more focused modules?**
  _Cohesion score 0.05660377358490566 - nodes in this community are weakly interconnected._
- **Why does `next` connect `Next.js and Icon Configuration` to `Presentation and Onboarding Flow`, `Core Runtime Dependencies`, `Tooling and Build Configuration`, `Dashboard and Roadmap Views`, `Authentication Pages and Forms`?**
  _High betweenness centrality (0.183) - this node is a cross-community bridge._
- **Should `Presentation and Onboarding Flow` be split into smaller, more focused modules?**
  _Cohesion score 0.09948979591836735 - nodes in this community are weakly interconnected._
- **Why does `@tanstack/react-query` connect `Core Runtime Dependencies` to `API Client and Network Layer`, `Tooling and Build Configuration`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Should `Core Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07681365576102418 - nodes in this community are weakly interconnected._