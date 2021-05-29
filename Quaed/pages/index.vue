<template>
  <div>
    <!-- Start Welcome banner -->
    <section class="my-5">
      <b-container>
        <b-row>
          <!-- Start Right column -->
          <b-col sm="6" offset-md="1" offset-lg="2" class="text-white">
            <h2 class="header">قواعد</h2>
            <p>
              منصة عربية متخصصة في تعليم قواعد الإنجليزية.
              بخبرات معلمينا التي تزيد عن ال 25 عاماً في مجال تدريس اللغة الإنجليزية.
              نأخذ بيدك من الصفر إلى القمة في قواعد اللغة الانجليزية بإسلوب جذاب وسلس.
            </p>
          </b-col>
          <!-- End Right column -->

          <!-- Start Left column -->
          <b-col sm="6" md="5" lg="4">
            <div class="img text-center text-sm-left mt-3">
              <img src="~/assets/img/welcome svg.png" class="img-fluid my-auto" alt="Welcome" />
            </div>
          </b-col>
          <!-- End Left column -->
        </b-row>
      </b-container>
    </section>
    <!-- Start Welcome banner -->

    <!-- Strat features section -->
    <section>
      <b-container>
        <h2 class="header text-left">في إمكانك</h2>
        <b-row class="my-5">
          <b-col :key="index" v-for="(feat,index) in feats" sm="6" md="3">
            <div class="text-center">
              <img
                :src="require(`@/assets/img/feats/${feat.imgName}.svg`)"
                width="150"
                style="height: 100px"
                :alt="feat.name"
              />
              <p class="text-center text-white mt-2 image-caption">{{feat.name}}</p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <!-- End features section -->

    <!-- Strat our goals section -->
    <section>
      <b-container>
        <h2 class="header">أهدافنا</h2>
        <b-row>
          <b-col md="6">
            <ul class="custom-list">
              <li>
                <span>نشر ثقافة التعلم المرح في مجتمعنا العربي.</span>
              </li>
              <li>
                <span>مساعدة الطلاب لتحسين مستواهم في اللغة.</span>
              </li>
            </ul>
          </b-col>

          <b-col md="6">
            <ul class="custom-list">
              <li>
                <span>مساعدة الكل للتخلص من رهبتهم من القواعد.</span>
              </li>
              <li>
                <span>تكوين مرجع شامل لقواعد اللغة الإنجليزية.</span>
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <!-- End our goals section -->

    <!-- Strat sign up section -->
    <section class="login py-5 my-5" >
      <b-container class="text-center">
        <h2 class="header text-center">جاهز لتبدأ رحلتك؟</h2>
        <b-button class="mx-auto text-white" v-if="!user" to="/signup" exact variant="success" size="lg">سجل اﻵن</b-button>
        <b-button class="mx-auto text-white" v-else to="/grammer" exact variant="success" size="lg">ابدأ التعلم</b-button>
      </b-container>
    </section>
    <!-- End sign up section -->
  </div>
</template>

<script>

export default {
  data() {
    return {
      feats: [
        { imgName: "quiz", name: "حل تمارين" },
        { imgName: "video", name: "مشاهدة الشرح" },
        { imgName: "blog", name: "قراءة الدروس" },
        { imgName: "books", name: "تكوين قاموسك الخاص" }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  head() {
    return {
      title: "قواعد | الرئيسية"
    };
  }
};
</script>

<style scoped lang="sass">
.image-caption
  font-size: 17px !important

.login
  background-color: rgba(0, 00, 0, 0.9)
</style>
