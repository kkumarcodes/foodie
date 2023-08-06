<template>
    <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 400px;">
            <template v-for="msg in messageList" :key="msg.id">
                <q-chat-message :text-html="true" :name="msg.senderId === currentUserId ? `me` : `${msg.firstName}`"
                    :avatar="msg.senderAvatar" :text="[msg.message]" :stamp="relTime(msg.created.toDate())"
                    :sent="msg.senderId === currentUserId"
                    :bg-color="msg.senderId === currentUserId ? `blue-1` : `grey-3`" />
            </template>
        </div>
    </div>
    <q-footer class="d-flex flex-row bg-white z-max footer-shadow q-pa-md">
        <q-input bottom-slots v-model="text" autogrow label="Type message" counter maxlength="300">
            <template v-slot:append>
                <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
            </template>
            <template v-slot:after>
                <q-btn round dense flat icon="send" @click="onSendMessage" />
            </template>
        </q-input>
    </q-footer>
</template>

<script setup>
import { computed, onBeforeMount, ref, onUnmounted, watch } from 'vue';
import { useChatStore, useUserStore, useServiceStore } from 'src/stores';
import { useRoute } from 'vue-router';
import { relTime } from '@utils/filters';

const route = useRoute();

const text = ref();
const askStore = useServiceStore();
const { getServiceDetails } = askStore;
getServiceDetails(route.params.id);
const userStore = useUserStore();
const chatStore = useChatStore();

const currentUserId = computed(() => userStore.profile?.uid || '');
const messageList = computed(() => chatStore.messages || []);
async function onSendMessage() {
    if (text.value.length > 0) {
        const askId = route.params.id;
        const payload = {
            askId,
            owner: chatStore.owner,
            sender: chatStore.sender
        }
        chatStore.sendMessage(payload, text.value);
        text.value = "";
        
    }

}

onBeforeMount(async () => {
    const askId = route.params.id;
    const payload = {
        askId,
        owner: chatStore.owner,
        sender: chatStore.sender
    }
    chatStore.getMessages(payload)
});
onUnmounted(async () => {
    chatStore.handleUnsubscripbe()
});
</script>
