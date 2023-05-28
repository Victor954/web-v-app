<template>
    <nav class="sidebar_menu shadow">
        <ul>
            <MenuItem to="/managemet">Test1</MenuItem>
            <Submenu icon="public" label="Группа">
                <template v-slot:default="{ childClass }">
                    <MenuItem :class="childClass" icon="do_disturb" to="/management">Test1</MenuItem>
                    <MenuItem :class="childClass" to="/management">Test1</MenuItem>
                    <HasAuthorized :roles="['admin']">
                        <MenuItem :class="childClass" to="/management">Test1</MenuItem>
                    </HasAuthorized>
                </template>
            </Submenu>
            <MenuItem to="/management">Test1</MenuItem>
        </ul>
    </nav>
</template>
<script setup lang="ts">
import MenuItem from './MenuItem.vue';
import Submenu from './Submenu.vue';

</script>
<style scoped lang="scss">
@import '@/scss/menu.scss';

nav.sidebar_menu {
    height: inherit;
    background-color: $menu_list_bg;
    color: $menu_list_color;

    ul {
        padding: 0px;
    }
}
</style>