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
            Cores:
          </div>
          <q-list dense class="q-pt-sm">
            <q-item>
              <q-item-section>
                <div class="row q-gutter-sm justify-start">
                  <q-btn
                    dense
                    class="colorFilter"
                    color="black"
                    @click="filterCalcados('Preta')"
                  ></q-btn>
                  <q-btn
                    dense
                    class="colorFilter"
                    color="orange"
                    @click="filterCalcados('Laranja')"
                  ></q-btn>
                  <q-btn
                    dense
                    class="colorFilter"
                    color="yellow"
                    @click="filterCalcados('Amarela')"
                  ></q-btn>
                  <q-btn
                    dense
                    class="colorFilter"
                    color="grey"
                    @click="filterCalcados('Cinza')"
                  ></q-btn>
                  <q-btn
                    dense
                    class="colorFilter"
                    color="blue"
                    @click="filterCalcados('Azul')"
                  ></q-btn>
                  <q-btn
                    dense
                    class="colorFilter"
                    color="pink"
                    @click="filterCalcados('Rosa')"
                  ></q-btn>
                  <q-btn
                    dense
                    class="colorFilter"
                    style="background: #f5f5dc"
                    @click="filterCalcados('Bege')"
                  ></q-btn>
                </div>
              </q-item-section>
            </q-item>
            <q-separator spaced inset />
            <q-item>
              <q-item-section>
                <q-btn
                  dense
                  label="Todas as Cores"
                  class="full-width"
                  no-caps
                  :color="darkModeActive ? 'white' : 'dark'"
                  :text-color="darkModeActive ? 'dark' : 'white'"
                  @click="filterCalcados('todasCores')"
                ></q-btn>
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
                @update:model-value="orderCalcados(orderBy)"
              />
            </div>
          </div>
        </q-item>
      </q-list>
      <div class="col-12 q-pl-md q-pt-lg q-gutter-md row justify-start">
        <q-card
          v-for="calcado in calcadosFiltered"
          :key="calcado.id"
          class="productCard row justify-center"
          :class="darkModeActive ? 'bg-white' : 'bg-white'"
        >
          <q-img :src="calcado.image" fit="contain" class="productImage" />
          <q-card-actions>
            <div class="q-gutter-y-md">
              <div class="row full-width items-center justify-center">
                <div class="text-uppercase col-12 row justify-center">
                  <span
                    class="text-center"
                    :style="darkModeActive ? 'color: #000' : 'color: #000'"
                    >{{ calcado.name }}</span
                  >
                </div>
                <div
                  class="text-h6 text-weight-bolder text-center productPrice q-gutter-x-md"
                >
                  <span
                    class="normalPrice"
                    :class="
                      calcado.specialPrice
                        ? 'text-strike text-italic text-subtitle1'
                        : ''
                    "
                  >
                    R$ {{ calcado.price }}
                  </span>
                  <span class="specialPrice" v-if="calcado.specialPrice">
                    R$ {{ calcado.specialPrice }}
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
  name: "CalcadosPage",

  data() {
    return {
      calcadosList: {
        type: Array,
      },
      calcadosFiltered: {
        type: Array,
      },
      colorFilter: "todasCores",
    };
  },

  methods: {
    getCalcados() {
      this.$api
        .get("categories/3")
        .then((response) => {
          this.calcadosList = response.data.items;
          this.calcadosFiltered = response.data.items;
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
    orderCalcados(orderBy) {
      if (orderBy.value == "precoCrescente") {
        if (this.calcadosFiltered.specialPrice) {
          this.calcadosFiltered.sort((a, b) => {
            return a.specialPrice - b.specialPrice;
          });
        } else {
          if (this.calcadosFiltered.specialPrice) {
            this.calcadosFiltered.sort((a, b) => {
              return a.specialPrice - b.specialPrice;
            });
          } else {
            this.calcadosFiltered.sort((a, b) => {
              return a.price - b.price;
            });
          }
        }
      } else {
        if (this.calcadosFiltered.specialPrice) {
          this.calcadosFiltered.sort((a, b) => {
            return b.specialPrice - a.specialPrice;
          });
        } else {
          this.calcadosFiltered.sort((a, b) => {
            return b.price - a.price;
          });
        }
      }
    },
    filterCalcados(color) {
      if (color == "todasCores") {
        this.calcadosFiltered = this.calcadosList;
      } else {
        this.calcadosFiltered = this.calcadosList.filter(
          (calcados) => calcados.filter[0].color == color
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
    this.getCalcados();
  },

  setup() {
    return {
      current: ref(3),
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
.colorFilter {
  width: 48px;
  height: 24px;
  transition: all 0.5s ease;
  border-radius: 5px;
}
.colorFilter:hover {
  transform: scale(1.05);
}
.productPrice {
  color: $text-bold;
}
</style>
