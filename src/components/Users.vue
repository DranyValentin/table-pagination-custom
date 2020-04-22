<template>
  <div>
    <input type="text" name="search" v-model="searchUser" @input="resetCurPage">
    <select v-model="countUsers" @change="resetCurPage">
      <option>5</option>
      <option>10</option>
      <option>15</option>
    </select>
    <table>
      <thead>
        <tr>
          <th v-for="(value, key) in users[0]" v-bind:key="key">{{key}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" v-bind:key="user.id" @click="openUser(user.id)" style="cursor: pointer">

          <th v-for="(value, key) in user" v-bind:key="user.id + key">{{value}}</th>
        </tr>
      </tbody>
    </table>
    <button v-bind:hidden="currentPage == 1" @click="prevPage">Prev</button>
    <button v-bind:hidden="currentPage * countUsers >= maxCountUsers"  @click="nextPage">Next</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchUser: '',
      countUsers: 5,
      usersRaw: [],
      currentPage: 1
    }
  },
  created(){
    this.$store.dispatch('SET_USERS')
  },
  computed: {
    users() {
      return this.$store.getters.getUsers.filter(user => user.first_name.includes(this.searchUser) || user.last_name.includes(this.searchUser)).splice((this.currentPage - 1) * this.countUsers, this.countUsers)
    },
    maxCountUsers() {
      return this.$store.getters.getUsers.filter(user => user.first_name.includes(this.searchUser) || user.last_name.includes(this.searchUser)).length
    }
  },
  methods: {
    openUser(id) {
      this.$router.push({ name: 'user', params: { id: id }})
      console.log(id)
    },
    resetCurPage(){
      this.currentPage = 1
    },
    nextPage() {
      this.currentPage++
    },
    prevPage() {
      this.currentPage--
    }
  }
}
</script>
