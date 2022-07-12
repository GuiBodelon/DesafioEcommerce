<template>
  <q-breadcrumbs>
    <template v-slot:separator
      ><q-icon size="1.5em" name="chevron_right"
    /></template>
    <q-breadcrumbs-el
      v-if="this.$route.path != '/'"
      label="Página Inicial"
      to="/"
      class="text-secondary"
    />
    <q-breadcrumbs-el
      :label="routeName"
      :to="routePath"
      class="text-primary text-bold"
    />
  </q-breadcrumbs>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BreadCrumbs",

  data() {
    return {
      routePath: "",
      routeName: "",
      exactRoute: "",
    };
  },

  watch: {
    $route() {
      this.getRoute();
    },
  },

  mounted() {
    this.getRoute();
  },

  methods: {
    getRoute() {
      this.routeName = this.$route.name;
      this.routePath = this.$route.fullPath;
    },
  },
});
</script>
