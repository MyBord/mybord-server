export interface CardQueryArgs {
  where: {
    isFavorite?: boolean;
    isToDo?: boolean;
    user?: {
      id: string;
    };
  };
}
