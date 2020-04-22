<template>
  <div>
    <router-link to="/">Перейти к таблице Users</router-link>
    <ul>
      <li v-for="(value, name, index) in user" v-bind:key="index">{{ name }} - {{ value }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['id'],
  created() {
    this.$store.getters.getUsers.length || this.$store.dispatch('SET_USERS')
  },
  computed: {
    user() {return this.$store.getters.getUsers.find(user => +user.id === +this.id) }
  }
}
</script>
