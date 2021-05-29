<template>
	<section class="my-5">
		<b-container v-cloak>
			<h2 class="header">الكلمات:</h2>
			<main class="mx-2">
				<div
					class="word mb-1 mb-md-auto"
					id="words"
					:key="index"
					@dblclick="addWord(word)"
					v-for="(word, index) in words"
				>
					<b-row v-if="index < currentPage*perPage && currentPage*perPage-index <= 10">
						<b-col class="right-word" md="6">
							<div class="my-3 text-right">
								<header>
									<!-- Favourite star -->
									<img
										width="30"
										@click="addWord(word)"
										:src="require(`~/assets/img/${word.marked ? 'icons8_star_filled' : 'icons8_star'}.png`)"
										class="img-fluid fav"
										alt="المفضلة"
									/>
									<!-- End Favourite star -->

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
									<!-- Favourite star -->
									<img
										@click="addWord(word)"
										width="30"
										:src="require(`~/assets/img/${word.marked ? 'icons8_star_filled' : 'icons8_star'}.png`)"
										class="img-fluid fav"
										alt="المفضلة"
									/>
									<!-- Favourite star -->
								</header>
								<p class="text-left ml-4" v-if="word.en_mean != ''">{{word.en_mean}}</p>
							</div>
						</b-col>
					</b-row>
				</div>

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
			</main>
		</b-container>
	</section>
</template>

<script>
import { mapState } from "vuex";

export default {
	data() {
		return {
			perPage: 10,
			currentPage: 1
		};
	},
	computed: {
		rows() {
			return this.words.length;
		},
		...mapState(["user", "words"])
	},
	head() {
		return {
			title: " قواعد | الكلمات",
			script: [
				{ src: "/js/sweatalert.js" },
				
			],
		};
	},
	methods: {
		async addWord(word) {
			let vm = this;

			if (vm.user) {
				let DATA = { word: word._id, email: vm.user.email };
				let res = await vm.$axios
					.$post("/api/users/addFavWord", DATA)
					.then(res => {
						/** UPDATE THE COOKIE */
						vm.$cookies.remove("user");
						vm.$cookies.set("user", res);

						vm.words.forEach(w => {
							if (w._id == word._id) {
								let wordPosition = vm.words.indexOf(w);
								if (wordPosition !== -1) {
									vm.$store.commit("toggleWord", wordPosition);
								}
							}
						});

						Swal.fire({
							title: !word.marked
								? "تم حذف الكلمة من القاموس"
								: "تم إضافة الكلمة للقاموس",
							icon: "success",
							showCloseButton: true
						});
					})
					.catch(err => {
						Swal.fire({
							title: err.message,
							icon: "error",
							showCloseButton: true
						});
					});
			} else {
				/** If NOT LOGED IN */
				Swal.fire({
					title: "سجل حسابك أولاً لإضافة الكلمة لقاموسك",
					icon: "warning",
					confirmButtonText: "سجّل",
					showCloseButton: true
				}).then(() => vm.$router.push("/login"));
			}
		}
	}
};
</script>

<style lang="sass" scoped>
.pagination.b-pagination
	direction: ltr !important
button
	border-radius: 0px
	border: 1px solid #aaa
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

