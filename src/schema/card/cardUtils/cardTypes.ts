import { YoutubeVideoData } from 'types/youtubeTypes';

// ----- CARD SCHEMA ----- //

export type CardCategory = 'Image' | 'Video';

export type CardType = 'Image' | 'Youtube';

export interface CardData {
  imageCardData?: {
    imageUrl: string;
  };
  youtubeCardData?: YoutubeVideoData;
}

export interface CardSchema {
  cardData: CardData;
  category: CardCategory;
  isFavorite: boolean;
  isToDo: boolean;
  title: string;
  type: CardType;
}

export interface InitialCardDataSchema {
  cardData: CardData;
  category: CardCategory;
  title: string;
  url: string;
}

// ----- OTHER ----- //

export interface CardQueryArgs {
  where: {
    isFavorite?: boolean;
    isToDo?: boolean;
    user?: {
      id: string;
    };
  };
}

export interface Filters {
  isFavorite?: boolean;
  isToDo?: boolean;
}

