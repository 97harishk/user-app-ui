<template>
    <div class="row">
        <div class="col-sm-6 offset-sm-3">
            <div class="alert alert-success" v-if="message">{{ message }}</div>
            <div class="alert alert-danger" v-if="error">{{ error }}</div>
            <h2>Register </h2>
            <form @submit.prevent="registerHandler">
                <div v-for="(data, i) in form" :key="i" class="form-group">
                    <InputField :data="data" :action="inputHandler"/>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" >Register <span v-if="loading" class="spinner-border spinner-border-sm"></span></button>
                    <router-link to="/login" class="btn btn-link">Login</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Axios from '@/components/Api/Axios'
import InputField from '@/components/UI/InputField/InputField'
import { userFormData } from '../MockData/Formdata';
export default {
    name:"Login",
    components: {
        InputField
    },
    data(){
        return{
            message: '',
            error: '',
            data: {},
            loading: false,
            form: userFormData,
            
        }
    },
    methods: {
        inputHandler(e){
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
        registerHandler(){
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
                Axios.post('/user/register', {
                    first_name: this.data?.firstname,
                    last_name: this.data?.lastname,
                    username: this.data?.username,
                    password: this.data?.password,
                }).then((res) =>{
                    if(res?.status === 200){
                        this.loading = false;
                        this.message = res?.data?.message;
                        this.error = '';
                        this.$router.push('/login')
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
    }
}
</script>

<style lang="scss" scoped>

</style>
