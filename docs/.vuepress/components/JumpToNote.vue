<template>
  <p>loading</p>
</template>
<script>
export default {
  name: "JumpToNote",
  mounted() {
    this.$router.push({
      path: `/note/`,
    });
  },
};
</script>
