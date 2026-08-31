# Career Decision OS

> 开放、双语、可解释的求职决策产品 · An open, bilingual, explainable career-decision product

把公开职位信号转化为清晰的研究优先级和每周行动。仓库只使用虚构候选人资料与公开公司/职位来源，可供任何人体验、学习和二次开发。

Career Decision OS turns public job signals into explainable priorities and weekly actions. It ships with fictional candidate data, public company and job-source records, and an account-free demo for learning and adaptation.

## Online demo / 在线体验

[Open the live demo / 打开在线体验](https://career-decision-os.vercel.app)

## What you can explore / 可以体验什么

`Positions → Cities → Companies → JD → Skills & constraints → Decision → CV / Networking / Interview → Tracker → Weekly review`

- 面向 GCC、亚太、欧洲、以色列与南部非洲主要英语工作市场的城市和雇主雷达。
- 官方招聘官网、岗位 JD、来源状态与最近核验时间。
- 硬约束优先、加权因素随后显示的可解释岗位匹配。
- 基于同一份虚构经历库生成的四种示例 CV 叙事。
- Networking、面试准备、申请 tracker 与每周复盘流程。
- 中文/English 界面，以及桌面、平板和移动端响应式布局。

## Repository map / 仓库导航

| Folder | Purpose / 用途 |
| --- | --- |
| [`src/`](src/) | Next.js 网站源码：页面、组件、领域模型、评分和示例数据 |
| [`docs/`](docs/) | 架构、设计规范与部署/周更手册 |
| [`tests/e2e/`](tests/e2e/) | Playwright 端到端和响应式测试 |
| [`scripts/`](scripts/) | 公开内容审计、来源校验与文档检查 |
| [`supabase/`](supabase/) | 可选云端账号、数据库迁移和 Row Level Security |
| [`.github/workflows/`](.github/workflows/) | 每次更新自动运行的质量与隐私检查 |

根目录中的 `package.json`、Next.js、TypeScript、Vitest、Playwright 和 Vercel 配置是工具要求的标准入口，因此保留在根目录。

## Try it locally / 本地运行

Requirements: Node.js 24+ and pnpm 11.19+.

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000)。默认 demo mode 不需要账号或云服务。

## Quality and privacy / 质量与隐私

```bash
pnpm audit:public
pnpm test:public-policy
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

`pnpm check` 会运行公开内容审计、policy tests、lint、typecheck、单元/组件测试与 production build。审计会拒绝本地用户路径、个人邮箱、疑似凭证、owner-specific fingerprints 和不适合通用产品的宣传文案。

## Optional cloud mode / 可选云端模式

默认 `.env.example` 使用本地 demo 数据。若希望每位访客拥有独立持久账号，可以连接 Supabase 与 Vercel、应用数据库迁移、设置 `NEXT_PUBLIC_DEMO_MODE=false`，并阅读 [部署指南](docs/operations/deployment.md)。Row Level Security 隔离各账号数据。

## Decision model / 模型边界

分数只辅助确定研究优先级，不预测 offer，也不参与自动招聘决定。薪酬只是匹配度、成长空间、可达性、行动成本和个人偏好中的一个透明因素。请在行动前核验官方来源并自行作出最终决定。

## Contributing / 参与贡献

参阅 [CONTRIBUTING.md](CONTRIBUTING.md)。请勿在 issue、fixture、截图或 commit 中提交真实 CV、联系方式、申请笔记、凭证或其他个人数据。

Licensed under the MIT License.
