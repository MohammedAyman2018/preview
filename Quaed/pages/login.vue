<template>
	<b-container>
		<!-- End section -->
		<section class="text-white flex-column algin-items-center my-5">
			<h2 class="header text-center">تسجيل الدخول</h2>
			<!-- Start form -->
			<b-form
				class="my-5 text-center d-flex flex-column align-items-center justify-content-center"
				@submit="onSubmit"
			>
				<!-- Start Form group -->
				<b-form-group id="email-group" label="البريد الإلكتروني:" label-for="email">
					<b-form-input
						id="email"
						v-model="form.email"
						autocomplete="email"
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
						autocomplete="current-password"
						type="password"
						v-model="form.password"
						required
						placeholder="أدخل كلمة المرور"
					></b-form-input>
				</b-form-group>
				<nuxt-link class="d-block text-white" to="/signup">ليس لديك حساب؟</nuxt-link>
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
			form: {
				email: "",
				password: ""
			}
		};
	},
	head() {
		return {
			script: [{ src: "/js/sweatalert.js" }],
			title: "قواعد | تسجيل دخول"
		};
	},
	methods: {
		async onSubmit(evt) {
			evt.preventDefault();
			await this.$axios
				.$post("/api/login", this.form)
				.then(res => {
					this.$cookies.set("user", res);
					this.$store.commit("EditUser", res);
				})
				.then(() => {
					Swal.fire({
						title: " مرحبا بك مرة أخرى!",
						icon: "success",
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