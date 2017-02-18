<template>
    <div class="content-wrapper f-pr f-h">
        <v-menu-title></v-menu-title>
        <div class="inner-box f-w f-h f-pa">
          <router-view keep-alive name="content"></router-view>
        </div>
    </div>
</template>
<script>
  import vMenuTitle from 'components/MenuTitle/MenuTitle'
  export default{
    name: 'content',
    props: {},
    data() {
      return {}
    },
    methods: {

    },
    components: {
      vMenuTitle
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .content-wrapper
    .inner-box
      left: 0
      top: 45px
</style>
