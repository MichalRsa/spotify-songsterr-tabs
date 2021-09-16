export interface ExternalUrls {
  spotify: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls2 {
  spotify: string;
}

export interface Track {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls2;
  href: string;
  id: string;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface ExternalUrls3 {
  spotify: string;
}

export interface Context {
  uri: string;
  external_urls: ExternalUrls3;
  href: string;
  type: string;
}

export interface Item {
  track: Track;
  played_at: Date;
  context: Context;
}

export interface Cursors {
  after: string;
  before: string;
}

export interface ISongs {
  items: Item[];
  next: string;
  cursors: Cursors;
  limit: number;
  href: string;
}
