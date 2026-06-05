import path from 'node:path'
import fs from 'node:fs'
import type { DefaultTheme, HeadConfig } from 'vitepress'
import { defineConfig } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from 'vitepress-plugin-group-icons'
import llmstxt from 'vitepress-plugin-llms'
import type { PluginOption } from 'vite'
import { markdownItImageSize } from 'markdown-it-image-size'
import { buildEnd } from './buildEnd.config'

const ogDescription = 'Next Generation Frontend Tooling'
const ogImage = 'https://vite.dev/og-image.jpg'
const ogTitle = 'Vite'
const ogUrl = 'https://vite.dev'

// netlify envs
const deployURL = process.env.DEPLOY_PRIME_URL || ''
const commitRef = process.env.COMMIT_REF?.slice(0, 8) || 'dev'

const deployType = (() => {
  switch (deployURL) {
    case 'https://main--vite-docs-main.netlify.app':
      return 'main'
    case '':
      return 'local'
    default:
      return 'release'
  }
})()
const additionalTitle = ((): string => {
  switch (deployType) {
    case 'main':
      return ' (main branch)'
    case 'local':
      return ' (local)'
    case 'release':
      return ''
  }
})()
const versionLinks = ((): DefaultTheme.NavItemWithLink[] => {
  const oldVersions: DefaultTheme.NavItemWithLink[] = [
    {
      text: 'Vite 6 Docs',
      link: 'https://v6.vite.dev',
    },
    {
      text: 'Vite 5 Docs',
      link: 'https://v5.vite.dev',
    },
    {
      text: 'Vite 4 Docs',
      link: 'https://v4.vite.dev',
    },
    {
      text: 'Vite 3 Docs',
      link: 'https://v3.vite.dev',
    },
    {
      text: 'Vite 2 Docs',
      link: 'https://v2.vite.dev',
    },
  ]

  switch (deployType) {
    case 'main':
    case 'local':
      return [
        {
          text: 'Vite 7 Docs (release)',
          link: 'https://vite.dev',
        },
        ...oldVersions,
      ]
    case 'release':
      return oldVersions
  }
})()

function inlineScript(file: string): HeadConfig {
  return [
    'script',
    {},
    fs.readFileSync(
      path.resolve(__dirname, `./inlined-scripts/${file}`),
      'utf-8',
    ),
  ]
}

export default defineConfig({
  title: '疯猪AI',
  description: '疯猪AI',
  lang: 'zh-CN',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    [
      'link',
      { rel: 'alternate', type: 'application/rss+xml', href: '/blog.rss' },
    ],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'true',
      },
    ],
    [
      'link',
      {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600&family=IBM+Plex+Mono:wght@400&display=swap',
        as: 'style',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600&family=IBM+Plex+Mono:wght@400&display=swap',
      },
    ],
    inlineScript('banner.js'),
    ['link', { rel: 'me', href: 'https://m.webtoo.ls/@vite' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { property: 'og:site_name', content: 'vitejs' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@vite_js' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'TPLGJZGR',
        'data-spa': 'auto',
        defer: '',
      },
    ],
  ],

  locales: {
    root: { label: '简体中文' },
    en: { label: 'English', link: '/' },
    ja: { label: '日本語', link: '/' },
    es: { label: 'Español', link: '/' },
    pt: { label: 'Português', link: '/' },
    ko: { label: '한국어', link: '/' },
    de: { label: 'Deutsch', link: '/' },
    fa: { label: 'فارسی', link: '/' },
  },

  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      //pattern: 'https://github.com/vitejs/docs-cn/edit/main/:path',
      text: '为此页提供修改建议',
    },

    outline: {
      label: '本页目录',
      level: [2, 3],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/shenpeiheng' },
      { icon: 'gitee', link: 'https://gitee.com/shenph' },
      { icon: 'discourse',link: 'https://linux.do/'},
      { icon: 'docker', link: 'https://www.docker.com/' },
      { icon: 'google', link: 'https://www.google.com/' },
      { icon: 'x', link: 'https://x.com/' },
      { icon: 'mastodon', link: 'https://elk.zone/' },
      { icon: 'cloudflare', link: 'https://dash.cloudflare.com/' },
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          }
        },
      }
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // Using WwAds for China
    // carbonAds: {
    //   code: 'CEBIEK3N',
    //   placement: 'vitejsdev',
    // },

    footer: {
      message: `Released under the MIT License. (${commitRef})`,
      copyright:
        'Copyright © 2026-present CrazyPig AI Team.'
    },

    nav: [
      /*{
        component: 'ReleaseTag'
      },*/
      { text: '🏳️‍🌈首页', link: '/'},
      { text: '👺文档', link: '/deploy/', activeMatch: '/deploy/' },
      { text: '👹Komari', link: 'https://komari.007988.xyz/' },
      { text: '🚀SubLink', link: 'https://sublink.007988.xyz/' },
      { text: '🤖AI-Draw', link: 'https://ai-smart-draw.vercel.app/' },
      /*{ text: '配置', link: '/config/', activeMatch: '/config/' },
      { text: '插件', link: '/plugins/', activeMatch: '/plugins/' },*/
      {
        text: '🛠️相关链接',
        items: [
          { text: '🤡团队成员', link: '/team' },
          { text: '✨最新博客', link: '/blog' },
          { text: '👿发布策略', link: '/releases' },
          {
            text: '🔥youtube',
            link: 'https://www.youtube.com',
          },
          /*{
            items: [
              {
                text: 'Bluesky',
                link: 'https://bsky.app/profile/vite.dev',
              },
              {
                text: 'Mastodon',
                link: 'https://elk.zone/m.webtoo.ls/@vite',
              },
              {
                text: 'X',
                link: 'https://x.com/vite_js',
              },
              {
                text: 'Discord 聊天室',
                link: 'https://chat.vite.dev',
              },
              {
                text: 'Awesome Vite',
                link: 'https://github.com/vitejs/awesome-vite'
              },
              {
                text: 'ViteConf',
                link: 'https://viteconf.org',
              },
              {
                text: 'Dev.to 社区',
                link: 'https://dev.to/t/vite'
              },
              {
                text: '更新日志',
                link: 'https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md',
              },
              {
                text: '贡献指南',
                link: 'https://github.com/vitejs/vite/blob/main/CONTRIBUTING.md',
              },
            ],
          },*/
        ]
      },
      /*{
        text: '历史版本',
        items: [
          {
            text: 'Vite v6 文档（英文）',
            link: 'https://v6.vite.dev'
          },
          {
            text: 'Vite v5 文档（英文）',
            link: 'https://v5.vite.dev'
          },
          {
            text: 'Vite v4 文档（英文）',
            link: 'https://v4.vite.dev'
          },
          {
            text: 'Vite v3 文档（英文）',
            link: 'https://v3.vite.dev'
          },
          {
            text: 'Vite v2 文档（英文）',
            link: 'https://v2.vite.dev'
          },
        ]
      }*/
    ],

    sidebar: {
        '/deploy/': [
            {
                text: '🔅环境',
                items: [
                    {
                        text: '域名|主机资源',
                        link: '/deploy/',
                    },
                    {
                        text: '自由了',
                        link: '/deploy/static-deploy',
                    },
                    {
                        text: 'Ollama 自由了',
                        link: '/deploy/ollama',
                    },
                    {
                        text: '自建外网+内网穿透',
                        link: '/deploy/frp',
                    },
                ],
            },
            {
                text: '🔥AI MCP',
                items: [
                    {
                        text: '工作流',
                        items: [
                            {
                                text: 'Dify',
                                link: 'https://dify.ai/',
                            },
                            {
                                text: 'Fastgpt',
                                link: 'https://cloud.fastgpt.cn/',
                            },
                            {
                                text: 'Coze',
                                link: 'https://www.coze.cn/',
                            },
                        ]
                    },
                    {
                        text: 'models',
                        items: [
                            {
                                text: 'ollama',
                                link: 'https://ollama.com/',
                            },
                            {
                                text: 'Xinference',
                                link: 'https://github.com/xorbitsai/inference',
                            },
                            {
                                text: 'open-webui',
                                link: 'https://github.com/open-webui/open-webui',
                            },
                            {
                                text: 'anythingllm',
                                link: 'https://anythingllm.com/',
                            },
                        ]
                    },
                    {
                        text: 'MCP',
                        items: [
                            {
                                text: 'MCP GATEWAY',
                                link: 'https://github.com/AmoyLab/Unla',
                            },
                            {
                                text: '12306',
                                link: 'http://github.com/shenpeiheng/mcp-server-chinarailway.git',
                            },
                        ]
                    },
                ],
            },
            {
                text: '✨工具',
                items: [
                    {
                        text: '提示词优化器',
                        link: 'https://github.com/linshenkx/prompt-optimizer',
                    },
                    {
                        text: 'austin消息推送',
                        link: 'http://github.com/ZhongFuCheng3y/austin-admin.git',
                    },
                    {
                        text: 'Stirling PDF',
                        link: 'https://github.com/Stirling-Tools/Stirling-PDF',
                    },
                ],
            },
            {
                text: '🎉DB',
                items: [
                    {
                        text: 'Chat2DB',
                        link: 'https://github.com/CodePhiliaX/Chat2DB',
                    },
                    {
                        text: 'Supabase',
                        link: 'https://github.com/supabase/supabase',
                    },
                    {
                        text: 'Oracle',
                        items: [
                            {
                                text: 'Vibe Coding with Oracle APEX 26.1',
                                link: '/db/Vibe Coding with Oracle APEX 26.1',
                            },
                        ]
                    },
                ],
            },
            {
                text: '🔨运维管理',
                items: [
                    {
                        text: 'Jenkins',
                        link: 'https://www.jenkins.io/',
                    },
                    {
                        text: 'Portainer',
                        link: 'https://www.portainer.io/',
                    },
                    {
                        text: 'Harbor',
                        link: 'https://goharbor.io/',
                    },
                    {
                        text: 'UptimeKuma',
                        link: 'https://github.com/louislam/uptime-kuma',
                    },
                ],
            },
            {
                text: '🏄在线开发工具',
                items: [
                    {
                        text: 'Vscode',
                        link: 'https://code.visualstudio.com/',
                    },
                    {
                        text: 'Jetbrains',
                        link: 'https://github.com/JetBrains/projector-docker.git',
                    },
                    {
                        text: 'coder',
                        link: 'https://coder.com/',
                    },
                ],
            },
            {
                text: '📣在线画图工具',
                items: [
                    {
                        text: 'Excalidraw',
                        link: 'https://excalidraw.com/',
                    },
                    {
                        text: 'Mermaid',
                        link: 'https://mermaid.live/edit',
                    },
                    {
                        text: 'PlantUML',
                        link: 'https://plantuml.com/zh/',
                    },
                    {
                        text: 'Drawio',
                        link: 'https://app.diagrams.net/',
                    },
                ],
            },
        ],
      /*'/guide/': [
        {
          text: '介绍',
          items: [
            {
              text: '开始',
              link: '/guide/',
            },
            {
              text: '理念',
              link: '/guide/philosophy',
            },
            {
              text: '为什么选 Vite',
              link: '/guide/why',
            },
          ],
        },
        {
          text: '指引',
          items: [
            {
              text: '功能',
              link: '/guide/features',
            },
            {
              text: '命令行接口',
              link: '/guide/cli'
            },
            {
              text: '使用插件',
              link: '/guide/using-plugins'
            },
            {
              text: '依赖预构建',
              link: '/guide/dep-pre-bundling'
            },
            {
              text: '静态资源处理',
              link: '/guide/assets'
            },
            {
              text: '构建生产版本',
              link: '/guide/build'
            },
            {
              text: '部署静态站点',
              link: '/guide/static-deploy'
            },
            {
              text: '环境变量与模式',
              link: '/guide/env-and-mode'
            },
            {
              text: '服务端渲染（SSR）',
              link: '/guide/ssr'
            },
            {
              text: '后端集成',
              link: '/guide/backend-integration'
            },
            {
              text: '故障排除',
              link: '/guide/troubleshooting',
            },
            {
              text: '性能',
              link: '/guide/performance',
            },
            {
              text: 'Rolldown',
              link: '/guide/rolldown',
            },
            {
              text: '从 v6 迁移',
              link: '/guide/migration',
            },
            {
              text: '破坏性变更',
              link: '/changes/',
            },
          ],
        },
        {
          text: 'API',
          items: [
            {
              text: '插件 API',
              link: '/guide/api-plugin'
            },
            {
              text: 'HMR API',
              link: '/guide/api-hmr',
            },
            {
              text: 'JavaScript API',
              link: '/guide/api-javascript',
            },
            {
              text: '配置参考',
              link: '/config/',
            },
          ],
        },
        {
          text: '环境 API',
          items: [
            {
              text: '介绍',
              link: '/guide/api-environment',
            },
            {
              text: '环境实例',
              link: '/guide/api-environment-instances',
            },
            {
              text: '插件',
              link: '/guide/api-environment-plugins',
            },
            {
              text: '框架',
              link: '/guide/api-environment-frameworks',
            },
            {
              text: '运行时',
              link: '/guide/api-environment-runtimes',
            },
          ],
        },
      ],
      '/config/': [
        {
          text: '配置',
          items: [
            {
              text: '配置 Vite',
              link: '/config/'
            },
            {
              text: '共享选项',
              link: '/config/shared-options'
            },
            {
              text: '服务器选项',
              link: '/config/server-options'
            },
            {
              text: '构建选项',
              link: '/config/build-options'
            },
            {
              text: '预览选项',
              link: '/config/preview-options'
            },
            {
              text: '依赖优化选项',
              link: '/config/dep-optimization-options'
            },
            {
              text: 'SSR 选项',
              link: '/config/ssr-options'
            },
            {
              text: 'Worker 选项',
              link: '/config/worker-options',
            },
          ],
        },
      ],
      '/changes/': [
        {
          text: '破坏性变更',
          link: '/changes/',
        },
        {
          text: '现在',
          items: [],
        },
        {
          text: '未来',
          items: [
            {
              text: '钩子函数中的 this.environment',
              link: '/changes/this-environment-in-hooks',
            },
            {
              text: 'HMR hotUpdate 插件钩子',
              link: '/changes/hotupdate-hook',
            },
            {
              text: '迁移到基于环境的API',
              link: '/changes/per-environment-apis',
            },
            {
              text: '使用 ModuleRunner API 进行服务端渲染',
              link: '/changes/ssr-using-modulerunner',
            },
            {
              text: '构建过程中的共享插件',
              link: '/changes/shared-plugins-during-build',
            },
          ],
        },
        {
          text: '过去',
          items: [],
        },
      ],*/
    },
  },
  transformPageData(pageData) {
    const canonicalUrl = `${ogUrl}/${pageData.relativePath}`
      .replace(/\/index\.md$/, '/')
      .replace(/\.md$/, '')
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.unshift(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageData.title }],
    )
    return pageData
  },
  markdown: {
    // languages used for twoslash and jsdocs in twoslash
    languages: ['ts', 'js', 'json'],
    codeTransformers: [transformerTwoslash()],
    config(md) {
      md.use(groupIconMdPlugin)
      md.use(markdownItImageSize, {
        publicDir: path.resolve(import.meta.dirname, '../public'),
      })
    },
  },
  vite: {
    plugins: [
      // @ts-ignore
      groupIconVitePlugin({
        customIcon: {
          firebase: 'vscode-icons:file-type-firebase',
          '.gitlab-ci.yml': 'vscode-icons:file-type-gitlab',
        },
      }),
    ],
    optimizeDeps: {
      include: [
        '@shikijs/vitepress-twoslash/client',
        'gsap',
        'gsap/dist/ScrollTrigger',
        'gsap/dist/MotionPathPlugin',
      ],
    },
  },
  buildEnd,
})
