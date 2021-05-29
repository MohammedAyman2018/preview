<template>
  <div>
    <b-pagination
      :v-model="model"
      :total-rows="totalRows"
      :per-page="perPage"
      :aria-controls="ariaControls"
    ></b-pagination>

    <span class="mx-3">Current Page: {{ model }}</span>
  </div>
</template>

<script>
export default {
  props: ["model", "totalRows", "perPage", "ariaControls"]
};
</script>