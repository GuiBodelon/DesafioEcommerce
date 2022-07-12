<template>
  <q-page class="row items-start">
    <div class="col-md-2 col-sm-4 col-xs-12 q-mb-xl">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-uppercase text-primary text-weight-bolder">
            Filtre por
          </div>
          <div
            class="text-h6 text-uppercase text-weight-bolder q-pt-sm"
            :style="darkModeActive ? 'color: #fff' : 'color: #1e2b50'"
          >
            Categorias:
          </div>
          <q-list dense class="q-pt-sm">
            <q-item clickable v-ripple to="camisetas">
              <q-item-section>Camisetas</q-item-section>
            </q-item>
            <q-item clickable v-ripple to="calcas">
              <q-item-section>Calças</q-item-section>
            </q-item>
            <q-item clickable v-ripple to="calcados">
              <q-item-section>Calçados</q-item-section>
            </q-item>
          </q-list>
          <div
            class="text-h6 text-uppercase text-weight-bolder q-pt-sm"
            :style="darkModeActive ? 'color: #fff' : 'color: #1e2b50'"
          >
            Gêneros:
          </div>
          <q-list dense class="q-pt-sm">
            <q-item>
              <q-item-section>
                <div class="row q-gutter-sm">
                  <q-option-group
                    v-model="genderFilter"
                    :options="optionsGenderFilter"
                    color="primary"
                    @update:model-value="filterCalcas(genderFilter)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-10 col-sm-8 col-xs-11 row">
      <div class="col-12 q-pl-md row text-h5 text-primary">
        {{ this.$route.name }}
      </div>
      <q-list class="col-12">
        <q-separator color="col-12" inset />
        <q-item>
          <div class="col-12 row items-center justify-around">
            <div class="col-md-8 col-sm-4">
              <q-btn
                icon="apps"
                flat
                dense
                rounded
                size="lg"
                color="primary"
                class="cursor-pointer xs-hide"
              />
              <q-btn
                icon="list"
                flat
                dense
                rounded
                size="lg"
                color="secondary"
                class="cursor-pointer xs-hide"
              />
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
              <q-select
                filled
                v-model="orderBy"
                :options="orderByOptions"
                label="Ordernar Por"
                class="selectOrderBy"
                @update:model-value="orderCalcas(orderBy)"
              />
            </div>
          </div>
        </q-item>
      </q-list>
      <div class="col-12 q-pl-md q-pt-lg q-gutter-md row justify-start">
        <q-card
          v-for="calca in calcasFiltered"
          :key="calca.id"
          class="productCard row justify-center"
          :class="darkModeActive ? 'bg-white' : 'bg-white'"
        >
          <q-img :src="calca.image" fit="contain" class="productImage" />
          <q-card-actions>
            <div class="q-gutter-y-md">
              <div class="row full-width items-center justify-center">
                <div class="text-uppercase col-12 row justify-center">
                  <span
                    class="text-center"
                    :style="darkModeActive ? 'color: #000' : 'color: #000'"
                    >{{ calca.name }}</span
                  >
                </div>
                <div
                  class="text-h6 text-weight-bolder text-center productPrice q-gutter-x-md"
                >
                  <span
                    class="normalPrice"
                    :class="
                      calca.specialPrice
                        ? 'text-strike text-italic text-subtitle1'
                        : ''
                    "
                  >
                    R$ {{ calca.price }}
                  </span>
                  <span class="specialPrice" v-if="calca.specialPrice">
                    R$ {{ calca.specialPrice }}
                  </span>
                </div>
                <div class="col-12 row justify-center">
                  <q-btn
                    color="secondary"
                    class="q-my-sm"
                    label="Comprar"
                    style="width: 250px"
                  />
                </div>
              </div>
            </div>
          </q-card-actions>
        </q-card>
        <div class="col-12 row justify-center q-pt-xl">
          <q-pagination v-model="current" :max="5" direction-links />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Notify } from "quasar";

export default defineComponent({
  name: "CalcasPage",

  data() {
    return {
      calcasList: {
        type: Array,
      },
      calcasFiltered: {
        type: Array,
      },
    };
  },

  methods: {
    getCalcas() {
      this.$api
        .get("categories/2")
        .then((response) => {
          this.calcasList = response.data.items;
          this.calcasFiltered = response.data.items;
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
    orderCalcas(orderBy) {
      if (orderBy.value == "precoCrescente") {
        this.calcasFiltered.sort((a, b) => {
          return a.specialPrice - b.specialPrice;
        });
      } else {
        this.calcasFiltered.sort((a, b) => {
          return b.specialPrice - a.specialPrice;
        });
      }
    },
    filterCalcas(gender) {
      if (gender == "todosGeneros") {
        this.calcasFiltered = this.calcasList;
      } else {
        this.calcasFiltered = this.calcasList.filter(
          (calca) => calca.filter[0].gender == gender
        );
      }
    },
  },

  computed: {
    darkModeActive: function () {
      return this.$q.dark.isActive;
    },
  },

  mounted() {
    this.getCalcas();
  },

  setup() {
    return {
      current: ref(3),
      genderFilter: ref("todosGeneros"),
      optionsGenderFilter: [
        {
          label: "Todos os Gêneros",
          value: "todosGeneros",
        },
        {
          label: "Masculino",
          value: "Masculina",
        },
        {
          label: "Feminino",
          value: "Feminina",
        },
      ],
      orderBy: ref(null),
      orderByOptions: [
        { label: "Preço Crescente", value: "precoCrescente" },
        { label: "Presço Decrescente", value: "precoDecrescente" },
      ],
    };
  },
});
</script>
<style lang="scss" scoped>
.productCard {
  width: 310px;
}
.productImage {
  height: 150px;
}
@media (max-width: $breakpoint-sm-min) {
  .productCard {
    min-width: 300px;
  }
  .productImage {
    min-height: 80px;
    min-width: 50px;
  }
}
@media (min-width: $breakpoint-md-min) {
  .productCard {
    min-width: 200px;
  }
  .productImage {
    min-height: 130px;
  }
}
@media (min-width: $breakpoint-lg-min) {
  .productCard {
    min-width: 236px;
  }
  .productImage {
    min-height: 250px;
  }
}
@media (min-width: $breakpoint-xl-min) {
  .productCard {
    max-width: 23.5%;
  }
}
@media (min-width: 1880px) {
  .productCard {
    min-width: 23.9%;
  }
}
.productPrice {
  color: $text-bold;
}
</style>
