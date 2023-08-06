<template>
    <div class="q-pa-md">

        <q-list v-if="userList.length > 0">
            <q-item v-for="contact in userList" :key="contact.id" class="q-mb-sm" clickable v-ripple
                @click="() => handleClickContact(contact)">
                <q-item-section avatar>
                    <q-avatar>
                        <img :src="contact.avatar">
                    </q-avatar>
                </q-item-section>

                <q-item-section>
                    <q-item-label>{{ contact.firstName }}</q-item-label>
                    <q-item-label caption lines="1">{{ contact.lastMessage }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                    <q-icon name="chat_bubble" color="grey" />
                </q-item-section>
            </q-item>
        </q-list>
        <div v-else class="col q-pa-md column flex-center text-body2 text-center text-grey-500">
            There are no private messages.
        </div>
    </div>
</template>
  
<script setup>
import { computed, onBeforeMount } from 'vue';
import { useChatStore, useUserStore } from 'src/stores';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const chatStore = useChatStore();
const userList = computed(() => chatStore.chatUsers || []);
function handleClickContact(contact) {
    chatStore.setSenders({
        owner: userStore.profile,
        sender: contact
    })
    router.push({ name: 'chat-private', params: { askId: route.params.id } });
}
onBeforeMount(async () => {
    chatStore.getUsers(route.params.id);
});
</script>
  