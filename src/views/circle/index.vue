<template>
  <div>
    圈子
    <Footers></Footers>
  </div>
</template>
<script lang="ts">
import Footers from "@/views/common/footer.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    Footers
  }
})
export default class Circle extends Vue {}
</script>
