<!--
 * @Date: 2020-06-18 16:18:22
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-30 17:17:28
 * @LastEditors: junfeng.liu
 * @Description: des
-->
<template>
    <div>
        <FilterBlock>
            <LForm v-model="data" inline :config="config"></LForm>
            <LButton type="cool-hover" @click="handleClick({ action: 'add' })">添加笔记</LButton>
        </FilterBlock>
        <LTable
            stripe
            :height="list.length ? '' : 300"
            :current.sync="pages.current"
            :pageSize="pages.size"
            :total="pages.total"
            :data="list"
            :columns="columns"
            @on-page-change="getList">
        </LTable>
        <EditNote v-model="editNote.show" :isEdit="editNote.isEdit" :info="editNote.info" @success="getList"></EditNote>
    </div>
</template>

<script>
import EditNote from '@/components/EditNote.vue'
import { getList, delNote, changeResolve } from '@/api/note.js'
import { IS_NOT } from '@/constant'

export default {
    name: 'home',
    components: { EditNote },
    data () {
        return {
            list: [],
            pages: {
                current: 1,
                size: 10,
                total: 0
            },
            columns: [
                { title: '#', type: 'index', width: 60 },
                { title: 'ID', key: 'id', width: 80 },
                { title: '主题', key: 'title', minWidth: 180, ellipsis: true },
                { title: '详细内容', key: 'content', minWidth: 180, ellipsis: true },
                { title: '是否解决', key: 'isResolve', width: 100, render: (h, { row, index }) => {
                    return (
                        <i-switch value={ row.isResolve } beforeChange={ () => {
                            const isResolve = !row.isResolve
                            return changeResolve({ id: row.id, isResolve }).then(() => {
                                // 顺序上可能有冲突，导致不正确的状态，使用异步解决
                                this.$nextTick(() => {
                                    this.$set(this.list[index], 'isResolve', isResolve)
                                })
                            })
                        } } />
                    )
                } },
                { title: '创建时间', key: 'create_time', minWidth: 200 },
                { title: '更新时间', key: 'update_time', minWidth: 200 },
                { title: '操作', minWidth: 120, links: [
                    { label: '编辑', action: 'edit' },
                    { label: '删除', action: 'del' }
                ], onClick: this.handleClick }
            ],
            editNote: {
                show: false,
                isEdit: false,
                info: {}
            },
            data: {},
            config: [
                { label: 'ID', key: 'id', type: 'input', placeholder: '请输入ID' },
                { label: '主题', key: 'title', type: 'input', placeholder: '请输入主题' },
                { label: '内容', key: 'content', type: 'input', placeholder: '请输入内容' },
                { label: '是否解决', key: 'isResolve', type: 'select', placeholder: '请选择', list: IS_NOT },
                { label: ' ', type: 'buttons', contentWidth: 'auto', labelWidth: 20, config:
                    {
                        buttons: [
                            { text: '搜索', icon: 'ios-search', type: 'primary', action: 'search' },
                            { text: '重置', icon: 'md-refresh', type: 'error', action: 'reset' }
                        ],
                        onClick: this.handleClick
                    }
                }
            ]
        }
    },
    computed: {
    },
    mounted () {
        this.getList()
    },
    methods: {
        handleClick (info) {
            switch (info.action) {
                case 'edit':
                    this.editNote.isEdit = true
                    this.editNote.info = info.row
                    this.editNote.show = true
                    break
                case 'add':
                    this.editNote.isEdit = false
                    this.editNote.show = true
                    break
                case 'del':
                    this.$Modal.confirm({
                        title: '删除',
                        content: '是否确定删除该条记录',
                        onOk: () => { this.del(info.row.id) }
                    })
                    break
                case 'search':
                    this.getList()
                    break
                case 'reset':
                    this.reset()
                    break
            }
        },
        reset () {
            this.data = {}
        },
        del (id) {
            delNote({ id }).then(() => {
                this.$Message.success('成功删除')
                this.getList()
            })
        },
        getList (cur = 1) {
            this.pages.current = cur
            const params = {
                id: this.data.id,
                title: this.data.title,
                content: this.data.content,
                isResolve: this.data.isResolve,
                page: cur,
                limit: this.pages.size
            }

            getList(params).then((res) => {
                if (!res) return this.$Message.warning('未获取数据')
                this.list = res.list
                this.pages.total = res.total || 0
            })
        }
    },
    destroyed () {
        // this.$store.unregisterModule('home')
    }
}
</script>

<style lang="less">
</style>
