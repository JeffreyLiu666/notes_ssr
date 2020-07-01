<!--
 * @Date: 2020-02-20 13:56:12
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-05 16:25:29
 * @LastEditors: junfeng.liu
 * @Description: des
 -->

<template>
    <div class="filter-block-wrapper">
        <slot name="custom"></slot>
        <div class="filter-block">
            <div class="filter-content-wrapper">
                <slot name="content"></slot>
                <div class="filter-date-block" v-if="date">日期：{{ date }}</div>
                <div class="filter-content">
                    <slot></slot>
                    <Select class="filter-item" v-model="data[item.key]" v-for="item in filters" :key="item.key">
                        <Option v-for="(it, index) in item.list" :key="'option-' + index" :value="it.value">{{ it.label }}</Option>
                    </Select>
                </div>
            </div>
            <div class="filter-search-block" v-if="search">
                <Input :value="searchVal" search :placeholder="placeholder" @on-search="handleSearch" @input="handleInput" />
            </div>
        </div>
        <div class="custom-bot" v-if="$slots['custom-bot']">
            <slot name="custom-bot"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'filter-block',
    props: {
        date: {
            type: String,
            default: ''
        },
        data: {
            type: Object,
            default () {
                return {}
            }
        },
        filters: {
            type: Array,
            default () {
                return []
            }
        },
        search: {
            type: Boolean,
            default: false
        },
        searchVal: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '搜索订单号/房号/联系人/手机号/渠道订单号'
        }
    },
    data () {
        return {

        }
    },
    mounted () {},
    methods: {
        handleSearch (e) {
            this.$emit('on-search', e)
        },
        handleInput (val) {
            this.$emit('update:searchVal', val)
        }
    }
}
</script>

<style lang="less">
@import '~@/style/index.less';

@item-margin: 12px;

.filter-block-wrapper{
    margin-bottom: 20px;
    width: 100%;
    padding: 20px;
    padding-bottom: 10px;
    background-color: white;
    border-radius: 3px;
    box-shadow: @box-shadow-base;
    .custom-bot{
        margin-top: @item-margin;
        margin-bottom: @item-margin;
    }
}
.filter-block{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .filter-content-wrapper{
        flex: 1;
    }
    .filter-date-block{
        float: left;
        height: 32px;
        line-height: 32px;
        margin-right: @item-margin;
        margin-bottom: @item-margin;
    }
    .filter-content{
        float: left;
        .filter-item{
            width: 180px;
            display: inline-block;
            vertical-align: middle;
            margin-right: @item-margin;
            margin-bottom: @item-margin;
            &:last-child{
                margin-right: 0;
            }
        }
    }
    .filter-search-block{
        flex: 1;
        max-width: 320px;
        min-width: 180px;
        padding-left: 20px;
    }
}

</style>
