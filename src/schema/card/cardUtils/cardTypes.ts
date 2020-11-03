import { YoutubeVideoData } from 'types/youtubeTypes';

// ----- CARD SCHEMA ----- //

export type CardCategory = 'Gif' | 'Image' | 'Video';

export type CardType = 'Gif' | 'Image' | 'Youtube';

export interface CardData {
  gifCardData?: GifData;
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

export interface GifData {
  gifUrl: string;
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
  gifCardData?: {
    create: GifData;
  };
  imageCardData?: {
    create: ImageData;
  };
  youtubeCardData?: {
    create: YoutubeVideoData;
  };
}

export interface CardQueryArgs {
  where: {
    category_in?: CardCategory[];
    isFavorite?: boolean;
    isToDo?: boolean;
    user?: {
      id: string;
    };
  };
}

export interface Filters {
  categories?: CardCategory[];
  isFavorite?: boolean;
  isToDo?: boolean;
}
