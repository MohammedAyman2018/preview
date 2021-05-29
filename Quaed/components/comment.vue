<template>
	<div class="text-center">
		<b-button
			variant="primary"
			class="my-3"
			size="lg"
			@click="showComments = !showComments"
		>
			<span v-if="!showComments">أظهر التعليقات</span>
			<span v-if="showComments">أخف التعليقات</span>
		</b-button>

		<div v-if="showComments">
			<div class="text-muted text-center py-2" v-if="comments.length == 0">لا يوجد تعليقات</div>
			<!-- Using modifiers -->

			<!-- Using value -->

			<div
				class="rounded p-2 my-1"
				v-else
				:key="index"
				v-for="(comment, index) in comments"
			>
				<!-- Start comment header -->
				<div class="shadow-lg p-3 mb-2 bg-white rounded">
					<header class="comment-header d-flex justify-content-between flex-wrap">
						<div class="info">
							<h5 class="text-dark p-0 mb-md-4 ml-3 d-inline-block">{{comment.name}}</h5>
							<span
								class="time text-dark"
							>{{ `${new Date(comment.date).getDate()}- ${new Date(comment.date).getMonth()} - ${new Date(comment.date).getFullYear()}` }}</span>
						</div>

						<!-- Start Actions -->
						<div class="actions mb-4 mb-md-0 d-inline-block">
							<b-button-group style="direction: ltr">
								<b-button v-if="comment.replies.length > 0" v-b-toggle="'reply'+index" @click="isCollapsed = !isCollapsed" class="m-1">
									<b-icon :icon="isCollapsed ? 'arrow-down' : 'arrow-up'" variant="light"></b-icon>الردود
								</b-button>
								<b-button v-else v-b-toggle="'reply'+index" @click="isCollapsed = !isCollapsed" class="m-1">
									لا يوجد ردود
								</b-button>
								<b-button
									@click="deleteComment(comment._id, currentArticle._id)"
									v-if="user && user.token"
									variant="danger"
								>
									<b-icon icon="trash"></b-icon>حذف
								</b-button>
								<b-button
									v-if="user"
									variant="outline-primary"
									@click="getCommentId(comment._id, comment.name)"
									href="#reply-box"
								>
									<b-icon icon="reply-fill" variant="light"></b-icon>رد
								</b-button>
							</b-button-group>
						</div>
						<!-- End Actions -->
					</header>
					<!-- End comment header -->

					<!-- Start comment body -->
					<div class="comment-body">
						<p class="text-dark">{{ comment.content }}</p>
					</div>
					<!-- End comment body -->
				</div>

				<!-- Element to collapse -->
				<b-collapse class="border-right" :id="'reply'+index">
					<div class="replies mr-3 ">
						<div
							class="shadow p-3 mb-1 bg-white rounded pr-2"
							:key="rep_po"
							v-for="(reply, rep_po) in comment.replies"
						>
							<!-- Start reply header -->
							<header class="reply-header d-flex justify-content-between">
								<div class="info">
									<h5 class="text-dark p-0 mb-4 ml-3 d-inline-block">{{reply.name}}</h5>
									<span
										class="time text-dark"
									>{{ `${new Date(reply.date).getDate()}- ${new Date(reply.date).getMonth()} - ${new Date(reply.date).getFullYear()}` }}</span>
								</div>
								<div class="actions d-inline-block">
									<b-button
										class="d-inline-block px-2 text-center"
										@click="deleteReply(comment._id, currentArticle._id, rep_po)"
										v-if="user && user.token"
										variant="danger"
									>
										<b-icon icon="trash"></b-icon>حذف
									</b-button>
								</div>
							</header>
							<!-- End reply header -->

							<!-- Start reply body -->
							<div class="reply-body">
								<p class="text-dark">{{ reply.content }}</p>
							</div>
							<!-- End reply body -->
						</div>
					</div>
				</b-collapse>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import {
	BIcon,
	BIconArrowUp,
	BIconArrowDown,
	BIconReplyFill,
	BIconTrash
} from "bootstrap-vue";
export default {
	data() {
		return {
			showComments: false,
			isCollapsed: true
		};
	},
	components: {
		BIcon,
		BIconArrowUp,
		BIconArrowDown,
		BIconTrash,
		BIconReplyFill
	},
	computed: mapState(["user", "currentArticle"]),
	props: ["comments"],
	methods: {
		getCommentId(id, name) {
			this.$store.commit("getComment", { id: id, auhtor: name });
		},
		async deleteComment(comment_id, article_id) {
			if (this.user) {
				await this.$axios
					.$post(`/api/delete-comment`, {
						comment_id: comment_id,
						article_id: article_id
					})
					.then(async res => {
						Swal.fire({
							title: "تم حذف التعليق",
							icon: "success",
							showCloseButton: true
						});
						/** Update the store */
						this.$store.commit("getCurrentArticle", res);
						
						const articles = await this.$axios.$get("/api/posts");
						this.$store.dispatch("get_articles", articles);
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
		async deleteReply(comment_id, article_id, rep_po) {
			if (this.user) {
				await this.$axios
					.$post(`/api/delete-reply`, {
						comment_id: comment_id,
						article_id: article_id,
						reply_no: rep_po
					})
					.then(res => {
						Swal.fire({
							title: "تم حذف التعليق",
							icon: "success",
							showCloseButton: true
						});
						/** Update the store */
						this.$store.commit("getCurrentArticle", res);
					})
					.catch(err => {
						Swal.fire({
							title: err.message,
							icon: "error",
							showCloseButton: true
						});
					});
			}
		}
	}
};
</script>

<style lang="sass" scoped>
.actions div
	cursor: pointer !important
svg
	color: rgb(0, 0, 0) !important
	fill: rgb(0, 0, 0) !important
button
	margin: 0 !important
</style>