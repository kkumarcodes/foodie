import { Camera } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from 'quasar';
import { showPermissionDialog } from '@utils/helpers/common';

export async function getLocationPermission() {
  if (!Platform.is.capacitor) {
    console.log('Platform.is.capacitor is invalid')
    return;
  }

  const locationPermission = await Geolocation.checkPermissions();
  console.log(locationPermission.location, '==locationPermission.location==')
  if (
    locationPermission.location === 'denied'
  ) {
    showPermissionDialog('location');
  } else if ( locationPermission.location === 'prompt') {
    await Geolocation.requestPermissions();
    console.log('Geolocation.requestPermissions')
  }
  return (
    locationPermission.location === 'granted'
  );
}

export async function useObtainCameraPermissions() {
  let permissionStatus = await Camera.checkPermissions();

  if (
    permissionStatus.camera === 'denied' &&
    permissionStatus.photos === 'denied'
  ) {
    return {
      showDialog: true,
      message: 'photos & camera',
      permissionDenied: true
    };
  }

  if (permissionStatus.photos === 'denied') {
    return {
      showDialog: true,
      message: 'photos',
      permissionDenied: true
    };
  }

  if (permissionStatus.camera === 'denied') {
    return {
      showDialog: true,
      message: 'camera',
      permissionDenied: true
    };
  }

  if (
    permissionStatus.camera === 'prompt' ||
    permissionStatus.photos === 'prompt'
  ) {
    permissionStatus = await Camera.requestPermissions({
      permissions: ['photos', 'camera']
    });
  }

  if (
    permissionStatus.camera === 'denied' ||
    permissionStatus.photos === 'denied'
  ) {
    return {
      showDialog: false,
      permissionDenied: true
    };
  }

  return {
    showDialog: false,
    permissionDenied: false
  };
}

export async function useObtainPhotosPermission() {
  let permissionStatus = await Camera.checkPermissions();

  if (permissionStatus.photos === 'denied') {
    return {
      permissionDenied: true,
      showDialog: true
    };
  }

  if (permissionStatus.photos === 'prompt') {
    permissionStatus = await Camera.requestPermissions({
      permissions: ['photos']
    });
  }

  if (permissionStatus.photos === 'denied') {
    return {
      permissionDenied: true,
      showDialog: false
    };
  }

  return {
    permissionDenied: false,
    showDialog: false
  };
}
