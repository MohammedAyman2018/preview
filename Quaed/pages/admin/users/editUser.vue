  <template>
  <b-container>
    <AdminNav />
    <!-- End section -->
    <section class="d-flex justify-content-center flex-column algin-items-center my-5">
      <h2 class="header text-center">تسجيل مستخدم</h2>
      <!-- Start form -->
      <b-form class="my-5 text-center" @submit="onSubmit">
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

        <!-- start Form group -->
        <b-form-checkbox
          id="checkbox-1"
          v-model="form.admin"
          name="checkbox-1"
          :value="true"
          size="lg"
          unchecked-value="false"
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
  async validate({ store }) {
    if (!store.state.user) return false;
    else if (!store.state.user.token) return false;
    return true;
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        admin: false
      }
    };
  },
  mounted() {
    this.form.name = this.$store.state.editUser.name;
    this.form.email = this.$store.state.editUser.email;
    this.form.password = this.$store.state.editUser.password;
  },
  components: {
    AdminNav
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      await this.$axios
        .$put(`/api/users/${this.$store.state.editUser.email}`, this.form)
        .then(res => {
          this.$store.commit("getEditUser", res);
        })
        .then(() => {
          Swal.fire({
            title: " تم التعديل بنجاح",
            icon: "success",
            showCloseButton: true
          });
        })
        .catch(err => {
          Swal.fire({
            title: err.message,
            icon: "error",
            showCloseButton: true
          })
        });
    }
  },head() {
		return {
			script: [{ src: "/js/sweatalert.js" }],
			title: "قواعد | تعديل مستخدم"
		};
	},
};
</script>