<template>
    <div class="login-wrapper container">
      <div class="row">
        <div class="col-xs-4"></div>
        <div class="col-xs-4">
          <div class="panel panel-default">
            <div class="panel-heading text-center" >
              登录
            </div>
            <div class="panel-body">
              <form class="form-horizontal form">
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">登录名</label>
                  <div class="col-sm-9">
                    <input type="email" class="form-control" id="inputEmail3" placeholder="这里输入登录名">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputPassword3" class="col-sm-3 control-label">密码</label>
                  <div class="col-sm-9">
                    <input type="password" class="form-control" id="inputPassword3" placeholder="这里输入密码">
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-offset-3 col-sm-4">
                    <div class="checkbox">
                      <label>
                        <input type="checkbox">记住我
                      </label>
                    </div>
                  </div>
                  <div class="col-sm-offset-1 col-sm-3">
                    <div class="checkbox">
                      <label>
                        <button type="submit" class="btn btn-link btn-sm">忘记密码</button>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-offset-9 col-sm-3">
                    <button type="submit" class="btn btn-default" v-link="{name:'index'}">登录</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
        <div class="col-xs-4"></div>
      </div>
    </div>
</template>
<script>

  export default{
    name: 'RoutePage',
    props: {},
    data() {
      return {
      }
    },
    method: {

    },
    component: {

    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">

  .login-wrapper
      .panel
          margin-top: 100px
</style>
