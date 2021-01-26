<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm-3 class="text-center-pt-5" v-if="loading">
        <v-progress-circular
          indeterminate
          :size="100"
          :width="4"
          color="primary"
        ></v-progress-circular>
      </v-flex>
      <v-flex xs12 sm6 offset-sm-3 v-else-if="!loading && orders.length !== 0">
        <h1 class="mb-3">Order</h1>
        <v-list-item v-for="order in orders" :key="order.id">
          <v-list-item-action>
            <v-checkbox
              :input-value="order.done"
              color="primary"
              @change="markDone(order)"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ order.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn class="primary" :to="'/ad/' + order.adId">Open</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-flex>
      <v-flex xs12 sm6 offset-sm-3 class="text-center-pt-5" v-else>
        <h1 class="text-secondary">You haven't orders</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    markDone(order) {
      this.$store
        .dispatch("markOrderDone", order.id)
        .then(() => (order.done = true))
        .catch(() => {});
      
    },
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    orders() {
      return this.$store.getters.orders;
    },
  },
  created() {
    this.$store.dispatch("fetchOrders");
  },
};
</script>
