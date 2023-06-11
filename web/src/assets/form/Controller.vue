<template>
    <slot :value="value" :change="change"></slot>
</template>
<script setup lang="ts">
import { inject, computed } from 'vue';
import { FormControl } from './types';

type Props = {
    name: string;
}

const props = defineProps<Props>()

const formModel = inject<Record<string, any> | null>('formModel', null);
const formControl = inject<FormControl | null>('formControl', null);

const value = computed(() => formModel?.[props.name] || '');

function change(value: any) {
    formControl && formControl.change([props.name, value]);
}

</script>