<template>
<div>
    <h3>Hay World</h3>
    <h1>{{ msg }}</h1>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
