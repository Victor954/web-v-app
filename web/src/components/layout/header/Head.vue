<template>
    <nav class="navbar navbar-expand-lg navbar-light border-bottom">
        <div class="container-fluid">
            <div class="d-flex gap-3">
                <HasAuthorized>
                    <Button style-type="secondary" outline :class="['menu_toggle', styleTypeClass]"
                        @click="clickToggleHandler">
                        <Icon icon="menu" />
                    </Button>
                </HasAuthorized>
                <a class="navbar-brand" href="#">Logo</a>
            </div>
            <User />
        </div>
    </nav>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import User from './User.vue';

type Props = {
    menuVisible: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(['onToggle']);

const styleTypeClass = computed(() => props.menuVisible ? 'primary' : 'secondary');

function clickToggleHandler() {
    emit('onToggle');
}

</script>
<style scoped lang="scss">
.navbar {
    height: 60px;

    .menu_toggle {
        background-color: initial;
        border: none;
        padding: 0px;
        display: flex;
        align-items: center;

        &.primary {
            color: $blue-500;

            &:hover {
                color: $blue-600;
            }
        }

        &.secondary {
            color: $gray-600;

            &:hover {
                color: $gray-800;
            }
        }
    }
}
</style>