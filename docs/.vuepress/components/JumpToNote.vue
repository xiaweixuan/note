<template>
  <div></div>
</template>
<script>
export default {
  name: 'JumpToNote',
  mounted () {
    window.location.href = `${window.location.href}note/`;
  }
}
</script>