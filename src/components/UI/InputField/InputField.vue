<template>
    <div class="form-group">
        <label>{{ data?.field }}:</label>
        <input type="text"
            class="form-control"
            :name="data?.name"
            :class="data?.hasError"
            @input="($event) =>action($event)"
            :placeholder="'Enter' + ' ' + data?.field"
            :value="data?.value"
        />
        <div class="invalid-feedback">{{ data?.error }}</div>
    </div>
</template>

<script>
export default {
   name: 'Input',
   props: {
       data: Object,
       action: Function,
   }
}
</script>

<style lang="scss" scoped>

</style>