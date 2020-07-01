<!--
 * @Date: 2020-06-24 11:35:57
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-30 17:51:11
 * @LastEditors: junfeng.liu
 * @Description: des
-->
<template>
    <div class="edit-note">
        <Modal
            class="edit-note-modal"
            v-model="show"
            :width="55"
            :title="title"
            hide-footer>
            <LForm ref="form" v-model="data" :config="config" :labelWidth="80" :labelPosition="'left'" :labelTextAlign="'right'"></LForm>
            <div class="modal-footer" slot="footer">
                <Button @click="close">取消</Button>
                <Button type="primary" @click="confirm">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import ModalMixin from '@/components/ModalMixin.js'
import { editNote, addNote } from '@/api/note'
import { isEmpty } from '@/lib/check'
import { reqStatusCheck } from '@/lib/request'
import { getCookieParams } from '@/lib/util'

export default {
    name: 'edit-note',
    mixins: [ModalMixin],
    props: {
        isEdit: {
            type: Boolean,
            default: false
        },
        info: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            data: { content: '' },
            config: [
                { label: '标题', key: 'title', type: 'input', placeholder: '请输入标题' },
                { label: '内容', key: 'content', type: 'input', placeholder: '请输入内容', maxlength: 200, config:
                    { type: 'textarea', autosize: { minRows: 5, maxRows: 5 }, showWordLimit: true }
                }
            ]
        }
    },
    computed: {
        title () {
            return this.isEdit ? '编辑' : '添加'
        }
    },
    mounted () {
    },
    methods: {
        init () {
            this.config.push({
                label: '图片', key: 'imgs', type: 'upload', config:
                    {
                        maxlength: 3,
                        type: {
                            type: 'nameAndPath'
                        },
                        headers: {
                            authorization: 'Bearer ' + getCookieParams().token
                        },
                        format: ['png', 'jpg'],
                        maxSize: 2 * 1024,
                        checkReqFn: reqStatusCheck
                    }
            })
            if (!this.isEdit) return
            this.data = Object.assign({}, this.info)
        },
        close () {
            Object.assign(this.$data, this.$options.data.call(this))
            this.show = false
        },
        confirm () {
            if (isEmpty(this.data.title)) return this.$Message.error('标题不能为空')
            let params = {
                title: this.data.title,
                content: this.data.content,
                imgs: this.data.imgs
            }
            if (this.isEdit) {
                params.id = this.info.id
                this.edit(params)
            } else {
                this.add(params)
            }
        },
        add (params) {
            addNote(params).then(() => {
                this.$Message.success('添加成功')
                this.close()
                this.$emit('success')
            })
        },
        edit (params) {
            editNote(params).then(() => {
                this.$Message.success('修改成功')
                this.close()
                this.$emit('success')
            })
        }
    }
}
</script>

<style lang="less">
.edit-note-modal{
    .ivu-modal{
        max-width: 550px;
        min-width: 350px;
    }
    .ivu-modal-body{
        padding: 16px 30px;
    }
    .l-form-item .l-form-item-label{
        font-weight: bold;
        padding-right: 20px;
    }
    .l-number-input{
        width: 100%;
    }
}
</style>

