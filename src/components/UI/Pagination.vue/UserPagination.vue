<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous" v-if="page != 1" @click="page--">
                    <span aria-hidden="true" >&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
             <li class="page-item" v-for="n in displayPages" :key="n" @click="page = n"><a class="page-link" href="#">{{ n }}</a></li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next" @click="page++" v-if="page < pages.length">
                    <span aria-hidden="true" >&raquo;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>

export default {
    props:{
        userData: Object,
        setShowUsers: Function,
    },
    data(){
        return{
            page: 1,
            perPage: 10,
            pages: [],
        }
    },
    methods: {
        setPages () {
        let numberOfPages = Math.ceil(this.userData.length / this.perPage);
        for (let index = 1; index <= numberOfPages; index++) {
            this.pages.push(index);
        }
        },
        paginate (posts) {
        let page = this.page;
        let perPage = this.perPage;
        let from = (page * perPage) - perPage;
        let to = (page * perPage);
        this.setShowUsers(posts.slice(from, to));
        return  posts.slice(from, to);        
        }
    },
    watch: {
    userData () {
        this.setPages();
        }
    },
    computed: {
        displayPages () {
        this.paginate(this.userData);
        return this.pages.slice(this.page-1, this.page + 5)
        }
    },
}
</script>

<style lang="scss" scoped>

</style>