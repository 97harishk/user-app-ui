<template>
    <div>
        <div class="row">
            <div class="col-sm-8">
                <h2>Hi {{ name }} !</h2>
                <h4>Welcome to the Vue App</h4>
            </div>
            <div class="col-sm-4">
                <button class="btn btn-primary" @click="logout()">Logout</button>
            </div>
        </div>
        <div class="form-group">
            <input type="text"
                class="form-control"
                v-model="filterKey"
                placeholder="Search User"
            />
            <div class="invalid-feedback">{{ data?.error }}</div>
        </div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Update</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in showUserList" :key="index">
                    <td>{{ user?.first_name + " " + user?.last_name }}</td>
                    <td>{{ user?.username }}</td>
                    <td><button type="button" class="btn btn-danger" @click="() =>deleteHandler(user?._id)" v-if="isCurrentUser(user?._id)">Delete</button></td>
                    <td><button type="button" class="btn btn-info" @click="() =>updateHandler({ ...user })">Update</button></td>
                </tr>
            </tbody>
        </table>
        <user-pagination
         :userData="users"
         :setShowUsers="setShowUsers"
          />
        <DeleteModal
            v-if="showDeleteModal" 
            :deleteHandler="deleteHandler" 
            :deleteUser="deleteUser" 
            :loading="loading"
        />
        <UpdateModal
            v-if="showUpdateModal" 
            :updateHandler="updateHandler"
            :deleteUser="deleteUser" 
            :loading="loading"
            :userData="userData"
            :updateUser="updateUser"
        />
    </div>
</template>
<script>
import Axios from '@/components/Api/Axios'

import DeleteModal from '@/components/UI/Modal/DeleteModal'
import UpdateModal from '@/components/UI/Modal/UpdateModal'
import UserPagination from '@/components/UI/Pagination.vue/UserPagination.vue'

export default {
    name: 'User',
    components:{
        DeleteModal,
        UpdateModal,
        UserPagination,
    },
    data(){
        return{
            users: [],
            loading: false,
            showDeleteModal: false,
            showUpdateModal: false,
            listId: null,
            index: 1,
            userData: {},
            showUsers: [],
            filterKey: "",
        }
    },
    methods: {
        deleteHandler: function (id){
            this.listId = id;
            this.showDeleteModal = !this.showDeleteModal;
        },
        deleteUser: function () {
            this.loading = true;
            Axios.post(`/user/delete/${this.listId}`)
            .then((response) =>{
                if(response.status === 200){
                    this.loading = false;
                    this.deleteHandler(this.listId);
                    this.users = this.users?.filter((user) => user?._id !== this.listId);
                }
            }).catch((err) =>{
                this.loading = false;
                console.log(err)
            })
        },
        isCurrentUser: function(id){
            return localStorage.getItem('userId') !== id
        },
        logout: function(){
            localStorage.clear();
            this.$router.push('/login');
        },
        updateHandler: function(user){
            this.showUpdateModal = !this.showUpdateModal;
            this.userData = user;
        },
        updateUser: function(user){
            const users = this.users?.map((item) =>{
                if(item._id === user._id){
                    return user;
                }
                return item;
            })
            this.users = users;
        },
        setShowUsers: function(users){
            this.showUsers = users;
        },
    },
    computed: {
        name : function(){  
            return localStorage.getItem('firstname') + " " + localStorage.getItem('lastname');
        },
        filterUsers: function(){
            return this.users?.filter((iteme, i) => i < 10);
        },
        showUserList: function(){
            if(this.filterKey !== ''){
                const filtrerUser = this.users.filter(user =>
            user.username.toLowerCase().includes(this.filterKey.toLowerCase()
              )
          )
          return filtrerUser
            }
        return this.showUsers;
        }
    },
    mounted(){
        this.loading = true;
        Axios.get('/user/users')
        .then((res) =>{
            this.loading = false;
            this.users = res?.data?.users;
        }).catch((err) =>{
            console.log(err)
        })
    }

}
</script>

<style lang="scss" scoped>

</style>