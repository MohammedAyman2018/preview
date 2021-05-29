<template>
	<div>
		<b-container>
			<!-- Start Article -->
			<article class="the-currentArticle">
				<!-- Start Article header -->
				<header class="currentArticle-header my-5">
					<h2 class="header d-inline-block">{{currentArticle.title}}</h2>

					<div class="d-flex justify-content-between">
						<span class="mx-1 my-2">{{currentArticle.author}}</span>
						<span
							class="mx-1 my-2"
						>{{ `${new Date(currentArticle.created_at).getDate()}- ${new Date(currentArticle.created_at).getMonth()+1} - ${new Date(currentArticle.created_at).getFullYear()}` }}</span>
					</div>
				</header>
				<!-- End Article header -->

				<!-- Start Article body -->
				<div id="currentArticle-body" class="currentArticle-body"></div>
				<!-- End Article body -->
			</article>

			<!-- Start Comments -->
			<section class="comments border-top pt-5 my-5">
				<h2 class="header">التعليقات</h2>
				<p class="text-dark py-4 text-center" v-if="currentArticle.comments == []">لا يوجد تعليقات</p>
				<comment :comments="currentArticle.comments" />
			</section>
			<!--  End Comments -->

			<!-- Start Add Reply -->
			<section class="AddComment py-5" id="reply-box" v-if="user && relpy != null">
				<p class="header">أضف رداً لتعليق {{ relpy.auhtor }}</p>
				<!-- Start form -->
				<b-form class="text-center">
					<!-- Start textarea -->
					<b-form-group>
						<b-form-textarea
							v-model="reply.content"
							id="textarea-auto-height"
							placeholder="قل شيئاً بناءً"
							rows="3"
						></b-form-textarea>
					</b-form-group>
					<!-- End textarea -->

					<!-- Start buttons -->
					<div class="mx-auto">
						<b-button
							size="lg"
							@click="addReply"
							class="my-3 d-inline-block mx-auto"
							variant="primary"
						>أضف رداً</b-button>
						<b-button
							size="lg"
							@click="removeReply"
							class="my-3 d-inline-block mx-auto"
							variant="warning"
						>إلفاء</b-button>
					</div>
					<!-- End buttons -->
				</b-form>
				<!-- End form -->
			</section>
			<!-- End Add Reply-->

			<!-- Start Add Comment -->
			<section class="AddComment py-5" v-if="user && relpy == null">
				<p class="header">أضف تعليقاً</p>
				<b-form class="text-center">
					<b-form-group>
						<b-form-textarea
							id="textarea-auto-height"
							placeholder="قل شيئاً بناءً"
							rows="3"
							v-model="comment.content"
						></b-form-textarea>
					</b-form-group>
					<b-button
						size="lg"
						@click="AddComment"
						class="my-3 d-inline-block mx-auto"
						variant="primary"
					>أضف تعليقاً</b-button>
				</b-form>
			</section>
			<!-- End Add Comment-->
		</b-container>
	</div>
</template>

<script>
import { mapState } from "vuex";

import comment from "~/components/comment";
export default {
	name: "the_article",
	components: {
		comment
	},
	data() {
		return {
			reply: {
				name: null,
				date: Date.now(),
				content: null
			},
			comment: {
				name: null,
				date: Date.now(),
				content: null
			}
		};
	},
	computed: {
		...mapState(["user", "articles", "currentArticle", "relpy"])
	},
	async mounted() {
		if (this.currentArticle.author == "") {
			let article = await this.$axios.get(
				`/api/posts/${this.$route.params.title.split("-").join(" ")}`
			);
			this.$store.commit("getCurrentArticle", article.data);
		}
		document.getElementById(
			"currentArticle-body"
		).innerHTML = this.currentArticle.text;
	},
	methods: {
		async AddComment(e) {
			e.preventDefault();
			if (this.user) {
				this.comment.name = this.user.name;

				await this.$axios
					.$post(`/api/comments`, {
						comment: this.comment,
						article_id: this.currentArticle._id
					})
					.then(res => {
						this.$store.commit("getCurrentArticle", res);
						this.comment.name = null;
						this.comment.content = null;
					})
					.catch(err => {
						Swal.fire({
							title: err.message,
							icon: "error",
							showCloseButton: true
						});
					});
			}
		},
		async addReply() {
			this.reply.name = this.user.name;

			this.$axios
				.post("/api/reply", {
					article_id: this.currentArticle._id,
					comment_id: this.relpy.id,
					reply: this.reply
				})
				.then(res => {
					this.$store.commit("getCurrentArticle", res.data);
					this.reply.name = null;
					this.reply.content = null;
				});
		},
		removeReply() {
			this.$store.commit("getComment", null);
		}
	},head() {
		return {
			script: [
				{ src: "/js/sweatalert.js" },
				
			],
			title: `${this.currentArticle.title} | قواعد`
		};
	},
};
</script>

<style scoped lang="sass">
#currentArticle-body.currentArticle-body 
	max-width: 100% 
	overflow: hidden
	padding: 30px 0px 0px 30px
	border-top: 1px solid #eee
	border-left: 1px solid #eee

ul.custom-list
	display: flex
	justify-content: space-between
	li
		display: inline-block
</style>
	