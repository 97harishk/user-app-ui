<template>
    <div class="header">
        <h4>{{ name }}</h4>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name: "Vue App"
        }
    }
}
</script>

<style scoped>
.header{
    background-color: salmon;
    color: #333;
}
</style>