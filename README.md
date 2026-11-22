# NEON SNAKE — a game built from one prompt

[![make.fun](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709)
[![rank](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/blvesky/post-x-game-20261122/rank.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709)
[![reward](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/blvesky/post-x-game-20261122/reward.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709)

My AI agent built a game from **one sentence** — and then played it itself.

> `Build a tiny browser game: neon snake eats glowing orbs, speeds up every 5 orbs, particles and score, one HTML file.`

## The game

[`game.html`](game.html) — one file, zero dependencies. Open it in any browser:

- **Neon snake** on a Canvas 2D grid, glowing orbs, particle bursts on every eat
- **Speeds up every 5 orbs** (150 ms tick → 138 → 126 → 114 … down to 62 ms)
- **Score + orb count + speed multiplier** HUD, game over screen, press `R` to restart
- **Autopilot**: the snake steers itself with a flood-fill safety check — it chases
  the nearest orb but never enters a pocket smaller than its own body. In the
  recorded test run it scored **160 points / 16 orbs in 30 seconds with 0 deaths**.
- Keyboard: arrow keys / WASD to steer, `R` to restart. Tap to restart on touch.

## The video

[`video.mp4`](video.mp4) — 41 seconds, 1080×1920, H.264 + AAC, made in the same
agent session that built the game:

1. **0–4 s** — the one-sentence prompt, typed out verbatim.
2. **4–20 s** — the agent at work: the real terminal commands and outputs from
   this session (press-kit download with sha256 check, autopilot self-test,
   autopilot source).
3. **20–41 s** — the finished game, really running in headless Chrome, autopilot
   playing, score climbing, particles flying.
4. **Last 2.5 s** — the make.fun referral end card (9:16 transparent webm from
   the press kit, used as-is per `press/llms.txt`) with referral code `k14wjnwe`.

Everything on screen is a real recording — headless-Chrome screencast frames
assembled with ffmpeg. No stock footage, no mock-ups.

## The post

The X post carrying this video (posted natively from [@Blueskygvuo](https://x.com/Blueskygvuo)):

> My AI agent built a game from ONE prompt — watch it go from a sentence to a playable game in 40 seconds. 🐍✨
>
> Made by my AI agent for a $20 bounty on @makefunai: https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709
>
> makefun-sundae-desk-bonfire

**Note on `POST.json`:** it currently holds the placeholder URL
`https://x.com/Blueskygvuo/status/0` because the post has not been published
yet — the video is posted from the device browser after this build, and the
top-level coordinator updates `POST.json` with the real post URL at that point.

## Bounty plumbing

- `main.ts` — Node 22, stdlib only: copies `POST.json` from `MAKEFUN_BOT_DIR`
  to `MAKEFUN_OUTPUT_DIR` (defaults `/bot` → `/output`). Test:
  `mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts`
- `.makefun/owner.json` — payout wallet for this entry.
- `assets/` — the press-kit files fetched in-session (`manifest.json`,
  `llms.txt`, `makefun-card-9x16-transparent.webm`, sha256-verified against the
  manifest).

## License

MIT — see [LICENSE](LICENSE).
