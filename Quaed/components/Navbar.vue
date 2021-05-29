<template>
  <div>
    <b-navbar toggleable="md">
      <b-container>
        <b-navbar-brand class="ml-auto" to="/">
          <img width="60px" class="img-fluid" src="~/assets/img/logo.png" alt="قواعد" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <!-- Strat collapse -->

        <b-collapse id="nav-collapse" is-nav>
          <!-- Start links -->
          <b-navbar-nav class="mr-auto text-center">
            <b-nav-item to="/profile" exact active-class="active" v-if="user">{{user.name}}</b-nav-item>
            <b-nav-item to="/" exact active-class="active">الرئيسية</b-nav-item>
            <b-nav-item to="/grammer" exact active-class="active">القواعد</b-nav-item>
            <b-nav-item to="/words" exact active-class="active">الكلمات</b-nav-item>
            <!-- <b-nav-item to="/contact" exact active-class="active">تواصل معنا</b-nav-item> -->
            <b-nav-item
              to="/admin/"
              exact
              v-if="user && user.token"
              active-class="active"
            >لوحة التحكم</b-nav-item>
            <b-button
              to="/login"
              exact
              active-class="active"
              class="text-white text-center"
              v-if="!user"
              squared
            >سجل دخولك</b-button>
            <b-button
              @click="logOut"
              exact
              active-class="active"
              variant="danger"
              class="text-centertext-white"
              v-if="user"
              squared
            >سجل خروج</b-button>
          </b-navbar-nav>
          <!-- End links -->
        </b-collapse>
        <!-- End collapse -->
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logOut() {
      this.$cookies.remove('user');
      this.$store.commit("logout");
      Swal.fire({
        title: "تم تسجيل الخروج",
        icon: "success",
        showCloseButton: true
      }).then(res => {
        this.$router.push('/')
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
nav
  background-color: darken($light-green, 10%)
  ul.navbar-nav
    button
      text-align: center !important
    li.nav-item
      text-align: center !important
      a.nav-link
        text-align: center !important
        color: white
        transition: all 0.2s ease
        &.active
          color: white
          text-decoration: underline
          &:hover
            color: black
</style>
