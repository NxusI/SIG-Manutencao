export type Card = {
  id: string;
  title: string;
};

export type Column = {
  id: string;
  title: string;
  color: string;
  cards: Card[];
};
