<template>
  <q-page class="bg-white column no-wrap">
    <q-list v-if="!!notifications && notifications.length" separator>
      <div
        v-for="(notification, notificationIndex) in notifications"
        :key="notification.id"
        class="q-px-md"
        :class="{
          'bg-primary-50': notification?.read === false,
          'q-pt-md': notificationIndex === 0
        }"
      >
        <!-- <NotificationItem
          v-bind="notification"
          @onItemClick="
            destinationRoute => onNotificationClick(destinationRoute)
          "
        /> -->
        <q-separator
          v-if="notificationIndex + 1 < notifications.length"
          :color="notification.read ? '' : 'primary-300'"
        />
      </div>
    </q-list>
    <div v-else class="col column flex-center text-center q-pa-md">
      <q-img src="~/assets/common/no-notifications.svg" width="275px" />
      <div class="text-grey-900 text-subtitle2 q-mt-xl">No Notifications</div>
      <div class="text-grey-500 text-body2 q-mt-xs">
        Currently, there are no notifications to display!!
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import { setAppHeader } from 'src/utils/helpers/common';
  import NotificationItem from 'src/components/notifications/NotificationItem.vue';
  import { onBeforeMount, computed, onMounted, onBeforeUnmount } from 'vue';
  import { useUserStore } from 'src/stores';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  const router = useRouter();

  const notifications = computed(() => userStore.notifications);

  onBeforeMount(() => {
    setAppHeader({
      title: 'Notifications',
      backNav: false
    });
  });

  onMounted(() => {
    userStore.markAllNotificationsRead();
  });

  onBeforeUnmount(() => {
    if (userStore.hasLocalUnreadNotifications) {
      userStore.$patch(state => {
        const notifications = state.notifications || [];
        notifications.forEach(notification => {
          notification.read = true;
        });
        state.notifications = notifications;
      });
    }
    userStore.markAllNotificationsRead();
  });

  function onNotificationClick(destinationRoute) {
    if (destinationRoute?.name) {
      router.push(destinationRoute);
    }
  }
</script>
