<template>
  <div>
    <nav class="navbar container navbar-expand-lg bg-light shadow-lg sticky-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="">Photo Sharing App</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav" v-for="category in categories" :key="category">
            <li class="nav-item">
              <a class="nav-link" :href="category + '?1'" @click="getCategory(category)">{{ category[0].toUpperCase() + category.slice(1) }}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="mx-auto position-absolute top-50 end-50" v-if="loading">
      <div class="spinner-grow text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <PhotoGrid :images="images" v-else/>
    <nav aria-label="Page navigation example" v-if="!loading">
      <ul class="pagination justify-content-center">
        <li class="page-item shadow">
          <a :class="currentPage === 1 ? 'page-link text-dark disabled' : 'page-link text-dark'" :href="currentCategory + '?' + parseInt(currentPage - 1)" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item shadow">
          <a class="page-link text-dark" :href="currentCategory + '?' + parseInt(currentPage + 1)" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
 
<script>
  import PhotoGrid from './components/PhotoGrid.vue';
  import axios from 'axios';
  export default {
 
    components: {
      PhotoGrid,
    },
    data(){
      return {
        categories: ['nature', 'architecture', 'fashion'],
        images: [],
        currentPage: '',
        currentCategory: '',
        loading: true,
      }
    },
    created() {
      this.getCategory();
      this.getPage();
    },
    mounted(){
      this.fetchImages();
    },
    methods: {
      getCategory(){
        const url = new URL(window.location.href);
        this.currentCategory = url.pathname.split('/')[1] === '' ? 'nature' : url.pathname.split('/')[1];
        console.log(this.currentCategory)
      },
      getPage(){
        const url = new URL(window.location.href);
        this.currentPage = url.href.split('?')[1] === '' ? 1 : parseInt(url.href.split('?')[1]);
      },
      async fetchImages() {
        let imagesList = [];
        let start = (this.currentPage - 1) * 3 + 1;
        let end = this.currentPage * 3;
        for(let i = start; i <= end; i++){
          try {
            const response = await axios.get(`http://localhost:8888/images?category=${this.currentCategory}&page=${i}`);
            imagesList.push(response.data);
          } catch (error) {
            console.error('Error fetching images:', error);
          }
        }
        this.images = imagesList;
        this.loading = false;
      },
    },
    
  }
</script>