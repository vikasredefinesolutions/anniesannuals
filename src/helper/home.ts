export const getSymbol = (symbol: string, status: string) => {
  let accordionEndIcon = '';
  switch (symbol) {
    case 'caret':
      accordionEndIcon = status === 'Yes' ? 'remove_outline' : 'add_outline';
      break;
    case 'addcircle':
      accordionEndIcon = status === 'Yes' ? 'remove_circle' : 'add_circle';
      break;
    case 'add':
      accordionEndIcon = status === 'Yes' ? 'remove' : 'add';
      break;
    default:
      accordionEndIcon = status === 'Yes' ? 'remove_outline' : 'add_outline';
      break;
  }

  return { accordionEndIcon };
};
