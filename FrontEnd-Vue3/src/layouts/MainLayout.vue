<template>
  <q-ajax-bar />
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated class="header" height-hint="98">
      <q-toolbar class="row items-center toolbar q-gutter-x-sm">
        <q-btn flat icon="login" label="Acesse sua Conta" no-caps dense></q-btn>
        <span>ou</span>
        <q-btn flat label="Cadastre-se" no-caps dense></q-btn>
      </q-toolbar>

      <div class="header-content row items-center justify-between q-px-lg">
        <q-toolbar class="bg-white">
          <router-link to="/">
            <q-img
              class="q-ma-md cursor-pointer"
              src="/media/logo.png"
              style="width: 156px; height: 65px"
              fit="contain"
            />
          </router-link>
          <q-space />
          <q-input
            bottom-slots
            v-model="searchInput"
            label="Pesquisar"
            filled
            class="searchBar q-mr-xl self-end"
            :bg-color="darkModeActive ? 'grey' : 'grey'"
            :label-color="darkModeActive ? 'dark' : 'dark'"
            :color="darkModeActive ? 'dark' : 'dark'"
          >
            <template v-slot:append>
              <q-btn icon-right="search" flat color="primary" />
            </template>
          </q-input>
          <q-btn
            icon-right="search"
            dense
            flat
            color="primary"
            class="searchButton"
            size="lg"
          />
          <q-btn
            icon="shopping_cart"
            flat
            size="xl"
            dense
            :color="darkModeActive ? 'dark' : 'dark'"
            class="self-center"
          >
            <q-tooltip>Carrinho de Compras</q-tooltip>
            <q-menu
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[0, 20]"
            >
              <q-list style="min-width: 300px">
                <q-item
                  ><span class="text-weight-bolder text-h6"
                    >Exemplo Carrinho</span
                  ></q-item
                >
                <q-separator inset spaced />
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar rounded>
                      <img src="media/pants-1.jpg" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>List item</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar rounded>
                      <img src="media/shirt-1.jpg" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>List item</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar rounded>
                      <img src="media/shoes-4.jpg" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>List item</q-item-section>
                </q-item>
                <q-separator inset spaced />
                <q-item>
                  <q-item-section class="text-bold">
                    Total: R$137,80
                  </q-item-section>
                  <q-item-section
                    ><q-btn icon-right="shopping_cart_checkout" color="primary">
                      <q-tooltip>Finalizar Compra</q-tooltip></q-btn
                    >
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu></q-btn
          >
        </q-toolbar>
      </div>

      <q-tabs class="q-pl-lg bg-primary row" align="left">
        <q-route-tab to="/" label="Página Inicial" />
        <q-route-tab
          v-for="categorie in categoriesList"
          :key="categorie.id"
          :to="categorie.path"
          :label="categorie.name"
        />
        <q-route-tab to="/contato" label="Contato" />
        <q-space />
        <q-toggle
          v-model="isDarkModeActive"
          checked-icon="dark_mode"
          color="dark"
          unchecked-icon="light_mode"
          class="q-pr-lg"
          @update:model-value="darkMode(isDarkModeActive)"
          ><q-tooltip>Modo escuro.</q-tooltip></q-toggle
        >
      </q-tabs>
    </q-header>
    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar></q-footer
    >
    <q-page-container>
      <div class="row q-pt-sm q-pr-xl q-pb-xl q-pl-xl">
        <div class="col-12">
          <Breadcrumb class="q-py-lg q-pl-sm" />
        </div>
        <div class="col-12">
          <router-view />
        </div>
      </div>
      <q-page-scroller
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
      >
        <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import Breadcrumb from "src/components/Breadcrumb.vue";
import { Notify } from "quasar";

export default defineComponent({
  name: "MainLayout",

  components: {
    Breadcrumb,
  },

  data() {
    return {
      categoriesList: [],
    };
  },

  methods: {
    darkMode(val) {
      this.$q.dark.set(val);
    },
  },

  computed: {
    darkModeActive: function () {
      return this.$q.dark.isActive;
    },
  },

  created() {
    this.$api({
      method: "get",
      url: "categories/list",
    })
      .then((response) => {
        this.categoriesList = response.data.items;
      })
      .catch(() => {
        Notify.create({
          color: "negative",
          position: "top",
          message:
            "O carregamento falhou. Verifique se a API está rodando no seguinte endereço: http://localhost:8888/api/V1/. E depois tente novamente.",
          icon: "report_problem",
        });
      });
  },

  setup() {
    return {
      isDarkModeActive: ref(false),
      searchInput: ref(null),
    };
  },
});
</script>
<style lang="scss" scoped>
a {
  text-decoration: none !important;
}
.header {
  background: $header;
}
.header-content {
  height: 115px;
  background: #fff;
}
a {
  text-decoration: underline;
}
.menu {
  height: 54px;
  background: $primary;
}
@media (min-width: $breakpoint-xl-min) {
  .toolbar {
    justify-content: end;
  }
  .menu {
    padding-left: 20%;
  }
  .searchBar {
    display: block;
    width: 20%;
  }
  .searchButton {
    display: none;
  }
}
@media (max-width: $breakpoint-xl-min) {
  .toolbar {
    justify-content: center;
  }
  .menu {
    padding-left: 0;
  }
  .searchButton {
    display: none;
  }
}
@media (max-width: $breakpoint-md-min) {
  .searchBar {
    display: none;
  }
  .searchButton {
    display: block;
  }
}
</style>
