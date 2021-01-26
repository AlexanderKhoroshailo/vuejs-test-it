<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm-3>
        <h1 class="mb-3">Create new Ad</h1>
        <v-form ref="form" v-model="valid" validation class="md-3">
          <v-text-field
            label="Ad title"
            name="title"
            type="text"
            v-model="title"
            :rules="[(v) => !!v || 'Title is required']"
            required
          />
          <v-textarea
            label="Ad description"
            name="description"
            type="text"
            v-model="description"
            :rules="[(v) => !!v || 'Description is required']"
            required
          />
        </v-form>
        <v-layout>
          <v-flex xs12>
            <v-btn color="blue-grey" @click="triggerUpload"
              >Upload<v-icon right dark>mdi-cloud-upload</v-icon></v-btn
            >
            <input
              ref="fileInput"
              type="file"
              style="display: none;"
              accept="image/*"
              @change="onFileChange"
            />
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 class="mb-3">
            <img :src="imgSrc" height="180" v-if="imgSrc" />
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 class="mb-3">
            <v-switch v-model="promo" label="Ad to promo?"></v-switch>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 class="mb-3">
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              :disabled="!valid || !img || loading"
              class="success"
              @click="createAd"
              >Create Ad</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      promo: false,
      title: "",
      description: "",
      valid: false,
      img: null,
      imgSrc: "",
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    createAd() {
      if (this.$refs.form.validate() && this.img) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          img:this.img,
        };
        this.$store
          .dispatch("createAd", ad)
          .then(() => {
            this.$router.push("/list");
          })
          .catch(() => {});
      }
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imgSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.img = file;
    },
  },
};
</script>
