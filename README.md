# 快速引用 + 选区弹出菜单（DSH 插件）

DSH Client 插件：在 Harness Web UI 里选中回复中的一段文字，选区旁浮出一个**弹出菜单**胶囊，
提供「引用 / 问 / 执行」三个动作，并兼容不同版本的宿主（新宿主走 `uiConversation.interactions`
交互槽位，老宿主回退 `shell.overlay` 浮层），和核心的 `message-quotes` 共存时只显示**一个**浮层。

- **引用文本** → 把选中内容以蓝色 QuoteNode 引用进输入框当前光标处（正文走 `inputActions.insertQuote`，
  模型看到的是同一段 `> …` 块引用；不支持该动词的旧宿主回退字面 Markdown + `insertText`）。
- **问**（askagent）→ 选中内容 + 你的问题派给右侧栏的 askagent 子代理，回答留在那个会话里，不打断主对话。
- **执行**（execagent / exec）→ 选中内容作为任务交给子代理执行，结果回投主对话并唤醒主代理。

后两个动作需要 Host 半侧 [`dsh-askagent`](https://github.com/sprw-li/dsh-askagent) 提供的 `/askagent` 路由；
只装本插件时「引用文本」仍然可用。

## 安装

在 DSH profile 目录里（例如 `~/.dsh/profiles/desktop`）：

```bash
pnpm add link:/path/to/dsh-quick-quote
```

然后在 profile 的 `package.json` 里把包名加进 `dsh.profile.bundles`：

```json
"dsh": { "profile": { "bundles": ["@local/quick-quote"] } }
```

需要「问 / 执行」时再装 `dsh-askagent`（Host 半侧），两者共用一个 profile 即可。

## 兼容策略（compat menus）

| 宿主能力 | 浮层实现 |
| --- | --- |
| 有 `uiConversation.interactions` + `conversation.chat.text-interaction` | 注册 `quick-quote` 交互并覆盖内置 `quote` 表面；全局只有一个浮层，定位交给框架 |
| 只有 `shell.overlay` | 回退自绘胶囊，按选区 Range 的最后一个 client rect 定位（`position: fixed`） |
| 有核心 `message-quotes` | 不重复渲染第二个胶囊；消息底部操作行保留备用引用按钮 |
| 有 `inputActions.insertQuote` | 走 QuoteNode（一次撤销、蓝色引用 chip） |
| 没有 | 字面 Markdown 引用 + 光标插入，失败再降级到剪贴板 |

## 用法

在 Harness Web UI 里选中回复中的一段文字，选区旁边会浮出一个胶囊：`引用文本 | 问 | 执行`。点「引用文本」，选中的那段就以引用格式（蓝色 QuoteNode）写进输入框，光标停在引用块后面，接着写 prompt 即可；也可以直接按 `Alt+Q`。「问」把这段发给 askagent，「执行」把这段作为任务交给子代理。

## 用法

1. 在回复里选中一段文字（任意长度，正文即可）。
2. 选区上方浮出**一个**胶囊：`引用文本 | 问 | 执行`（靠近视口顶部时出现在选区下方）。
3. 点「引用文本」（或按 `Alt+Q`）→ 选中内容以**蓝色 QuoteNode** 写进输入框**当前光标处**；模型看到的内容仍是同一段 `> ...` 块引用（含来源行），输入框里已有的草稿不会丢。

只引用选中内容，不会引用整条回复。点按钮时选区不会被清掉。引用会带上来源行（会话、轮次、消息锚点），代码块以 ``` 围栏保留、表格按 Markdown 表格保留。单次引用最多 8000 字符，超出会截断并注明原文长度。

写入失败时统一兜底：把带来源的引用复制到剪贴板，并在底部弹出一句原因提示；按钮同步闪红字「失败·已复制」。

引用写到**选区所在的那个会话**：在主对话里选中就进主输入框；在右侧栏的 askagent / 子代理会话 / 侧栏提问里选中，就进那个侧栏会话自己的输入框（不会串到主框）。侧栏会话是只读历史（一次性子代理、已归档）或选区落在正文之外时，才回退到主输入框。askagent / exec 任务的首条 prompt 也带同一份来源锚点。

消息底部操作行（复制按钮那一排）也保留同一个引用按钮，作为备用入口；它只在选区属于**本条消息**时可用（鼠标、键盘激活都一样），不会拿别的会话或别的消息的选区来写。

## 实现

- **选区管线**：整个插件只有一份 `selectionchange` / `mouseup` / `keyup` 监听，按 animation frame 合并；浮层和每条消息的备用按钮都从这一个快照读取，不为每条消息各挂监听、也不在拖选时重复强制布局。
- **浮动按钮**：0.2.2 起走官方 `uiConversation.interactions` + `conversation.chat.text-interaction` 槽位：注册一个 `quick-quote` 交互，并用同一个组件覆盖内置的 `quote` 表面，因此选中文字时全局只有一个浮层；没有该接口的旧版才回退到 `shell.overlay`。胶囊外观直接复用内置引用按钮的浮动样式（`--dsw-alias-button-floating-fill` / `--dsw-elevation-panel` / `--dsw-font-xs-13`），所以两层视觉上是一套。槽位挂载时定位交给框架：Chat view 量这个盒子并按选区把它放到上方（组件本身 `position:static`，`data-surface` 标记该模式）；只有回退到 `shell.overlay` 的旧宿主才由组件自己用选区 Range 的最后一个 client rect 定位、`position:fixed` 放在选区上方。两种模式都避开输入框/可编辑区/本插件 UI 的选区；操作完成后调用表面的 `dismiss` 收起，旧挂载点则按原定时器收起。
- **写入桥**：`conversation.composer.dock` 槽位注册一个无渲染组件（session scope），持有 `inputActions` 与 `useInput` 草稿，把「插入引用」的动词挂到模块级 bridge 上供浮层调用。bridge 按 occurrence 区分同一个 Session 的多个挂载点。
- **写入目标**：选区锚点向上找 `[data-conversation-session]`（核心 Conversation 每个 occurrence 都带），用它查 bridge 里该会话的写入动词；`occurrenceElement` 优先返回包含当前选区的 occurrence。DOM 兜底和光标回落也限定在这个 occurrence 的 Lexical 编辑器内。
- **写入路径**：优先调用核心 `inputActions.insertQuote()`——它落一个 `QuoteNode`，编辑器里是蓝色引用 chip、整体一次撤销，模型可见文本仍由 `formatQuoteText` 还原成同一段 `> ...` 块引用；随后才是 `captureInsertion` 取当前光标/选区 span → `insertText` 在光标处插入 → 失败则 DOM `execCommand('insertText')` 写当前编辑器选区 → 再失败才 `setDraft` 追加 → 最后复制到剪贴板并提示原因。没有 `insertQuote` 的旧宿主直接走字面 Markdown 路径。
- **主会话身份**：由主列（非 `[data-rightbar-col]`）里实际挂载的 composer 维护，卸载即清理；子会话即使被主视图打开也不作为 main。不再把 `retainedBy.mainView > 0` 的某个会话永久缓存成 main。
- **侧栏打开时序**：`layout.openRightbar` 之后轮询重试 `sidebarRight.openResource`（最多 3s），等侧栏 Session surface 就绪，不再用固定 120ms sleep。
- **来源**：`conversation.chat.assistant-actions` 的每条消息按钮带 `data-quick-quote-message`，选区快照用 DOM 顺序取后方的消息锚点；`sessions` 快照取会话标题。来源行形如 `> —— 来源：会话「标题」(session-…) · 第 3 轮 · 消息 <id>`。
- **Markdown 还原**：选区用 `Range.cloneContents()` 走一遍轻量 DOM→Markdown，`pre` 还原 ``` 围栏（读取 language 类），`table` 还原表头/分隔行/数据行，列表、链接、行内代码、粗斜体也保留。
- 样式只用 `--dsw-*` 主题 token；文案走 Client locale 服务（`quick-quote` 命名空间，zh/en）。
- Host 半边（`index.js`）只保留空入口；临时诊断 `POST /quick-quote/log` 与 `report()` 已整段删除。
