<template>
    <div class="modal-box">
        <div class="row">
            <div class="col-sm-4 offset-sm-4">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Delete Item</h4>
                        <button type="button" class="close" data-dismiss="modal" @click="deleteHandler">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <h6>Are you sure, you want to Delete !</h6> 
                        <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteUser">
                            Delete 
                            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DeleteModal',
    props: {
        deleteHandler: Function,
        deleteUser: Function,
        loading: Boolean,
    }
    
}
</script>

<style scoped>
.modal-body{
    text-align: center;
}
.modal-box{
    position: absolute;
    top: 200px;
    left: 0;
    min-width: 100%;
}
</style>