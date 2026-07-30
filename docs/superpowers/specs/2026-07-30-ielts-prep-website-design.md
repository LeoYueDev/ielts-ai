# IELTS 备考网站设计文档

## 项目概述

面向中国考生的 AI 驱动雅思备考平台，覆盖听说读写四项，全部功能免费开放，AI 功能由用户配置自己的 API Key。

## 技术栈

### 前端
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **状态管理**: React Context / Zustand (按需)
- **表单**: React Hook Form + Zod

### 后端
- **API**: Next.js API Routes
- **数据库**: PostgreSQL
- **ORM**: Prisma
- **认证**: NextAuth.js (邮箱登录)

### AI 集成
- **模型**: OpenAI API (用户自带 API Key)
- **功能**: 写作批改、口语模拟、错题解析

### 部署
- **平台**: Vercel
- **域名**: 待定

## 核心功能模块

### 1. 词汇 (Vocabulary)
**词库:**
- 雅思核心词汇（约 3000-4000 词）
- 按逻辑词群分类（同义词、反义词、主题词）
- 听力高频词（179 考点词）
- 阅读同义替换词（538 考点词）

**免费功能:**
- 词表浏览（按词组分类）
- 单词详情（音标、释义、例句、音频）
- 学习进度追踪（已学/未学/掌握）

**练习模式:**
- **卡片模式**: 翻转卡片，看英文猜中文 / 看中文猜英文
- **选择题模式**: 四选一（英译中 / 中译英）
- **打字模式**: 听音拼写 / 看释义拼写
- **匹配模式**: 左右匹配（英文-中文）

**AI 增强 (需配置 API Key):**
- AI 生成例句（根据用户水平）
- AI 解释词根词缀记忆法
- AI 创建词汇联想网络
- 智能复习计划（艾宾浩斯遗忘曲线）

### 2. 听力 (Listening)
**免费功能:**
- 剑桥真题模拟练习 (Cambridge 4-18)
- 计时模拟考试
- 自动评分 + 答案对照
- 错题收藏

**AI 增强:**
- AI 生成额外练习题 (用户配置 API Key 后)
- 错题分析 + 解题思路讲解
- 听力原文精读 + 词汇标注

### 2. 阅读 (Reading)
**免费功能:**
- 真题练习 + 计时模拟
- 自动评分
- 错题收藏

**AI 增强:**
- 文章精读解析 (长难句分析)
- 词汇标注 + 同义词替换
- 错题详解 + 定位技巧

### 3. 写作 (Writing)
**免费功能:**
- 题目库 (Task 1 + Task 2)
- 范文展示
- 写作模板

**AI 核心 (需配置 API Key):**
- AI 批改作文
  - 四项评分 (TR/CC/LR/GRA)
  - 逐段反馈
  - 语法错误标注
  - 改进建议
  - 范文对比

### 4. 口语 (Speaking)
**免费功能:**
- 题库 (Part 1/2/3)
- 录音回听
- 参考答案

**AI 核心 (需配置 API Key):**
- AI 模拟考官对话
  - 实时语音交互 (Web Speech API)
  - 模拟真实考试流程
  - 评分反馈 (FC/LR/GRA/P)
  - 改进建议

### 5. 用户系统
**认证:**
- 邮箱注册/登录 (NextAuth.js Credentials Provider)
- 密码加密 (bcrypt)

**用户数据:**
- 学习进度追踪
- 成绩趋势图 (折线图)
- 每日打卡记录
- 错题本
- 收藏题目

**API Key 管理:**
- 用户配置 OpenAI API Key (加密存储)
- 本地验证 Key 有效性
- 用量统计 (可选)

## 页面结构

```
/                          # 首页 (产品介绍 + 功能入口)
/listening                 # 听力练习
/listening/practice/[id]   # 听力练习详情
/reading                   # 阅读练习
/reading/practice/[id]     # 阅读练习详情
/writing                   # 写作练习
/writing/task1             # Task 1 练习
/writing/task2             # Task 2 练习
/writing/ai-feedback       # AI 批改结果
/speaking                  # 口语练习
/speaking/part1            # Part 1 题库
/speaking/part2            # Part 2 题库
/speaking/part3            # Part 3 题库
/speaking/ai-practice      # AI 陪练
/dashboard                 # 用户仪表盘
/dashboard/progress        # 学习进度
/dashboard/scores          # 成绩趋势
/dashboard/mistakes        # 错题本
/settings                  # 设置
/settings/api-key          # API Key 配置
/settings/profile          # 个人资料
/auth/login                # 登录
/auth/register             # 注册
```

## 数据库设计

### User (用户)
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  name          String?
  openaiApiKey  String?   // 加密存储
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  practiceRecords  PracticeRecord[]
  writingTasks     WritingTask[]
  speakingSessions SpeakingSession[]
  mistakes         Mistake[]
  dailyCheckIns    DailyCheckIn[]
}
```

### PracticeRecord (练习记录)
```prisma
model PracticeRecord {
  id          String   @id @default(cuid())
  userId      String
  type        String   // listening | reading
  testId      String
  score       Int
  totalQuestions Int
  correctAnswers Int
  timeSpent   Int      // 秒
  answers     Json     // 详细答案记录
  createdAt   DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id])
}
```

### WritingTask (写作任务)
```prisma
model WritingTask {
  id          String   @id @default(cuid())
  userId      String
  taskType    String   // task1 | task2
  topic       String
  userContent String   @db.Text
  aiFeedback  Json?    // AI 批改结果
  score       Json?    // 四项评分
  createdAt   DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id])
}
```

### SpeakingSession (口语会话)
```prisma
model SpeakingSession {
  id          String   @id @default(cuid())
  userId      String
  part        String   // part1 | part2 | part3
  topic       String
  transcript  Json     // 对话记录
  feedback    Json?    // AI 反馈
  score       Json?    // 四项评分
  createdAt   DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id])
}
```

### Mistake (错题)
```prisma
model Mistake {
  id          String   @id @default(cuid())
  userId      String
  type        String   // listening | reading
  questionId  String
  userAnswer  String
  correctAnswer String
  explanation String?  @db.Text
  createdAt   DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id])
}
```

### DailyCheckIn (打卡)
```prisma
model DailyCheckIn {
  id        String   @id @default(cuid())
  userId    String
  date      DateTime
  createdAt DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id])
  
  @@unique([userId, date])
}
```

## API 设计

### 认证 API
```
POST /api/auth/register    # 注册
POST /api/auth/login       # 登录
POST /api/auth/logout      # 登出
GET  /api/auth/session     # 获取会话
```

### 用户 API
```
GET  /api/user/profile     # 获取个人资料
PUT  /api/user/profile     # 更新个人资料
POST /api/user/api-key     # 配置 API Key
GET  /api/user/api-key     # 获取 API Key (脱敏)
DELETE /api/user/api-key   # 删除 API Key
```

### 练习 API
```
GET  /api/listening/tests          # 获取听力测试列表
GET  /api/listening/tests/[id]     # 获取测试详情
POST /api/listening/submit         # 提交答案
GET  /api/reading/tests            # 获取阅读测试列表
GET  /api/reading/tests/[id]       # 获取测试详情
POST /api/reading/submit           # 提交答案
```

### 写作 API
```
GET  /api/writing/topics           # 获取题目列表
POST /api/writing/submit           # 提交作文
POST /api/writing/ai-feedback      # 获取 AI 批改 (需 API Key)
```

### 口语 API
```
GET  /api/speaking/topics          # 获取题库
POST /api/speaking/session         # 创建会话
POST /api/speaking/ai-response     # AI 回应 (需 API Key)
POST /api/speaking/feedback        # 获取反馈 (需 API Key)
```

### 统计 API
```
GET  /api/stats/progress           # 学习进度
GET  /api/stats/scores             # 成绩趋势
GET  /api/stats/mistakes           # 错题列表
POST /api/stats/checkin            # 打卡
```

## AI 集成方案

### 写作批改 Prompt 设计
```typescript
const writingFeedbackPrompt = `
你是一位资深的雅思写作考官，请批改以下雅思作文。

作文类型: ${taskType}
题目: ${topic}
用户作文:
${userContent}

请按以下格式返回 JSON:
{
  "scores": {
    "taskResponse": { "score": 0-9, "feedback": "..." },
    "coherenceCohesion": { "score": 0-9, "feedback": "..." },
    "lexicalResource": { "score": 0-9, "feedback": "..." },
    "grammaticalRange": { "score": 0-9, "feedback": "..." }
  },
  "overallScore": 0-9,
  "paragraphFeedback": [
    { "paragraph": "...", "feedback": "...", "suggestions": ["..."] }
  ],
  "grammarErrors": [
    { "original": "...", "correction": "...", "explanation": "..." }
  ],
  "improvements": ["..."],
  "sampleAnswer": "..."
}
`;
```

### 口语陪练 Prompt 设计
```typescript
const speakingPrompt = `
你是一位雅思口语考官，正在进行 ${part} 的考试。
当前话题: ${topic}
之前的对话: ${transcript}

请提出下一个问题，保持自然对话 flow。
返回 JSON: { "question": "...", "followUp": "..." }
`;
```

## 安全考虑

1. **API Key 加密**: 使用 AES-256 加密存储用户的 OpenAI API Key
2. **密码安全**: bcrypt 加密，salt rounds = 12
3. **CORS**: 限制 API 访问来源
4. **Rate Limiting**: 防止 API 滥用
5. **输入验证**: Zod schema 验证所有用户输入
6. **XSS 防护**: 清理用户提交内容
7. **CSRF 防护**: NextAuth.js 内置

## 性能优化

1. **SSR/SSG**: 静态页面使用 SSG，动态页面使用 SSR
2. **图片优化**: next/image 自动优化
3. **代码分割**: 动态导入大组件
4. **缓存**: React Query 缓存 API 请求
5. **数据库索引**: 为常用查询字段添加索引

## 开发计划

### Phase 1: 基础架构 (Week 1)
- [ ] 项目初始化 + 依赖安装
- [ ] 数据库设计 + Prisma schema
- [ ] 认证系统 (邮箱登录)
- [ ] 基础布局 + 导航
- [ ] 首页

### Phase 2: 听力 + 阅读 (Week 2)
- [ ] 听力练习页面
- [ ] 阅读练习页面
- [ ] 自动评分逻辑
- [ ] 错题本功能

### Phase 3: 写作 + AI 批改 (Week 3)
- [ ] 写作练习页面
- [ ] AI 批改集成
- [ ] 批改结果展示

### Phase 4: 口语 + AI 陪练 (Week 4)
- [ ] 口语题库页面
- [ ] AI 对话集成
- [ ] 语音识别 + 合成

### Phase 5: 用户系统 (Week 5)
- [ ] 仪表盘
- [ ] 进度追踪
- [ ] 成绩趋势图
- [ ] 打卡功能

### Phase 6: 优化 + 部署 (Week 6)
- [ ] 性能优化
- [ ] 移动端适配
- [ ] SEO 优化
- [ ] 部署到 Vercel

## 后续扩展

1. **移动端 App**: React Native
2. **社区功能**: 用户分享作文、互相批改
3. **直播课**: 集成视频会议
4. **付费课程**: 名师录播课
5. **模考服务**: 真人考官模拟口语考试
