<!--
 * @Date: 2020-06-18 16:18:22
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-24 17:50:22
 * @LastEditors: junfeng.liu
 * @Description: des
-->
<template>
    <div>
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
        <LButton type="cool-hover" @click="handleClick({ action: 'add' })">添加笔记</LButton>
    </div>
</template>

<script>
// import homeModule from '@/store/modules/home'
import { getList, delNote } from '@/api/note.js'
import EditNote from '@/components/EditNote.vue'

export default {
    name: 'home',
    components: { EditNote },
    // asyncData ({ store }) {
    //     store.registerModule('home', homeModule)
    //     return store.dispatch('home/getNoteList')
    // },
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
                { title: 'ID', key: 'id', minWidth: 80 },
                { title: '主题', key: 'title', minWidth: 180 },
                { title: '详细内容', key: 'content', minWidth: 180 },
                { title: '创建时间', key: 'create_time', minWidth: 200 },
                { title: '更新时间', key: 'update_time', minWidth: 200 },
                { title: '操作', minWidth: 220, links: [
                    { label: '编辑', action: 'edit' },
                    { label: '删除', action: 'del' }
                ], onClick: this.handleClick }
            ],
            editNote: {
                show: false,
                isEdit: false,
                info: {}
            }
        }
    },
    computed: {
        // initNotes () {
        //     return this.$store.state.home.initList
        // }
    },
    mounted () {
        // this.list = this.initNotes
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
            }
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
