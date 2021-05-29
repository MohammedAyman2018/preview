<template>
  <div>
    <b-container>
      <AdminNav />
      <main class="my-5">
        <b-row>
          <b-col md="4">
            <b-card
              bg-variant="primary"
              text-variant="white"
              header="عدد العملاء"
              class="text-center my-2"
            >
              <b-card-text>{{info.users}}</b-card-text>
            </b-card>
          </b-col>
          <b-col md="4">
            <b-card
              bg-variant="secondary"
              text-variant="white"
              header="عدد المقالات"
              class="text-center my-2"
            >
              <b-card-text>{{info.posts}}</b-card-text>
            </b-card>
          </b-col>
          <b-col md="4">
            <b-card
              bg-variant="dark"
              header="عدد الكلمات "
              text-variant="white"
              class="text-center my-2"
            >
              <b-card-text>{{info.words}}</b-card-text>
            </b-card>
          </b-col>
        </b-row>
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
  async asyncData({ $axios }) {
    let result = {};
    [result.posts,result.users, result.words] = await Promise.all([
      await $axios.$get("/api/posts/count"),
      await $axios.$get("/api/users/count"),
      await $axios.$get("/api/words/count"),
    ])
    return { info: result };
  },
  async validate({ store }) {
    if (!store.state.user) return false;
    else if (!store.state.user.token) return false;
    return true;
  }
};
</script>