<template>
  <div id="app" class="container">
    <section style="margin-top: 1rem">
      <p>
        <b>Instruction: </b><br>
        * Try slider value at [100%, 50%, 24%, 20%, 16%, 14%, 10%] for different looking !<br>
        * In order to show infinite scroll effect, image number must also be infinite ! So, I chose to pick image randomly. <br>
        This will cause problem such as duplicated display. <br>
        In production environment, normally CDN store millions of user uploaded images. Random chose won't pick same image from past.<br>
        * Be aware of slider would overwrite @media-query max-width by applying max-width directly on element style. <br>
        So, now we are back to manually responsive to screen size !! <br>
        To test, comment out `:style="{ maxWidth: imageSize + '%' }"`
      </p>
    </section>
    <div>
      <b>Image Size Slider (manual responsive image):</b>
      <vue-slide-bar v-model="imageSize" @dragEnd="dragEnd"/>
      <span id="slider">{{imageSize}}%</span>
    </div>
    <div v-masonry
         transition-duration=".3s"
         origin-top="true"
         origin-left="false"
         item-selector=".item"
         :horizontal-order="true">
      <div class="row">
        <div v-masonry-tile class="item col-sm-6 col-md-3 col-lg-2"
             :style="{ maxWidth: imageSize + '%' }"
             v-for="(post, _) in posts">
          <div class="card p-1">
            <img class="card-img-top" :src="post.img_url" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title"><strong>{{ post.title }}</strong></h5>
              <p class="card-text">{{ post.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueSlideBar from "vue-slide-bar"
export default {
    name: 'masonry',
    components: {
        VueSlideBar
    },
    data() {
        return {
            posts: [],
            imageSize: 25
        }
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
        this.getPosts()
    },
    methods: {
        getPosts() {
            const baseUrl = 'http://localhost:5000';
            axios.get(baseUrl + '/image/init')
                .then(response => {
                    console.log(Date.now() + ' Fetched: ', response.data['image_names'].length);
                    for (const filename of response.data['image_names']) {
                        this.posts.push({
                            img_url: baseUrl + '/image/' + filename,
                            title: 'Title: ' + this.randomStr(10),
                            content: 'Paragraph: ' + this.randomStr(20)
                        })
                    }
                })
        },
        handleScroll() {
            let scrollHeight = window.scrollY;
            let maxHeight = window.document.body.scrollHeight - window.document.documentElement.clientHeight;
            console.log('scrollHeight: ', scrollHeight, 'maxHeight: ', maxHeight);
            if (scrollHeight >= maxHeight - 500) {
                this.getPosts()
            }
        },
        smartTrim(string, maxLength) {
            let trimmedString = string.substr(0, maxLength);
            return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
        },
        reDraw: function(){
            this.$redrawVueMasonry();
        },
        dragEnd() {
            console.log('Slider set image size; ' + this.imageSize);
            this.reDraw();
        },
        randomStr(len) {
            return btoa('' + Math.random()).slice(0, len);
        }
    }
}
</script>

<style scoped>
  .item {
    margin-top: 3px;
    margin-bottom: 3px;
  }
</style>
