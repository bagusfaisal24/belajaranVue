<template>
  <div class="about">
    <img v-bind:src="user.avatar_url" width="48px">
    <p>{{ user.name }}</p>
  </div>
</template>
<script>
export default {
  name: 'About',
  data () {
    return {
      user: {}
    }
  },
  components: {},
  methods: {
    getProfile () {
      fetch('http://localhost:8080/v1/membership/member')
        .then(r => r.json())
        .then((data) => {
          this.user = data
        })
        .catch(e => console.log(e))
    }
  },
  mounted () {
    this.getProfile()
  }
}
</script>
