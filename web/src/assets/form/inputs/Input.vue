<template>
    <input :name="$props.name" :class="className" v-model="inputValue" v-bind="attrs">
</template>
<script setup lang="ts">
import { useAttrs } from 'vue';
import { useInput } from './helpers/hooks';

type Props = {
    name: string;
}

const attrs = useAttrs();
const props = defineProps<Props>();

const { className, inputValue } = useInput({ name: props.name });
</script>