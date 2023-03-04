<script lang="ts" setup>
import { useTestStore } from '@/store/test.store';
import { storeToRefs } from 'pinia';

const store = useTestStore();

const { name } = storeToRefs(store);
const { setName } = store;
</script>

<template>
    <h3>{{ name }}</h3>
    <button class="btn btn-primary" @click="setName('name')">click me</button>
</template>

<script lang="ts">
export default {

}
</script>