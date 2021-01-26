<template>
  <v-dialog width="400" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">Edit</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Edit ad</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-title>
              <v-text-field
                label="Title"
                name="title"
                type="title"
                v-model="editedTitle"
                required
              />
              <v-textarea
                label="Description"
                name="description"
                type="description"
                v-model="editedDescription"
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
              <v-btn text @click="onCancel">CANCEL</v-btn>
              <v-btn text class="primary" @click="onSave">SAVE</v-btn>
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
      editedTitle: this.ad.title,
      editedDescription: this.ad.description,
    };
  },
  methods: {
    onSave() {
        if(this.editedTitle !== '' && this.editedDescription !== ''){

            this.$store.dispatch('updateAd',{
                title:this.editedTitle,
                description:this.editedDescription,
                id:this.ad.id
            })
            this.modal =false
        }
    },
    onCancel() {
      this.editedDescription = this.ad.description;
      this.editedTitle = this.ad.title;
      this.modal = false;
    },
  },
};
</script>
