<template>
  <v-dialog width="400" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" class="primary">Bye</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h2>Do you want to buy it ?</h2>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-title>
              <v-text-field
                label="Your name"
                name="name"
                type="text"
                v-model="name"
                required
              />
              <v-text-field
                label="Your phone"
                name="phone"
                type="text"
                v-model="phone"
                required
              />
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="onCancel" :disabled="localLoading"
                >Close</v-btn
              >
              <v-btn
                text
                class="primary"
                @click="onSave"
                :disabled="localLoading"
                :loading="localLoading"
                >Buy it !</v-btn
              >
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["ad"],
  data() {
    return {
      modal: false,
      name: "",
      phone: "",
      localLoading: false,
    };
  },
  methods: {
    onSave() {
      if (this.name !== "" && this.phone !== "") {
        this.localLoading = true;
        this.$store
          .dispatch("createOrder", {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            ownerId: this.ad.ownerId,
          })
          .finally(() => {
            (this.name = ""), (this.phone = ""), (this.localLoading = false);
            this.modal = false;
          });
      }
    },
    onCancel() {
      this.name = "";
      this.phone = "";
      this.modal = false;
    },
  },
};
</script>
