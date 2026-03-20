'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blog';

/* ═══════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════ */
interface OutputLine {
  text: string;
  color?: string;
  bold?: boolean;
  action?: () => void;
}

interface HistoryEntry {
  type: 'input' | 'output';
  cwd?: string;
  lines: OutputLine[];
}

/* ═══════════════════════════════════════════════════
   Virtual Filesystem
   ═══════════════════════════════════════════════════ */
interface FsNode {
  type: 'dir' | 'file';
  children?: Record<string, FsNode>;
  content?: string;
  link?: string;        // clickable URL
  scrollTo?: string;    // section ID to scroll to
}

function buildFilesystem(): FsNode {
  const projectDirs: Record<string, FsNode> = {};
  projects.forEach((p) => {
    const url = p.links.live || p.links.appStore || p.links.playStore || p.links.github;
    const readme = [
      p.title,
      '='.repeat(p.title.length),
      '',
      p.description,
      '',
      `Tags: ${p.tags.join(', ')}`,
      p.stats ? `Stats: ${p.stats}` : '',
      url ? `URL: ${url}` : '',
    ].filter(Boolean).join('\n');

    projectDirs[p.id] = {
      type: 'dir',
      children: {
        'README.md': { type: 'file', content: readme, link: url },
      },
    };
  });

  const blogFiles: Record<string, FsNode> = {};
  blogPosts.forEach((post) => {
    blogFiles[`${post.id}.md`] = {
      type: 'file',
      content: [
        post.title,
        '='.repeat(post.title.length),
        '',
        post.excerpt,
        '',
        `Date: ${post.date}  |  ${post.readTime} min read`,
        `Tags: ${post.tags.join(', ')}`,
      ].join('\n'),
      link: `/blog/${post.id}`,
    };
  });

  return {
    type: 'dir',
    children: {
      'about.md': {
        type: 'file',
        content: [
          'Mubashir Ahmed',
          '===============',
          'Senior Flutter Engineer & Mobile Architect',
          'Wayanad, Kerala, India',
          '6+ years building production mobile apps',
          '',
          'Available for freelance & collaboration',
        ].join('\n'),
        scrollTo: 'bio',
      },
      'skills.json': {
        type: 'file',
        content: JSON.stringify({
          core: ['Flutter', 'Dart', 'Clean Architecture'],
          state: ['BLoC', 'Riverpod', 'GetX'],
          backend: ['Firebase', 'Supabase', 'Node.js'],
          web: ['Next.js', 'React', 'TypeScript'],
          tools: ['Git', 'Figma', 'Jira', 'CI/CD'],
          experience: '6+ years',
        }, null, 2),
      },
      'resume.pdf': { type: 'file', content: '[Binary file — use "download resume" or visit /resume.pdf]', link: '/resume.pdf' },
      projects: { type: 'dir', children: projectDirs, scrollTo: 'projects' },
      blog: { type: 'dir', children: blogFiles, scrollTo: 'blog' },
      contact: {
        type: 'dir',
        scrollTo: 'contact',
        children: {
          'social.txt': {
            type: 'file',
            content: [
              'github      https://github.com/mubashirspam',
              'linkedin    https://www.linkedin.com/in/mubashir-ahmad/',
              'bluesky     https://bsky.app/profile/mubashirahmed.bsky.social',
              'email       mailto:getmemubashir@gmail.com',
              'booking     https://topmate.io/mubashir_ahammed',
            ].join('\n'),
          },
          'email.txt': { type: 'file', content: 'getmemubashir@gmail.com', link: 'mailto:getmemubashir@gmail.com' },
        },
      },
      expertise: { type: 'dir', children: {}, scrollTo: 'expertise' },
      roles: { type: 'dir', children: {}, scrollTo: 'roles' },
      '.config': {
        type: 'dir',
        children: {
          'theme.conf': { type: 'file', content: 'accent=purple\nmode=system' },
        },
      },
    },
  };
}

function resolvePath(fs: FsNode, cwd: string, target: string): { node: FsNode | null; absPath: string } {
  let parts: string[];

  if (target.startsWith('/') || target.startsWith('~')) {
    parts = target.replace('~', '').split('/').filter(Boolean);
  } else {
    const cwdParts = cwd.split('/').filter(Boolean);
    parts = [...cwdParts, ...target.split('/').filter(Boolean)];
  }

  // resolve . and ..
  const resolved: string[] = [];
  for (const p of parts) {
    if (p === '.') continue;
    if (p === '..') { resolved.pop(); continue; }
    resolved.push(p);
  }

  let node: FsNode | null = fs;
  for (const p of resolved) {
    if (node?.type !== 'dir' || !node.children?.[p]) {
      return { node: null, absPath: '/' + resolved.join('/') };
    }
    node = node.children[p];
  }

  return { node, absPath: '/' + resolved.join('/') };
}

/* ═══════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════ */
function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openUrl(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

function ln(text: string, color?: string, opts?: { bold?: boolean; action?: () => void }): OutputLine {
  return { text, color, bold: opts?.bold, action: opts?.action };
}

/* ═══════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════ */
export function InteractiveTerminal() {
  const fs = useMemo(() => buildFilesystem(), []);
  const [cwd, setCwd] = useState('/');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selSuggestion, setSelSuggestion] = useState(0);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Show welcome on mount
  useEffect(() => {
    setHistory([{
      type: 'output',
      lines: [
        ln('mubashir.dev — interactive portfolio shell', 'text-emerald-400', { bold: true }),
        ln('Type "help" for commands. Tab to autocomplete.', 'text-slate-500'),
        ln(''),
      ],
    }]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  /* ── prompt string ── */
  const prompt = useMemo(() => {
    const short = cwd === '/' ? '~' : '~' + cwd;
    return short;
  }, [cwd]);

  /* ── command executor ── */
  const exec = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    // save to cmd history
    setCmdHistory((prev) => [...prev.filter((c) => c !== trimmed), trimmed]);
    setCmdIdx(-1);

    // echo input
    setHistory((prev) => [...prev, { type: 'input', cwd: prompt, lines: [ln(trimmed)] }]);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0]!.toLowerCase();
    const args = parts.slice(1).map((a) => a.replace(/^"|"$/g, ''));

    let output: OutputLine[] = [];

    switch (cmd) {
      /* ── help ── */
      case 'help':
      case 'man': {
        const topic = args[0];
        if (topic && topic !== 'help') {
          output = [
            ln(`MANUAL: ${topic}`, 'text-amber-400', { bold: true }),
            ln(''),
          ];
          const desc = cmdDescriptions[topic];
          if (desc) {
            output.push(ln(`  ${desc}`, 'text-slate-300'));
          } else {
            output.push(ln(`  No manual entry for ${topic}`, 'text-red-400'));
          }
        } else {
          output = [
            ln('COMMANDS', 'text-amber-400', { bold: true }),
            ln(''),
            ln('Navigation:', 'text-slate-500'),
            ln('  ls [path]            List directory contents'),
            ln('  ls -la [path]        List with details'),
            ln('  cd <path>            Change directory'),
            ln('  cd / cd ~ / cd ..    Navigate home / up'),
            ln('  pwd                  Print working directory'),
            ln('  tree [path]          Show directory tree'),
            ln(''),
            ln('Files:', 'text-slate-500'),
            ln('  cat <file>           Read file contents'),
            ln('  open <name>          Open project/link in browser'),
            ln('  read <slug>          Open blog post'),
            ln('  download <file>      Download a file'),
            ln(''),
            ln('Info:', 'text-slate-500'),
            ln('  whoami               About me'),
            ln('  social               Social media links'),
            ln('  contact              Contact info'),
            ln('  blog                 List blog articles'),
            ln('  projects             List all projects'),
            ln('  skills               Technical skills'),
            ln(''),
            ln('Actions:', 'text-slate-500'),
            ln('  play                 Toggle music player'),
            ln('  book                 Book a call'),
            ln('  resume               Download resume'),
            ln('  goto <section>       Scroll to section'),
            ln('  theme <color>        Change accent color'),
            ln(''),
            ln('Shell:', 'text-slate-500'),
            ln('  echo <text>          Print text'),
            ln('  date                 Show date & time'),
            ln('  hostname             Show hostname'),
            ln('  uname [-a]           System info'),
            ln('  which <cmd>          Locate a command'),
            ln('  env                  Show environment'),
            ln('  history              Command history'),
            ln('  clear / Ctrl+L       Clear terminal'),
            ln('  exit                 Close message'),
          ];
        }
        break;
      }

      /* ── ls ── */
      case 'ls': {
        let showAll = false;
        let showLong = false;
        const pathArgs: string[] = [];

        for (const a of args) {
          if (a.startsWith('-')) {
            if (a.includes('a')) showAll = true;
            if (a.includes('l')) showLong = true;
          } else {
            pathArgs.push(a);
          }
        }

        const target = pathArgs[0] || '.';
        const { node, absPath } = resolvePath(fs, cwd, target);

        if (!node || node.type !== 'dir') {
          if (node?.type === 'file') {
            output = [ln(pathArgs[0] || '.', 'text-slate-100')];
          } else {
            output = [ln(`ls: cannot access '${target}': No such file or directory`, 'text-red-400')];
          }
          break;
        }

        const entries = Object.entries(node.children || {});
        if (entries.length === 0 && !showAll) {
          output = [ln('(empty directory)', 'text-slate-500')];
          break;
        }

        const all = showAll
          ? [['.',  node] as const, ['..', node] as const, ...entries]
          : entries;

        if (showLong) {
          output = [ln(`total ${all.length}`, 'text-slate-500')];
          for (const [name, child] of all) {
            const isDir = typeof child === 'object' && 'type' in child && child.type === 'dir';
            const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
            const size = isDir ? '4096' : String((child as FsNode).content?.length || 0).padStart(5);
            const color = isDir ? 'text-sky-400' : 'text-slate-100';
            const suffix = isDir ? '/' : '';
            const displayName = name + suffix;

            // Clickable if has link or scrollTo
            let action: (() => void) | undefined;
            if (typeof child === 'object' && 'type' in child) {
              const n = child as FsNode;
              if (n.link) action = () => openUrl(n.link!);
              else if (n.scrollTo) action = () => scrollToSection(n.scrollTo!);
            }

            output.push(ln(
              `${perms}  mubashir  ${size}  ${displayName}`,
              color,
              { action }
            ));
          }
        } else {
          // Columnar output — real terminal feel
          const names = all.map(([name, child]) => {
            const isDir = typeof child === 'object' && 'type' in child && child.type === 'dir';
            return { name: name + (isDir ? '/' : ''), isDir };
          });

          const maxLen = Math.max(...names.map((n) => n.name.length));
          const cols = Math.max(1, Math.floor(56 / (maxLen + 2)));
          const rows: OutputLine[] = [];
          let row = '';
          let count = 0;

          for (const { name, isDir } of names) {
            if (count > 0 && count % cols === 0) {
              rows.push(ln(row));
              row = '';
            }
            const padded = name.padEnd(maxLen + 2);
            // We can't mix colors in a single string easily, so output per-item
            const color = isDir ? 'text-sky-400' : name.endsWith('.json') ? 'text-amber-400' : name.endsWith('.md') ? 'text-emerald-400' : name.endsWith('.pdf') ? 'text-red-400' : 'text-slate-100';

            let action: (() => void) | undefined;
            const entryName = name.replace(/\/$/, '');
            const entry = (node.children || {})[entryName];
            if (entry?.link) action = () => openUrl(entry.link!);
            else if (entry?.scrollTo) action = () => scrollToSection(entry.scrollTo!);

            rows.push(ln(`  ${padded}`, color, { action }));
            count++;
          }
          if (row) rows.push(ln(row));
          output = rows;
        }

        // If directory has scrollTo, hint it
        if (node.scrollTo) {
          output.push(ln(''));
          output.push(ln(`↪ Section: ${node.scrollTo}`, 'text-cyan-400', { action: () => scrollToSection(node.scrollTo!) }));
        }
        break;
      }

      /* ── cd ── */
      case 'cd': {
        const target = args[0] || '/';
        if (target === '-') {
          // no "previous dir" tracking, just go home
          setCwd('/');
          output = [];
          break;
        }

        const { node, absPath } = resolvePath(fs, cwd, target);

        if (!node) {
          output = [ln(`cd: no such file or directory: ${target}`, 'text-red-400')];
          break;
        }

        if (node.type !== 'dir') {
          output = [ln(`cd: not a directory: ${target}`, 'text-red-400')];
          break;
        }

        const newCwd = absPath === '' ? '/' : absPath;
        setCwd(newCwd);

        // If the dir maps to a section, scroll to it
        if (node.scrollTo) {
          scrollToSection(node.scrollTo);
          output = [ln(`→ ${node.scrollTo}`, 'text-cyan-400')];
        } else {
          output = [];
        }
        break;
      }

      /* ── pwd ── */
      case 'pwd': {
        output = [ln('~' + cwd, 'text-slate-100')];
        break;
      }

      /* ── tree ── */
      case 'tree': {
        const target = args[0] || '.';
        const { node } = resolvePath(fs, cwd, target);

        if (!node || node.type !== 'dir') {
          output = [ln(`tree: '${target}': not a directory`, 'text-red-400')];
          break;
        }

        output = [ln('.', 'text-sky-400', { bold: true })];
        const lines = renderTree(node, '');
        output.push(...lines);

        const dirs = lines.filter((l) => l.color === 'text-sky-400').length;
        const files = lines.filter((l) => l.color !== 'text-sky-400').length;
        output.push(ln(''));
        output.push(ln(`${dirs} directories, ${files} files`, 'text-slate-500'));
        break;
      }

      /* ── cat ── */
      case 'cat': {
        if (!args[0]) {
          output = [ln('Usage: cat <file>', 'text-amber-400')];
          break;
        }

        const { node: fileNode } = resolvePath(fs, cwd, args[0]);
        if (!fileNode) {
          output = [ln(`cat: ${args[0]}: No such file or directory`, 'text-red-400')];
          break;
        }
        if (fileNode.type === 'dir') {
          output = [ln(`cat: ${args[0]}: Is a directory`, 'text-red-400')];
          break;
        }

        const content = fileNode.content || '';
        if (args[0].endsWith('.json')) {
          output = [{ text: content, isJson: true } as OutputLine & { isJson: boolean }];
        } else {
          output = content.split('\n').map((line, i) => {
            // Color headings (lines followed by === or the first line)
            if (i === 0 || content.split('\n')[i + 1]?.startsWith('===')) {
              return ln(line, 'text-emerald-400', { bold: true });
            }
            if (line.startsWith('===')) return ln(line, 'text-slate-600');
            if (line.startsWith('Tags:') || line.startsWith('Date:') || line.startsWith('Stats:')) {
              return ln(line, 'text-purple-400');
            }
            if (line.startsWith('URL:') || line.startsWith('http')) {
              const url = line.replace('URL: ', '');
              return ln(line, 'text-cyan-400', { action: () => openUrl(url) });
            }
            return ln(line, 'text-slate-300');
          });
        }
        break;
      }

      /* ── open ── */
      case 'open': {
        // Detect context from cwd when no args
        const openTarget = args[0] || '.';
        const openQuery = args.join(' ').toLowerCase();

        // 1) Try as file/dir path (including ".", "..", "README.md")
        const { node: openNode, absPath: openPath } = resolvePath(fs, cwd, openTarget);

        if (openNode) {
          // If it's a dir, check if we're inside a project or blog folder
          if (openNode.type === 'dir') {
            // Check if this dir or a README inside has a link
            const readme = openNode.children?.['README.md'];
            if (readme?.link) {
              openUrl(readme.link);
              output = [
                ln(`Opening ${openPath.split('/').filter(Boolean).pop() || openTarget}...`, 'text-emerald-400'),
                ln(readme.link, 'text-cyan-400', { action: () => openUrl(readme.link!) }),
              ];
              break;
            }
            // Check if dir itself has scrollTo
            if (openNode.scrollTo) {
              scrollToSection(openNode.scrollTo);
              output = [ln(`→ ${openNode.scrollTo}`, 'text-cyan-400')];
              break;
            }
          }
          // If file with link
          if (openNode.link) {
            openUrl(openNode.link);
            output = [
              ln(`Opening ${openTarget}...`, 'text-emerald-400'),
              ln(openNode.link, 'text-cyan-400', { action: () => openUrl(openNode.link!) }),
            ];
            break;
          }
        }

        // 2) Try as project name
        if (openQuery && openQuery !== '.') {
          const projMatch = projects.find(
            (p) => p.title.toLowerCase().includes(openQuery) || p.id.toLowerCase().includes(openQuery)
          );
          if (projMatch) {
            const url = projMatch.links.live || projMatch.links.appStore || projMatch.links.playStore || projMatch.links.github;
            if (url) {
              openUrl(url);
              output = [
                ln(`Opening ${projMatch.title}...`, 'text-emerald-400'),
                ln(url, 'text-cyan-400', { action: () => openUrl(url) }),
              ];
            } else {
              output = [ln(`No public link for "${projMatch.title}"`, 'text-amber-400')];
            }
            break;
          }

          // 3) Try as blog post
          const blogMatch = blogPosts.find(
            (p) => p.id.toLowerCase().includes(openQuery) || p.title.toLowerCase().includes(openQuery)
          );
          if (blogMatch) {
            const url = `/blog/${blogMatch.id}`;
            openUrl(url);
            output = [
              ln(`Opening "${blogMatch.title}"...`, 'text-emerald-400'),
              ln(url, 'text-cyan-400', { action: () => openUrl(url) }),
            ];
            break;
          }
        }

        // 4) No match — try to infer from cwd
        const cwdParts = cwd.split('/').filter(Boolean);
        if (cwdParts[0] === 'projects' && cwdParts[1]) {
          const proj = projects.find((p) => p.id === cwdParts[1]);
          if (proj) {
            const url = proj.links.live || proj.links.appStore || proj.links.playStore || proj.links.github;
            if (url) {
              openUrl(url);
              output = [
                ln(`Opening ${proj.title}...`, 'text-emerald-400'),
                ln(url, 'text-cyan-400', { action: () => openUrl(url) }),
              ];
              break;
            }
          }
        }
        if (cwdParts[0] === 'blog') {
          // If inside blog dir, show blog section
          scrollToSection('blog');
          output = [ln('→ blog', 'text-cyan-400')];
          break;
        }

        output = [
          ln(`open: '${openQuery}' not found`, 'text-red-400'),
          ln('Try "projects" or "blog" to list items.', 'text-slate-500'),
        ];
        break;
      }

      /* ── read ── */
      case 'read': {
        // Detect context: if inside blog/ dir with no args, show that post
        let readQuery = args.join(' ').toLowerCase();

        // If no args, try to infer from cwd
        if (!readQuery) {
          const cwdParts = cwd.split('/').filter(Boolean);
          if (cwdParts[0] === 'blog') {
            // list all blog posts
            output = [
              ln('Blog articles:', 'text-emerald-400', { bold: true }),
              ln(''),
            ];
            blogPosts.forEach((post) => {
              output.push(ln(`  ${post.id}`, 'text-cyan-400', { action: () => openUrl(`/blog/${post.id}`) }));
              output.push(ln(`  ${post.title}  ·  ${post.readTime} min`, 'text-slate-500'));
              output.push(ln(''));
            });
            output.push(ln('Type "read <slug>" to open.', 'text-slate-500'));
            break;
          }
          output = [
            ln('Usage: read <blog-slug>', 'text-amber-400'),
            ln('Type "blog" to see available articles.', 'text-slate-500'),
          ];
          break;
        }

        // Strip .md extension if user typed it
        readQuery = readQuery.replace(/\.md$/, '');

        const readMatch = blogPosts.find(
          (p) => p.id.toLowerCase().includes(readQuery) || p.title.toLowerCase().includes(readQuery)
        );
        if (readMatch) {
          const url = `/blog/${readMatch.id}`;
          openUrl(url);
          output = [
            ln(`Opening "${readMatch.title}"...`, 'text-emerald-400'),
            ln(url, 'text-cyan-400', { action: () => openUrl(url) }),
          ];
        } else {
          output = [
            ln(`Article not found: "${readQuery}"`, 'text-red-400'),
            ln('Type "blog" to see available articles.', 'text-slate-500'),
          ];
        }
        break;
      }

      /* ── whoami ── */
      case 'whoami': {
        output = [ln('mubashir', 'text-emerald-400')];
        break;
      }

      /* ── id ── */
      case 'id': {
        output = [ln('uid=1000(mubashir) gid=1000(dev) groups=1000(dev),27(flutter)', 'text-slate-300')];
        break;
      }

      /* ── skills ── */
      case 'skills': {
        const { node: skillNode } = resolvePath(fs, cwd, '/skills.json');
        output = [{ text: skillNode?.content || '{}', isJson: true } as OutputLine & { isJson: boolean }];
        break;
      }

      /* ── projects ── */
      case 'projects': {
        output = [
          ln(`${projects.length} projects found:`, 'text-emerald-400', { bold: true }),
          ln(''),
        ];
        projects.forEach((p, i) => {
          const url = p.links.live || p.links.appStore || p.links.playStore || p.links.github;
          output.push(ln(
            `  ${String(i + 1).padStart(2, '0')}  ${p.title.padEnd(22)} ${(p.stats || '').padEnd(20)} ${p.category}`,
            'text-cyan-400',
            { action: url ? () => openUrl(url) : undefined }
          ));
        });
        output.push(ln(''));
        output.push(ln('Click a project or type "open <name>" to visit.', 'text-slate-500'));
        output.push(ln('↪ View projects section', 'text-cyan-400', { action: () => scrollToSection('projects') }));
        break;
      }

      /* ── blog ── */
      case 'blog': {
        output = [
          ln(`${blogPosts.length} articles:`, 'text-emerald-400', { bold: true }),
          ln(''),
        ];
        blogPosts.forEach((post) => {
          output.push(ln(
            `  ${post.title}`,
            'text-cyan-400',
            { action: () => openUrl(`/blog/${post.id}`) }
          ));
          output.push(ln(
            `  ${post.readTime} min  ·  ${post.tags.join(', ')}`,
            'text-slate-500'
          ));
          output.push(ln(''));
        });
        output.push(ln('Type "read <slug>" to open.', 'text-slate-500'));
        output.push(ln('↪ View blog section', 'text-cyan-400', { action: () => scrollToSection('blog') }));
        break;
      }

      /* ── social ── */
      case 'social': {
        const links = [
          { name: 'github', url: 'https://github.com/mubashirspam' },
          { name: 'linkedin', url: 'https://www.linkedin.com/in/mubashir-ahmad/' },
          { name: 'bluesky', url: 'https://bsky.app/profile/mubashirahmed.bsky.social' },
          { name: 'email', url: 'mailto:getmemubashir@gmail.com' },
        ];
        output = [ln('Social Links:', 'text-emerald-400', { bold: true }), ln('')];
        links.forEach((s) => {
          output.push(ln(`  ${s.name.padEnd(12)} ${s.url}`, 'text-cyan-400', { action: () => openUrl(s.url) }));
        });
        break;
      }

      /* ── contact ── */
      case 'contact': {
        output = [
          ln('Contact:', 'text-emerald-400', { bold: true }),
          ln(''),
          ln('  Email     getmemubashir@gmail.com', 'text-cyan-400', { action: () => openUrl('mailto:getmemubashir@gmail.com') }),
          ln('  Phone     +91 9562229979'),
          ln('  Location  Wayanad, Kerala, India'),
          ln('  Book      topmate.io/mubashir_ahammed', 'text-cyan-400', { action: () => openUrl('https://topmate.io/mubashir_ahammed') }),
          ln(''),
          ln('↪ Scroll to contact', 'text-cyan-400', { action: () => scrollToSection('contact') }),
        ];
        break;
      }

      /* ── play ── */
      case 'play': {
        window.dispatchEvent(new CustomEvent('terminal:toggle-music'));
        scrollToSection('contact');
        output = [ln('♫ Toggling music...', 'text-emerald-400')];
        break;
      }

      /* ── book ── */
      case 'book': {
        openUrl('https://topmate.io/mubashir_ahammed');
        output = [ln('Opening booking page...', 'text-emerald-400')];
        break;
      }

      /* ── resume / download ── */
      case 'resume':
      case 'download': {
        const file = cmd === 'download' ? args[0] || 'resume.pdf' : 'resume.pdf';
        if (file === 'resume' || file === 'resume.pdf') {
          const a = document.createElement('a');
          a.href = '/resume.pdf';
          a.download = 'Mubashir_Ahmed_Resume.pdf';
          a.click();
          output = [ln('↓ Downloading resume.pdf...', 'text-emerald-400')];
        } else {
          output = [ln(`download: '${file}' not found`, 'text-red-400')];
        }
        break;
      }

      /* ── goto ── */
      case 'goto': {
        const map: Record<string, string> = {
          bio: 'bio', about: 'bio', stats: 'stats', numbers: 'stats',
          projects: 'projects', work: 'projects',
          techstack: 'techstack', tech: 'techstack', skills: 'techstack',
          experience: 'experience', timeline: 'experience',
          expertise: 'expertise', quote: 'expertise', roles: 'roles',
          testimonials: 'testimonials', reviews: 'testimonials',
          blog: 'blog', articles: 'blog',
          contact: 'contact', music: 'contact', top: 'hero', home: 'hero',
        };
        const target = args[0]?.toLowerCase();
        if (!target || !map[target]) {
          output = [
            ln('Usage: goto <section>', 'text-amber-400'),
            ln('Sections: bio, stats, projects, techstack, experience, expertise, roles, testimonials, blog, contact, top', 'text-slate-500'),
          ];
        } else {
          scrollToSection(map[target]);
          output = [ln(`→ Scrolling to ${target}`, 'text-emerald-400')];
        }
        break;
      }

      /* ── theme ── */
      case 'theme': {
        const colors: Record<string, string> = {
          purple: '#7C3AED', blue: '#2563EB', green: '#16A34A', orange: '#EA580C',
          red: '#DC2626', teal: '#0D9488', indigo: '#4F46E5', pink: '#DB2777',
        };
        const c = args[0]?.toLowerCase();
        if (!c || !colors[c]) {
          output = [
            ln('Usage: theme <color>', 'text-amber-400'),
            ln(`Colors: ${Object.keys(colors).join('  ')}`, 'text-slate-500'),
          ];
        } else {
          document.documentElement.style.setProperty('--accent-color', colors[c]);
          localStorage.setItem('theme-accent', c);
          output = [ln(`✓ Accent → ${c}`, 'text-emerald-400')];
        }
        break;
      }

      /* ── echo ── */
      case 'echo': {
        output = [ln(args.join(' ') || '', 'text-slate-100')];
        break;
      }

      /* ── date ── */
      case 'date': {
        output = [ln(new Date().toString(), 'text-slate-100')];
        break;
      }

      /* ── hostname ── */
      case 'hostname': {
        output = [ln('mubashir.dev', 'text-slate-100')];
        break;
      }

      /* ── uname ── */
      case 'uname': {
        if (args.includes('-a')) {
          output = [ln('Portfolio OS 1.0.0 mubashir.dev x86_64 Next.js/16 React/19 TypeScript', 'text-slate-100')];
        } else {
          output = [ln('Portfolio OS', 'text-slate-100')];
        }
        break;
      }

      /* ── which ── */
      case 'which': {
        if (!args[0]) {
          output = [ln('Usage: which <command>', 'text-amber-400')];
        } else if (allCommands.includes(args[0])) {
          output = [ln(`/usr/local/bin/${args[0]}`, 'text-slate-100')];
        } else {
          output = [ln(`${args[0]} not found`, 'text-red-400')];
        }
        break;
      }

      /* ── env ── */
      case 'env': {
        output = [
          ln('USER=mubashir'),
          ln('HOME=~/portfolio'),
          ln('SHELL=/bin/zsh'),
          ln('LANG=en_US.UTF-8'),
          ln('TERM=xterm-256color'),
          ln(`PWD=~${cwd}`),
          ln('FRAMEWORK=Next.js@16'),
          ln('NODE_VERSION=22'),
          ln('EDITOR=vim'),
        ];
        break;
      }

      /* ── history ── */
      case 'history': {
        if (cmdHistory.length === 0) {
          output = [ln('(no history)', 'text-slate-500')];
        } else {
          output = cmdHistory.map((c, i) =>
            ln(`  ${String(i + 1).padStart(4)}  ${c}`, 'text-slate-300')
          );
        }
        break;
      }

      /* ── grep ── */
      case 'grep': {
        if (args.length < 1) {
          output = [ln('Usage: grep <pattern> [file]', 'text-amber-400')];
          break;
        }
        const pattern = args[0].toLowerCase();
        const grepFile = args[1];

        if (grepFile) {
          const { node: gn } = resolvePath(fs, cwd, grepFile);
          if (!gn || gn.type !== 'file' || !gn.content) {
            output = [ln(`grep: ${grepFile}: No such file`, 'text-red-400')];
          } else {
            const matches = gn.content.split('\n').filter((l) => l.toLowerCase().includes(pattern));
            output = matches.length > 0
              ? matches.map((m) => ln(m, 'text-slate-100'))
              : [ln('(no matches)', 'text-slate-500')];
          }
        } else {
          // Search across all projects and blog
          const results: OutputLine[] = [];
          projects.forEach((p) => {
            if (p.title.toLowerCase().includes(pattern) || p.description.toLowerCase().includes(pattern)) {
              results.push(ln(`  projects/${p.id}: ${p.title}`, 'text-cyan-400'));
            }
          });
          blogPosts.forEach((b) => {
            if (b.title.toLowerCase().includes(pattern) || b.excerpt.toLowerCase().includes(pattern)) {
              results.push(ln(`  blog/${b.id}: ${b.title}`, 'text-cyan-400'));
            }
          });
          output = results.length > 0
            ? [ln(`Found ${results.length} matches for "${pattern}":`, 'text-emerald-400'), ln(''), ...results]
            : [ln(`No matches for "${pattern}"`, 'text-slate-500')];
        }
        break;
      }

      /* ── find ── */
      case 'find': {
        const pattern = args[0]?.toLowerCase() || '';
        if (!pattern) {
          output = [ln('Usage: find <name>', 'text-amber-400')];
          break;
        }
        const found: string[] = [];
        function walk(node: FsNode, path: string) {
          if (node.children) {
            for (const [name, child] of Object.entries(node.children)) {
              const full = `${path}/${name}`;
              if (name.toLowerCase().includes(pattern)) found.push(full);
              if (child.type === 'dir') walk(child, full);
            }
          }
        }
        walk(fs, '.');
        output = found.length > 0
          ? found.map((f) => ln(f, 'text-slate-100'))
          : [ln(`No files matching "${pattern}"`, 'text-slate-500')];
        break;
      }

      /* ── touch / mkdir (read-only fs) ── */
      case 'touch':
      case 'mkdir':
      case 'rm':
      case 'mv':
      case 'cp': {
        output = [ln(`${cmd}: read-only file system`, 'text-amber-400')];
        break;
      }

      /* ── exit ── */
      case 'exit':
      case 'logout': {
        output = [
          ln('Thanks for visiting! 👋', 'text-emerald-400', { bold: true }),
          ln('Feel free to reach out at getmemubashir@gmail.com', 'text-slate-400'),
        ];
        break;
      }

      /* ── sudo ── */
      case 'sudo': {
        output = [ln('mubashir is not in the sudoers file. Nice try though 😄', 'text-amber-400')];
        break;
      }

      /* ── neofetch ── */
      case 'neofetch': {
        output = [
          ln('        ╭──────────────────╮', 'text-cyan-400'),
          ln('   ╱╲   │ mubashir@dev     │', 'text-cyan-400'),
          ln('  ╱  ╲  ├──────────────────┤', 'text-cyan-400'),
          ln(' ╱    ╲ │ OS: Portfolio OS  │', 'text-slate-300'),
          ln('╱──────╲│ Host: mubashir   │', 'text-slate-300'),
          ln('╲      ╱│ Shell: zsh       │', 'text-slate-300'),
          ln(' ╲    ╱ │ Stack: Next.js   │', 'text-slate-300'),
          ln('  ╲  ╱  │ Theme: accent    │', 'text-slate-300'),
          ln('   ╲╱   │ Uptime: 6+ yrs  │', 'text-slate-300'),
          ln('        ╰──────────────────╯', 'text-cyan-400'),
          ln(''),
          ln('  ● ● ● ● ● ● ● ●', 'text-red-400'),
        ];
        break;
      }

      /* ── clear ── */
      case 'clear': {
        setHistory([]);
        setInput('');
        setSuggestions([]);
        return;
      }

      /* ── unknown ── */
      default: {
        output = [
          ln(`zsh: command not found: ${cmd}`, 'text-red-400'),
          ln('Type "help" for available commands.', 'text-slate-500'),
        ];
      }
    }

    if (output.length > 0) {
      setHistory((prev) => [...prev, { type: 'output', lines: output }]);
    }

    setInput('');
    setSuggestions([]);
  }, [fs, cwd, prompt, cmdHistory]);

  /* ── context-aware autocomplete ── */
  const updateSuggestions = useCallback((value: string) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const parts = value.trimStart().split(/\s+/);
    const typing = parts[parts.length - 1].toLowerCase();

    // ── First word → suggest commands ──
    if (parts.length <= 1) {
      const matches = allCommands.filter((c) => c.startsWith(typing));
      setSuggestions(matches.slice(0, 10));
      setSelSuggestion(0);
      return;
    }

    const cmd = parts[0].toLowerCase();

    // ── Command-specific argument suggestions ──
    const argSuggestions = getArgSuggestions(cmd, typing, fs, cwd);

    if (argSuggestions.length > 0) {
      setSuggestions(argSuggestions.slice(0, 10));
      setSelSuggestion(0);
    } else {
      setSuggestions([]);
    }
  }, [fs, cwd]);

  /* ── key handling ── */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      exec(input);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        const parts = input.trimStart().split(/\s+/);
        if (parts.length <= 1) {
          setInput(suggestions[selSuggestion] + ' ');
        } else {
          parts[parts.length - 1] = suggestions[selSuggestion];
          setInput(parts.join(' '));
        }
        setSuggestions([]);
      }
    } else if (e.key === 'ArrowDown' && suggestions.length > 0) {
      e.preventDefault();
      setSelSuggestion((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      if (suggestions.length > 0) {
        e.preventDefault();
        setSelSuggestion((prev) => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (cmdHistory.length > 0) {
        e.preventDefault();
        const next = cmdIdx < cmdHistory.length - 1 ? cmdIdx + 1 : cmdIdx;
        setCmdIdx(next);
        setInput(cmdHistory[cmdHistory.length - 1 - next]);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    updateSuggestions(e.target.value);
  };

  const focusInput = () => inputRef.current?.focus();

  const quickCmds = ['help', 'projects', 'blog', 'social', 'skills', 'play', 'neofetch'];

  return (
    <div className="w-full select-none" onClick={focusInput}>
      {/* ── Window Header ── */}
      <div className="bg-[#1e1e2e] rounded-t-2xl px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] font-mono text-slate-500 tracking-wide">
          mubashir@portfolio: {prompt}
        </span>
        <div className="w-14" />
      </div>

      {/* ── Terminal Body ── */}
      <div
        ref={bodyRef}
        className="bg-[#0f1019] px-5 py-4 font-mono text-[13px] leading-[1.7] text-slate-100 h-72 sm:h-80 overflow-y-auto"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e1e2e transparent', fontFeatureSettings: '"liga" 1, "calt" 1' }}
      >
        <AnimatePresence>
          {history.map((entry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="whitespace-pre-wrap"
            >
              {entry.type === 'input' ? (
                <div>
                  <span className="text-sky-400">{entry.cwd || '~'}</span>
                  <span className="text-slate-500"> $ </span>
                  <span className="text-slate-100">{entry.lines[0].text}</span>
                </div>
              ) : (
                <div>
                  {entry.lines.map((l, i) => {
                    // JSON rendering
                    if ('isJson' in l && (l as OutputLine & { isJson?: boolean }).isJson) {
                      return (
                        <pre key={i} className="leading-[1.7]">
                          <JsonHighlight content={l.text} />
                        </pre>
                      );
                    }
                    return (
                      <div
                        key={i}
                        className={[
                          l.color || 'text-slate-300',
                          l.bold ? 'font-bold' : '',
                          l.action ? 'cursor-pointer hover:underline hover:brightness-125' : '',
                        ].join(' ')}
                        onClick={l.action}
                        role={l.action ? 'button' : undefined}
                        tabIndex={l.action ? 0 : undefined}
                        onKeyDown={l.action ? (e) => { if (e.key === 'Enter') l.action!(); } : undefined}
                      >
                        {l.text}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Input Area ── */}
      <div className="bg-[#11121d] rounded-b-2xl px-5 py-3.5 border-t border-white/5">
        <div className="flex items-center gap-0 mb-3 font-mono text-[13px]">
          <span className="text-sky-400">{prompt}</span>
          <span className="text-slate-500 mr-1"> $ </span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="type a command..."
              className="w-full bg-transparent text-slate-100 font-mono text-[13px] outline-none placeholder-slate-700 caret-emerald-400"
              autoComplete="off"
              spellCheck={false}
              autoFocus
            />

            {/* Autocomplete */}
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute bottom-full left-0 mb-2 bg-[#1a1b2e] rounded-lg border border-white/10 overflow-hidden z-50 min-w-[240px] max-w-[360px] shadow-2xl max-h-[200px] overflow-y-auto"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#334155 transparent' }}
                >
                  {suggestions.map((s, i) => {
                    const parts = input.trimStart().split(/\s+/);
                    const isCmd = parts.length <= 1;
                    const cmdName = parts[0]?.toLowerCase();
                    const hint = isCmd
                      ? cmdDescriptions[s] || ''
                      : getSuggestionHint(cmdName, s);

                    return (
                      <button
                        key={s}
                        onClick={() => {
                          if (isCmd) {
                            setInput(s + ' ');
                          } else {
                            parts[parts.length - 1] = s;
                            setInput(parts.join(' '));
                          }
                          setSuggestions([]);
                          inputRef.current?.focus();
                        }}
                        className={`w-full text-left px-3 py-1.5 font-mono text-[12px] transition-colors flex items-center gap-2 ${
                          i === selSuggestion
                            ? 'bg-purple-600/30 text-white'
                            : 'text-slate-400 hover:bg-white/5'
                        }`}
                      >
                        <span className="text-emerald-400 shrink-0">{s}</span>
                        {hint && <span className="text-slate-600 truncate">{hint}</span>}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="flex flex-wrap gap-1.5">
          {quickCmds.map((c) => (
            <button
              key={c}
              onClick={() => exec(c)}
              className="px-2 py-0.5 text-[11px] font-mono text-slate-500 bg-white/[0.03] hover:bg-white/[0.08] hover:text-slate-200 rounded border border-white/5 transition-colors"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Context-aware argument suggestions
   ═══════════════════════════════════════════════════ */

const themeColors = ['purple', 'blue', 'green', 'orange', 'red', 'teal', 'indigo', 'pink'];
const gotoSections = ['bio', 'about', 'stats', 'projects', 'work', 'techstack', 'tech', 'skills', 'experience', 'timeline', 'expertise', 'roles', 'testimonials', 'reviews', 'blog', 'contact', 'music', 'top', 'home'];

function getArgSuggestions(cmd: string, typing: string, fs: FsNode, cwd: string): string[] {
  switch (cmd) {
    // ── theme → color names ──
    case 'theme':
      return themeColors.filter((c) => c.startsWith(typing));

    // ── goto → section names ──
    case 'goto':
      return gotoSections.filter((s) => s.startsWith(typing));

    // ── open → project names + blog slugs ──
    case 'open': {
      const items = [
        ...projects.map((p) => p.id),
        ...projects.map((p) => p.title.toLowerCase().replace(/\s+/g, '-')),
        ...blogPosts.map((b) => b.id),
      ];
      return items.filter((i) => i.startsWith(typing));
    }

    // ── read → blog slugs ──
    case 'read': {
      const slugs = blogPosts.map((b) => b.id);
      return slugs.filter((s) => s.startsWith(typing));
    }

    // ── man / which → command names ──
    case 'man':
    case 'which':
      return allCommands.filter((c) => c.startsWith(typing));

    // ── cd → directories only ──
    case 'cd': {
      return fsCompletions(fs, cwd, typing, 'dir');
    }

    // ── ls / tree → dirs (but also files) ──
    case 'ls':
    case 'tree':
      return fsCompletions(fs, cwd, typing, 'all');

    // ── cat / grep (2nd arg) / download → files only ──
    case 'cat':
    case 'download':
      return fsCompletions(fs, cwd, typing, 'file');

    case 'grep':
      return fsCompletions(fs, cwd, typing, 'file');

    // ── uname → flags ──
    case 'uname':
      return ['-a'].filter((f) => f.startsWith(typing));

    default:
      // fallback: try filesystem paths
      return fsCompletions(fs, cwd, typing, 'all');
  }
}

function getSuggestionHint(cmd: string, suggestion: string): string {
  switch (cmd) {
    case 'theme':
      return '● color';
    case 'goto':
      return '↪ section';
    case 'open': {
      const proj = projects.find((p) => p.id === suggestion || p.title.toLowerCase().replace(/\s+/g, '-') === suggestion);
      if (proj) return proj.title;
      const blog = blogPosts.find((b) => b.id === suggestion);
      if (blog) return blog.title;
      return '';
    }
    case 'read': {
      const post = blogPosts.find((b) => b.id === suggestion);
      return post ? `${post.readTime}min · ${post.tags[0]}` : '';
    }
    case 'man':
    case 'which':
      return cmdDescriptions[suggestion]?.slice(0, 30) || '';
    default: {
      // filesystem: show dir/file
      if (suggestion.endsWith('/')) return 'dir';
      if (suggestion.endsWith('.json')) return 'json';
      if (suggestion.endsWith('.md')) return 'markdown';
      if (suggestion.endsWith('.pdf')) return 'pdf';
      if (suggestion.endsWith('.txt')) return 'text';
      return '';
    }
  }
}

function fsCompletions(fs: FsNode, cwd: string, partial: string, filter: 'dir' | 'file' | 'all'): string[] {
  const lastSlash = partial.lastIndexOf('/');
  const dirPart = lastSlash >= 0 ? partial.slice(0, lastSlash + 1) : '';
  const namePart = lastSlash >= 0 ? partial.slice(lastSlash + 1) : partial;

  const { node } = resolvePath(fs, cwd, dirPart || '.');
  if (!node || node.type !== 'dir' || !node.children) return [];

  return Object.entries(node.children)
    .filter(([name, child]) => {
      if (!name.toLowerCase().startsWith(namePart.toLowerCase())) return false;
      if (filter === 'dir') return child.type === 'dir';
      if (filter === 'file') return child.type === 'file';
      return true;
    })
    .map(([name, child]) => dirPart + name + (child.type === 'dir' ? '/' : ''));
}

/* ═══════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════ */

const allCommands = [
  'help', 'ls', 'cd', 'pwd', 'cat', 'tree', 'open', 'read',
  'whoami', 'id', 'skills', 'projects', 'blog', 'social', 'contact',
  'play', 'book', 'resume', 'download', 'goto', 'theme',
  'echo', 'date', 'hostname', 'uname', 'which', 'env', 'history',
  'grep', 'find', 'man', 'neofetch', 'clear', 'exit', 'sudo',
];

const cmdDescriptions: Record<string, string> = {
  ls: 'List directory contents. Flags: -a (all), -l (long)',
  cd: 'Change directory. Supports ., .., ~, /, relative & absolute paths',
  pwd: 'Print the current working directory',
  cat: 'Print file contents',
  tree: 'Display directory tree',
  open: 'Open a project, blog post, or file link in browser',
  read: 'Open a blog post by slug or title',
  whoami: 'Display current user',
  skills: 'Show technical skills as JSON',
  projects: 'List all portfolio projects',
  blog: 'List all blog articles',
  social: 'Display social media links',
  contact: 'Show contact information',
  play: 'Toggle the music player',
  book: 'Open booking page (topmate.io)',
  resume: 'Download resume PDF',
  goto: 'Scroll to a page section',
  theme: 'Change accent color (purple, blue, green, orange, red, teal, indigo, pink)',
  echo: 'Print text to terminal',
  date: 'Show current date and time',
  hostname: 'Show hostname',
  uname: 'Show system info. Flag: -a',
  which: 'Locate a command',
  env: 'Show environment variables',
  history: 'Show command history',
  grep: 'Search for pattern in file or across projects/blog',
  find: 'Find files by name',
  man: 'Show manual for a command',
  neofetch: 'Display system info with ASCII art',
  clear: 'Clear the terminal screen',
  exit: 'Say goodbye',
  sudo: 'Execute as superuser (denied)',
};

function renderTree(node: FsNode, prefix: string): OutputLine[] {
  const lines: OutputLine[] = [];
  const entries = Object.entries(node.children || {});
  entries.forEach(([name, child], i) => {
    const isLast = i === entries.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const isDir = child.type === 'dir';
    const color = isDir ? 'text-sky-400' : name.endsWith('.json') ? 'text-amber-400' : name.endsWith('.md') ? 'text-emerald-400' : 'text-slate-300';

    lines.push(ln(`${prefix}${connector}${name}${isDir ? '/' : ''}`, color));

    if (isDir) {
      const childPrefix = prefix + (isLast ? '    ' : '│   ');
      lines.push(...renderTree(child, childPrefix));
    }
  });
  return lines;
}

function JsonHighlight({ content }: { content: string }) {
  const highlighted = content
    .replace(/"([^"]+)":/g, '<span class="text-purple-400">"$1"</span>:')
    .replace(/: "([^"]+)"/g, ': <span class="text-emerald-400">"$1"</span>')
    .replace(/: (\d+)/g, ': <span class="text-amber-400">$1</span>')
    .replace(/\[([^\]]+)\]/g, (_match, inner: string) => {
      const items = inner
        .split(',')
        .map((item) => `<span class="text-emerald-400">${item.trim()}</span>`)
        .join(', ');
      return `[${items}]`;
    });

  return (
    <code
      className="text-slate-300"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}
