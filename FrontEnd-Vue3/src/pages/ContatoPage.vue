<template>
  <div class="row">
    <div class="formContent col-md-6 col-sm-12 row items-start q-pa-xl">
      <div class="text-h4 text-weight-bolder text-white col-md-12 q-mb-md">
        Entre em contato!
        <div class="lineDecoration q-mt-md"></div>
      </div>
      <div class="col-md-8 col-sm-10">
        <q-form
          @submit="onSubmitContactForm"
          @reset="onResetContactForm"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="name"
            label="Seu nome *"
            hint="Nome e Sobrenome"
            lazy-rules
            bg-color="white"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Por favor, digite alguma coisa',
            ]"
          />

          <q-input
            filled
            type="email"
            v-model="email"
            label="Seu E-mail *"
            lazy-rules
            bg-color="white"
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Por favor digite seu e-mail',
            ]"
          />
          <q-input
            v-model="message"
            filled
            clearable
            type="textarea"
            color="red-12"
            bg-color="white"
          />

          <div>
            <q-btn label="Enviar" type="submit" color="primary" />
            <q-btn
              label="Limpar"
              type="reset"
              color="white"
              flat
              class="q-ml-sm"
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Por favor digite algo',
              ]"
            />
          </div>
        </q-form>
      </div>
    </div>
    <div class="col-md-6 col-sm-12 bg-grey row items-center justify-center">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.54559639118!2d-46.673373184406344!3d-23.584758168343257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c8cd5702de2d%3A0xe2c327cf0bc2f68c!2sWebjump%20Design%20em%20Inform%C3%A1tica!5e0!3m2!1spt-BR!2sbr!4v1655471642744!5m2!1spt-BR!2sbr"
        class="map"
        style="border: 0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "ContatoPage",

  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const email = ref(null);
    const message = ref(null);

    return {
      name,
      email,
      message,

      onSubmitContactForm() {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message:
            "Mensagem enviada com sucesso! Muito obrigado por entrar em contato conosco",
        });
      },

      onResetContactForm() {
        name.value = null;
        email.value = null;
        message.value = null;
      },
    };
  },
});
</script>
<style lang="scss" scoped>
.formContent {
  width: "500";
  height: "350";
  background: #292e32;
}
.lineDecoration {
  height: 6px;
  width: 70px;
  background: $primary;
}
.map {
  width: 600px;
  height: 450px;
}
@media (max-width: $breakpoint-md-min) {
  .map {
    width: 407px;
    height: 250px;
  }
}
</style>
