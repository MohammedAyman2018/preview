 <template>
	<div>
		<b-container>
			<AdminNav />
			<main class="my-5">
				<b-form class="text-center" @submit="onSubmit">
					<!-- Start form-group -->
					<b-form-group id="input-en_word" label="ادخل الكملة بالانجليزية:" label-for="en_word">
						<b-form-input
							id="en_word"
							v-model="form.en_word"
							required
							placeholder="ادخل الكلمة بالانجليزية"
						></b-form-input>
					</b-form-group>
					<!-- End form-group -->

					<!-- Start form-group -->
					<b-form-group id="input-en_mean" label="ادخل المعنى بالانجليزية:" label-for="en_mean">
						<b-form-textarea
							id="en_mean"
							v-model="form.en_mean"
							placeholder="ادخل المعنى بالانجليزية"
							rows="3"
							required
						></b-form-textarea>
					</b-form-group>
					<!-- End form-group -->

					<!-- Start form-group -->
					<b-form-group id="input-ar_word" label="ادخل الكلمة بالعربي:" label-for="ar_word">
						<b-form-input id="ar_word" v-model="form.ar_word" required placeholder="ادخل الكلمة بالعربي"></b-form-input>
					</b-form-group>
					<!-- End form-group -->

					<!-- Start form-group -->

					<b-form-group id="input-ar_mean" label="ادخل المعنى بالعربي:" label-for="ar_mean">
						<b-form-textarea
							id="ar_mean"
							v-model="form.ar_mean"
							placeholder="ادخل المعنى بالعربي"
							rows="3"
							required
						></b-form-textarea>
					</b-form-group>
					<!-- End form-group -->

					<b-button type="submit" variant="primary">Submit</b-button>
				</b-form>
			</main>
		</b-container>
	</div>
</template>

<script>
import AdminNav from "~/components/AdminNav";
export default {
	components: {
		AdminNav
	},
	async validate({ store }) {
		if (!store.state.user) return false;
		else if (!store.state.user.token) return false;
		return true;
	},
	data() {
		return {
			form: {
				en_word: null,
				en_mean: null,
				ar_word: null,
				ar_mean: null
			}
		};
	},
	computed: {
		word() {
			return this.$store.state.word;
		}
	},
	mounted() {
		this.form.en_word = this.word.en_word;
		this.form.en_mean = this.word.en_mean;
		this.form.ar_word = this.word.ar_word;
		this.form.ar_mean = this.word.ar_mean;
	},
	methods: {
		async onSubmit(evt) {
			evt.preventDefault();
			await this.$axios
				.$put(`/api/words/${this.word.en_word}`, this.form)
				.then(() => {
					Swal.fire({
						title: " تم التعديل بنجاح",
						icon: "success",
						showCloseButton: true
					}).then(res => {
						/** RETURN TO ADMIN PANEL MAIN */
						this.$router.push("/admin/words");
					});
				})
				.catch(err => {
					Swal.fire({
						title: err.message,
						icon: "error",
						showCloseButton: true
					});
				});
		}
	},head() {
		return {
			script: [{ src: "/js/sweatalert.js" }],
			title: "قواعد | تعديل كلمة "
		};
	},
};
</script>
 
 
