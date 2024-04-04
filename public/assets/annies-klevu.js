klevu.interactive(function () {
  var options = {
    url: {
      landing: process.env.NEXT_PUBLIC_MAIN_DOMAIN + '/search/result',
      protocol: 'https:',
      search: 'https://uscs33v2.ksearchnet.com/cs/v2/search', // your Klevu APIv2 Search URL + endpoint path
    },
    search: {
      minChars: 0,
      searchBoxSelector:
        'input[type=text][name=search_term_string],input[type=search][name=search_term_string],.kuSearchInput', // your search input selector
      apiKey: process.env.NEXT_PUBLIC_KLEVU_API_KEY, // your Klevu JS API Key
    },
    analytics: {
      apiKey: process.env.NEXT_PUBLIC_KLEVU_API_KEY, // your Klevu JS API Key
    },
  };
  klevu(options);
});
