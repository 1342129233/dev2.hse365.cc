<template>
  <div>
    消息
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
export default class News extends Vue {}
</script>
