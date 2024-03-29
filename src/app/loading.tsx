import HomeSkeleton from './HomeSkeleton';

// const getMainSlug = async () => {
//   return new Promise<string | null>(function (resolve, reject) {
//     setTimeout(() => {
//       if (serverLocalState.mainSlug) {
//         resolve(serverLocalState.mainSlug);
//         return;
//       }
//       resolve(null);
//       return;
//     }, 40);
//   });
// };

const Loading = async () => {
  // const mainSlug = await getMainSlug();

  // if (mainSlug === 'Home') {
  //   serverLocalState.set({
  //     key: 'mainSlug',
  //     value: null,
  //   });
  //   return <HomeSkeleton />;
  // }

  return <HomeSkeleton />;
};

export default Loading;
