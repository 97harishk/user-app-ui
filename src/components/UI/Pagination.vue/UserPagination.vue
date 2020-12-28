<template>
    <nav v-if="showPagination" aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
            <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </a>
            </li>
             <li class="page-item" v-for="(n, index) in parseInt(showPagination)" :key="index"><a class="page-link" href="#">{{ n }}</a></li>
            <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
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
    },
    data(){
        return{
            page: 1,
            showItem: 10,
        }
    },
    computed: {
        pageArray: function() {
            const pages = (this.userData?.length / this.showItem).toFixed(0);
            console.log(pages, 'pages');
            return pages
        },
        showPagination: function(){
            return this.userData?.length > this.showItem
        },
        showItems: function(i){
            return  this.page+1 < i && i < this.page + 5
        }
    }
}
</script>

<style lang="scss" scoped>

</style>