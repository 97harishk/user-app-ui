<template>
    <div class="row">
        <div class="col-sm-6 offset-sm-3">
            <div class="alert alert-success" v-if="message">{{ message }}</div>
            <div class="alert alert-danger" v-if="error">{{ error }}</div>
            <h2>Login</h2>
            <form @submit.prevent="loginHandler">
                <div v-for="(data, i) in form" :key="i" class="form-group">
                    <InputField :data="data" :action="inputHandler"/>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" >Login <span v-if="loading" class="spinner-border spinner-border-sm"></span></button>
                    <router-link to="/register" class="btn btn-link">Register</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Axios from '@/components/Api/Axios';
import InputField from '@/components/UI/InputField/InputField';
import { loginFormData }  from '../MockData/Formdata';
export default {
    name:"Login",
    components:{
        InputField
    },
    data(){
        return{
            message: '',
            error: '',
            data: {},
            loading: false,
            form: loginFormData,

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
        loginHandler(){
            let res = true;
            const form = this.form?.map((item) =>{
                if(item?.value === ''){
                    res = false
                    return { ...item, error: `${item?.field} is Required`, hasError: 'is-invalid' }
                }
                else{
                    return { ...item }
                }
            })
            this.form = form;
            this.data = this.form?.reduce((a, c) => ({...a, [c.name]: c.value }), {});
            if(res){
                this.loading = true;
                Axios.post('/user/login', {
                    username: this.data?.username,
                    password: this.data?.password,
                }).then((response) =>{
                    if(response?.status === 200){
                        const data = response?.data;
                        this.message = data?.message;
                        localStorage.setItem('userId', data?.userId)
                        localStorage.setItem('token', data?.token)
                        localStorage.setItem('firstname', data?.user?.first_name)
                        localStorage.setItem('lastname', data?.user?.last_name)
                        this.error = '';
                        this.loading = false;
                        this.$router.push('/users')
                    }
                    else{
                        this.loading = false;
                        this.error = response?.data?.message;
                        this.message = '';
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