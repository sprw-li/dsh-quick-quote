window.__ModuleLoader__.load({
  id: '@local/quick-quote',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    /** Dictionary namespace owned by this plugin. */
    const NS = 'quick-quote'

    const zh = {
      'action.quote': '引用选中文字',
      'action.float': '引用文本',
      'action.ask': '问',
      'action.askTitle': '引用这段并问 askagent（先输入问题，再派发）',
      'ask.placeholder': '问 askagent…',
      'ask.send': '派发',
      'ask.error': '派发失败',
      'action.task': '执行',
      'action.taskTitle': '把选中的内容作为任务交给子代理执行，结果会回投主对话',
      'action.taskPrompt': '用户从对话正文中划定了下面这段内容，并把它作为交给你的任务：',
      'action.dispatched': '已派',
      'groups.title': '按来源分组的子代理',
      'groups.trigger': '分组',
      'groups.count': '{count} 个子智能体',
      'groups.ask': '提问 · askagent',
      'groups.exec': '执行 · exec',
      'groups.sub': '子代理 · 模型发起',
      'groups.subName': '子代理',
      'groups.empty': '暂无',
      'groups.running': '运行中',
      'groups.idle': '空闲',
      'action.asking': '开启中',
      'action.asked': '已开',
      'action.failed': '失败',
      'action.hint': '先在回复里选中一段文字',
      'action.quoted': '已引用',
      'action.failedCopied': '失败·已复制',
      'action.quoteHotkey': '引用选中文字（Alt+Q）',
      'quote.source': '—— 来源：{detail}',
      'quote.session': '会话 {id}',
      'quote.sessionTitled': '会话「{title}」({id})',
      'quote.turn': '第 {turn} 轮',
      'quote.message': '消息 {id}',
      'quote.truncated': '（引用过长，已截断至 {kept} 字，原文 {total} 字）',
      'quote.reasonNoEditor': '找不到可写入的输入框，引用已复制到剪贴板',
      'quote.reasonRejected': '输入框拒绝写入，引用已复制到剪贴板',
      'quote.reasonClipboard': '写入失败，且剪贴板不可用',
      'side.title': '侧栏提问',
      'side.loading': '正在载入侧栏会话…',
      'side.openError': '侧栏尚未就绪，重试后仍未能打开',
    }
    const en = {
      'action.quote': 'Quote selection',
      'action.float': 'Quote text',
      'action.ask': 'Ask',
      'action.askTitle': 'Quote this and ask an askagent (type the question first)',
      'ask.placeholder': 'Ask the askagent…',
      'ask.send': 'Dispatch',
      'ask.error': 'Could not dispatch',
      'action.task': 'Run',
      'action.taskTitle': 'Hand the selected passage to a subagent as its task; the result comes back to this conversation',
      'action.taskPrompt': 'The user selected the following passage in the conversation and hands it to you as your task:',
      'action.dispatched': 'Sent',
      'groups.title': 'Child agents grouped by origin',
      'groups.trigger': 'Groups',
      'groups.count': '{count} subagents',
      'groups.ask': 'Questions · askagent',
      'groups.exec': 'Execution · exec',
      'groups.sub': 'Subagents · model-started',
      'groups.subName': 'Subagent',
      'groups.empty': 'None',
      'groups.running': 'Running',
      'groups.idle': 'Idle',
      'action.asking': 'Opening',
      'action.asked': 'Opened',
      'action.failed': 'Failed',
      'action.hint': 'Select some text in the reply first',
      'action.quoted': 'Quoted',
      'action.failedCopied': 'Failed · copied',
      'action.quoteHotkey': 'Quote selection (Alt+Q)',
      'quote.source': '— Source: {detail}',
      'quote.session': 'session {id}',
      'quote.sessionTitled': 'session "{title}" ({id})',
      'quote.turn': 'turn {turn}',
      'quote.message': 'message {id}',
      'quote.truncated': '(quote truncated to {kept} of {total} characters)',
      'quote.reasonNoEditor': 'No composer could take the quote; it was copied to the clipboard instead',
      'quote.reasonRejected': 'The composer rejected the write; the quote was copied to the clipboard instead',
      'quote.reasonClipboard': 'The write failed and the clipboard is unavailable',
      'side.title': 'Side question',
      'side.loading': 'Loading the side chat...',
      'side.openError': 'The sidebar did not become ready after retrying',
    }

    const CSS = `
.qqz_action{width:calc(28px + var(--dsh-content-font-delta,0px));height:calc(28px + var(--dsh-content-font-delta,0px));border-radius:var(--dsw-radius-sm);color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:none;justify-content:center;align-items:center;padding:6px;display:inline-flex}
.qqz_action svg{width:calc(17px + var(--dsh-content-font-delta,0px));height:calc(17px + var(--dsh-content-font-delta,0px))}
.qqz_action:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}
.qqz_action[data-enabled="false"]{opacity:.55}
.qqz_action[data-done]{color:var(--dsw-alias-state-success-primary)}
.qqz_action[data-failed]{color:var(--dsw-alias-state-error-primary)}
.qqz_float{position:fixed;z-index:30;display:inline-flex;align-items:stretch;height:30px;box-sizing:border-box;padding:2px;border-radius:999px;border:none;background:var(--dsw-alias-button-floating-fill);--dsw-elevation-stroke-color:var(--dsw-alias-border-l3);box-shadow:var(--dsw-elevation-panel);color:var(--dsw-alias-label-primary);font:var(--dsw-font-xs-13);line-height:1;pointer-events:auto;user-select:none;white-space:nowrap;transform:translateX(-50%);overflow:hidden}
.qqz_float button{display:inline-flex;align-items:center;gap:4px;height:100%;padding:0 10px;border:0;border-radius:999px;background:transparent;color:inherit;font:inherit;cursor:pointer}
.qqz_float button:hover{background:var(--dsw-alias-button-floating-hover)}
.qqz_float button:disabled{cursor:default;opacity:.61}
.qqz_float button[data-done]{color:var(--dsw-alias-state-success-primary)}
.qqz_float button[data-failed]{color:var(--dsw-alias-state-error-primary)}
.qqz_float svg{width:14px;height:14px;display:block}
.qqz_float[data-surface]{position:static;transform:none}
.qqz_ask[data-surface]{position:static;transform:none;width:min(380px,calc(100vw - 24px))}
.qqz_toast[data-surface]{position:static;transform:none;margin-top:4px;max-width:100%}
.qqz_sep{width:1px;background:var(--dsw-alias-border-l3);margin:6px 0;flex:none}
.qqz_side{height:100%;min-height:0;display:flex;flex-direction:column;overflow:hidden}
.qqz_side[data-loading]{align-items:center;justify-content:center;color:var(--dsw-alias-label-secondary);font-size:12px}
.qqz_ask{position:fixed;z-index:30;display:flex;flex-direction:column;gap:6px;width:380px;max-width:calc(100vw - 24px);padding:9px 10px;border-radius:10px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:1.4;transform:translateX(-50%);box-shadow:var(--dsw-elevation-prominent);pointer-events:auto}
.qqz_ask_quote{color:var(--dsw-alias-label-secondary);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.qqz_ask_row{display:flex;align-items:center;gap:6px}
.qqz_ask_input{flex:1;min-width:0;height:28px;padding:0 8px;border-radius:6px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;outline:none}
.qqz_ask_input:focus{border-color:var(--dsw-alias-brand-primary)}
.qqz_ask_send{height:28px;padding:0 12px;border-radius:6px;border:1px solid var(--dsw-alias-brand-primary);background:var(--dsw-alias-brand-primary);color:#fff;font:inherit;cursor:pointer;flex:none}
.qqz_ask_send:disabled{opacity:.55;cursor:default}
.qqz_ask_error{color:var(--dsw-alias-state-error-primary);font-size:11px}
.qqz_toast{position:fixed;z-index:80;left:50%;bottom:24px;transform:translateX(-50%);max-width:min(520px,calc(100vw - 32px));box-sizing:border-box;padding:8px 14px;border-radius:var(--dsw-radius-md);border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:18px;box-shadow:var(--dsw-elevation-prominent);pointer-events:none}
.qqz_toast[data-kind="error"]{border-color:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary)}
.qqz_groups{position:relative;display:inline-flex;align-items:center}
.qqz_groups_btn{display:inline-flex;align-items:center;gap:5px;height:28px;padding:0 7px;border-radius:var(--dsw-radius-sm);border:0;background:transparent;color:var(--dsw-alias-label-tertiary);font:inherit;font-size:12px;line-height:18px;cursor:pointer;white-space:nowrap}
.qqz_groups_btn:hover,.qqz_groups_btn:focus-visible{color:var(--dsw-alias-label-primary)}
.qqz_groups_btn svg{flex:none;opacity:.7}
.qqz_groups_dot{width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-state-idle-primary);flex:none}
.qqz_groups_dot[data-running="true"]{background:var(--dsw-alias-state-success-primary)}
.qqz_groups_menu{position:fixed;z-index:60;box-sizing:border-box;width:336px;max-width:min(400px,calc(100vw - 32px));max-height:min(560px,calc(100vh - 140px));overflow:auto;padding:4px;border-radius:var(--dsw-radius-lg);border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-overlay);box-shadow:var(--dsw-elevation-prominent);display:flex;flex-direction:column}
.qqz_groups_title{font-size:11px;font-weight:600;letter-spacing:.02em;color:var(--dsw-alias-label-tertiary);padding:10px 8px 4px}
.qqz_groups_title:first-child{padding-top:6px}
.qqz_groups_empty{font-size:12px;color:var(--dsw-alias-label-tertiary);padding:2px 8px 6px}
.qqz_groups_row{display:flex;align-items:center;gap:8px;width:100%;min-height:40px;text-align:left;padding:5px 8px;border:0;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer}
.qqz_groups_row:hover,.qqz_groups_row:focus-visible{background:var(--dsw-alias-interactive-bg-hover)}
.qqz_groups_text{display:flex;flex-direction:column;flex:1;min-width:0;gap:1px}
.qqz_groups_primary{font-size:13px;line-height:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.qqz_groups_secondary{font-size:11px;line-height:15px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.qqz_groups_state{font-size:11px;color:var(--dsw-alias-label-tertiary);flex:none}
.qqz_groups_state[data-running="true"]{color:var(--dsw-alias-state-success-primary)}
`

    /** Root Client context captured by `apply`, used for late service lookup. */
    let hostCtx = null

    function service(name) {
      try {
        return hostCtx === null ? undefined : hostCtx.get(name)
      } catch {
        return undefined
      }
    }

    /** Quote-block glyph in the host's thin line style. */
    function QuoteIcon() {
      return h(
        'svg',
        {
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          style: { display: 'block' },
        },
        h('path', { d: 'M3 12v6' }),
        h('path', { d: 'M17 6H3' }),
        h('path', { d: 'M21 12H8' }),
        h('path', { d: 'M21 18H8' }),
      )
    }

    function DoneIcon() {
      return h(
        'svg',
        {
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          style: { display: 'block' },
        },
        h('path', { d: 'M5 12.8l4.4 4.2L19 7' }),
      )
    }

    function ChatIcon() {
      return h(
        'svg',
        {
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          style: { display: 'block' },
        },
        h('path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' }),
      )
    }

    function PlayIcon() {
      return h(
        'svg',
        {
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          style: { display: 'block' },
        },
        h('path', { d: 'M7 4.5v15l12.5-7.5z' }),
      )
    }

    function ChevronIcon() {
      return h(
        'svg',
        {
          viewBox: '0 0 24 24',
          width: 12,
          height: 12,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          style: { display: 'block' },
        },
        h('path', { d: 'M6 9l6 6 6-6' }),
      )
    }

    /** Upper bound of one quoted passage; long selections are trimmed. */
    const MAX_QUOTE_CHARS = 8000

    /** Locale lookup installed by `apply`; helpers below run outside React. */
    let tr = (key, params) => {
      if (key === 'quote.source') return `—— 来源：${params.detail}`
      if (key === 'quote.session') return `会话 ${params.id}`
      if (key === 'quote.sessionTitled') return `会话「${params.title}」(${params.id})`
      if (key === 'quote.turn') return `第 ${params.turn} 轮`
      if (key === 'quote.message') return `消息 ${params.id}`
      if (key === 'quote.truncated') return `（引用过长，已截断至 ${params.kept} 字，原文 ${params.total} 字）`
      return key
    }

    /** Markdown blockquote over every line of the selected passage. */
    function toBlockquote(text) {
      const value = String(text || '').replace(/\r\n/g, '\n').replace(/^\n+|\n+$/g, '')
      if (value === '') return ''
      const lines = value.split('\n')
      return lines.map((line) => (line.trim() === '' ? '>' : `> ${line}`)).join('\n')
    }

    function closestElement(node) {
      if (node === null || node === undefined) return null
      return node.nodeType === 1 ? node : node.parentElement
    }

    function longestRun(text, character) {
      let longest = 0
      let current = 0
      for (const value of String(text)) {
        if (value === character) {
          current += 1
          if (current > longest) longest = current
        } else {
          current = 0
        }
      }
      return longest
    }

    function codeLanguage(element) {
      try {
        const className = typeof element.className === 'string' ? element.className : ''
        const match = /(?:language|lang)-([\w+#.-]+)/.exec(className)
        if (match !== null) return match[1]
        const attribute = element.getAttribute('data-language')
        return attribute === null || attribute === undefined ? '' : String(attribute).trim()
      } catch {
        return ''
      }
    }

    function inlineText(text) {
      return String(text).replace(/\u00a0/g, ' ').replace(/[ \t\r\n]+/g, ' ')
    }

    function wrapInline(marker, value) {
      const text = String(value).trim()
      return text === '' ? String(value) : `${marker}${text}${marker}`
    }

    function trimBlock(text) {
      return String(text || '')
        .replace(/^[ \t]*\n+/, '')
        .replace(/\n+[ \t]*$/, '')
        .replace(/[ \t]+$/gm, '')
    }

    function block(text) {
      const value = trimBlock(text)
      return value === '' ? '' : `\n${value}\n`
    }

    function renderChildren(node, options) {
      let output = ''
      for (const child of node.childNodes) output += renderNode(child, options)
      return output
    }

    /** Convert one cloned selection fragment into Markdown, preserving fences and tables. */
    function renderNode(node, options) {
      if (node.nodeType === 3) return options !== undefined && options.pre === true ? node.nodeValue : inlineText(node.nodeValue)
      if (node.nodeType !== 1) return ''
      const element = node
      const tag = element.tagName.toLowerCase()
      if (tag === 'script' || tag === 'style' || tag === 'svg' || tag === 'button' || tag === 'input' || tag === 'textarea' || tag === 'select') return ''
      if (element.hasAttribute('data-quick-quote') || element.hasAttribute('data-quick-quote-float') || element.hasAttribute('data-quick-quote-toast')) return ''
      if (tag === 'pre') {
        const codeElement = element.querySelector('code') || element
        const code = String(codeElement.textContent || '').replace(/\r\n/g, '\n').replace(/\n$/, '')
        const language = codeLanguage(codeElement) || codeLanguage(element)
        return `\n\`\`\`${language}\n${code}\n\`\`\`\n\n`
      }
      if (tag === 'table') return `\n${tableMarkdown(element)}\n\n`
      if (tag === 'br') return '\n'
      if (tag === 'hr') return '\n\n---\n\n'
      if (tag === 'img') {
        const alt = String(element.getAttribute('alt') || '')
        const src = String(element.getAttribute('src') || '')
        return src === '' ? '' : `![${alt}](${src})`
      }
      if (tag === 'a') {
        const inner = renderChildren(element, options).trim()
        const href = String(element.getAttribute('href') || '')
        /* A selection that starts inside a link can clone the anchor without its
           text; keep the target instead of dropping the link entirely. */
        if (inner === '') return href
        return href === '' ? inner : `[${inner}](${href})`
      }
      if (tag === 'code') {
        const text = String(element.textContent || '')
        const ticks = '`'.repeat(Math.max(1, longestRun(text, '`') + 1))
        return `${ticks}${text}${ticks}`
      }
      if (tag === 'strong' || tag === 'b') return wrapInline('**', renderChildren(element, options))
      if (tag === 'em' || tag === 'i') return wrapInline('*', renderChildren(element, options))
      if (tag === 'del' || tag === 's') return wrapInline('~~', renderChildren(element, options))
      if (tag === 'ul' || tag === 'ol') return `\n${listMarkdown(element, options)}\n`
      /* A fragment cloned from a partial list selection can carry bare `li`
         nodes; keep them as list items instead of gluing them into one line. */
      if (tag === 'li') {
        const item = trimBlock(renderChildren(element, options))
        if (item === '') return ''
        const lines = item.split('\n')
        return `\n- ${lines[0]}${lines.slice(1).map((line) => `\n  ${line}`).join('')}\n`
      }
      if (tag === 'blockquote') {
        const inner = trimBlock(renderChildren(element, options))
        if (inner === '') return ''
        return `\n${inner
          .split('\n')
          .map((line) => (line === '' ? '>' : `> ${line}`))
          .join('\n')}\n`
      }
      const inner = renderChildren(element, options)
      if (/^(p|div|section|article|header|footer|aside|main|figure|figcaption|dl|dt|dd|h[1-6])$/.test(tag)) {
        return block(inner)
      }
      return inner
    }

    function listMarkdown(element, options) {
      const ordered = element.tagName.toLowerCase() === 'ol'
      const start = Number(element.getAttribute('start') || 1)
      const first = Number.isFinite(start) ? start : 1
      const items = []
      let index = 0
      for (const child of element.children) {
        if (child.tagName.toLowerCase() !== 'li') continue
        const value = trimBlock(renderChildren(child, options))
        if (value === '') continue
        const marker = ordered ? `${first + index}.` : '-'
        index += 1
        const indent = ' '.repeat(marker.length + 1)
        const lines = value.split('\n')
        items.push(`${marker} ${lines[0]}${lines.slice(1).map((line) => `\n${indent}${line}`).join('')}`)
      }
      return items.join('\n')
    }

    function cellMarkdown(cell) {
      return trimBlock(renderChildren(cell, {}))
        .replace(/\n+/g, '<br>')
        .replace(/\|/g, '\\|')
    }

    function tableRowsMarkdown(rows) {
      if (rows.length === 0) return ''
      const width = rows.reduce((widest, row) => Math.max(widest, row.length), 0)
      const pad = (row) => {
        while (row.length < width) row.push('')
        return row
      }
      const header = pad(rows[0].slice())
      const lines = [`| ${header.join(' | ')} |`, `| ${header.map(() => '---').join(' | ')} |`]
      for (const row of rows.slice(1)) lines.push(`| ${pad(row.slice()).join(' | ')} |`)
      return lines.join('\n')
    }

    function tableMarkdown(table) {
      const rows = []
      for (const row of table.querySelectorAll('tr')) {
        const cells = []
        for (const cell of row.children) {
          const tag = cell.tagName.toLowerCase()
          if (tag !== 'td' && tag !== 'th') continue
          cells.push(cellMarkdown(cell))
        }
        if (cells.length > 0) rows.push(cells)
      }
      return tableRowsMarkdown(rows)
    }

    /** Structure-preserving table Markdown for a selection that starts and ends inside a table. */
    function tableRangeMarkdown(table, range) {
      const rows = []
      for (const row of table.querySelectorAll('tr')) {
        if (!range.intersectsNode(row)) continue
        const cells = []
        for (const cell of row.children) {
          const tag = cell.tagName.toLowerCase()
          if (tag !== 'td' && tag !== 'th') continue
          if (!range.intersectsNode(cell)) continue
          cells.push(cellMarkdown(cell))
        }
        if (cells.length > 0) rows.push(cells)
      }
      return tableRowsMarkdown(rows)
    }

    /**
     * Structure-preserving list Markdown for a selection that starts and ends
     * inside one list. A partial selection clones bare `li` nodes without their
     * `ul`/`ol` wrapper, so reading the list itself is the only way to keep the
     * markers and the real item numbers.
     */
    function listRangeMarkdown(list, range) {
      const ordered = list.tagName.toLowerCase() === 'ol'
      const start = Number(list.getAttribute('start') || 1)
      const first = Number.isFinite(start) && start > 0 ? start : 1
      const items = []
      let index = 0
      for (const item of list.children) {
        if (item.tagName.toLowerCase() !== 'li') continue
        const marker = ordered ? `${first + index}.` : '-'
        index += 1
        if (!range.intersectsNode(item)) continue
        const value = trimBlock(renderChildren(item, {}))
        if (value === '') continue
        const indent = ' '.repeat(marker.length + 1)
        const lines = value.split('\n')
        items.push(`${marker} ${lines[0]}${lines.slice(1).map((line) => `\n${indent}${line}`).join('')}`)
      }
      return items.join('\n')
    }

    /** Markdown of one live selection Range; falls back to plain selection text. */
    function selectionToMarkdown(range) {
      try {
        const start = closestElement(range.startContainer)
        const end = closestElement(range.endContainer)
        const startPre = start === null ? null : start.closest('pre')
        const endPre = end === null ? null : end.closest('pre')
        if (startPre !== null && startPre === endPre) {
          const codeElement = startPre.querySelector('code') || startPre
          const code = range.toString().replace(/\r\n/g, '\n').replace(/\n$/, '')
          const language = codeLanguage(codeElement) || codeLanguage(startPre)
          return `\`\`\`${language}\n${code}\n\`\`\``
        }
        const holder = document.createElement('div')
        holder.appendChild(range.cloneContents())
        const startTable = start === null ? null : start.closest('table')
        const endTable = end === null ? null : end.closest('table')
        if (startTable !== null && startTable === endTable) {
          const startCell = start.closest('td, th')
          const endCell = end.closest('td, th')
          /* cloneContents can hand back a bare tbody/tr fragment for a partial
             table selection; rebuild the rows that intersect the range instead. */
          if (startCell !== endCell && holder.querySelector('table') === null) {
            return trimBlock(tableRangeMarkdown(startTable, range))
          }
        }
        const startList = start === null ? null : start.closest('ul, ol')
        const endList = end === null ? null : end.closest('ul, ol')
        if (startList !== null && startList === endList) {
          /* Same partial-selection problem as tables: cloneContents drops the
             list wrapper, so read the intersecting items from the list itself. */
          const listed = trimBlock(listRangeMarkdown(startList, range))
          if (listed !== '') return listed
        }
        const markdown = trimBlock(renderChildren(holder, {}))
        return markdown === '' ? range.toString() : markdown
      } catch {
        return ''
      }
    }

    function clampQuote(markdown) {
      const text = String(markdown || '')
      if (text.length <= MAX_QUOTE_CHARS) return { markdown: text, truncated: false, total: text.length }
      let cut = text.lastIndexOf('\n', MAX_QUOTE_CHARS)
      if (cut < Math.floor(MAX_QUOTE_CHARS * 0.6)) cut = MAX_QUOTE_CHARS
      let head = text.slice(0, cut).replace(/\s+$/, '')
      const fences = (head.match(/^```/gm) || []).length
      if (fences % 2 === 1) head += '\n```'
      return { markdown: `${head}\n\n…`, truncated: true, total: text.length }
    }

    function sessionTitle(sessionId) {
      if (sessionId === undefined || sessionId === '') return ''
      try {
        const sessions = service('sessions')
        const byId = sessions && sessions.list && sessions.list.getSnapshot ? sessions.list.getSnapshot().byId : null
        const summary = byId === null || byId === undefined ? undefined : byId[sessionId]
        return summary && typeof summary.title === 'string' ? summary.title.trim() : ''
      } catch {
        return ''
      }
    }

    /** Child Sessions are conversations, but they are never the main identity. */
    function sessionIsSubagent(sessionId) {
      if (sessionId === undefined || sessionId === '') return false
      try {
        const sessions = service('sessions')
        const byId = sessions && sessions.list && sessions.list.getSnapshot ? sessions.list.getSnapshot().byId : null
        const summary = byId === null || byId === undefined ? undefined : byId[sessionId]
        return summary !== undefined && summary !== null && summary.origin === 'subagent'
      } catch {
        return false
      }
    }

    /** One human-readable source line carrying both stable anchors. */
    function quoteSource(payload) {
      const parts = []
      const sessionId = payload.sessionId === undefined ? '' : String(payload.sessionId)
      if (sessionId !== '') {
        const title = sessionTitle(sessionId).replace(/\s+/g, ' ').trim()
        parts.push(title === '' ? tr('quote.session', { id: sessionId }) : tr('quote.sessionTitled', { title, id: sessionId }))
      }
      if (payload.turn !== undefined && payload.turn !== '') parts.push(tr('quote.turn', { turn: payload.turn }))
      if (payload.messageId !== undefined && payload.messageId !== '') parts.push(tr('quote.message', { id: payload.messageId }))
      if (parts.length === 0) return ''
      return tr('quote.source', { detail: parts.join(' · ') })
    }

    /** Complete blockquote text, including source anchors and truncation note. */
    function quoteBlock(payload) {
      const body = toBlockquote(payload.markdown)
      if (body === '') return ''
      let output = body
      if (payload.truncated === true) {
        output += `\n>\n> _${tr('quote.truncated', { kept: payload.markdown.length, total: payload.originalLength })}_`
      }
      const source = quoteSource(payload)
      if (source !== '') output += `\n>\n> ${source}`
      return output
    }

    /**
     * The same complete quote without blockquote markers. The composer owns one
     * `QuoteNode` per quote and re-adds the markers itself (`formatQuoteText`), so
     * passing the decoded text keeps the model-visible blockquote byte-identical
     * while the editor shows the blue quote chip instead of literal `>` lines.
     */
    function quoteNodeText(payload) {
      const blockText = quoteBlock(payload)
      if (blockText === '') return ''
      return blockText
        .split('\n')
        .map((line) => (line === '>' ? '' : line.startsWith('> ') ? line.slice(2) : line))
        .join('\n')
    }

    function buildQuotePayload(found, overrides) {
      const markdown = trimBlock(found.markdown === undefined ? selectionToMarkdown(found.range) : found.markdown)
      const clamped = clampQuote(markdown === '' ? found.text : markdown)
      const messageId = found.messageId === undefined && overrides !== undefined ? overrides.messageId : found.messageId
      const turn = found.turn === undefined && overrides !== undefined ? overrides.turn : found.turn
      return {
        markdown: clamped.markdown,
        truncated: clamped.truncated,
        originalLength: clamped.total,
        sessionId: found.sessionId,
        messageId,
        turn,
      }
    }

    async function copyText(text) {
      try {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          await navigator.clipboard.writeText(text)
          return true
        }
      } catch {
        /* fall through to the textarea path */
      }
      try {
        const area = document.createElement('textarea')
        area.value = text
        area.setAttribute('readonly', '')
        area.style.position = 'fixed'
        area.style.top = '-1000px'
        area.style.opacity = '0'
        document.body.appendChild(area)
        area.select()
        const copied = document.execCommand('copy')
        area.remove()
        return copied === true
      } catch {
        return false
      }
    }

    /* One toast host in the shell overlay; any quote path can report a failure. */
    const toast = { value: null, seq: 0, timer: 0, listeners: new Set() }
    function notify(text, kind) {
      if (text === '') return
      toast.seq += 1
      toast.value = { id: toast.seq, text, kind: kind === undefined ? 'info' : kind }
      for (const listener of [...toast.listeners]) listener(toast.value)
      if (toast.timer !== 0) window.clearTimeout(toast.timer)
      toast.timer = window.setTimeout(() => {
        toast.timer = 0
        toast.value = null
        for (const listener of [...toast.listeners]) listener(null)
      }, 3200)
    }
    function subscribeToast(listener) {
      toast.listeners.add(listener)
      return () => toast.listeners.delete(listener)
    }
    function reasonKey(reason) {
      if (reason === 'no-editor') return 'quote.reasonNoEditor'
      return 'quote.reasonRejected'
    }

    /**
     * Find a composer's Lexical root, if it is mounted. `scope` names the
     * Conversation occurrence the quote belongs to; without it the first mounted
     * editor is used, which is the main conversation in practice.
     */
    function composerRoot(scope) {
      try {
        if (scope !== null && scope !== undefined && scope.isConnected === true) {
          const scoped = scope.querySelector('[data-lexical-editor="true"][contenteditable="true"]')
          if (scoped !== null) return scoped
        }
        return document.querySelector('[data-lexical-editor="true"][contenteditable="true"]')
      } catch {
        return null
      }
    }

    /** Focus without moving the caret: Lexical restores the selection it just wrote. */
    function focusComposer(scope) {
      try {
        const root = composerRoot(scope)
        if (root === null) return
        if (root.contains(document.activeElement)) return
        root.focus({ preventScroll: true })
      } catch {
        /* focusing is a convenience, never a requirement */
      }
    }

    /** Type into the live editor selection (or its end) as plain input, bypassing the API. */
    function insertViaDom(block, scope) {
      try {
        const root = composerRoot(scope)
        if (root === null) return 'no-editor'
        const selection = window.getSelection()
        let hasCaret = false
        if (selection !== null && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          hasCaret = root.contains(range.startContainer) && root.contains(range.endContainer)
        }
        root.focus({ preventScroll: true })
        if (!hasCaret && selection !== null) {
          const range = document.createRange()
          range.selectNodeContents(root)
          range.collapse(false)
          selection.removeAllRanges()
          selection.addRange(range)
        }
        return document.execCommand('insertText', false, block) ? 'ok' : 'exec-false'
      } catch {
        return 'error'
      }
    }

    /**
     * Write one quote through the richest path that works. The framework's own
     * `inputActions.insertQuote` goes first: it lands a `QuoteNode`, so the quote
     * is a blue chip in the composer and stays one atomic undo step. The literal
     * Markdown paths stay as fallbacks for hosts without that verb. The API path
     * uses the live draft caret, so a quote no longer always lands at the end.
     */
    function insertQuote(payload, inputActions, currentDraft, scope) {
      const blockText = quoteBlock(payload)
      if (blockText === '') return { ok: false, reason: 'empty' }
      if (inputActions !== undefined) {
        const nodeText = quoteNodeText(payload)
        try {
          if (
            nodeText !== ''
            && typeof inputActions.insertQuote === 'function'
            && inputActions.insertQuote(nodeText) === true
          ) {
            focusComposer(scope)
            return { ok: true, path: 'api-quote' }
          }
        } catch {
          /* fall through to the literal-text paths */
        }
      }
      if (inputActions !== undefined) {
        try {
          const span = inputActions.captureInsertion()
          if (span !== undefined && span !== null && typeof span.draftRev === 'number') {
            const insertion = `${span.start === 0 ? '' : '\n\n'}${blockText}\n\n`
            if (inputActions.insertText(insertion, span) === true) {
              focusComposer(scope)
              return { ok: true, path: 'api-insert' }
            }
          }
        } catch {
          /* fall through to the DOM path */
        }
      }
      if (insertViaDom(`${blockText}\n\n`, scope) === 'ok') {
        focusComposer(scope)
        return { ok: true, path: 'dom' }
      }
      if (inputActions !== undefined) {
        try {
          const current = typeof currentDraft === 'string' ? currentDraft : ''
          const base = current.replace(/\s+$/, '')
          inputActions.setDraft(base === '' ? `${blockText}\n\n` : `${base}\n\n${blockText}\n\n`)
          focusComposer(scope)
          return { ok: true, path: 'api-setdraft' }
        } catch {
          /* fall through */
        }
      }
      return { ok: false, reason: scope === undefined ? 'no-editor' : 'rejected' }
    }

    /** Closest message anchor after the selection; each assistant action row publishes one. */
    function messageAnchorForRange(range, occurrence) {
      try {
        const anchors = occurrence.querySelectorAll('[data-quick-quote-message]')
        let following = null
        let preceding = null
        for (const anchor of anchors) {
          let relation
          try {
            relation = range.comparePoint(anchor, 0)
          } catch {
            continue
          }
          if (relation === 1) {
            if (following === null || (anchor.compareDocumentPosition(following) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0) {
              following = anchor
            }
          } else if (preceding === null || (preceding.compareDocumentPosition(anchor) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0) {
            preceding = anchor
          }
        }
        const chosen = following === null ? preceding : following
        if (chosen === null) return { messageId: undefined, turn: undefined }
        const tail = chosen.closest('[data-turn-tail]')
        return {
          messageId: String(chosen.getAttribute('data-quick-quote-message') || '') || undefined,
          turn: tail === null ? undefined : String(tail.getAttribute('data-turn-tail') || '') || undefined,
        }
      } catch {
        return { messageId: undefined, turn: undefined }
      }
    }

    /** Prose selection on the page, ignoring editors, inputs and this UI. */
    function readChatSelection(options) {
      const measure = options === undefined || options.measure !== false
      try {
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) return null
        const range = selection.getRangeAt(0)
        const anchor = selection.anchorNode
        const element = anchor && (anchor.nodeType === 1 ? anchor : anchor.parentElement)
        if (!element || typeof element.closest !== 'function') return null
        if (
          element.closest(
            'input, textarea, select, [contenteditable=""], [contenteditable="true"], [data-quick-quote], [data-quick-quote-float], [data-quick-quote-toast], [data-quick-quote-bridge]',
          )
        ) {
          return null
        }
        const text = selection.toString()
        if (text.trim() === '') return null
        const occurrence = element.closest('[data-conversation-session]')
        const sessionId =
          occurrence === null ? undefined : String(occurrence.getAttribute('data-conversation-session') || '') || undefined
        const source = occurrence === null ? { messageId: undefined, turn: undefined } : messageAnchorForRange(range, occurrence)
        let rect = null
        if (measure) {
          const rects = range.getClientRects()
          const last = rects.length > 0 ? rects[rects.length - 1] : range.getBoundingClientRect()
          rect = { left: last.left, right: last.right, top: last.top, bottom: last.bottom }
        }
        return {
          text,
          at: Date.now(),
          range: range.cloneRange(),
          rect,
          sessionId,
          occurrence: occurrence === null ? undefined : occurrence,
          messageId: source.messageId,
          turn: source.turn,
        }
      } catch {
        return null
      }
    }

    /**
     * Placement input for one measured selection: the horizontal centre of the
     * last selected line plus its vertical bounds. The framework surface uses it
     * to park the action box above the selection; the legacy overlay uses the
     * same numbers with viewport-fixed coordinates.
     */
    function selectionTarget(found) {
      if (found === null || found === undefined || found.rect === null) return null
      const center = found.rect.left + (found.rect.right - found.rect.left) / 2
      return {
        left: Math.min(Math.max(center, 60), window.innerWidth - 60),
        rectTop: found.rect.top,
        rectBottom: found.rect.bottom,
      }
    }

    /** Whether one live selection belongs to the action row's Session and message. */
    function selectionMatches(found, sessionId, messageId) {      if (found === null || found === undefined) return false
      if (sessionId !== undefined && found.sessionId !== sessionId) return false
      if (messageId !== undefined && found.messageId !== messageId) return false
      return true
    }

    /** A remembered selection may back keyboard activation only while it is recent. */
    function recentSelection(found, sessionId, messageId) {
      if (!selectionMatches(found, sessionId, messageId)) return false
      if (typeof found.at !== 'number') return true
      return Date.now() - found.at < 15000
    }

    /* One watcher for the whole shell: coalesced to one read per animation frame. */
    const selectionStore = {
      value: null,
      previous: null,
      listeners: new Set(),
      subscribe(listener) {
        this.listeners.add(listener)
        return () => this.listeners.delete(listener)
      },
      publish(next) {
        if (next !== null) this.previous = next
        this.value = next
        for (const listener of [...this.listeners]) listener()
      },
    }

    let selectionWatcherStarted = false
    function startSelectionWatcher() {
      if (selectionWatcherStarted) return () => {}
      selectionWatcherStarted = true
      let frame = 0
      const update = () => {
        frame = 0
        selectionStore.publish(readChatSelection())
      }
      const schedule = () => {
        if (frame !== 0) return
        frame = window.requestAnimationFrame(update)
      }
      const hide = () => {
        if (frame !== 0) {
          window.cancelAnimationFrame(frame)
          frame = 0
        }
        selectionStore.publish(null)
      }
      const onPointerUp = (event) => {
        const target = event.target
        if (target && typeof target.closest === 'function' && target.closest('[data-quick-quote-float]')) return
        schedule()
      }
      document.addEventListener('mouseup', onPointerUp)
      document.addEventListener('keyup', schedule)
      document.addEventListener('selectionchange', schedule)
      window.addEventListener('scroll', hide, true)
      window.addEventListener('resize', hide)
      return () => {
        selectionWatcherStarted = false
        if (frame !== 0) window.cancelAnimationFrame(frame)
        document.removeEventListener('mouseup', onPointerUp)
        document.removeEventListener('keyup', schedule)
        document.removeEventListener('selectionchange', schedule)
        window.removeEventListener('scroll', hide, true)
        window.removeEventListener('resize', hide)
        selectionStore.publish(null)
      }
    }

    /** Mounted Conversation occurrence that currently shows `sessionId`. */
    function occurrenceElement(sessionId) {
      if (sessionId === undefined) return undefined
      try {
        const selection = window.getSelection()
        if (selection !== null && selection.rangeCount > 0) {
          const node = selection.anchorNode
          const element = node && (node.nodeType === 1 ? node : node.parentElement)
          const inside = element && typeof element.closest === 'function' ? element.closest('[data-conversation-session]') : null
          if (inside !== null && inside !== undefined && inside.getAttribute('data-conversation-session') === sessionId) return inside
        }
        const active = document.activeElement
        if (active && typeof active.closest === 'function') {
          const inside = active.closest('[data-conversation-session]')
          if (inside !== null && inside.getAttribute('data-conversation-session') === sessionId) return inside
        }
        for (const element of document.querySelectorAll('[data-conversation-session]')) {
          if (element.getAttribute('data-conversation-session') === sessionId) return element
        }
      } catch {
        /* fall through */
      }
      return undefined
    }

    /**
     * Composer write verbs learned from mounts, plus the center-column occurrences
     * that identify the main conversation. Main identity is derived live, so a
     * Session opened in a sidebar (or a child opened in the main view) cannot leave
     * a stale main pointer behind.
     */
    const bridge = { verbs: new Map(), mainMounts: new Map() }

    function resolveMainSessionId() {
      let best = ''
      let count = 0
      for (const [sessionId, mounts] of bridge.mainMounts) {
        if (!bridge.verbs.has(sessionId)) continue
        if (mounts > count) {
          best = sessionId
          count = mounts
        }
      }
      if (best !== '') return best
      try {
        const sessions = service('sessions')
        const byId = sessions && sessions.list && sessions.list.getSnapshot ? sessions.list.getSnapshot().byId : null
        if (byId !== null && byId !== undefined) {
          for (const entry of Object.values(byId)) {
            if (!entry || entry.origin === 'subagent') continue
            if (((entry.retainedBy && entry.retainedBy.mainView) || 0) > 0) return entry.id
          }
        }
      } catch {
        /* fall through */
      }
      return ''
    }

    /**
     * Session-scoped headless half: publishes one composer write verb per mounted
     * Conversation occurrence and records which occurrence lives in the main column.
     */
    function QuoteBridge(props) {
      const sessionId = props.sessionId
      const inputActions = props.inputActions
      const useInput = typeof props.useInput === 'function' ? props.useInput : (selector) => selector({ draft: '' })
      const draft = useInput((state) => (state && typeof state.draft === 'string' ? state.draft : ''))
      const draftRef = React.useRef(draft)
      draftRef.current = draft
      const mountRef = React.useRef(null)

      React.useEffect(() => {
        const element = mountRef.current
        const occurrence =
          element !== null && typeof element.closest === 'function'
            ? element.closest('[data-conversation-session]') || undefined
            : undefined
        const inCenter = occurrence !== undefined && occurrence !== null && occurrence.closest('[data-rightbar-col]') === null
        /* A child Session opened in the main column is still a child: keeping it
           out of the main identity prevents it from hijacking fallback quoting. */
        const isMain = inCenter && !sessionIsSubagent(sessionId)
        const verb = (payload, scope) =>
          insertQuote(payload, inputActions, draftRef.current, scope === undefined ? occurrence : scope)
        let verbs
        let entry
        if (sessionId !== undefined) {
          verbs = bridge.verbs.get(sessionId)
          if (verbs === undefined) {
            verbs = new Set()
            bridge.verbs.set(sessionId, verbs)
          }
          entry = { fn: verb, occurrence }
          verbs.add(entry)
        }
        if (isMain && sessionId !== undefined) {
          bridge.mainMounts.set(sessionId, (bridge.mainMounts.get(sessionId) || 0) + 1)
        }
        return () => {
          if (verbs !== undefined && entry !== undefined) {
            verbs.delete(entry)
            if (verbs.size === 0) bridge.verbs.delete(sessionId)
          }
          if (isMain && sessionId !== undefined) {
            const remaining = (bridge.mainMounts.get(sessionId) || 0) - 1
            if (remaining <= 0) bridge.mainMounts.delete(sessionId)
            else bridge.mainMounts.set(sessionId, remaining)
          }
        }
      }, [inputActions, sessionId])

      return h('span', { ref: mountRef, hidden: true, 'data-quick-quote-bridge': true, 'aria-hidden': true })
    }

    /** One live composer write verb for `sessionId`, preferring the caller's occurrence. */
    function verbFor(sessionId, scope) {
      if (sessionId === undefined) return undefined
      const entries = bridge.verbs.get(sessionId)
      if (entries === undefined) return undefined
      if (scope !== undefined && scope !== null) {
        for (const entry of entries) {
          if (entry.occurrence === scope) return entry.fn
        }
        /* A different occurrence of the same Session has its own composer; never
           borrow it, or the quote lands in the wrong input box. */
        return undefined
      }
      for (const entry of entries) return entry.fn
      return undefined
    }

    /** Whether `sessionId` currently has a mounted composer write verb. */
    function hasVerb(sessionId, scope) {
      return verbFor(sessionId, scope) !== undefined
    }

    /**
     * Main-composer target: the live main Session's verb, else its own editor. Never
     * borrows another Session's verb — that would land the quote in a sidebar
     * conversation instead of the main one.
     */
    function insertIntoMain(payload) {
      const mainId = resolveMainSessionId()
      const verb = verbFor(mainId)
      if (verb !== undefined) {
        const result = verb(payload)
        if (result.ok === true) return result
      }
      return insertQuote(payload, undefined, '', occurrenceElement(mainId))
    }

    /**
     * Write one quote into the Conversation that owns the selection. When that
     * Conversation has no live composer (read-only history, one-shot children) the
     * quote goes straight into the editor of the same occurrence, and only then
     * falls back to the main composer.
     */
    function insertIntoTarget(payload, sessionId, scope, fallback) {
      if (sessionId !== undefined) {
        const verb = verbFor(sessionId, scope)
        if (verb !== undefined) {
          const result = verb(payload, scope)
          if (result.ok === true) return result
        }
        if (fallback !== undefined) {
          const result = insertQuote(payload, fallback.inputActions, fallback.draft, scope)
          if (result.ok === true) return result
        }
        if (scope !== undefined && scope.isConnected === true) {
          const result = insertQuote(payload, undefined, '', scope)
          if (result.ok === true) return result
        }
      }
      return insertIntoMain(payload)
    }

    /* ------------------------------------------------------------------ *
     * Side chat: a right-sidebar tab that hosts an ordinary Session chat. *
     * ------------------------------------------------------------------ */

    const SIDE_PROTOCOL = 'quickquote'
    const SIDE_KIND = 'quickquote-chat'
    const SIDE_TYPE_ID = '@local/quick-quote/side-chat'
    const SIDE_PREFIX = `dsh-resource://${SIDE_PROTOCOL}/session/`

    /** Resource address for one ordinary Session chat tab. */
    function sideAddress(sessionId) {
      return `${SIDE_PREFIX}${encodeURIComponent(String(sessionId))}`
    }

    /** Session id carried by one side-chat resource address. */
    function parseSideAddress(address) {
      try {
        const url = new URL(address)
        if (url.protocol !== 'dsh-resource:' || url.hostname.toLowerCase() !== SIDE_PROTOCOL) return undefined
        const parts = url.pathname.split('/').filter(Boolean)
        if (parts.length !== 2 || parts[0] !== 'session') return undefined
        return decodeURIComponent(parts[1])
      } catch {
        return undefined
      }
    }

    /** Body of one side-chat tab: the shared Conversation for its Session. */
    function SideChatTab(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => key
      const hasTabInfo = typeof props.useTabInfo === 'function'
      const hasResource = typeof props.useResource === 'function'
      const hasProvider = typeof props.SessionProvider === 'function'
      const hasRenderSlot = typeof props.renderSlot === 'function'
      const tab = hasTabInfo ? props.useTabInfo().tab : undefined
      const contentId = tab === undefined || tab.contentId === undefined ? '' : String(tab.contentId)
      const resource = hasResource && contentId !== '' ? props.useResource(contentId) : undefined
      const status = resource === undefined ? 'no-resource' : String(resource.status)
      const value = resource === undefined ? undefined : resource.value
      const failure = resource === undefined || resource.failure === undefined ? '' : JSON.stringify(resource.failure).slice(0, 160)

      if (!hasProvider || !hasRenderSlot) {
        return h('div', { className: 'qqz_side', 'data-loading': true }, `${t('side.title')}: slot props missing`)
      }
      if (value === undefined) {
        return h('div', { className: 'qqz_side', 'data-loading': true }, `${t('side.loading')} [${status}] ${failure}`)
      }
      return h(
        'div',
        { className: 'qqz_side', 'data-quick-quote-side': true },
        h(props.SessionProvider, { session: value.reference }, props.renderSlot('quick-quote.chat.conversation', {})),
      )
    }

    /** Shows a render failure instead of a blank tab. */
    class SideChatBoundary extends React.Component {
      constructor(props) {
        super(props)
        this.state = { error: null }
      }

      static getDerivedStateFromError(error) {
        return { error }
      }

      render() {
        if (this.state.error !== null) {
          return h('div', { className: 'qqz_side', 'data-loading': true }, `side chat error: ${String(this.state.error && this.state.error.message)}`)
        }
        return this.props.children
      }
    }

    /** Guarded tab body so a slot crash is visible instead of blank. */
    function SideChatTabSafe(props) {
      return h(SideChatBoundary, null, h(SideChatTab, props))
    }

    /** Fixed chat view for the embedded Conversation occurrence. */
    function FixedChatView(props) {
      return props.renderSlot('conversation.session', { view: 'chat' })
    }

    /** Conversation body of one side chat, mirroring the shipped sidebar chat. */
    function SideConversationBody(props) {
      const session = props.useSession((value) => value)
      const conversation = props.useConversation((value) => value)
      const summaryBlank = props.useSessions((state) => state.byId[props.sessionId]?.blank)
      const shellPhase =
        conversation.activeTargets.size > 0 || (!session.blank && !session.awaitingFirstTurn) || session.running
          ? 'active'
          : session.promptAttempted
            ? 'engaging'
            : 'blank'
      const settling = shellPhase === 'blank' && session.openState === 'loading' && summaryBlank !== true

      /* The side chat keeps the ordinary (non-hero) layout even for a blank Session:
         the quote is written into this composer before the first message. */
      return props.renderFactorySlot(
        'conversation.content',
        {
          variant: 'embedded',
          phase: settling ? 'settling' : 'active',
          hero: false,
        },
        { slots: { views: FixedChatView } },
      )
    }

    /** Register the side-chat resource provider and its sidebar tab type. */
    function registerSideChat(scope, t) {
      const resources = scope.get('resources')
      const tabs = scope.get('sidebarRightTabs')
      const sessions = scope.get('sessions')
      scope.effect(
        () =>
          resources.register({
            protocol: SIDE_PROTOCOL,
            async *open(address, { signal }) {
              const sessionId = parseSideAddress(address)
              if (sessionId === undefined) {
                yield { ok: false, error: { code: 'invalid-address', message: `invalid side chat address: ${address}` } }
                return
              }
              if (signal.aborted) return
              let reference
              try {
                reference = sessions.retain(sessionId, { source: 'quickQuoteSideChat', signal })
              } catch (error) {
                yield { ok: false, error: { code: 'retain-failed', message: String(error) } }
                return
              }
              try {
                yield { ok: true, value: { address, reference } }
                await new Promise((resolve) => {
                  signal.addEventListener('abort', resolve, { once: true })
                })
              } finally {
                reference.release()
              }
            },
          }),
        'quick-quote: side chat resources',
      )
      scope.effect(
        () =>
          tabs.register({
            id: SIDE_TYPE_ID,
            kind: SIDE_KIND,
            patterns: [`${SIDE_PREFIX}**`],
            priority: 'builtin',
            canOpen: (address) => parseSideAddress(address) !== undefined,
            title: () => t('side.title'),
          }),
        'quick-quote: side chat tab type',
      )
    }

    /** Compose the askagent's first prompt: the quoted passage plus the question. */
    function composeAskPrompt(payload, question) {
      return ['用户在对话中引用了下面这段内容：', '', quoteBlock(payload), '', `用户的问题：${question}`].join('\n')
    }

    /** Compose an exec agent's first prompt: the selected passage as the task. */
    function composeTaskPrompt(payload) {
      return ['用户从对话正文中划定了下面这段内容，并把它作为交给你的任务：', '', quoteBlock(payload), '', '请按这段内容执行，完成后简要汇报结果。'].join('\n')
    }

    /** Short label carried into the subagent catalog, prefixed by kind. */
    function childLabel(kind, text) {
      const flat = String(text || '').replace(/\s+/g, ' ').trim()
      return flat === '' ? kind : `${kind} · ${flat.slice(0, 26)}`
    }

    function sleep(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })
    }

    /**
     * Reveal the right column and place one resource tab. The sidebar only mounts
     * after the layout commit, so retry the open until its Session surface exists
     * instead of sleeping for a fixed 120ms.
     */
    async function openSideResource(address, kind) {
      const sidebarRight = service('sidebarRight')
      const layout = service('layout')
      if (sidebarRight === undefined) return { ok: false, reason: 'no-sidebar' }
      try {
        if (layout !== undefined) layout.openRightbar(true, false)
      } catch {
        /* the reveal itself is best-effort; the retry below still runs */
      }
      const deadline = Date.now() + 3000
      let last = ''
      while (Date.now() <= deadline) {
        try {
          sidebarRight.openResource(address, { kind, preferNewPane: false })
          return { ok: true }
        } catch (error) {
          last = error instanceof Error ? error.message : String(error)
        }
        await sleep(50)
      }
      return { ok: false, reason: last === '' ? 'timeout' : last }
    }

    /** Root-scoped floating selection actions: quote, or dispatch an askagent. */
    function SelectionQuoteButton(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => key
      /* Framework text-interaction surfaces stay open until dismissed; the
         legacy shell.overlay mount passes no dismiss and keeps its old timing. */
      const dismiss = typeof props.dismiss === 'function' ? props.dismiss : null
      /* Inside the framework surface the Chat view already owns placement: it
         measures this box and parks it above the selection, so the component
         renders in flow. Only the legacy overlay places itself. */
      const inSurface = dismiss !== null
      const dismissRef = React.useRef(null)
      /* The first render must already carry the measured selection: the Chat
         view's layout effect measures this box once per activation, so rooting
         the state in the live selection avoids a placement pass on an empty
         box. Later changes still arrive through the shared watcher. */
      const [target, setTarget] = React.useState(() =>
        selectionTarget(selectionStore.value !== null ? selectionStore.value : readChatSelection({ measure: true })),
      )
      const [flash, setFlash] = React.useState(null)
      const [busy, setBusy] = React.useState(false)
      const [asking, setAsking] = React.useState(false)
      const [draft, setDraft] = React.useState('')
      const [askError, setAskError] = React.useState('')
      const [toastValue, setToastValue] = React.useState(toast.value)
      const selectionRef = React.useRef(null)
      const timerRef = React.useRef(null)
      const aliveRef = React.useRef(true)
      const askingRef = React.useRef(false)
      const inputRef = React.useRef(null)
      askingRef.current = asking

      React.useEffect(() => subscribeToast(setToastValue), [])

      React.useEffect(() => () => {
        aliveRef.current = false
        if (timerRef.current !== null) window.clearTimeout(timerRef.current)
        if (dismissRef.current !== null) window.clearTimeout(dismissRef.current)
      }, [])

      React.useEffect(() => {
        if (!asking) return
        const element = inputRef.current
        if (element === null) return
        try {
          element.focus()
        } catch {
          /* focus is best effort */
        }
      }, [asking])

      /* The shell has one selection watcher; this component only renders its pill. */
      React.useEffect(() => {
        const sync = () => {
          if (askingRef.current) return
          const found = selectionStore.value
          if (found === null || found.rect === null) {
            selectionRef.current = null
            setTarget((current) => (current === null ? current : null))
            return
          }
          selectionRef.current = found
          const next = selectionTarget(found)
          /* Keep the identity of an unchanged target so placement does not churn
             per animation frame while the reader is still dragging. */
          setTarget((current) =>
            current !== null && next !== null
            && current.left === next.left
            && current.rectTop === next.rectTop
            && current.rectBottom === next.rectBottom
              ? current
              : next,
          )
        }
        sync()
        return selectionStore.subscribe(sync)
      }, [])

      const flashThen = React.useCallback((kind, ok) => {
        setFlash({ kind, ok })
        if (timerRef.current !== null) window.clearTimeout(timerRef.current)
        timerRef.current = window.setTimeout(() => {
          timerRef.current = null
          setFlash(null)
          setTarget(null)
        }, 1000)
        if (dismiss !== null) {
          if (dismissRef.current !== null) window.clearTimeout(dismissRef.current)
          /* Let the success/failure label land before the surface closes. */
          dismissRef.current = window.setTimeout(() => {
            dismissRef.current = null
            dismiss()
          }, 600)
        }
      }, [dismiss])

      const onMouseDown = React.useCallback((event) => {
        /* Keep the page selection alive: these clicks must not collapse it. */
        event.preventDefault()
        event.stopPropagation()
        /* One fresh read per press: a fast click can beat the coalesced watcher. */
        const fresh = readChatSelection({ measure: false })
        if (fresh !== null) selectionRef.current = fresh
      }, [])

      /** One quote write, with the shared clipboard + reason fallback on failure. */
      const deliverFound = React.useCallback(
        async (found) => {
          const payload = buildQuotePayload(found)
          const result = insertIntoTarget(payload, found.sessionId, found.occurrence)
          if (result.ok === true) {
            flashThen('quote', true)
            return
          }
          const copied = await copyText(quoteBlock(payload))
          notify(t(copied ? reasonKey(result.reason) : 'quote.reasonClipboard'), 'error')
          flashThen('quote', false)
        },
        [flashThen, t],
      )

      const quote = React.useCallback(() => {
        const found = selectionRef.current
        if (found === null || found.text.trim() === '') {
          setTarget(null)
          return
        }
        void deliverFound(found)
      }, [deliverFound])

      const openAsk = React.useCallback(() => {
        if (selectionRef.current === null || selectionRef.current.text.trim() === '') {
          setTarget(null)
          return
        }
        setDraft('')
        setAskError('')
        setAsking(true)
      }, [])

      const closeAsk = React.useCallback(() => {
        setAsking(false)
        setDraft('')
        setAskError('')
        selectionRef.current = null
        setTarget(null)
      }, [])

      React.useEffect(() => {
        if (!asking) return
        const onDocDown = (event) => {
          const element = event.target
          if (element && typeof element.closest === 'function' && element.closest('[data-quick-quote-float]')) return
          closeAsk()
        }
        document.addEventListener('mousedown', onDocDown, true)
        return () => document.removeEventListener('mousedown', onDocDown, true)
      }, [asking, closeAsk])

      /* Alt+Q quotes the live selection directly, without waiting for the pill. */
      React.useEffect(() => {
        const onKey = (event) => {
          if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat) return
          if (event.code !== 'KeyQ' && String(event.key).toLowerCase() !== 'q') return
          const found = readChatSelection({ measure: false })
          if (found === null) return
          if (askingRef.current) return
          event.preventDefault()
          event.stopPropagation()
          void deliverFound(found)
        }
        window.addEventListener('keydown', onKey, true)
        return () => window.removeEventListener('keydown', onKey, true)
      }, [deliverFound])

      const submitAsk = React.useCallback(async () => {
        const found = selectionRef.current
        const question = draft.trim()
        if (found === null || found.text.trim() === '' || question === '' || busy) return
        const payload = buildQuotePayload(found)
        const mainId = resolveMainSessionId()
        /* Quote from inside a sidebar chat asks under that chat, when it has a
           live composer; otherwise the main conversation stays the parent. */
        const owner = found.sessionId
        const parentId = owner !== undefined && hasVerb(owner, found.occurrence) ? owner : mainId
        const sidebarRight = service('sidebarRight')
        if (parentId === '' || sidebarRight === undefined) {
          setAskError(t('ask.error'))
          return
        }
        setBusy(true)
        setAskError('')
        try {
          const prompt = composeAskPrompt(payload, question)
          const spawn = (parentForSpawn) =>
            fetch('/askagent', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                sessionId: parentForSpawn,
                prompt,
                label: childLabel('askagent', question),
                notifyParent: false,
              }),
            })
          let usedParent = parentId
          let response = await spawn(usedParent)
          let body = await response.json().catch(() => null)
          /* A sidebar child Session can keep a mounted composer after its Agent
             settled; the Host then has no live Agent to parent a new child. Retry
             once on the main conversation instead of failing the action. */
          if (!response.ok && mainId !== '' && usedParent !== mainId) {
            usedParent = mainId
            response = await spawn(usedParent)
            body = await response.json().catch(() => null)
          }
          if (!response.ok) {
            const detail = body && body.error ? String(body.error) : t('ask.error')
            if (aliveRef.current) setAskError(detail)
            return
          }
          const childId = body && typeof body.childId === 'string' ? body.childId : ''
          if (childId === '') {
            if (aliveRef.current) setAskError(t('ask.error'))
            return
          }
          const address = `dsh-resource://subagentchat/session/${encodeURIComponent(childId)}?parent=${encodeURIComponent(usedParent)}&mode=continuable`
          const opened = await openSideResource(address, 'subagentchat')
          if (!opened.ok) notify(t('side.openError'), 'error')
          if (!aliveRef.current) return
          setAsking(false)
          setDraft('')
          selectionRef.current = null
          setTarget(null)
        } catch (error) {
          if (aliveRef.current) setAskError(error instanceof Error ? error.message : t('ask.error'))
        } finally {
          if (aliveRef.current) setBusy(false)
        }
      }, [busy, draft, t])

      /* Run the selected passage as a subagent task; its result returns to this conversation. */
      const runTask = React.useCallback(async () => {
        const found = selectionRef.current
        if (found === null || found.text.trim() === '' || busy) {
          if (found === null) setTarget(null)
          return
        }
        const payload = buildQuotePayload(found)
        const mainId = resolveMainSessionId()
        const sidebarRight = service('sidebarRight')
        if (mainId === '' || sidebarRight === undefined) {
          flashThen('task', false)
          return
        }
        setBusy(true)
        try {
          const prompt = composeTaskPrompt(payload)
          const response = await fetch('/askagent', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              sessionId: mainId,
              prompt,
              label: childLabel('exec', found.text),
              notifyParent: true,
            }),
          })
          const body = await response.json().catch(() => null)
          if (!response.ok) {
            flashThen('task', false)
            return
          }
          const childId = body && typeof body.childId === 'string' ? body.childId : ''
          if (childId === '') {
            flashThen('task', false)
            return
          }
          const address = `dsh-resource://subagentchat/session/${encodeURIComponent(childId)}?parent=${encodeURIComponent(mainId)}&mode=continuable`
          const opened = await openSideResource(address, 'subagentchat')
          if (!opened.ok) notify(t('side.openError'), 'error')
          flashThen('task', true)
        } catch (error) {
          if (error instanceof Error) notify(error.message, 'error')
          flashThen('task', false)
        } finally {
          if (aliveRef.current) setBusy(false)
        }
      }, [busy, flashThen, t])

      const toastNode =
        toastValue === null
          ? null
          : h(
              'div',
              {
                className: 'qqz_toast',
                'data-quick-quote-toast': true,
                'data-surface': inSurface ? true : undefined,
                'data-kind': toastValue.kind,
                role: 'status',
              },
              toastValue.text,
            )

      if (target === null) return toastNode

      if (asking) {
        const preview = (selectionRef.current === null ? '' : selectionRef.current.text).trim().replace(/\s+/g, ' ')
        const cardTop = target.rectTop >= 116 ? target.rectTop - 96 : target.rectBottom + 8
        return h(
          React.Fragment,
          null,
          h(
            'div',
            {
              className: 'qqz_ask',
              'data-quick-quote-float': true,
              'data-surface': inSurface ? true : undefined,
              style: inSurface ? undefined : { left: `${target.left}px`, top: `${cardTop}px` },
            },
            h('div', { className: 'qqz_ask_quote' }, preview.length > 64 ? `${preview.slice(0, 64)}…` : preview),
            h(
              'div',
              { className: 'qqz_ask_row' },
              h('input', {
                ref: inputRef,
                className: 'qqz_ask_input',
                value: draft,
                placeholder: t('ask.placeholder'),
                onChange: (event) => setDraft(event.target.value),
                onKeyDown: (event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    submitAsk()
                    return
                  }
                  if (event.key === 'Escape') {
                    event.preventDefault()
                    closeAsk()
                  }
                },
              }),
              h(
                'button',
                {
                  type: 'button',
                  className: 'qqz_ask_send',
                  disabled: busy || draft.trim() === '',
                  onClick: submitAsk,
                },
                busy ? t('action.asking') : t('ask.send'),
              ),
            ),
            askError === '' ? null : h('div', { className: 'qqz_ask_error' }, askError),
          ),
          toastNode,
        )
      }

      const pillTop = target.rectTop >= 46 ? target.rectTop - 34 : target.rectBottom + 8
      const quoteFailed = flash !== null && flash.kind === 'quote' && !flash.ok
      const quoteLabel =
        flash !== null && flash.kind === 'quote'
          ? flash.ok
            ? t('action.quoted')
            : t('action.failedCopied')
          : t('action.float')
      const askLabel = busy ? t('action.asking') : t('action.ask')
      const taskLabel =
        flash !== null && flash.kind === 'task'
          ? flash.ok
            ? t('action.dispatched')
            : t('action.failed')
          : busy
            ? t('action.asking')
            : t('action.task')
      return h(
        React.Fragment,
        null,
        h(
          'div',
          {
            className: 'qqz_float',
            'data-quick-quote-float': true,
            'data-surface': inSurface ? true : undefined,
            style: inSurface ? undefined : { left: `${target.left}px`, top: `${pillTop}px` },
            onMouseDown,
          },
          h(
            'button',
            {
              type: 'button',
              title: t('action.quoteHotkey'),
              'aria-label': t('action.quoteHotkey'),
              'data-done': flash !== null && flash.kind === 'quote' && flash.ok ? true : undefined,
              'data-failed': quoteFailed ? true : undefined,
              onClick: quote,
            },
            h(QuoteIcon),
            h('span', null, quoteLabel),
          ),
          h('span', { className: 'qqz_sep', 'aria-hidden': true }),
          h(
            'button',
            {
              type: 'button',
              title: t('action.askTitle'),
              'aria-label': t('action.askTitle'),
              disabled: busy,
              onClick: openAsk,
            },
            h(ChatIcon),
            h('span', null, askLabel),
          ),
          h('span', { className: 'qqz_sep', 'aria-hidden': true }),
          h(
            'button',
            {
              type: 'button',
              title: t('action.taskTitle'),
              'aria-label': t('action.taskTitle'),
              disabled: busy,
              'data-done': flash !== null && flash.kind === 'task' && flash.ok ? true : undefined,
              'data-failed': flash !== null && flash.kind === 'task' && !flash.ok ? true : undefined,
              onClick: runTask,
            },
            h(PlayIcon),
            h('span', null, taskLabel),
          ),
        ),
        toastNode,
      )
    }

    /** The same quote action in a finalized assistant message's action row. */
    function QuickQuoteAction(props) {
      const { inputActions, sessionId, messageId } = props
      const t = typeof props.t === 'function' ? props.t : (key) => key
      const useInput = typeof props.useInput === 'function' ? props.useInput : (selector) => selector({ draft: '' })
      const draft = useInput((state) => (state && typeof state.draft === 'string' ? state.draft : ''))
      const pressRef = React.useRef(null)
      const focusedRef = React.useRef(false)
      const timerRef = React.useRef(null)
      const [active, setActive] = React.useState(false)
      const [done, setDone] = React.useState(false)
      const [failed, setFailed] = React.useState(false)
      const draftRef = React.useRef(draft)
      draftRef.current = draft

      /* One shared watcher owns selectionchange; this row only derives a boolean. */
      React.useEffect(() => {
        const sync = () => {
          const found = selectionStore.value
          const next =
            selectionMatches(found, sessionId, messageId) ||
            (focusedRef.current && recentSelection(selectionStore.previous, sessionId, messageId))
          setActive((current) => (current === next ? current : next))
        }
        sync()
        return selectionStore.subscribe(sync)
      }, [sessionId, messageId])

      React.useEffect(() => () => {
        if (timerRef.current !== null) window.clearTimeout(timerRef.current)
      }, [])

      const flash = React.useCallback((ok) => {
        if (ok) setDone(true)
        else setFailed(true)
        if (timerRef.current !== null) window.clearTimeout(timerRef.current)
        timerRef.current = window.setTimeout(() => {
          timerRef.current = null
          setDone(false)
          setFailed(false)
        }, 1400)
      }, [])

      const capture = React.useCallback(
        (found) => {
          if (!selectionMatches(found, sessionId, messageId)) return false
          pressRef.current = found
          return true
        },
        [messageId, sessionId],
      )

      const onMouseDown = React.useCallback(
        (event) => {
          /* Do not collapse the selection before the click can read it. */
          event.preventDefault()
          event.stopPropagation()
          if (capture(selectionStore.value)) return
          capture(readChatSelection({ measure: false }))
        },
        [capture],
      )

      const onFocus = React.useCallback(() => {
        focusedRef.current = true
        if (capture(selectionStore.value)) {
          setActive(true)
          return
        }
        if (recentSelection(selectionStore.previous, sessionId, messageId)) {
          pressRef.current = selectionStore.previous
          setActive(true)
          return
        }
        setActive(false)
      }, [capture, messageId, sessionId])

      const onBlur = React.useCallback(() => {
        focusedRef.current = false
        pressRef.current = null
        setActive(selectionMatches(selectionStore.value, sessionId, messageId))
      }, [messageId, sessionId])

      const onClick = React.useCallback(
        (event) => {
          const target = event !== undefined && event !== null ? event.currentTarget : undefined
          const remembered = recentSelection(selectionStore.previous, sessionId, messageId)
            ? selectionStore.previous
            : null
          const found = pressRef.current || selectionStore.value || remembered
          pressRef.current = null
          if (!selectionMatches(found, sessionId, messageId)) {
            flash(false)
            notify(t('action.hint'), 'error')
            return
          }
          const tail =
            target !== undefined && target !== null && typeof target.closest === 'function'
              ? target.closest('[data-turn-tail]')
              : null
          const scope =
            target !== undefined && target !== null && typeof target.closest === 'function'
              ? target.closest('[data-conversation-session]') ||
                found.occurrence ||
                occurrenceElement(sessionId)
              : found.occurrence || occurrenceElement(sessionId)
          const payload = buildQuotePayload(found, {
            messageId,
            turn: tail === null ? undefined : String(tail.getAttribute('data-turn-tail') || '') || undefined,
          })
          const result = insertIntoTarget(payload, sessionId, scope, { inputActions, draft: draftRef.current })
          if (result.ok === true) {
            setActive(false)
            flash(true)
            return
          }
          void (async () => {
            const copied = await copyText(quoteBlock(payload))
            notify(t(copied ? reasonKey(result.reason) : 'quote.reasonClipboard'), 'error')
            flash(false)
          })()
        },
        [flash, inputActions, messageId, sessionId, t],
      )

      const enabled = active
      const label = done ? t('action.quoted') : failed ? t('action.failedCopied') : enabled ? t('action.quote') : t('action.hint')

      return h(
        'button',
        {
          type: 'button',
          className: 'qqz_action',
          'data-quick-quote': true,
          'data-quick-quote-message': messageId,
          'data-enabled': enabled ? 'true' : 'false',
          'data-done': done || undefined,
          'data-failed': failed || undefined,
          'aria-disabled': enabled ? undefined : true,
          title: enabled ? t('action.quoteHotkey') : label,
          'aria-label': label,
          onMouseDown,
          onFocus,
          onBlur,
          onClick,
        },
        done ? h(DoneIcon) : h(QuoteIcon),
      )
    }

    /** One labelled section of the grouped child-agent menu. */
    function groupSection(title, list, onOpen, t) {
      return [
        h('div', { className: 'qqz_groups_title', key: `title-${title}` }, title),
        ...(list.length === 0
          ? [h('div', { className: 'qqz_groups_empty', key: `empty-${title}` }, t('groups.empty'))]
          : list.map((entry) =>
              h(
                'button',
                {
                  type: 'button',
                  key: entry.id,
                  className: 'qqz_groups_row',
                  title: entry.id,
                  onClick: () => onOpen(entry),
                },
                h('span', { className: 'qqz_groups_dot', 'data-running': entry.running ? 'true' : undefined }),
                h(
                  'span',
                  { className: 'qqz_groups_text' },
                  h('span', { className: 'qqz_groups_primary' }, entry.primary),
                  entry.secondary === '' ? null : h('span', { className: 'qqz_groups_secondary' }, entry.secondary),
                ),
                h('span', { className: 'qqz_groups_state', 'data-running': entry.running ? 'true' : undefined }, entry.running ? t('groups.running') : t('groups.idle')),
              ),
            )),
      ]
    }

    /** Session-header trigger listing child agents grouped by who created them. */
    function AgentGroupsAction(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => key
      const sessionId = props.sessionId
      const useSessions =
        typeof props.useSessions === 'function'
          ? props.useSessions
          : (selector) => selector({ projectionsBySession: {}, byId: {} })
      const useSessionStatus =
        typeof props.useSessionStatus === 'function' ? props.useSessionStatus : (selector) => selector(new Map())
      const projections = useSessions((state) => state.projectionsBySession)
      const summaries = useSessions((state) => state.byId)
      const isChildSession = useSessions((state) => (sessionId === undefined ? false : state.byId[sessionId]?.origin === 'subagent'))
      const statuses = useSessionStatus((value) => value)

      const [open, setOpen] = React.useState(false)
      const [position, setPosition] = React.useState(null)
      const triggerRef = React.useRef(null)

      const entries = React.useMemo(() => {
        const catalog = sessionId === undefined || projections === undefined ? undefined : projections[sessionId]?.values?.subagentCatalog
        const clock = (stamp) => {
          if (typeof stamp !== 'number' || !Number.isFinite(stamp)) return ''
          try {
            return new Date(stamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
          } catch {
            return ''
          }
        }
        const generic = (value) => value === '' || /askagent|exec|请提问|侧栏提问|ready/i.test(value)
        return (catalog ?? []).map((entry) => {
          const raw = String(entry.label === undefined ? '' : entry.label).trim()
          const mark = raw.indexOf(' · ')
          const head = mark >= 0 ? raw.slice(0, mark) : raw
          const isAsk = head === 'askagent'
          const isExec = head === 'exec'
          const titleProjection = projections[entry.id]?.values?.title
          const title = typeof titleProjection === 'string' ? titleProjection.trim() : ''
          let primary = raw
          let secondary = ''
          if (isAsk || isExec) {
            primary = head === 'exec' ? 'exec' : 'askagent'
            const snippet = mark >= 0 ? raw.slice(mark + 3).trim() : ''
            const stamp = summaries[entry.id]?.updatedAt === undefined ? entry.createdAt : summaries[entry.id].updatedAt
            secondary = snippet !== '' ? snippet : generic(title) ? clock(stamp) : title
          } else if (title !== '' && title !== raw) {
            secondary = title
          }
          return {
            id: entry.id,
            mode: entry.mode,
            kind: isExec ? 'exec' : isAsk ? 'ask' : 'other',
            primary: primary === '' ? (isExec ? 'exec' : isAsk ? 'askagent' : t('groups.subName')) : primary,
            secondary,
            running: (statuses.get(entry.id)?.running ?? summaries[entry.id]?.running) === true,
          }
        })
      }, [projections, statuses, summaries, sessionId, t])

      const groups = React.useMemo(() => {
        const ask = []
        const exec = []
        const other = []
        for (const entry of entries) {
          if (entry.kind === 'exec') exec.push(entry)
          else if (entry.kind === 'ask') ask.push(entry)
          else other.push(entry)
        }
        return { ask, exec, other }
      }, [entries])

      React.useEffect(() => {
        if (!open) return
        const onDown = (event) => {
          const element = event.target
          if (
            element &&
            typeof element.closest === 'function' &&
            (element.closest('[data-quick-quote-groups]') || element.closest('[data-quick-quote-groups-menu]'))
          ) {
            return
          }
          setOpen(false)
        }
        const onKey = (event) => {
          if (event.key === 'Escape') setOpen(false)
        }
        document.addEventListener('mousedown', onDown, true)
        document.addEventListener('keydown', onKey, true)
        return () => {
          document.removeEventListener('mousedown', onDown, true)
          document.removeEventListener('keydown', onKey, true)
        }
      }, [open])

      const toggle = React.useCallback(() => {
        setOpen((current) => {
          const next = !current
          if (next) {
            const trigger = triggerRef.current
            if (trigger !== null) {
              const rect = trigger.getBoundingClientRect()
              setPosition({
                left: Math.min(Math.max(12, rect.right - 336), window.innerWidth - 348),
                top: rect.bottom + 6,
              })
            }
            try {
              const sessions = service('sessions')
              if (sessions !== undefined && typeof sessions.refreshProjections === 'function' && sessionId !== undefined) {
                sessions.refreshProjections(sessionId)
              }
            } catch {
              /* refresh is best effort */
            }
          }
          return next
        })
      }, [sessionId])

      const openChild = React.useCallback(
        (entry) => {
          if (sessionId !== undefined) {
            const mode = entry.mode === undefined ? 'continuable' : String(entry.mode)
            const address = `dsh-resource://subagentchat/session/${encodeURIComponent(entry.id)}?parent=${encodeURIComponent(sessionId)}&mode=${encodeURIComponent(mode)}`
            void openSideResource(address, 'subagentchat').then((result) => {
              if (!result.ok) notify(t('side.openError'), 'error')
            })
          }
          setOpen(false)
        },
        [sessionId, t],
      )

      if (sessionId === undefined || isChildSession) return null
      const total = entries.length
      return h(
        'div',
        { className: 'qqz_groups', 'data-quick-quote-groups': true },
        h(
          'button',
          {
            type: 'button',
            ref: triggerRef,
            className: 'qqz_groups_btn',
            title: t('groups.title'),
            onClick: toggle,
          },
          entries.some((entry) => entry.running)
            ? h('span', { className: 'qqz_groups_dot', 'data-running': 'true' })
            : null,
          h('span', null, t('groups.count', { count: total })),
          h(ChevronIcon),
        ),
        open && position !== null
          ? h(
              'div',
              {
                className: 'qqz_groups_menu',
                'data-quick-quote-groups-menu': true,
                style: { left: `${position.left}px`, top: `${position.top}px` },
              },
              groupSection(t('groups.ask'), groups.ask, openChild, t),
              groupSection(t('groups.exec'), groups.exec, openChild, t),
              groupSection(t('groups.sub'), groups.other, openChild, t),
            )
          : null,
      )
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        hostCtx = ctx
        /* Exactly one instance of this plugin may be live per page. A client
           module hot swap can evaluate the new bundle while the previous
           instance is still mounted (two revs, two listeners, two pills); the
           newest instance retires the older one before registering anything. */
        const previous = window.__quickQuoteTeardown
        if (typeof previous === 'function') {
          try {
            previous()
          } catch {
            /* the stale instance is best-effort */
          }
        }
        const disposers = []
        let retired = false
        const teardown = () => {
          if (retired) return
          retired = true
          for (const dispose of [...disposers].reverse()) {
            try {
              dispose()
            } catch {
              /* keep tearing down the rest */
            }
          }
          disposers.length = 0
          if (window.__quickQuoteTeardown === teardown) delete window.__quickQuoteTeardown
        }
        window.__quickQuoteTeardown = teardown
        /** Keep every registration reachable from `teardown` (idempotent). */
        const track = (dispose) => {
          if (typeof dispose === 'function') disposers.push(dispose)
          return dispose
        }
        ctx.effect(() => teardown, 'quick-quote: instance')
        track(ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'quick-quote: dictionaries'))
        tr = ctx.locale.bind(NS)
        track(ctx.effect(() => startSelectionWatcher(), 'quick-quote: selection watcher'))
        track(ctx.effect(() => {
          const tagId = '@local/quick-quote/actions.css'
          let tag = document.querySelector(`style[data-plugin-css="${tagId}"]`)
          const created = tag === null
          if (created) {
            tag = document.createElement('style')
            tag.dataset.plugin = '@local/quick-quote'
            tag.dataset.pluginCss = tagId
            tag.textContent = CSS
            document.head.appendChild(tag)
          }
          return () => {
            if (created) tag.remove()
          }
        }, 'quick-quote: styles'))
        track(
          ctx.inject(['resources', 'sidebarRightTabs', 'sessions'], (scope) => {
            registerSideChat(scope, ctx.locale.bind(NS))
          }),
        )
        track(
          ctx.slots.inject('sidebar.right.pane.tab', () =>
            ctx.slots.register(
              {
                name: 'sidebar.right.pane.tab',
                key: SIDE_TYPE_ID,
                locale: NS,
                children: {
                  'quick-quote.chat.conversation': {
                    kind: 'single',
                    scope: 'session',
                  },
                },
              },
              SideChatTabSafe,
            ),
          ),
        )
        track(
          ctx.slots.inject('quick-quote.chat.conversation', () =>
            ctx.slots.register({ name: 'quick-quote.chat.conversation', locale: NS }, SideConversationBody),
          ),
        )
        /* 0.2.2 replaced the hand-rolled selection overlay with the framework
           text-interaction registry: `message-quotes` registers the same
           selection gesture, so an extra `shell.overlay` pill renders a second
           floating layer beside the shipped quote action. Register the legacy
           overlay first so the plugin mounts on every host, then hand the
           selection UI over to the framework once `uiConversation` is ready
           (one interaction plus the shipped `quote` surface), removing the
           legacy entry so exactly one selection UI renders. The hand-off runs
           in its own callback and is caught: a failure there must never take
           the grouped subagent menu and the rest of the plugin down with it. */
        let legacyOverlayDispose = null
        const registerLegacyOverlay = () => {
          if (legacyOverlayDispose !== null) return
          legacyOverlayDispose = ctx.slots.inject('shell.overlay', () =>
            ctx.slots.register(
              {
                name: 'shell.overlay',
                id: 'quick-quote-float',
                order: 10,
                locale: NS,
              },
              SelectionQuoteButton,
            ),
          )
          track(legacyOverlayDispose)
        }
        registerLegacyOverlay()
        let frameworkRegistered = false
        track(
          ctx.inject(['uiConversation'], (scope) => {
            try {
              const uiConversation = scope.uiConversation !== undefined && scope.uiConversation !== null
                ? scope.uiConversation
                : undefined
              const interactions = uiConversation === undefined ? undefined : uiConversation.interactions
              if (
                frameworkRegistered
                || interactions === undefined
                || interactions === null
                || typeof interactions.register !== 'function'
              ) {
                return
              }
              frameworkRegistered = true
              if (legacyOverlayDispose !== null) {
                const dispose = legacyOverlayDispose
                legacyOverlayDispose = null
                try {
                  dispose()
                } catch {
                  /* dropping the legacy overlay is best-effort */
                }
              }
              track(interactions.register({
                id: 'quick-quote',
                onInteraction(request) {
                  if (request.trigger !== 'selection') return
                  const text = request.readText()
                  if (text === null || text.trim() === '') return
                  request.open()
                },
              }))
              for (const key of ['quote', 'quick-quote']) {
                track(
                  ctx.slots.inject('conversation.chat.text-interaction', () =>
                    ctx.slots.register(
                      {
                        name: 'conversation.chat.text-interaction',
                        key,
                        priority: -1,
                        locale: NS,
                      },
                      SelectionQuoteButton,
                    ),
                  ),
                )
              }
            } catch (error) {
              /* A failed framework hand-off must not disable the plugin. */
              console.warn('[quick-quote] text-interaction hand-off failed', error)
            }
          }),
        )
        track(
          ctx.slots.inject('conversation.composer.dock', () =>
            ctx.slots.register(
              {
                name: 'conversation.composer.dock',
                id: 'quick-quote-bridge',
                order: 100,
                locale: NS,
              },
              QuoteBridge,
            ),
          ),
        )
        /* Replace the shipped subagent catalog entry with the grouped menu.
           Deferred so this registration lands after the shipped one in the same
           slot cell (a reused id replaces the earlier occupant). */
        track(ctx.effect(() => {
          let dispose
          const timer = window.setTimeout(() => {
            dispose = ctx.slots.inject('conversation.session.header.actions', () =>
              ctx.slots.register(
                {
                  name: 'conversation.session.header.actions',
                  id: 'subagent-catalog',
                  order: 10,
                  priority: -1,
                  locale: NS,
                },
                AgentGroupsAction,
              ),
            )
          }, 80)
          return () => {
            window.clearTimeout(timer)
            if (typeof dispose === 'function') dispose()
          }
        }, 'quick-quote: grouped subagent catalog'))
        track(
          ctx.slots.inject('conversation.chat.assistant-actions', () =>
            ctx.slots.register(
              {
                name: 'conversation.chat.assistant-actions',
                id: 'quick-quote',
                order: 40,
                locale: NS,
              },
              QuickQuoteAction,
            ),
          ),
        )
      },
    }
  },
})

