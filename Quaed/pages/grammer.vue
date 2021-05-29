<template>
  <div>
    <!-- Start Instruction banner -->
    <section class="my-5">
      <b-container>
        <h2 class="header">القواعد</h2>
        <p>لتحقيق الاستفادة القصوى يرجى مراعاة اﻵتي:</p>

        <ul class="custom-list d-flex flex-column flex-md-row justify-content-between">
          <li class="d-block d-md-inline-block">
            <span>التقدم بترتيب الدروس.</span>
          </li>
          <li class="d-block d-md-inline-block">
            <span>حل التمارين بعد كل درس.</span>
          </li>
          <li class="d-block d-md-inline-block">
            <span>ترك تعليق إن واجهة أي مشكلة.</span>
          </li>
        </ul>
      </b-container>
    </section>
    <!-- End Instruction banner -->

    <!-- Start Article Grid -->
    <section class="my-5">
      <b-container>
        <b-row>
          <b-col md="6" lg="3" :key="index" @click="getArticle(article)" v-for="(article, index) in articles">
            <nuxt-link
              v-if="index < currentPage*perPage && currentPage*perPage-index <= 8"
              :to="`/articles/${(article.title).split(' ').join('-')}`"
              class="article d-flex flex-column justify-content-between p-2 my-2 pb-0"
            >
              <h2 class="text-left">
                {{index+1}}<h2 class="d-inline-block" v-if="index < 9">0</h2>
              </h2>
              <h2>{{ article.title }}</h2>
            </nuxt-link>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <!-- End Article Grid -->
    <div class="my-3">
					<b-pagination
						align="center"
						v-model="currentPage"
						aria-controls="words"
						:total-rows="rows"
						:per-page="perPage"
						first-number
						last-number
					></b-pagination>
				</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Articles",
  data() {
		return {
			perPage: 8,
			currentPage: 1,
		};
	},
  computed: {
		rows() {
			return this.articles.length;
		},
		...mapState(["user", "articles"])
	},
  methods: {
    getArticle(article){     
      this.$store.commit("getCurrentArticle", article)
    }
  },head() {
		return {
			script: [
				{ src: "/js/sweatalert.js" },
				
			],
			title: `القواعد | قواعد`
		};
	},
  
};
</script>

<style scoped lang="sass">
img.star
  vertical-align: top
  cursor: pointer
  
.article
  width: 100%
  min-height: 200px
  background-image: linear-gradient(to left bottom, #c87155, #dc5969, #df4492, #c548c8, #6c63ff)
  transition: all 1s ease-in-out
  h2
    padding: 0 !important
    margin: 0 !important
    text-decoration-color: white !important 
  &::hover
    h2 
      text-decoration: underline
      text-decoration-color: white !important

ul.custom-list
  display: flex
  justify-content: space-between

</style>
