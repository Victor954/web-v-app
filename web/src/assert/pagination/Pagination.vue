<template>
    <nav class="navigation">
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="#">
                    <Icon size="md" icon="arrow_right_alt" class="arrow-left" />
                </a>
            </li>
            <PageNumber number="1" @click-page="clickPageLinkHandler" />
            <PageNumber v-for="page in pages" :number="page" @click-page="clickPageLinkHandler" />
            <PageNumber :number="countPages.toString()" @click-page="clickPageLinkHandler" />
            <li class="page-item">
                <a class="page-link" href="#">
                    <Icon size="md" icon="arrow_right_alt" />
                </a>
            </li>
        </ul>
    </nav>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import _ from 'lodash';

import Icon from '@/assert/icons/MaterialIcon.vue'
import PageNumber from './PageNumber.vue';

type Props = {
    totalItemsCount: number,
    pageItemsCount: number
}

const paginationLength = 6;

const props = defineProps<Props>();

const indexRange = ref<number>(1);
const countPages = computed(() => Math.ceil(props.totalItemsCount / props.pageItemsCount))

const pages = computed(() => _.range(indexRange.value, indexRange.value + paginationLength).map(n => n.toString()));

function clickPageLinkHandler(page: number) {

    let indexRangeValue = 1;

    if (page > 3) {
        indexRangeValue = page - 2;
    }

    if (indexRangeValue > countPages.value - paginationLength) {
        indexRangeValue = countPages.value - paginationLength + 1;
    }

    indexRange.value = indexRangeValue;
}

</script>
<style scoped lang="sass">
    .navigation {
        height: auto;

       .pagination {
            margin: 0px;
        }
    }
</style>