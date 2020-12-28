<template>
    <div class="cardLoader">
        <div class="row">
            <div class="col-md-3">
                <VclInstagram :width="220" :height="450" style="padding: 20px"></VclInstagram>
            </div>
        </div>
    </div>
</template>
<script>
import { VclInstagram } from 'vue-content-loading'

export default {
  components: { VclInstagram }
}
</script>

<style >
</style>