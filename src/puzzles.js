// ─── Daily puzzle engine ────────────────────────────────────────────
// A curated pool of well-known movies. Each day, a date-seeded RNG
// picks two of them as that day's puzzle. No manual work, same pair
// for every player (UTC day), changes at midnight UTC.

export const MOVIE_POOL = [
  { id: 238, title: "The Godfather" },
  { id: 278, title: "The Shawshank Redemption" },
  { id: 155, title: "The Dark Knight" },
  { id: 13, title: "Forrest Gump" },
  { id: 680, title: "Pulp Fiction" },
  { id: 769, title: "Goodfellas" },
  { id: 603, title: "The Matrix" },
  { id: 550, title: "Fight Club" },
  { id: 12, title: "Finding Nemo" },
  { id: 11, title: "Star Wars" },
  { id: 24428, title: "The Avengers" },
  { id: 299536, title: "Avengers: Infinity War" },
  { id: 99861, title: "Avengers: Age of Ultron" },
  { id: 597, title: "Titanic" },
  { id: 862, title: "Toy Story" },
  { id: 808, title: "Shrek" },
  { id: 424, title: "Schindler's List" },
  { id: 120, title: "The Lord of the Rings: The Fellowship of the Ring" },
  { id: 121, title: "The Lord of the Rings: The Two Towers" },
  { id: 122, title: "The Lord of the Rings: The Return of the King" },
  { id: 27205, title: "Inception" },
  { id: 1726, title: "Iron Man" },
  { id: 329, title: "Jurassic Park" },
  { id: 129, title: "Spirited Away" },
  { id: 812, title: "Aladdin" },
  { id: 62, title: "2001: A Space Odyssey" },
  { id: 49026, title: "The Dark Knight Rises" },
  { id: 68718, title: "Django Unchained" },
  { id: 562, title: "Die Hard" },
  { id: 1891, title: "The Empire Strikes Back" },
  { id: 1892, title: "Return of the Jedi" },
  { id: 557, title: "Spider-Man" },
  { id: 218, title: "The Terminator" },
  { id: 280, title: "Terminator 2: Judgment Day" },
  { id: 105, title: "Back to the Future" },
  { id: 8587, title: "The Lion King" },
  { id: 771, title: "Home Alone" },
  { id: 497, title: "The Green Mile" },
  { id: 578, title: "Jaws" },
  { id: 348, title: "Alien" },
  { id: 620, title: "Ghostbusters" },
  { id: 98, title: "Gladiator" },
  { id: 240, title: "The Godfather Part II" },
  { id: 324857, title: "Spider-Man: Into the Spider-Verse" },
  { id: 109445, title: "Frozen" },
  { id: 118340, title: "Guardians of the Galaxy" },
  { id: 272, title: "Batman Begins" },
  { id: 19995, title: "Avatar" },
  { id: 157336, title: "Interstellar" },
  { id: 293660, title: "Deadpool" },
  { id: 245891, title: "John Wick" },
  { id: 1422, title: "The Departed" },
  { id: 274, title: "The Silence of the Lambs" },
  { id: 1366, title: "Rocky" },
  { id: 601, title: "E.T. the Extra-Terrestrial" },
  { id: 22, title: "Pirates of the Caribbean: The Curse of the Black Pearl" },
  { id: 671, title: "Harry Potter and the Sorcerer's Stone" },
  { id: 70160, title: "The Hunger Games" },
  { id: 602, title: "Independence Day" },
  { id: 137, title: "Groundhog Day" },
  { id: 115, title: "The Big Lebowski" },
  { id: 76341, title: "Mad Max: Fury Road" },
  { id: 37165, title: "The Truman Show" },
];

// Launch date of the daily game (UTC). Day 1 = 2026-11-18.
const LAUNCH_UTC_DAY = Math.floor(Date.UTC(2026, 10, 18) / 86400000);

const SITE_URL = "https://project-89xz7.vercel.app";

export function getPuzzleNumber() {
  const todayUtcDay = Math.floor(Date.now() / 86400000);
  return todayUtcDay - LAUNCH_UTC_DAY + 1;
}

// Deterministic seeded RNG (mulberry32) so every player gets the same pair
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getDailyPuzzle() {
  const number = getPuzzleNumber();
  const rand = mulberry32(number);
  const a = MOVIE_POOL[Math.floor(rand() * MOVIE_POOL.length)];
  let b = MOVIE_POOL[Math.floor(rand() * MOVIE_POOL.length)];
  // Ensure the two movies differ
  while (b.id === a.id) {
    b = MOVIE_POOL[Math.floor(rand() * MOVIE_POOL.length)];
  }
  return { number, movieA: a, movieB: b, siteUrl: SITE_URL };
}
