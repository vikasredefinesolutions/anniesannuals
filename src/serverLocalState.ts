export interface iServerLocalState {
  mainSlug: _mainSlug['value'];
  set: (pair: _mainSlug) => void;
}

export let serverLocalState: iServerLocalState = {
  mainSlug: null,
  set: (pair) => {
    serverLocalState = { ...serverLocalState, [pair.key]: pair.value };
  },
};

interface _mainSlug {
  key: 'mainSlug';
  value: 'Product' | 'Category' | 'Home' | null;
}
