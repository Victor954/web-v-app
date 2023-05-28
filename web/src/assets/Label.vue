<template>
    <span class="rounded px-2">
        <slot></slot>
    </span>
</template>
<style scoped lang="scss">
span {
    background-color: $blue-100;
    color: $blue-800;
    border: solid 1px $blue-300;
}
</style>