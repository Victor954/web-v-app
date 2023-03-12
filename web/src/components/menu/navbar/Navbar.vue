<template>
    <Sidebar ref="sidebarRef"></Sidebar>
    <nav class="navbar menu">
        <div class="container-fluid">
            <HeaderToggle @click-toggle="clickToggleHandler" />
            <section class="menu__manage">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink to="/settings" class="nav-link">
                            <MaterialIcon size="md" icon="settings" type="outlined"></MaterialIcon>
                            Настройки
                        </RouterLink>
                    </li>
                </ul>
            </section>
        </div>
    </nav>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import Sidebar from '../sidebar/components/Sidebar.vue';
import HeaderToggle from '../HeaderToggle.vue';
import MaterialIcon from '@/assert/icons/MaterialIcon.vue';
import { SidebarExpose } from '../sidebar';

const sidebarRef = ref<SidebarExpose>();

function clickToggleHandler() {
    sidebarRef.value?.show();
}

</script>
<style scoped lang="scss">
.menu {
    border-bottom: solid 1px $border-color;

    .container-fluid .menu__manage .navbar-nav {
        .nav-item .nav-link {
            display: flex;
            align-items: center;
            gap: .5rem;
        }
    }
}
</style>