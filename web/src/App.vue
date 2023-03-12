<template>
    <main class="container-fluid px-0">
        <AuthorizeView>
            <template #authorized>
                <div class="row gx-0">
                    <div class="col-12">
                        <Menu />
                    </div>
                    <div class="col-12 relative">
                        <RouterView v-slot="{ Component }">
                            <Transition name="fade">
                                <component :is="Component" />
                            </Transition>
                        </RouterView>
                    </div>
                </div>
            </template>
            <template #unauthorized>
                <AuthorizePage />
            </template>
            <template #loading>
                <h3>loading</h3>
            </template>
        </AuthorizeView>
    </main>
</template>

<script lang="ts" setup>
import { Transition } from 'vue';
import { RouterView } from 'vue-router';
import { Menu } from '@/components/menu';
import AuthorizePage from '@/pages/authorize/Page.vue';

import { AuthorizeView } from '@/helpers/identity';

</script>

<style scoped lang="scss">
@import '@/scss/transitions';
</style>