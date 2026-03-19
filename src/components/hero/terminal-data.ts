export interface TerminalOutputLine {
  content: string;
  color?: 'green' | 'blue' | 'yellow' | 'purple' | 'gray' | 'white' | 'cyan';
  isJson?: boolean;
}

export interface TerminalStep {
  type: 'command';
  content: string;
  output: TerminalOutputLine[];
  typingDuration: number;
  pauseAfter: number;
}

export const terminalSequence: TerminalStep[] = [
  {
    type: 'command',
    content: 'whoami',
    output: [
      { content: 'Mubashir Ahmed', color: 'green' },
      { content: 'Senior Flutter Engineer & Mobile Architect', color: 'blue' },
      { content: 'Kerala, India', color: 'gray' },
    ],
    typingDuration: 600,
    pauseAfter: 800,
  },
  {
    type: 'command',
    content: 'cat skills.json',
    output: [
      {
        content: `{
  "core": ["Flutter", "Dart", "Clean Architecture"],
  "state": ["BLoC", "Riverpod", "GetX"],
  "backend": ["Firebase", "Supabase", "Node.js"],
  "web": ["Next.js", "React", "TypeScript"],
  "experience": "6+ years"
}`,
        isJson: true,
      },
    ],
    typingDuration: 1200,
    pauseAfter: 1000,
  },
  {
    type: 'command',
    content: 'ls projects/',
    output: [
      { content: 'eduport/          ', color: 'cyan' },
      { content: '# 600K+ downloads, 115M learning hours', color: 'gray' },
      { content: 'telios-survey/    ', color: 'cyan' },
      { content: '# GeoJSON mapping & offline-first', color: 'gray' },
      { content: 'autographa/       ', color: 'cyan' },
      { content: '# Bible translation with GraphQL', color: 'gray' },
      { content: 'kevell-care/      ', color: 'cyan' },
      { content: '# IoT health monitoring via MQTT', color: 'gray' },
    ],
    typingDuration: 1000,
    pauseAfter: 800,
  },
  {
    type: 'command',
    content: './lets-collaborate.sh',
    output: [
      {
        content: 'Ready to build something amazing together!',
        color: 'green',
      },
      { content: 'getmemubashir@gmail.com', color: 'white' },
    ],
    typingDuration: 1400,
    pauseAfter: 500,
  },
];
