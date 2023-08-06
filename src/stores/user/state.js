export default () => {
  return {
    profile: null,
    service: null,
    profileSnapshotUnsubscribe: null,
    isSignedIn: false,
    notifications: [],
    hasUnreadNotifications: false,
    verificationId: null,
    phoneNumber: null,
  };
};
