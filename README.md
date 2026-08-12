# IELTS 备考助手

面向中国考生的 AI 驱动雅思备考平台，覆盖听说读写四项。全部基础功能免费开放，AI 功能由用户配置自己的 API Key 使用。

## ✨ 功能特性

### 词汇
- 雅思核心词汇（约 3000-4000 词）
- 按逻辑词群分类（同义词、反义词、主题词）
- 听力 179 考点词、阅读 538 同义替换词
- 多种练习模式：卡片翻转、选择题、打字拼写、词表浏览
- AI 增强：例句生成、词根词缀记忆法、联想网络（需配置 API Key）

### 听力
- 剑桥真题模拟练习（Cambridge 4-18）
- 计时模拟考试 + 自动评分
- AI 错题分析（需配置 API Key）

### 阅读
- 真题练习 + 计时模拟
- AI 文章精读解析（长难句分析、词汇标注）

### 写作
- Task 1 / Task 2 题目库
- AI 批改作文：四项评分（TR/CC/LR/GRA）、逐段反馈、语法错误标注、改进建议（需配置 API Key）

### 口语
- Part 1/2/3 完整题库
- AI 模拟考官对话、实时评分反馈（需配置 API Key）

### 学习追踪
- 学习仪表盘：进度、成绩趋势、今日任务
- 错题收藏和复习
- 每日打卡记录

## 🛠 技术栈

- **前端**: Next.js 14 (App Router) + TypeScript + Tailwind CSS v4
- **UI 组件**: shadcn/ui 风格组件 + Radix UI + lucide-react 图标
- **数据库**: SQLite + Prisma ORM（libsql 驱动适配器）
- **认证**: 邮箱注册/登录，bcrypt 密码加密 + JWT 会话
- **AI**: OpenAI API（用户自带 API Key）

## 📁 项目结构

```
src/
├── app/
│   ├── page.tsx              # 首页
│   ├── vocabulary/           # 词汇模块
│   ├── listening/            # 听力模块
│   ├── reading/              # 阅读模块
│   ├── writing/              # 写作模块
│   ├── speaking/             # 口语模块
│   ├── dashboard/            # 学习仪表盘
│   ├── settings/             # 设置（API Key 配置）
│   ├── login/                # 登录页
│   ├── register/             # 注册页
│   └── api/auth/             # 认证 API 路由
│       ├── register/         # 注册
│       ├── login/            # 登录
│       ├── logout/           # 登出
│       └── me/               # 当前用户
├── components/               # 通用组件
│   ├── ui/                   # shadcn 风格 UI 组件
│   ├── header.tsx            # 顶部导航
│   └── auth-nav.tsx          # 登录状态导航
├── lib/                      # 工具库
│   ├── auth.ts               # JWT + 密码加密
│   ├── session.ts            # 会话读取
│   ├── session-token.ts      # Edge 运行时 token 验证
│   ├── db.ts                 # Prisma 客户端
│   └── utils.ts              # cn() 工具函数
└── middleware.ts             # 路由保护
prisma/
├── schema.prisma             # 数据模型
└── config                   # Prisma 配置
```

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm

### 安装与运行

```bash
# 1. 安装依赖
npm install

# 2. 准备环境变量
cp .env.example .env   # 或手动创建 .env（见下方说明）

# 3. 初始化数据库
npx prisma generate
```

**注意**：`.env` 文件被 .gitignore 排除（含数据库地址和密钥），需手动创建。请参考：

```
DATABASE_URL="file:./dev.db"
AUTH_SECRET="你的会话密钥"
```

### 开发

```bash
npm run dev
```

打开 http://localhost:3000

### 生产构建

```bash
npm run build
npm run start
```

## ⚙️ 配置 AI 功能

AI 功能（写作批改、口语陪练、词汇联想）需要用户自行配置 OpenAI API Key：

1. 在 https://platform.openai.com/api-keys 创建 API Key
2. 登录网站后，进入「设置」页面
3. 粘贴 API Key 并保存

> 说明：你的 API Key 仅保存在本地浏览器 / 服务器会话中，调用 OpenAI 产生的费用由自己承担。

## 🔒 认证说明

- 仅支持邮箱注册/登录
- 密码使用 bcrypt 加密存储
- 会话采用 JWT + HttpOnly Cookie，有效期 7 天
- `/dashboard` 和 `/settings` 受登录保护，未登录会跳转到登录页

## 🗺 开发路线

- [x] 项目初始化 + UI 组件库
- [x] 首页及各功能模块页面（词汇/听力/阅读/写作/口语）
- [x] 用户仪表盘
- [x] 邮箱认证系统（注册/登录/登出/会话）
- [ ] AI 功能对接（写作批改、口语陪练）
- [ ] 真实雅思题库与词汇数据接入
- [ ] 移动端适配优化
- [ ] 错题本与艾宾浩斯复习计划

## 📝 许可

本项目全部功能免费开放，仅供个人学习使用。