  <template>
	<b-container>
		<!-- End section -->
		<section class="d-flex flex-column align-items-center justify-content-center my-5">
			<h2 class="header text-center">تسجيل مستخدم</h2>
			<!-- Start form -->
			<b-form class="my-5 text-white text-center" @submit="onSubmit">
				<!-- Start Form group -->
				<b-form-group id="name-group" label="اسم العميل:" label-for="name">
					<b-form-input
						id="name"
						v-model="form.name"
						type="text"
						required
						autocomplete="off"
						placeholder="أدخل اسم العميل"
					></b-form-input>
				</b-form-group>
				<!-- End Form group -->

				<!-- Start Form group -->
				<b-form-group id="email-group" label="البريد الإلكتروني:" label-for="email">
					<b-form-input
						id="email"
						v-model="form.email"
						type="email"
						required
						placeholder="أدخل البريد الإلكتروني"
					></b-form-input>
				</b-form-group>
				<!-- End Form group -->

				<!-- Start Form group -->
				<b-form-group id="password-group" type="password" label="كلمة المرور:" label-for="password">
					<b-form-input
						id="password"
						v-model="form.password"
						required
						type="password"
						placeholder="أدخل كلمة المرور"
					></b-form-input>
				</b-form-group>
				<!-- End Form group -->

				<nuxt-link class="d-block text-white" to="/login">لديك حساب بالفعل؟</nuxt-link>
				<!-- End Form group -->

				<b-button type="submit" class="mt-5" variant="primary" size="lg">تسجيل</b-button>
			</b-form>
			<!-- Start form -->
		</section>
		<!-- End section -->
	</b-container>
</template>

<script>

export default {
	data() {
		return {
			status: "/api/register",
			form: {
				name: "",
				email: "",
				password: ""
			}
		};
	},
	head() {
		return {
			script: [{ src: "/js/sweatalert.js" }],
			title: "قواعد | تسجيل حساب"
		};
	},
	methods: {
		async onSubmit(evt) {
			evt.preventDefault();
			await this.$axios
				.$post(this.status, this.form)
				.then(res => {
					this.$cookies.set("user", res);
					this.$store.commit("EditUser", res);
				})
				.then(() => {
					Swal.fire({
						title: "مرحبا بك",
						icon: "success",
						text: "ابدأ التعلم اﻵن!",
						showCloseButton: true
					}).then(res => {
						this.$router.push("/grammer");
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
	}
};
</script>

<style lang="sass" scoped>
input
	max-width: 300px !important
</style>