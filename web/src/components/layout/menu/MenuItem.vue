<template>
    <li v-if="!$props.icon" :class="['menu_item', activeClass]">
        <RouterLink :to="to">
            <slot></slot>
        </RouterLink>
    </li>
    <li v-else :class="['menu_item__icon', activeClass]">
        <Icon :icon="$props.icon" style-type="outlined" />
        <slot></slot>
    </li>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { MaterialIcon } from 'material-icons';

const route = useRoute();

type Props = {
    to: string,
    icon?: MaterialIcon
}

const props = defineProps<Props>();

const activeClass = computed(() => route.path === props.to ? 'active' : null);
</script>
<style scoped lang="scss">
@import '@/scss/menu.scss';

li.menu_item {
    @include menu_item();
}

li.menu_item__icon {
    @include menu_item();

    display: flex;
    gap: 10px;

    :deep(i) {
        color: $menu_list_icon_color;
    }
}
</style>