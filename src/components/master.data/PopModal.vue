<template>
  <div class="modal">
    <b-modal ref="my-modal" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger">Close Me</b-button>
      <b-button class="mt-2" variant="outline-warning">Toggle Me</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style scoped>
  .modal {
    background-color: rgba(0, 0, 0, 0.7);
  }
</style>
