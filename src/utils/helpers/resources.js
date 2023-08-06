import {
  useServiceStore,
  useCommonStore,
  useDashboardStore,
  useResourceStore,
  useUserStore
} from 'src/stores';
import { staticMapsConfig } from '../initials';
import { Dialog } from 'quasar';

export function resetCircleProfile() {
  const userStore = useUserStore();

  userStore.$patch({
    circleProfile: {
      profile: null,
      faves: null,
      asks: null,
      connection: null
    }
  });
}

export function resetStore() {
  const userStore = useUserStore();
  const serviceStore = useServiceStore();
  const dashboardStore = useDashboardStore();
  const resourceStore = useResourceStore();

  userStore.$reset();
  serviceStore.$reset();
  dashboardStore.$reset();
  resourceStore.$reset();
}

export function createStaticMapsUrl({ lat, lng }) {
  if (!lat) {
    return '';
  }

  if (!lng) {
    return '';
  }

  const baseUrl = staticMapsConfig.baseUrl;
  const key = staticMapsConfig.key;
  const markerColor = staticMapsConfig.markerColor;
  const size = staticMapsConfig.size;
  const zoom = staticMapsConfig.zoom;
  const center = `${lat},${lng}`;
  const position = `${encodeURIComponent('|')}${lat},${lng}`;
  const markers = `color:${markerColor}${position}`;

  // [TODO pending] replace icon with custom icon
  return `${baseUrl}staticmap?center=${center}&size=${size}&zoom=${zoom}&markers=${markers}&key=${key}`;
}
