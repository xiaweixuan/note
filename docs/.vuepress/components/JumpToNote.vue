<template>
  <div></div>
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
