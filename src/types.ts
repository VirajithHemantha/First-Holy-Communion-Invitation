export type RsvpStatus = 'attending' | 'declined';

export interface RsvpEntry {
  id: string;
  name: string;
  status: RsvpStatus;
  guestsCount: number;
  prayerWish?: string;
  timestamp: string;
}

export interface TimelineEvent {
  title: string;
  time: string;
  description: string;
  iconName: string;
}

export interface WishEntry {
  id: string;
  name: string;
  wish: string;
  timestamp: string;
  relation?: string;
}
