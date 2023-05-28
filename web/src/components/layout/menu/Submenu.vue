<template>
    <nav :class="className" @click="clickSubmenuHandler">
        <li class="submenu_title" ref="labelRef">
            <span>
                <Icon :icon="$props.icon" style-type="outlined" />
                <label>{{ $props.label }}</label>
            </span>
            <Icon :icon="iconDropDown" />
        </li>
        <ul class="submenu_list">
            <slot :childClass="childClass"></slot>
        </ul>
    </nav>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { MaterialIcon } from 'material-icons';

type Props = {
    label: string;
    icon: MaterialIcon
}

defineProps<Props>();

const expended = ref<boolean>(false);
const labelRef = ref<HTMLElement | null>(null);

const childClass = 'child_menu_item';

const className = computed(() => ({ 'submenu': true, 'expended': expended.value }));

const iconDropDown = computed<MaterialIcon>(() => expended.value ? 'arrow_drop_up' : 'arrow_drop_down');

function clickSubmenuHandler(event: MouseEvent) {

    if (event.target === labelRef.value) {
        expended.value = !expended.value;
    }
}

</script>
<style scoped lang="scss">
@import '@/scss/menu.scss';

nav.submenu {
    & li.submenu_title {
        @include menu_item();
        display: flex;
        justify-content: space-between;

        span {
            display: flex;
            gap: 10px;
        }
    }

    &.expended {
        & li.submenu_title {
            background-color: $menu_list_nested_expend_bg;
        }

        ul.submenu_list {
            height: auto;
        }
    }

    & ul.submenu_list {
        padding: 0rem;
        height: 0rem;
        overflow: hidden;

        :deep(.child_menu_item) {
            padding-left: 2rem;
            background-color: $menu_list_nested_bg;
            border-bottom: solid 1px $gray-800;

            &:hover {
                background-color: $menu_list_bg;
            }
        }
    }
}
</style>