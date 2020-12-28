<template>
    <div class="modal-box">
        <div class="row">
            <div class="col-sm-6 col-xs-12 offset-sm-3">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Update Item</h4>
                        <button type="button" class="close" data-dismiss="modal" @click="updateHandler">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <div class="row">
                        <div class="col-sm-8 offset-sm-2">
                            <div class="alert alert-success" v-if="message">{{ message }}</div>
                            <div class="alert alert-danger" v-if="error">{{ error }}</div>
                            <h2>Update User Data </h2>
                            <form @submit.prevent="updateUserHandler">
                                <div v-for="(data, i) in form" :key="i" class="form-group">
                                    <InputField :data="data" :action="inputHandler"/>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary" >Update <span v-if="loading" class="spinner-border spinner-border-sm"></span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputField from '../../UI/InputField/InputField.vue';
import Axios from '@/components/Api/Axios';
import { userFormData } from '../../MockData/Formdata';
export default {
    name: 'UpdateModal',
    components:{
        InputField
    },
    props: {
        updateHandler: Function,
        deleteUser: Function,
        userData: Object,
        updateUser: Function,
    },
    data(){
        return{
            message: '',
            error: '',
            data: { ...this.userData},
            loading: false,
            form: userFormData,
        }
    },
    methods: {
        inputHandler(e){
            console.log(this.userData)
            const inputName = e?.target?.name;
            const inputValue = e?.target?.value;
            const form = this.form?.map((item) =>{
                if(item?.name === inputName){
                    return { ...item, value: inputValue, error: '', hasError: '' }
                }   
                else{
                    return { ...item }
                }
            })
            this.form = form;
        },
        updateUserHandler(){
            let res = true;
            const form = this.form?.map((item) =>{
                if(item?.value === ''){
                    res = false
                    return { ...item, error: `${item?.field} is Required`, hasError: 'is-invalid' }
                }
                else{
                    this.data = { ...this.data, 'name' : item?.value, }
                    return { ...item }
                }
            })
            this.form = form;
            this.data = form?.reduce((a, c) => ({...a, [c.name]: c.value }), {});
            if(res){
                this.loading = true;
                Axios.post(`/user/update/${this.userData?._id}`, {
                    first_name: this.data?.firstname,
                    last_name: this.data?.lastname,
                    username: this.data?.username,
                    password: this.data?.password,
                }).then((res) =>{
                    if(res?.status === 200){
                        this.loading = false;
                        this.message = res?.data?.message;
                        this.error = '';
                        this.updateUser(res.data.user);
                    }
                    else{
                        this.loading = false;
                        this.message = '';
                        this.error = res?.data?.message;
                    }
                }).catch((err) =>{
                    this.loading = false;
                    console.log(err, 'err')
                })
            }
        }
    },
    mounted() {
        const uData = { ...this.userData };
        const data = {
            firstname: uData?.first_name, 
            lastname: uData?.last_name, 
            username: uData?.username, 
            password: uData?.password
        }
        const form = this.form?.map((item) =>{
            return { ...item, value: data?.[item?.name]}
        })
        this.form = Object.assign(form);
    },
    
}
</script>

<style scoped>
.modal-body{
    text-align: center;
}
.modal-box{
    position: absolute;
    top: 100px;
    left: 0;
    min-width: 100%;
}
</style>