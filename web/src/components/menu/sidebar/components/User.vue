<template>
    <article class="user_info">
        <header class="user_info__header">
            <h5 class="title_role text-center fw-normal">Администратор</h5>
            <h6 class="title_info text-center fw-light">Райан гослинг</h6>
        </header>
        <section class="user_info__content">
            <div class="icon_wrapper">
                <article class="user_icon"></article>
                <span class="shadow">
                    <MaterialIcon size="2xl" icon="logout"></MaterialIcon>
                </span>
            </div>
        </section>
    </article>
</template>
<script lang="ts" setup>
import MaterialIcon from '@/assert/icons/MaterialIcon.vue';


</script>
<style scoped lang="scss">
.user_info {
    background-color: darken($blue-200, $amount: 3);
    color: $white;
    padding: 3rem 0rem;
    border-bottom: solid 1px transparentize($gray-800, .9);
    border-top: solid 1px transparentize($gray-800, .9);

    .user_info__header {
        .title {
            text-align: center;
        }
    }

    .user_info__content {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon_wrapper {
            $size: 130px;
            border-radius: 100%;
            width: $size;
            height: $size;
            position: relative;
            overflow: hidden;
            box-shadow: .2rem .2rem 1rem transparentize($blue-800 , .6);

            .shadow {
                transition: opacity .2s;
                opacity: 0;
                background-color: transparentize($blue-800 , .5);
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                top: 0px;
                color: $red-500;
                position: absolute;
                z-index: 1;
            }

            .user_icon {
                box-shadow: 0px 0px 10px red;
                width: $size;
                height: $size;
                background-image: url('@public/assert/user_ic.jpg');
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
            }

            &:hover {
                cursor: pointer;

                .shadow {
                    opacity: 1;
                }
            }
        }
    }


}
</style>