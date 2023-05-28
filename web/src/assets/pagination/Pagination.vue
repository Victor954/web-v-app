<template>
    <nav>
        <ul class="pagination mb-0">
            <Page type="step" :page-number="prevPageNumber" @change-page="clickPageHandler">
                <Icon icon="arrow_back" />
            </Page>

            <Page type="first" :page-number="1" :disabled="selectPageIndex === 0" @change-page="clickPageHandler">
                1
            </Page>

            <Page v-for="pageNumber in pages.slice(indexStart, indexEnd)" :page-number="pageNumber" :key="pageNumber"
                type="page" :active="selectPageIndex == pageNumber - 1" @change-page="clickPageHandler">
                {{ pageNumber }}
            </Page>

            <Page type="last" @change-page="clickPageHandler" :page-number="pagesCount"
                :disabled="selectPageIndex === pagesCount - 1">
                {{ pagesCount }}
            </Page>

            <Page type="step" :page-number="nextPageNumber" @change-page="clickPageHandler">
                <Icon icon="arrow_forward"></Icon>
            </Page>
        </ul>
    </nav>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import _ from 'lodash';
import Page from './Page.vue';

type Props = {
    totalCount: number;
    itemsPageCount: number;
}

const startPage = 1;
const leftOffset = 1;
const limitLength = 3;

const emit = defineEmits(['pageChanged']);

const props = defineProps<Props>();

const selectPageIndex = ref<number>(startPage - 1);

watch(selectPageIndex, (value) => {
    emit('pageChanged', value);
});

const pagesCount = computed(() => Math.ceil(props.totalCount / props.itemsPageCount));
const pages = computed(() => _.range(startPage, pagesCount.value + 1));

const indexStart = computed(() => selectPageIndex.value > 0 ? selectPageIndex.value - leftOffset : selectPageIndex.value);
const indexEnd = computed(() => selectPageIndex.value + limitLength);

const nextPageNumber = computed(() => selectPageIndex.value < pagesCount.value - 1 ?
    selectPageIndex.value + 2 :
    1
);
const prevPageNumber = computed(() => selectPageIndex.value > 0 ?
    selectPageIndex.value :
    pagesCount.value
);

function clickPageHandler(pageNumber: number) {
    selectPageIndex.value = pageNumber - 1;
}

</script>
<style scoped lang="scss">
$pagination-color: $gray-500;
$skip-dots-offset: .3rem;

@mixin active($color) {

    &:hover,
    &:focus,
    &:active {
        background: none;
        color: $color;
        box-shadow: none;
    }
}

.pagination {
    gap: .5rem;

    :deep(.page-item) {
        .page-link {
            border: none;
            transition: none;
            color: $pagination-color;
            display: flex;
            height: 100%;
            align-items: center;
            padding: ($pagination-padding-y - .05rem) ($pagination-padding-x - .05rem);
            transition: color .2s;

            &:focus {
                box-shadow: none;
            }

            &:not(.active) {
                @include active($blue-300);
            }


            &.active {
                transition: color, background-color .8s;
                color: $gray-800;
                background-color: $blue-200;
                border-radius: $border-radius-lg;
            }

            &.first {
                &:first-of-type::after {
                    content: '...';
                    margin-left: $skip-dots-offset;
                }
            }

            &.last {
                &:first-of-type::before {
                    content: '...';
                    margin-right: $skip-dots-offset;
                }
            }

            &.first,
            &.last {

                &:disabled {
                    opacity: .5;
                    @include active($pagination-color);
                }
            }
        }
    }
}
</style>