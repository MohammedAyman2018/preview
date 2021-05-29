<template>
  <b-container>
    <AdminNav />
    <main class="my-5">
      <!-- Start Table -->

      <b-table
        striped
        hover
        id="users-table"
        :current-page="currentPage"
        :per-page="perPage"
        :busy="isBusy"
        :items="articles"
        class="text-white"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        responsive="sm"
      >
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <strong>جاري التحميل...</strong>
            <b-spinner class="align-middle"></b-spinner>
          </div>
        </template>
        <!-- Start Actions -->
        <template v-slot:cell(actions)="row">
          <b-button
            size="sm"
            variant="danger"
            @click="deleteOne(row.item)"
            class="mr-md-1 text-whtite mb-2 mb-md-auto"
            v-if="!row.item.token && user.superAdmin"
            
          >حذف</b-button>
          <b-button
            size="sm"
            variant="warning"
            @click="getArticle(row.item)"
            to="/admin/articles/editArticle"
            class="mr-md-1 text-whtite"
            v-if="!row.item.token && user.name==row.item.author"
          >تعديل</b-button>
        </template>
        <!-- End actions -->
      </b-table>
    </main>
    <!-- End Table -->

    <!-- Start Buttons -->
    <div class="text-center">
      <b-button
        to="/admin/articles/addArticle"
        class="mx-md-2 text-white"
        variant="primary"
        size="lg"
      >أضف مقال</b-button>
      <b-button
        class="my-md-auto"
        variant="danger"
        @click="$bvModal.show('delete-modal')"
        size="lg"
        v-if="user.superAdmin"
        
        id="show-btn"
      >حذف جميع المقالات</b-button>
    </div>
    <!-- End Buttons -->

    <!-- Start pagenation -->
    <div class="mt-5 d-md-flex justify-content-between" style="direction: ltr">
      <b-pagination
        v-model="currentPage"
        align="center"
        :total-rows="length"
        :per-page="perPage"
        aria-controls="users-table"
      ></b-pagination>

      <p class="mt-3">Current Page: {{ currentPage }}</p>
    </div>
    <!-- End pagenation -->

    <b-modal id="delete-modal" hide-header-close hide-footer>
      <template v-slot:modal-titlegetArticle>
        <p class="text-dark">هل حقاً تريد حذف الكل؟</p>
      </template>
      <div class="d-block text-center">
        <b-button variant="danger" size="lg" @click="deleteAll">نعم</b-button>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('delete-modal')">اغلاق</b-button>
    </b-modal>
  </b-container>
</template>

<script>
import AdminNav from "~/components/AdminNav";
export default {
  computed: {
    user() {
      return this.$store.state.user
    }
  },
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
      isBusy: true,
      currentPage: 1,
      perPage: 10,
      length: 0,
      articles: null,
      sortBy: "isAdmin",
      sortDesc: false,
      fields: [
        { key: "title", sortable: true },
        { key: "author", sortable: true },
        { key: "created_at", sortable: true },
        { key: "actions" }
      ]
    };
  },
  async mounted() {
    let res = await this.$axios.$get("/api/posts");
    res.forEach(post => {
      post.created_at = `${new Date(post.created_at).getDate()} - ${new Date(
        post.created_at
      ).getMonth()+1} - ${new Date(post.created_at).getFullYear()}`;
    });
    this.length = res.length;
    this.articles = res;
    this.isBusy = false;
    return;
  },
  methods: {
    async syncArticles() {
      let res = await this.$axios.$get("/api/posts");

      return (this.articles = res);
    },
    getArticle(item) {
      this.$store.commit("getEditArticle", item);
    },
    async deleteOne(item) {
      await this.$axios.$delete(`/api/posts/${item.title}`).then(() => {
        Swal.fire({
          title: " تم الحذف بنجاح",
          icon: "success",
          showCloseButton: true
        });
      });
      this.syncArticles();
    },
    async deleteAll() {
      await this.$axios.$delete("/api/posts");
    }
  },
  head() {
		return {
			script: [{ src: "/js/sweatalert.js" }],
			title: "قواعد | المقالات"
		};
	},
};
</script>