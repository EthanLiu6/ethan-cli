<template>
  <div>
    <a-row :gutter="[16, 16]">
      <a-col :span="6" v-for="card in statCards" :key="card.title">
        <a-card shadow="hover">
          <a-statistic :title="card.title" :value="card.value" :precision="card.precision" :suffix="card.suffix" :value-style="{ color: card.color }">
            <template #prefix>
              <component :is="card.icon" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" class="mt-6">
      <a-col :span="16">
        <a-card title="最近活动">
          <a-list item-layout="horizontal" :data-source="activities">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta :description="item.time">
                  <template #title>
                    <a href="#">{{ item.title }}</a>
                  </template>
                  <template #avatar>
                    <a-avatar :src="item.avatar" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="快速开始">
          <a-empty v-if="false" />
          <div class="flex flex-col gap-4">
            <a-button type="primary" block>新建项目</a-button>
            <a-button block>导出报表</a-button>
            <a-button block danger>系统设置</a-button>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, ShoppingCartOutlined, DollarOutlined, MessageOutlined } from '@ant-design/icons-vue'

const statCards = [
  { title: '新增用户', value: 1250, icon: UserOutlined, color: '#3f8600' },
  { title: '订单总量', value: 856, icon: ShoppingCartOutlined, color: '#cf1322' },
  { title: '本月营收', value: 9280, icon: DollarOutlined, color: '#3f8600', prefix: '¥' },
  { title: '待处理消息', value: 12, icon: MessageOutlined, color: '#1890ff' },
]

const activities = [
  { title: 'Ethan 创建了新项目 Ethan-CLI', time: '2小时前', avatar: 'https://joeschmoe.io/api/v1/random?1' },
  { title: '系统更新成功 v1.0.0', time: '5小时前', avatar: 'https://joeschmoe.io/api/v1/random?2' },
  { title: '收到一条新的系统通知', time: '昨天', avatar: 'https://joeschmoe.io/api/v1/random?3' },
]
</script>
