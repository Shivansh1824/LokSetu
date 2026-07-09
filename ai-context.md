# AI Context for LokSetu (Constituency OS)

LokSetu is an AI-powered command center and data-driven platform designed specifically for Members of Parliament (MPs). It ingests unstructured, multilingual citizen feedback, structures it using AI, and ranks high-priority development works objectively to optimize budget allocation and track issues.

## Project Mission & Overview
- **Core Functionality:** Structuring citizen feedback (sentiment, issue category, urgency, location) and calculating priority scores to identify constituency development hot spots.
- **Priority Algorithm:**
  `Priority Score = (Urgency_Score * 0.6) + ((Complaint_Count / Ward_Population) * 10,000 * 0.4)`
- **Target Audience:** Members of Parliament (MPs) and constituency administrators.

## Key Features & AI Integrations
- **Automatic Geolocation Pre-filling:** When users fill out forms or upload images, automatically capture the user's current location (GPS coordinates) to pre-fill geographical details, such as ward number and location details, making form submission seamless.
- **Citizen Policy & Status Guidance (Google Gemini):** Use Google Gemini to guide and inform citizens about government policies related to their complaints and provide context-rich updates on complaint status.
- **MP Priority Insights (Google Gemini):** 
  - Use Google Gemini to explain the reasoning behind the priority scores assigned to issues.
  - Enable MPs to review problems and ask Gemini *why* a particular issue was prioritized, providing transparent and actionable explanations.

## Tech Stack
- **Frontend Framework:** React (v19) with Vite as the bundler.
- **Routing:** React Router DOM (v7).
- **Backend/Database:** Supabase (PostgreSQL with Row Level Security, custom migrations, and auto-generated REST APIs).
- **Styling:** Vanilla CSS (no Tailwind CSS unless explicitly requested).

## Repository Structure & Conventions
- `src/`: Main frontend application code.
  - `src/components/`: Reusable, single-responsibility UI components.
  - `src/screens/`: Page views/screens.
  - `src/context/`: React context providers.
  - `src/lib/`: Library integrations (e.g., Supabase client).
  - `src/index.css` & `src/App.css`: Vanilla CSS stylesheets.
- `supabase/`: Database configuration, schemas, migrations, and seed scripts.
- `planning_docs/`: Design documents, DB previews, and roadmap details.
- `skills/`: Packaged AI agent skills loaded on demand (e.g., frontend design, debugger, prompt checkers).

## Coding & Style Guidelines
1. **Design Aesthetics:** Rich, modern aesthetics (harmonic gradients, dark mode, Outfit typography, smooth hover states, micro-animations) to ensure a premium government-tech platform feel.
2. **Vanilla CSS Styling:** Standard vanilla CSS for all custom components to maintain maximum control and styling consistency.
3. **Surgical Edits:** Only modify code directly related to the active task. Keep changes minimal, clean up unused imports/variables created by your edits, and avoid orthogonal refactorings.
4. **Simplest Solutions:** Follow the Senior Engineer Test. Prefer readable, minimal, and self-contained code over complex abstractions. Do not add speculative features.
5. **File Size Limit:** Keep new code files under 600 lines. If a file exceeds this length, isolate and split responsibilities.
6. **Git Commit Messages:** Never include AI assistant names (like 'Antigravity', 'Gemini', etc.) in commit messages or contributor list.
