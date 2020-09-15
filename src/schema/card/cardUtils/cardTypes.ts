import { YoutubeVideoData } from 'types/youtubeTypes';

// ----- CARD SCHEMA ----- //

export type CardCategory = 'Image' | 'Video';

export type CardType = 'Image' | 'Youtube';

export interface CardData {
  imageCardData?: ImageData;
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

export interface ImageData {
  imageUrl: string;
}

export interface InitialCardDataSchema {
  cardData: CardData;
  category: CardCategory;
  title?: string;
  type: CardType;
  url: string;
}

// ----- OTHER ----- //

export interface CardCreateArgs {
  imageCardData?: {
    create: ImageData;
  };
  youtubeCardData?: {
    create: YoutubeVideoData;
  };
}

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
