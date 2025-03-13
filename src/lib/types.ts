export interface Show {
  id: number;
  name: string;
  summary: string | null;
  genres: string[];
  premiered: string | null;
  ended: string | null;
  status: string;
  rating: {
    average: number | null;
  };
  image: {
    medium: string | null;
    original: string | null;
  } | null;
  network: {
    name: string;
  } | null;
  schedule: {
    days: string[];
    time: string;
  };
  runtime: number | null;
  language: string;
  type: string;
  officialSite: string | null;
  webChannel: {
    name: string;
  } | null;
}

export interface ShowSearchResult {
  show: Show;
}

export interface CastMember {
  person: {
    id: number;
    name: string;
    image?: {
      medium?: string;
      original?: string;
    } | null;
  };
  character: {
    id: number;
    name: string;
  };
}

export interface Season {
  id: number;
  number: number;
  name: string;
  episodeOrder: number;
  premiereDate: string;
  endDate: string;
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string | null;
}

export interface ShowWithEmbedded extends Show {
  _embedded?: {
    cast?: CastMember[];
    seasons?: Season[];
  };
}
