<template>
	<b-container>
		<main class="my-5">
			<h1 class="header">{{user.name}}</h1>

			<b-list-group horizontal class="mb-4 w-full">
				<b-list-group-item
					class="flex-grow-1 text-dark d-flex justify-content-between align-items-center"
				>
					تاريخ الإشتراك
					<b-badge
						variant="primary"
						pill
					>{{ `${new Date(user.created_at).getDate()}- ${new Date(user.created_at).getMonth()} - ${new Date(user.created_at).getFullYear()}` }}</b-badge>
				</b-list-group-item>
			</b-list-group>

			<h2 class="header">يوجد {{bookmark.words.length}} كلمة في قاموسك</h2>

			<b-row id="words" :key="index" v-for="(word, index) in bookmark.words">

				<b-col class="right-word" md="6">
					<div class="my-3 text-right">
						<header>
							<img
								src="~/assets/img/blue.png"
								class="img-fluid"
								style="transform: rotate(180deg)"
								alt="bullet"
							/>
							<span class="d-inline-block mx-2">{{index + 1 }}-</span>
							<span>
								{{word.ar_word}}
								<span v-if="word.ar_mean != ''">:</span>
							</span>
						</header>
						<p class="text-right mr-4" v-if="word.ar_mean != ''">{{word.ar_mean}}</p>
					</div>
				</b-col>
				<b-col class="left-word" md="6">
					<div class="my-3 text-left">
						<header class="text-left">
							<p class="d-inline-block">
								<span v-if="word.en_mean != ''">:</span>
								{{word.en_word}}
							</p>
							<span class="d-inline-block mx-2">-{{index + 1 }}</span>
							<img src="~/assets/img/brown.png" class="img-fluid" alt="bullet" />
						</header>
						<p class="text-left ml-4" v-if="word.en_mean != ''">{{word.en_mean}}</p>
					</div>
				</b-col>
			</b-row>
		</main>
	</b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
	async validate({ store }) {
		if (!store.state.user) return false;
		return true;
  },
  async created() {
		const [words] = await Promise.all([
			await this.$axios.$get("/api/words")
		]);		

		this.$store.commit("words", words);
	},
	computed: mapState([
		// map this.count to store.state.count
		"user",
		"bookmark"
	]),
	head() {
		return {
			script: [{ src: "/js/sweatalert.js" }],
			title: `القواعد | ${this.user.name}`
		};
	}
};
</script>

<style lang="sass" scoped>
.list-group-horizontal .list-group-item
  border-radius: 0

.right-word
	border-bottom: 2px solid black
.left-word
	border-bottom: 2px solid black
img.fav
	cursor: pointer
@media (max-width: 767px)
	.right-word
		border-bottom: 0px solid #000
	.left-word
		border: 0px
		border-bottom: 2px solid #000
</style>
