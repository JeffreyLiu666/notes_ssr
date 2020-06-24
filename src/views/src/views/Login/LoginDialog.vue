<template lang="html">
    <form class="login">
        <div class="input-group">
            <i-input autocomplete="on" size="large" v-model="username" style="width: 380px;" placeholder="请输入账号">
                <!-- <span slot="prepend">账&nbsp;&nbsp;&nbsp;号</span> -->
            </i-input>
        </div>
        <div class="input-group">
            <i-input autocomplete="on" size="large" v-model="password" style="width: 380px;" placeholder="请输入密码" type="password">
                <!-- <span slot="prepend">密&nbsp;&nbsp;&nbsp;码</span> -->
            </i-input>
        </div>
        <div class="local-password">
            <Checkbox v-model="remberPW">记住密码</Checkbox>
        </div>
        <div class="login-btn-box">
            <Button class="btn-login" @click="login" :disabled="!isAgree" :class="!isAgree ? 'btn-disable': ''">登 录</Button>
        </div>
        <!--<p style="text-align: right; padding-right: 34px; margin-top: 16px">-->
            <!--<a target="_blank" href="/app/bpv/dist/index.html#/resetpassword" class="forget-password">忘记密码？</a>-->
        <!--</p>-->
    </form>
</template>

<script>
import md5 from 'js-md5'
import { login } from '@/api/user'
import { isEmpty } from '@/lib/check'
import { setCookieParams } from '@/lib/util'

export default {
    data () {
        return {
            isAgree: true,
            remberPW: false,
            username: '',
            password: '', // 输入框的密码
            cachePW: '', // 从存储获取的密码
            md5PW: '' // MD5后的密码
        }
    },
    computed: {
        newPW () {
            return this.password !== this.cachePW
        }
    },
    mounted () {
        document.body.addEventListener('keyup', this.handleEnter, false)
        const exp = Number(localStorage.getItem('exp'))
        if (isNaN(exp) || exp < new Date().getTime()) {
            this.clear()
            return
        }
        const un = localStorage.getItem('n')
        const pw = localStorage.getItem('p')
        if (isEmpty(pw) || isEmpty(un) || un === 'null' || pw === 'null') return
        this.username = un
        this.password = pw
        this.cachePW = pw
        this.md5PW = pw
        this.remberPW = true
    },
    methods: {
        login () {
            // 用户输入验证
            if (this.username.length === 0) {
                this.$Message.error('请输入登入账户！')
                return
            }
            if (this.password.length === 0) {
                this.$Message.error('请输入登入密码！')
                return
            }

            if (this.newPW) this.md5PW = md5(this.password)
            // 登录请求
            let params = {
                username: this.username,
                password: this.md5PW
            }
            login(params).then((res) => {
                if (this.remberPW) {
                    this.rember()
                } else {
                    this.clear()
                }
                setCookieParams('token', res.token)
                // this.$router.push('Home')
                location.href = '/Public/Home'
            }).catch((data) => {
                if (!data) {
                    this.$Message.error('登录失败')
                }
            })
        },
        rember () {
            const n = this.username
            const p = this.md5PW
            localStorage.setItem('n', n)
            localStorage.setItem('p', p)
            let date = new Date()
            localStorage.setItem('exp', date.setTime(date.getTime() + 10 * 24 * 60 * 60 * 1000))
        },
        clear () {
            localStorage.removeItem('n')
            localStorage.removeItem('p')
        },
        handleEnter (e) {
            if (e.keyCode === 13) {
                this.login()
            }
        }
    },
    beforeDestroy () {
        document.body.removeEventListener('keyup', this.handleEnter, false)
    }
}
</script>

<style lang="less" scoped>
    @loginBG: #ffffff;
    @borderColor: #dcdcdc;
    .login {
        /deep/ .ivu-input-wrapper {
            .ivu-input {
                height: 50px;
                font-size: 18px;
                border-radius: 2px;
                background: fade(#333, 80%);
                border: none;
                color: white;
            }
            // .ivu-input-group-prepend {
            //     height: 50px;
            //     font-size: 18px;
            //     background-color: #fbfbfb;
            //     border-radius: 2px;
            // }
        }
        /deep/ .ivu-checkbox-wrapper{
            font-size: 16px;
        }
        z-index: 5;
        width: 480px;
        height: 370px;
        margin: 0 auto;
        // background-color: @loginBG;
        background: fade(#333, 60%);
        padding: 0 50px;
        .input-group {
            padding-top: 50px;
            height: 90px;
            .verifyCode {
                float: left;
                width: 144px;
            }
            .verifyImg {
                float: right;
                width: 90px;
                height: 50px;
                vertical-align: bottom;
            }
            &:after {
                clear: both;
            }
        }
        .local-password {
            padding-top: 50px;
            height: 90px;
        }
        .forget-password {
            color: #333;
        }
        .login-btn-box {
            .btn-login {
                margin-bottom: 20px;
                width: 100%;
                height: 50px;
                border: none;
                background-color: #00acac;
                color: #fff;
                font-size: 20px;
                font-weight: bold;
            }
            .btn-disable {
                background-color: #1a2a33;
                opacity: 0.8;
            }
        }
        .ivu-icon {
            margin-bottom: 4px;
            font-size: 24px;
            color: #111c22;
            vertical-align: bottom;
        }
    }
</style>
