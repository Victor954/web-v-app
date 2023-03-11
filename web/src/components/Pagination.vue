<script lang="ts" setup>
import Icon from '@/assert/icons/MaterialIcon.vue'
</script>

<template>
    <nav class="navigation">
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="#">
                    <Icon size="md" icon="arrow_right_alt" class="arrow-left" />
                </a>
            </li>
            <li class="page-item">
                <a class="page-link active" href="#">1</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">4</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">5</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">
                    <Icon size="md" icon="arrow_right_alt" />
                </a>
            </li>
        </ul>
    </nav>
</template>
<style scoped lang="sass">
    .navigation {
        height: auto;

       .pagination {
            margin: 0px;

            .page-item {
                $spaceOutside: 1.5rem;
                $space: .5rem;

                &:first-of-type {
                    margin-right: $spaceOutside;
                }
                &:last-of-type {
                    margin-left: $spaceOutside;
                }
                margin: 0rem $space;
                .page-link {
                    font-weight: 500;
                    font-size: $font-size-sm;
                    border-style:none;
                    color: $gray-500;
                    background-color: initial;
                    
                    .arrow-left {
                        transform: rotate(180deg);
                    }

                    &:focus {
                        box-shadow: none;
                    }

                    &:hover{
                        background-color: initial;
                        color: $gray-800;
                    }
                }
                .page-link.active {
                    @extend .page-link;

                    color: $blue-300;
                    border-bottom: solid 2px $blue-300;
                }
            }
        }
    }
</style>