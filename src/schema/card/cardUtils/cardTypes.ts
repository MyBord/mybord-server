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

export type CardType = 'Youtube';
