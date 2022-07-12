<template>
  <q-page>
    <div v-if="this.$route.path == '/'" class="row paginaInicial">
      <div class="col-md-2 col-sm-3 col-xs-11 bg-grey" style="height: 45vh">
        <q-list class="sideMenu">
          <q-item clickable v-ripple to="/">
            <q-item-section>Página Inicial</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="camisetas">
            <q-item-section>Camisetas</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="calcas">
            <q-item-section>Calças</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="calcados">
            <q-item-section>Calcados</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="contato">
            <q-item-section>Contato</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/jasdkjsaj">
            <q-item-section>Forçar Erro 404</q-item-section>
          </q-item>
        </q-list>
      </div>
      <div
        class="col-md-10 col-sm-9 col-xs-11 q-pl-md row justify-around groupedContent"
      >
        <div class="col-12 randomContent bg-grey-8"></div>
        <div class="col-12 randomContent self-end">
          <span>
            <p class="text-h5">Seja bem-vindo!</p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </span>
        </div>
      </div>
    </div>
    <router-view v-if="this.$route.path != '/'" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
<style lang="scss" scoped>
.sideMenu {
  height: 100%;
}
.randomContent {
  height: 48%;
}
@media (max-width: $breakpoint-md-min) {
  .paginaInicial {
    justify-content: center;
  }
  .groupedContent {
    padding-left: 0;
  }
}
</style>
