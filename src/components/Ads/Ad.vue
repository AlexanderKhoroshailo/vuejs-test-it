<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-img :src="ad.imgSrc" height="300px"></v-img>
          <h1 class="ml-3">{{ ad.title }}</h1>
          <v-card-text>
            <p>{{ ad.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            
            <app-edit-ad-modal :ad="ad" v-if="isOwner"></app-edit-ad-modal>
            <app-buy-modal :ad="ad"></app-buy-modal>
          </v-card-actions>
        </v-card>
        <div v-else class="text-center pt-10">
          <v-progress-circular
            indeterminate
            :size="100"
            :width="4"
            color="primary"
          ></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script> 
import EditAdModal from "./EditAdModal"
export default {
  props: ["id"],
  computed: {
    ad() {
      const id = this.id;
      return this.$store.getters.adById(id);
    },
    loading(){
      return this.$store.getters.loading
    },
    isOwner(){
      return this.ad.ownerId === this.$store.getters.user.id
    }
  },
  components:{
    appEditAdModal:EditAdModal
  }
};
</script>
