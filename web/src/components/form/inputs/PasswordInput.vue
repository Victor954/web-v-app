<template>
    <div :class="['input-group', validClass]">
        <Input :name="name" :type="inputType" class="border-end-0 form-control-password" placeholder="Введите пароль" />
        <button type="button" @mousedown="swapType(false)" @mouseup="swapType(true)"
            :class="['input-group-text bg-white', visiblyButtonClass]">
            <Icon :icon="icon" class="text-muted" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Icon from '@/components/Icon.vue';
import Input from './Input.vue';
import { useValidation } from './helpers/hooks';

type Props = {
    name: string;
}

const props = defineProps<Props>();

const { validClass } = useValidation({ name: props.name });
const isTypePassword = ref(true);

const inputType = computed(() => isTypePassword.value ? 'password' : 'text');
const icon = computed(() => isTypePassword.value ? 'visibility' : 'visibility_off');

const visiblyButtonValidClasses = {
    'is-invalid': 'border-danger',
    'is-valid': 'border-success'
}

const visiblyButtonClass = computed(() => validClass.value && visiblyButtonValidClasses[validClass.value]);

function swapType(isPassword: boolean) {
    isTypePassword.value = isPassword;
}

</script>
<style scoped>
.input-group {
    border-radius: 0.375rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.input-group:focus-within {
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.input-group.is-valid:focus-within {
    box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}

.input-group.is-invalid:focus-within {
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}


.input-group:focus-within {
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.input-group>.form-control-password:focus {
    box-shadow: none;
}

.input-group>.input-group-text {
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.input-group>.form-control-password:focus+.input-group-text {
    border-color: #86b7fe;
}
</style>