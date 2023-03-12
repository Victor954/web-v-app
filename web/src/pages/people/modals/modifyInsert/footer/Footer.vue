<template>
    <button type="button" class="btn btn-secondary" @click="clickCancelHandler">Отмена</button>
    <button type="button" class="btn btn-primary" @click="clickSaveHandler">Сохранить</button>
</template>
<script lang="ts" setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['save', 'close'])

function clickSaveHandler() {
    emit('save');
}

function clickCancelHandler() {
    emit('close')
}
</script>