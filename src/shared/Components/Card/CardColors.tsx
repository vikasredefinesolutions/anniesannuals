const cardColors = [
  '#634b91',
  '#a8007b',
  '#2e631d',
  '#9c331c',
  '#295b4c',
  '#1b6074',
  '#9f2d3c',
  '#a62152',
  '#3b5697',
  '#694D84',
  '#8A2C9B',
];

export const length = cardColors.length;

export const getBackGroundColor = (cardIndex: number) => {
  return cardColors[cardIndex % cardColors.length];
};
