<template lang="html">
    <div class="login-container" :style="bgImage" ref="loginBox">
        <div class="login-cover"></div>
        <div class="login-content" :style="mTop">
            <!-- <div class="login-bottom">
                <div class="bottom-tree">
                    <img :src="tree" width="566" height="70" />
                </div>
            </div> -->
            <div class="login-dialog">
                <!-- <div class="top-logo">
                    <img :src="topLogo" width="480" height="160"  />
                </div> -->
                <header class="top-title">
                    <h1>我的笔记本</h1>
                    <!-- <p>企业统一登录</p> -->
                </header>
                <LoginDialog></LoginDialog>
            </div>
        </div>
        <LoginFooter></LoginFooter>
    </div>
</template>

<script>
import LoginDialog from './LoginDialog.vue'
import LoginFooter from './LoginFooter.vue'
import backgroundImg from '@/assets/login-bg.jpg'

export default {
    name: 'Login',
    components: {
        LoginDialog,
        LoginFooter
    },
    data () {
        return {
            mTop: 'top: 80px;',
            // topLogo,
            // tree,
            bgImage: {
                'background-image': `url(${backgroundImg})`
            }
        }
    },
    mounted () {
        document.querySelector('html').className += ' loginHTML'
        this.mTop = 'top: ' + (this.$refs.loginBox.clientHeight - 550) / 2 + 'px'
        window.addEventListener('resize', this.boxTop)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.boxTop)
        document.querySelector('html').className.replace(' loginHTML', '')
    },
    methods: {
        boxTop (e) {
            this.mTop = 'top: ' + (e.target.innerHeight - 550) / 2 + 'px'
        }
    }
}
</script>

<style lang="less">
    html.loginHTML {
        height: 100%;
        body, #app {
            height: 100%
        }
    }
</style>

<style lang="less" scoped>
    .login-container {
        position: relative;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        color: white;
        .login-cover{
            background: radial-gradient(ellipse at center,#666 0,#000 100%);
            height: 100%;
            opacity: .6;
        }
        .login-content {
            position: absolute;
            top: 0px;
            left: 0;
            height: 545px;
            right: 0;
            .login-dialog {
                position: absolute;
                top: 0;
                z-index: 5;
                height: 530px;
                bottom: 80px;
                left: 0;
                right: 0;
                .top-logo {
                    width: 480px;
                    height: 160px;
                    margin: 0 auto;
                }
                .top-title{
                    width: 480px;
                    height: 90px;
                    margin: 0 auto;
                    text-align: center;
                    h1{
                        font-size: 36px;
                        letter-spacing: 3px;
                    }
                    p{
                        font-size: 16px;
                    }
                }
            }
            .login-bottom {
                position: absolute;
                top: 475px;
                z-index: 1;
                left: 0;
                right: 0;
                .bottom-tree {
                    width: 592px;
                    height: 70px;
                    margin: 0 auto;
                    img {
                        margin-left: 15px;
                    }
                }

            }
            .login-service-info {
                position: absolute;
                bottom: 0;
                height: 80px;
                width: 100%;
                background-color: rgba(57, 91, 181, 0.8);
                text-align: center;
                -webkit-font-smoothing: antialiased;
                .service-info-block {
                    font-size: 18px;
                    color: white;
                    display: inline-block;
                    line-height: 80px;
                    span {
                        font-size: 22px;
                        margin-right: 70px;
                    }
                }
            }
        }
        .loginHeader {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: 2;
            height: 80px;
            background: #FFFFFF;
            &:after{
                content: '';
                display: block;
                clear: both;
            }
        }
    }
</style>
