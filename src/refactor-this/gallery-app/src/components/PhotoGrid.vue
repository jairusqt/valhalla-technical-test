<template>
    <div class="container">
      <div class="row">
        <template v-for="raw in images">
          <div
            v-for="image in raw"
            :key="image.id"
            class="col-4 photo-grid p-3"
            @mouseover="addHoverEffect"
            @mouseout="removeHoverEffect"
          >
            <img :src="image.url" alt="Photo" class="w-100 rounded shadow-lg" />
            <div class="position-absolute top-0 end-0 mt-3 me-3">
            <button class="btn btn-sm btn-light shadow" @click="downloadImage(image.url, image.name)">
              <span class="material-symbols-outlined">
                download
              </span>
            </button>
          </div>
          </div>
        </template>
      </div>
    </div>
  </template>
  
  <script>
  import 'bootstrap/dist/css/bootstrap.css';
  
  export default {
    props: {
      images: {
        type: Array,
        required: true,
      },
    },
    methods: {
      addHoverEffect(event) {
        const div = event.target;
        div.style.transition = 'transform 0.3s, filter 0.3s';
        div.style.transform = 'scale(1.05)';
        div.style.filter = 'brightness(1.2)';
      },
      removeHoverEffect(event) {
        const div = event.target;
        div.style.transition = 'transform 0.3s, filter 0.3s';
        div.style.transform = 'scale(1)';
        div.style.filter = 'brightness(1)';
      },
      downloadImage(url, name) {
        fetch(url)
        .then(response => response.blob())
        .then(blob => {
          let a = document.createElement('a');
          let blobUrl = URL.createObjectURL(blob);
          a.href = blobUrl;
          a.download = name;
          a.click();
          URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
          console.error('Error fetching the image:', error);
        });
      },
    },
  };
  </script>
  
  <style scoped>

  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0');

  .photo-grid {
    height: 400px;
    overflow: hidden; 
    position: relative; 
  }
  
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    transition: filter 0.3s;
  }
  
  .photo-grid:hover img {
    filter: brightness(1.2);
  }
  
  .photo-grid:hover {
    transform: scale(1.05);
  }
  
  </style>
  