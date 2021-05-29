<template>
	<div>
		<my-navbar />
		<nuxt />
		<my-footer />
	</div>
</template>

<script>
import MyNavbar from "~/components/Navbar.vue";
import MyFooter from "~/components/Footer.vue";

export default {
	components: {
		MyNavbar,
		MyFooter
	},
	
	async created() {
		const [articles, words] = await Promise.all([
			await this.$axios.$get("/api/posts"),
			await this.$axios.$get("/api/words")
		]);		

		this.$store.dispatch("get_articles", articles);
		this.$store.commit("words", words);
	}
};
</script>

<style lang="sass">
p
  font-size: 16px

*
  color: white
html, body
  background-color: $light-green
  letter-spacing: 0.5px

footer
  padding: 20px

a, a:hover, a:focus, a:visited
  color: #000
</style>
