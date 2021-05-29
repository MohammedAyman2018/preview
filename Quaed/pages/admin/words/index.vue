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
        :items="words"
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
            @click="getWord(row.item)"
            to="/admin/words/editWord"
            class="mr-md-1 text-whtite"
            v-if="!row.item.token"
          >تعديل</b-button>
        </template>
        <!-- End actions -->
      </b-table>
    </main>
    <!-- End Table -->

    <!-- Start Buttons -->
    <div class="text-center">
      <b-button
        to="/admin/words/addWord"
        class="mx-md-2 text-white"
        variant="primary"
        size="lg"
      >أضف كلمة</b-button>
      <b-button
        class="my-md-auto"
        variant="danger"
        @click="$bvModal.show('delete-modal')"
        size="lg"
        v-if="user.superAdmin"
        id="show-btn"
      >حذف جميع الكلمات</b-button>
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
      <template v-slot:modal-title>
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
  components: {
    AdminNav
  },
  computed: {
    user() {
      return this.$store.state.user
    }
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
      words: null,
      sortBy: "isAdmin",
      sortDesc: false,
      fields: [
        { key: "en_word", sortable: true },
        { key: "ar_word", sortable: true },
        { key: "actions" }
      ]
    };
  },
  async mounted() {
    let res = await this.$axios.$get("/api/words");
    this.length = res.length;
    this.words = res;
    this.isBusy = false;
    return;
  },
  methods: {
    getWord(item) {
      this.$store.commit("getEditWord", item);
    },
    async syncUsers() {
      let res = await this.$axios.$get("/api/words");
      return (this.words = res);
    },
    async deleteOne(item) {
      await this.$axios.$delete(`/api/words/${item.en_word}`).then(() => {
        Swal.fire({
          title: " تم الحذف بنجاح",
          icon: "success",
          showCloseButton: true
        });
      });
      this.syncUsers();
    },
    async deleteAll() {
      await this.$axios.$delete("/api/words").then(r => {
        Swal.fire({
          title: " تم الحذف بنجاح",
          icon: "success",
          showCloseButton: true
        });
      });
    }
  },head() {
		return {
			script: [{ src: "/js/sweatalert.js" }],
			title: "قواعد | الكلمات "
		};
	},
};
</script>