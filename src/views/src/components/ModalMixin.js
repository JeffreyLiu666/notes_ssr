/*
 * @Date: 2020-03-10 20:40:17
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-24 11:38:58
 * @LastEditors: junfeng.liu
 * @Description: 适用与用iview的modal框的组件
 */

// 该方式需要父组件必须用v-model的形式，否则内部的关闭没有效果
// export default {
//     props: {
//         value: {
//             type: Boolean,
//             default: false
//         }
//     },
//     computed: {
//         show: {
//             get () {
//                 return this.value
//             },
//             set (val = false) {
//                 this.$emit('input', val)
//             }
//         }
//     },
//     mounted () {
//         if (this.show) this.init()
//     },
//     methods: {
//         init () {},
//         close () {
//             this.show = false
//             this.$emit('close')
//         },
//         handleChange (val) {
//             if (val) return this.init()
//             this.close()
//         }
//     }
// }

export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            show: this.value
        }
    },
    mounted () {
        if (this.show) this.init()
    },
    methods: {
        init () {},
        close () {
            this.show = false
        }
    },
    watch: {
        value (val) {
            if (val === this.show) return
            this.show = val
        },
        show (val) {
            if (val) {
                this.init()
            } else {
                // 由于值相等，所以close里this.show = false不会触发watch，因此不会死循环
                this.close()
                this.$emit('close')
            }
            // 如果通过value值改变设置的show导致直接return了，所以不能放顶部
            if (val === this.value) return
            this.$emit('input', val)
        }
    }
}
