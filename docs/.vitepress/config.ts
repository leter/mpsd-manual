import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/mpsd-manual/',
  title: '名片秒递',
  description: '名片秒递微信小程序用户操作手册 — 创建、分享、交换电子名片的完整使用指南',
  lang: 'zh-CN',
  cleanUrls: true,
  srcExclude: [],

  head: [
    ['meta', { name: 'keywords', content: '名片秒递,电子名片,微信小程序,名片交换,用户手册' }],
    ['meta', { property: 'og:title', content: '名片秒递 — 用户操作手册' }],
    ['meta', { property: 'og:description', content: '创建、分享、交换电子名片的完整使用指南' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
  ],

  themeConfig: {
    logo: '/logo.png',
    siteTitle: '名片秒递',
    nav: [],
    sidebar: [
      {
        text: '用户手册',
        items: [
          { text: '1. 产品简介',          link: '/user-manual#_1-产品简介' },
          { text: '2. 适用场景',          link: '/user-manual#_2-适用场景' },
          { text: '3. 快速上手',          link: '/user-manual#_3-快速上手' },
          { text: '4. 首页',              link: '/user-manual#_4-首页查看和分享我的名片' },
          { text: '5. 创建与编辑名片',    link: '/user-manual#_5-创建与编辑名片' },
          { text: '6. 选择名片模板',      link: '/user-manual#_6-选择名片模板' },
          { text: '7. 名片详情与保存',    link: '/user-manual#_7-查看名片详情与保存名片' },
          { text: '8. 访客记录',          link: '/user-manual#_8-访客记录' },
          { text: '9. 名片夹管理',        link: '/user-manual#_9-名片夹管理' },
          { text: '10. 交换请求处理',     link: '/user-manual#_10-交换请求处理' },
          { text: '11. 浏览记录与新名片', link: '/user-manual#_11-浏览记录与新名片' },
          { text: '12. 设置与缓存清理',   link: '/user-manual#_12-设置与缓存清理' },
          { text: '13. 常见问题',         link: '/user-manual#_13-常见问题' },
        ]
      }
    ],
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '章节',
    returnToTopLabel: '回到顶部',
    docFooter: {
      prev: '上一章',
      next: '下一章'
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            displayDetails: '显示详情',
            noResultsText: '未找到相关结果',
            resetButtonTitle: '清除搜索',
            backButtonTitle: '返回',
            footer: { selectText: '选择', selectKeyAriaLabel: '回车', navigateText: '切换', navigateUpKeyAriaLabel: '上', navigateDownKeyAriaLabel: '下', closeText: '关闭', closeKeyAriaLabel: 'esc' }
          }
        }
      }
    },
    footer: {
      message: '名片秒递 — 让名片交换更简单',
    }
  }
})
