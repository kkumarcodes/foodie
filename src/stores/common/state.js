import { appHeaderConfigInit } from '@utils/placeholders';

export default () => {
  return {
    appHeaderConfig: { ...appHeaderConfigInit() },
    backButtonForExit: false,
    offlineRoute: null,
    networkStatus: null,
    skipReload: false
  };
};
