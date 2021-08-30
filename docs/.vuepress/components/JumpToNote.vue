<template>
  <div></div>
</template>
<script>
export default {
  name: "JumpToNote",
  mounted() {
    // window.onload = function () {
    window.location.href = `${window.location.href}note/`;
    // };
  },
};
</script>