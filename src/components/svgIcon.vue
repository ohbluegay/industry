<template>
    <svg aria-hidden="true">
        <use :xlink:href="'#icon-'+iconName"/>
    </svg>
</template>

<script>
export default {
    props: {
        iconName: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>

</style>