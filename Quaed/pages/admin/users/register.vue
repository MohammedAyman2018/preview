  <template>
	<b-container>
		<AdminNav />
		<!-- End section -->
		<section class="d-flex justify-content-center flex-column algin-items-center my-5">
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
					<b-form-input id="password" v-model="form.password" required placeholder="أدخل كلمة المرور"></b-form-input>
				</b-form-group>
				<!-- End Form group -->

				<!-- start Form group -->
				<b-form-checkbox
					id="checkbox-1"
					v-model="status"
					name="checkbox-1"
					value="/api/register/admin"
					size="lg"
					unchecked-value="/api/register"
				>سجل هذا العميل كأدمن</b-form-checkbox>
				<!-- End Form group -->
				<b-button type="submit" variant="primary" size="lg" class="my-5">تسجيل</b-button>
			</b-form>
			<!-- Start form -->
		</section>
		<!-- End section -->
	</b-container>
</template>

<script>
import AdminNav from "~/components/AdminNav";

export default {
	components: {
		AdminNav
	},
	async validate({ store }) {
		// await operations
		if (!store.state.user) return false;
		else if (!store.state.user.token) return false;
		return true;
	},
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
	methods: {
		async onSubmit(evt) {
			evt.preventDefault();
			await this.$axios
				.$post(this.status, this.form)
				.then(res => {
					this.$store.commit("EditUser", res);
				})
				.then(() => {
					Swal.fire({
						title: " تم إضافة عميل بنجاح",
						icon: "success",
						showCloseButton: true
					}).then(res => {
						this.$router.push("/admin/users");
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
			title: "قواعد | اضافة مستخدم "
		};
	},
};
</script>