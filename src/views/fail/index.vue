<template>
  <div>
    {{ name }}
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class fail extends Vue {
  private name = "404";
}
</script>
<style lang="scss" scoped></style>
