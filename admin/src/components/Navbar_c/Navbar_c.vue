<template>
  <div class="component-wrapper f-h f-w f-pa">
    <div class="content f-h f-w f-pr">
      <span class="title f-ib f-pa">Navbar相关内容</span>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'btn',
    props: {},
    data() {
      return {
      }
    },
    method: {

    }
  };
</script>
<style scoped scoped lang="stylus" rel="stylesheet/stylus">
  .component-wrapper
    padding: 20px 20px
    .content
      border: 1px solid #e2e2e2
      background: #fff
      .title
        padding: 6px 20px
        background: #fff
        left: 20px
        top: -17px
        font-size: 16px
        border-radius: 5px 5px 0 0
</style>
