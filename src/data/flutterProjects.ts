export type FlutterCategory = 'games' | '3d-animation' | 'ui-effects' | 'tools';

export interface FlutterProject {
  id: string;
  title: string;
  category: FlutterCategory;
  description: string;
  wide?: boolean;
  flutterCode: string;
}

export const filterTabs = [
  { label: 'All', value: 'all' },
  { label: 'Games', value: 'games' },
  { label: '3D & Animation', value: '3d-animation' },
  { label: 'UI Effects', value: 'ui-effects' },
  { label: 'Tools', value: 'tools' },
] as const;

export const flutterProjects: FlutterProject[] = [
  // ─── Games (8) ───
  {
    id: 'snake-game',
    title: 'Snake Game',
    category: 'games',
    description: 'Classic grid-based snake with score counter',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:math';

class SnakeGame extends StatefulWidget {
  @override
  _SnakeGameState createState() => _SnakeGameState();
}

class _SnakeGameState extends State<SnakeGame> {
  static const int rows = 20, cols = 20;
  List<Point<int>> snake = [Point(10, 10)];
  Point<int> food = Point(15, 15);
  String direction = 'right';
  int score = 0;
  Timer? timer;

  @override
  void initState() {
    super.initState();
    timer = Timer.periodic(Duration(milliseconds: 200), (_) => moveSnake());
  }

  void moveSnake() {
    setState(() {
      final head = snake.first;
      final next = {
        'up': Point(head.x, head.y - 1),
        'down': Point(head.x, head.y + 1),
        'left': Point(head.x - 1, head.y),
        'right': Point(head.x + 1, head.y),
      }[direction]!;
      snake.insert(0, next);
      if (next == food) {
        score++;
        food = Point(Random().nextInt(cols), Random().nextInt(rows));
      } else {
        snake.removeLast();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onVerticalDragUpdate: (d) =>
          direction = d.delta.dy > 0 ? 'down' : 'up',
      onHorizontalDragUpdate: (d) =>
          direction = d.delta.dx > 0 ? 'right' : 'left',
      child: CustomPaint(
        painter: SnakePainter(snake, food, rows, cols),
        child: Center(child: Text('Score: \$score')),
      ),
    );
  }
}`,
  },
  {
    id: '2048-puzzle',
    title: '2048 Puzzle',
    category: 'games',
    description: 'Sliding tile game with merge animation',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:math';

class Game2048 extends StatefulWidget {
  @override
  _Game2048State createState() => _Game2048State();
}

class _Game2048State extends State<Game2048> {
  List<List<int>> grid = List.generate(4, (_) => List.filled(4, 0));

  @override
  void initState() {
    super.initState();
    spawnTile();
    spawnTile();
  }

  void spawnTile() {
    final empty = <Point<int>>[];
    for (int r = 0; r < 4; r++)
      for (int c = 0; c < 4; c++)
        if (grid[r][c] == 0) empty.add(Point(r, c));
    if (empty.isEmpty) return;
    final pos = empty[Random().nextInt(empty.length)];
    grid[pos.x][pos.y] = Random().nextDouble() < 0.9 ? 2 : 4;
  }

  Color tileColor(int val) => {
    2: Color(0xFFEEE4DA), 4: Color(0xFFEDE0C8),
    8: Color(0xFFF2B179), 16: Color(0xFFF59563),
    32: Color(0xFFF67C5F), 64: Color(0xFFF65E3B),
    128: Color(0xFFEDCF72), 256: Color(0xFFEDCC61),
  }[val] ?? Color(0xFFCDC1B4);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onHorizontalDragEnd: (d) => slide(d.primaryVelocity! > 0 ? 'right' : 'left'),
      onVerticalDragEnd: (d) => slide(d.primaryVelocity! > 0 ? 'down' : 'up'),
      child: GridView.count(
        crossAxisCount: 4,
        children: grid.expand((row) => row.map((v) => AnimatedContainer(
          duration: Duration(milliseconds: 200),
          decoration: BoxDecoration(
            color: tileColor(v), borderRadius: BorderRadius.circular(8)),
          child: Center(child: Text(v > 0 ? '\$v' : '',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold))),
        ))).toList(),
      ),
    );
  }
}`,
  },
  {
    id: 'flappy-bird',
    title: 'Flappy Bird Clone',
    category: 'games',
    description: 'Tap physics with pipe scrolling',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:async';

class FlappyBird extends StatefulWidget {
  @override
  _FlappyBirdState createState() => _FlappyBirdState();
}

class _FlappyBirdState extends State<FlappyBird> {
  double birdY = 0;
  double velocity = 0;
  double gravity = 0.5;
  double jumpForce = -8;
  List<double> pipeX = [300, 500];
  List<double> pipeGap = [150, 200];
  int score = 0;
  Timer? gameLoop;

  void startGame() {
    gameLoop = Timer.periodic(Duration(milliseconds: 30), (_) {
      setState(() {
        velocity += gravity;
        birdY += velocity;
        for (int i = 0; i < pipeX.length; i++) {
          pipeX[i] -= 3;
          if (pipeX[i] < -60) {
            pipeX[i] = 400;
            score++;
          }
        }
      });
    });
  }

  void jump() => setState(() => velocity = jumpForce);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: jump,
      child: CustomPaint(
        painter: FlappyPainter(
          birdY: birdY,
          pipes: pipeX,
          gaps: pipeGap,
        ),
        child: Align(
          alignment: Alignment.topCenter,
          child: Text('Score: \$score',
            style: TextStyle(fontSize: 32, color: Colors.white)),
        ),
      ),
    );
  }
}`,
  },
  {
    id: 'memory-match',
    title: 'Memory Card Match',
    category: 'games',
    description: 'Flip animation card pairs',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:math';

class MemoryMatch extends StatefulWidget {
  @override
  _MemoryMatchState createState() => _MemoryMatchState();
}

class _MemoryMatchState extends State<MemoryMatch> {
  final icons = ['🎮', '🎯', '🎨', '🎵', '🎪', '🎭', '🎲', '🎸'];
  late List<String> cards;
  Set<int> flipped = {}, matched = {};
  int? firstPick;

  @override
  void initState() {
    super.initState();
    cards = [...icons, ...icons]..shuffle(Random());
  }

  void flipCard(int index) {
    if (flipped.contains(index) || matched.contains(index)) return;
    setState(() {
      flipped.add(index);
      if (firstPick == null) {
        firstPick = index;
      } else {
        if (cards[firstPick!] == cards[index]) {
          matched.addAll([firstPick!, index]);
        }
        Future.delayed(Duration(seconds: 1), () {
          setState(() { flipped.removeAll([firstPick!, index]); firstPick = null; });
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 4),
      itemCount: 16,
      itemBuilder: (ctx, i) => GestureDetector(
        onTap: () => flipCard(i),
        child: AnimatedSwitcher(
          duration: Duration(milliseconds: 400),
          child: (flipped.contains(i) || matched.contains(i))
              ? Card(child: Center(child: Text(cards[i], style: TextStyle(fontSize: 28))))
              : Card(color: Colors.deepPurple, child: Icon(Icons.question_mark)),
        ),
      ),
    );
  }
}`,
  },
  {
    id: 'brick-breaker',
    title: 'Brick Breaker',
    category: 'games',
    description: 'Ball + paddle collision physics',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:async';

class BrickBreaker extends StatefulWidget {
  @override
  _BrickBreakerState createState() => _BrickBreakerState();
}

class _BrickBreakerState extends State<BrickBreaker> {
  double ballX = 200, ballY = 300;
  double dx = 3, dy = -3;
  double paddleX = 150;
  List<Rect> bricks = [];
  int score = 0;

  @override
  void initState() {
    super.initState();
    for (int r = 0; r < 5; r++)
      for (int c = 0; c < 8; c++)
        bricks.add(Rect.fromLTWH(c * 50.0, r * 25.0 + 50, 48, 23));
    Timer.periodic(Duration(milliseconds: 16), (_) => update());
  }

  void update() {
    setState(() {
      ballX += dx; ballY += dy;
      if (ballX <= 0 || ballX >= 400) dx = -dx;
      if (ballY <= 0) dy = -dy;
      // Paddle collision
      if (ballY >= 380 && ballX >= paddleX && ballX <= paddleX + 80) dy = -dy;
      // Brick collision
      bricks.removeWhere((b) {
        if (b.contains(Offset(ballX, ballY))) { dy = -dy; score++; return true; }
        return false;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onHorizontalDragUpdate: (d) => setState(() => paddleX += d.delta.dx),
      child: CustomPaint(
        painter: BrickPainter(ballX, ballY, paddleX, bricks),
        child: Text('Score: \$score'),
      ),
    );
  }
}`,
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    category: 'games',
    description: 'AI opponent with win highlight animation',
    flutterCode: `import 'package:flutter/material.dart';

class TicTacToe extends StatefulWidget {
  @override
  _TicTacToeState createState() => _TicTacToeState();
}

class _TicTacToeState extends State<TicTacToe> {
  List<String?> board = List.filled(9, null);
  bool isX = true;
  List<int>? winLine;

  void play(int i) {
    if (board[i] != null || winLine != null) return;
    setState(() {
      board[i] = isX ? 'X' : 'O';
      winLine = checkWin();
      isX = !isX;
    });
  }

  List<int>? checkWin() {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6],
    ];
    for (final l in lines) {
      if (board[l[0]] != null &&
          board[l[0]] == board[l[1]] &&
          board[l[1]] == board[l[2]]) return l;
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3),
      itemCount: 9,
      itemBuilder: (ctx, i) => GestureDetector(
        onTap: () => play(i),
        child: AnimatedContainer(
          duration: Duration(milliseconds: 300),
          decoration: BoxDecoration(
            border: Border.all(color: Colors.grey),
            color: winLine?.contains(i) == true
                ? Colors.green.withOpacity(0.3)
                : Colors.transparent,
          ),
          child: Center(
            child: Text(board[i] ?? '',
              style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold)),
          ),
        ),
      ),
    );
  }
}`,
  },
  {
    id: 'whack-a-mole',
    title: 'Whack-a-Mole',
    category: 'games',
    description: 'Timer-based tap game with pop animation',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:math';

class WhackAMole extends StatefulWidget {
  @override
  _WhackAMoleState createState() => _WhackAMoleState();
}

class _WhackAMoleState extends State<WhackAMole>
    with TickerProviderStateMixin {
  int score = 0, timeLeft = 30;
  int? activeMole;
  final random = Random();

  @override
  void initState() {
    super.initState();
    Timer.periodic(Duration(seconds: 1), (t) {
      if (timeLeft <= 0) { t.cancel(); return; }
      setState(() => timeLeft--);
    });
    Timer.periodic(Duration(milliseconds: 800), (_) {
      setState(() => activeMole = random.nextInt(9));
    });
  }

  void whack(int index) {
    if (index == activeMole) {
      setState(() { score++; activeMole = null; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Text('Score: \$score | Time: \$timeLeft'),
      Expanded(
        child: GridView.builder(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3),
          itemCount: 9,
          itemBuilder: (ctx, i) => GestureDetector(
            onTap: () => whack(i),
            child: AnimatedScale(
              scale: activeMole == i ? 1.0 : 0.0,
              duration: Duration(milliseconds: 200),
              child: Container(
                margin: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.brown, shape: BoxShape.circle),
                child: Center(child: Text('🐹', style: TextStyle(fontSize: 32))),
              ),
            ),
          ),
        ),
      ),
    ]);
  }
}`,
  },
  {
    id: 'color-tap',
    title: 'Color Tap Challenge',
    category: 'games',
    description: 'Reaction-speed color matching game',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:math';

class ColorTap extends StatefulWidget {
  @override
  _ColorTapState createState() => _ColorTapState();
}

class _ColorTapState extends State<ColorTap> {
  final colors = [Colors.red, Colors.blue, Colors.green, Colors.yellow];
  late Color targetColor;
  late List<Color> options;
  int score = 0, streak = 0;
  int timeMs = 3000;
  final random = Random();

  @override
  void initState() {
    super.initState();
    nextRound();
  }

  void nextRound() {
    setState(() {
      targetColor = colors[random.nextInt(colors.length)];
      options = List.from(colors)..shuffle();
    });
  }

  void onTap(Color color) {
    if (color == targetColor) {
      setState(() { score++; streak++; timeMs = max(500, timeMs - 100); });
    } else {
      setState(() => streak = 0);
    }
    nextRound();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('Tap this color!', style: TextStyle(fontSize: 18)),
        SizedBox(height: 16),
        Container(width: 80, height: 80,
          decoration: BoxDecoration(color: targetColor, shape: BoxShape.circle)),
        SizedBox(height: 24),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: options.map((c) => GestureDetector(
            onTap: () => onTap(c),
            child: Container(width: 60, height: 60,
              decoration: BoxDecoration(color: c, borderRadius: BorderRadius.circular(12))),
          )).toList(),
        ),
        SizedBox(height: 16),
        Text('Score: \$score  Streak: \$streak'),
      ],
    );
  }
}`,
  },

  // ─── 3D & Animation (8) ───
  {
    id: '3d-cube',
    title: '3D Rotating Cube',
    category: '3d-animation',
    description: 'CSS 3D transform, drag to rotate',
    wide: true,
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:math';

class RotatingCube extends StatefulWidget {
  @override
  _RotatingCubeState createState() => _RotatingCubeState();
}

class _RotatingCubeState extends State<RotatingCube>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  double rotX = 0, rotY = 0;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this, duration: Duration(seconds: 4))..repeat();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onPanUpdate: (d) => setState(() {
        rotY += d.delta.dx * 0.01;
        rotX -= d.delta.dy * 0.01;
      }),
      child: AnimatedBuilder(
        animation: _controller,
        builder: (ctx, _) => Transform(
          alignment: Alignment.center,
          transform: Matrix4.identity()
            ..setEntry(3, 2, 0.001)
            ..rotateX(rotX + _controller.value * 2 * pi)
            ..rotateY(rotY + _controller.value * 2 * pi),
          child: CustomPaint(
            painter: CubePainter(),
            size: Size(200, 200),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() { _controller.dispose(); super.dispose(); }
}`,
  },
  {
    id: 'particle-explosion',
    title: 'Particle Explosion',
    category: '3d-animation',
    description: 'Canvas particle burst on click',
    wide: true,
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:math';

class Particle {
  double x, y, vx, vy, life;
  Color color;
  Particle({required this.x, required this.y,
    required this.vx, required this.vy,
    this.life = 1.0, required this.color});
}

class ParticleExplosion extends StatefulWidget {
  @override
  _ParticleExplosionState createState() => _ParticleExplosionState();
}

class _ParticleExplosionState extends State<ParticleExplosion>
    with SingleTickerProviderStateMixin {
  final particles = <Particle>[];
  final random = Random();
  late AnimationController _ctrl;

  void explode(Offset pos) {
    for (int i = 0; i < 50; i++) {
      final angle = random.nextDouble() * 2 * pi;
      final speed = random.nextDouble() * 5 + 2;
      particles.add(Particle(
        x: pos.dx, y: pos.dy,
        vx: cos(angle) * speed, vy: sin(angle) * speed,
        color: HSVColor.fromAHSV(1, random.nextDouble() * 360, 1, 1).toColor(),
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (d) => explode(d.localPosition),
      child: CustomPaint(
        painter: ParticlePainter(particles),
        size: Size.infinite,
      ),
    );
  }
}`,
  },
  {
    id: 'liquid-fill',
    title: 'Liquid Fill Animation',
    category: '3d-animation',
    description: 'SVG wave fill progress indicator',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:math';

class LiquidFill extends StatefulWidget {
  @override
  _LiquidFillState createState() => _LiquidFillState();
}

class _LiquidFillState extends State<LiquidFill>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  double fillLevel = 0.65;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this, duration: Duration(seconds: 2))..repeat();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (ctx, _) => CustomPaint(
        painter: WavePainter(
          wavePhase: _controller.value * 2 * pi,
          fillLevel: fillLevel,
          color: Colors.blue,
        ),
        child: Center(
          child: Text('\${(fillLevel * 100).toInt()}%',
            style: TextStyle(fontSize: 48, fontWeight: FontWeight.bold,
              color: Colors.white)),
        ),
      ),
    );
  }

  @override
  void dispose() { _controller.dispose(); super.dispose(); }
}`,
  },
  {
    id: 'neon-orbits',
    title: 'Neon Orbit Rings',
    category: '3d-animation',
    description: 'Glowing concentric ring system animation',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:math';

class NeonOrbits extends StatefulWidget {
  @override
  _NeonOrbitsState createState() => _NeonOrbitsState();
}

class _NeonOrbitsState extends State<NeonOrbits>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this, duration: Duration(seconds: 6))..repeat();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (ctx, _) => CustomPaint(
        painter: OrbitPainter(
          phase: _controller.value * 2 * pi,
          rings: [
            OrbitRing(radius: 40, color: Colors.cyan, speed: 1.0),
            OrbitRing(radius: 70, color: Colors.purple, speed: -0.7),
            OrbitRing(radius: 100, color: Colors.pink, speed: 0.5),
          ],
        ),
        size: Size(250, 250),
      ),
    );
  }

  @override
  void dispose() { _controller.dispose(); super.dispose(); }
}`,
  },
  {
    id: 'morphing-blob',
    title: 'Morphing Blob',
    category: '3d-animation',
    description: 'SVG path morph looping shape',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:math';

class MorphingBlob extends StatefulWidget {
  @override
  _MorphingBlobState createState() => _MorphingBlobState();
}

class _MorphingBlobState extends State<MorphingBlob>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this, duration: Duration(seconds: 3))..repeat();
  }

  Path _generateBlob(double phase) {
    final path = Path();
    final center = Offset(100, 100);
    final points = 6;
    for (int i = 0; i <= points; i++) {
      final angle = (i / points) * 2 * pi;
      final radius = 60 + sin(angle * 3 + phase) * 20;
      final x = center.dx + cos(angle) * radius;
      final y = center.dy + sin(angle) * radius;
      i == 0 ? path.moveTo(x, y) : path.lineTo(x, y);
    }
    path.close();
    return path;
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (ctx, _) => CustomPaint(
        painter: BlobPainter(
          path: _generateBlob(_controller.value * 2 * pi),
          gradient: LinearGradient(
            colors: [Colors.purple, Colors.blue, Colors.cyan]),
        ),
      ),
    );
  }
}`,
  },
  {
    id: 'holographic-card',
    title: 'Holographic Card',
    category: '3d-animation',
    description: 'Mouse-tracking tilt + rainbow glare effect',
    wide: true,
    flutterCode: `import 'package:flutter/material.dart';

class HolographicCard extends StatefulWidget {
  @override
  _HolographicCardState createState() => _HolographicCardState();
}

class _HolographicCardState extends State<HolographicCard> {
  double rotX = 0, rotY = 0;
  Offset glarePos = Offset.zero;

  void _onHover(PointerEvent event) {
    final size = context.size!;
    setState(() {
      rotY = (event.localPosition.dx / size.width - 0.5) * 0.3;
      rotX = -(event.localPosition.dy / size.height - 0.5) * 0.3;
      glarePos = event.localPosition;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onHover: _onHover,
      child: Transform(
        alignment: Alignment.center,
        transform: Matrix4.identity()
          ..setEntry(3, 2, 0.001)
          ..rotateX(rotX)
          ..rotateY(rotY),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            gradient: LinearGradient(
              colors: [Colors.purple, Colors.blue, Colors.green,
                       Colors.yellow, Colors.red],
              begin: Alignment(-1 + glarePos.dx * 0.01, -1),
              end: Alignment(1, 1 + glarePos.dy * 0.01),
            ),
            boxShadow: [BoxShadow(
              color: Colors.purple.withOpacity(0.4),
              blurRadius: 30, spreadRadius: 5)],
          ),
          child: Center(child: Text('HOLOGRAPHIC',
            style: TextStyle(color: Colors.white, fontSize: 24))),
        ),
      ),
    );
  }
}`,
  },
  {
    id: '3d-flip-card',
    title: '3D Flip Card',
    category: '3d-animation',
    description: 'Product card with depth perspective flip',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:math';

class FlipCard extends StatefulWidget {
  @override
  _FlipCardState createState() => _FlipCardState();
}

class _FlipCardState extends State<FlipCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  bool showFront = true;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this, duration: Duration(milliseconds: 600));
  }

  void flip() {
    if (_controller.isAnimating) return;
    if (showFront) {
      _controller.forward();
    } else {
      _controller.reverse();
    }
    showFront = !showFront;
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: flip,
      child: AnimatedBuilder(
        animation: _controller,
        builder: (ctx, _) {
          final angle = _controller.value * pi;
          final isFront = angle < pi / 2;
          return Transform(
            alignment: Alignment.center,
            transform: Matrix4.identity()
              ..setEntry(3, 2, 0.001)
              ..rotateY(angle),
            child: isFront
              ? _buildFront()
              : Transform(
                  alignment: Alignment.center,
                  transform: Matrix4.rotationY(pi),
                  child: _buildBack()),
          );
        },
      ),
    );
  }

  Widget _buildFront() => Card(
    child: Column(children: [
      Icon(Icons.flutter_dash, size: 64),
      Text('Flutter Product'),
    ]));

  Widget _buildBack() => Card(
    color: Colors.deepPurple,
    child: Center(child: Text('Details & Specs',
      style: TextStyle(color: Colors.white))));
}`,
  },
  {
    id: 'aurora-bg',
    title: 'Aurora Background',
    category: '3d-animation',
    description: 'Animated gradient mesh blur effect',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:math';

class AuroraBackground extends StatefulWidget {
  @override
  _AuroraBackgroundState createState() => _AuroraBackgroundState();
}

class _AuroraBackgroundState extends State<AuroraBackground>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this, duration: Duration(seconds: 8))..repeat();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (ctx, child) {
        final t = _controller.value * 2 * pi;
        return Stack(children: [
          Positioned(
            left: 50 + sin(t) * 80,
            top: 30 + cos(t * 0.7) * 60,
            child: _blob(Colors.purple.withOpacity(0.5), 200),
          ),
          Positioned(
            right: 30 + cos(t) * 60,
            bottom: 40 + sin(t * 1.3) * 50,
            child: _blob(Colors.blue.withOpacity(0.4), 180),
          ),
          Positioned(
            left: 100 + sin(t * 0.5) * 70,
            bottom: 80 + cos(t * 0.9) * 40,
            child: _blob(Colors.green.withOpacity(0.3), 160),
          ),
          BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 60, sigmaY: 60),
            child: Container(color: Colors.transparent),
          ),
          child!,
        ]);
      },
      child: Center(child: Text('Aurora',
        style: TextStyle(fontSize: 48, color: Colors.white))),
    );
  }

  Widget _blob(Color color, double size) => Container(
    width: size, height: size,
    decoration: BoxDecoration(shape: BoxShape.circle, color: color));

  @override
  void dispose() { _controller.dispose(); super.dispose(); }
}`,
  },

  // ─── UI Effects (8) ───
  {
    id: 'glassmorphism',
    title: 'Glassmorphism Login',
    category: 'ui-effects',
    description: 'Blurred card with frosted glass depth',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:ui';

class GlassLogin extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      // Background gradient
      Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.purple, Colors.blue],
            begin: Alignment.topLeft, end: Alignment.bottomRight)),
      ),
      // Floating circles
      Positioned(top: -50, right: -50,
        child: Container(width: 200, height: 200,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: Colors.white.withOpacity(0.1)))),
      // Glass card
      Center(
        child: ClipRRect(
          borderRadius: BorderRadius.circular(20),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 15, sigmaY: 15),
            child: Container(
              width: 300, padding: EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.15),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.white.withOpacity(0.3))),
              child: Column(mainAxisSize: MainAxisSize.min, children: [
                Text('Sign In', style: TextStyle(
                  color: Colors.white, fontSize: 28)),
                SizedBox(height: 20),
                _glassField('Email'),
                SizedBox(height: 12),
                _glassField('Password', obscure: true),
                SizedBox(height: 20),
                ElevatedButton(onPressed: () {},
                  child: Text('Login')),
              ]),
            ),
          ),
        ),
      ),
    ]);
  }
}`,
  },
  {
    id: 'neumorphic-toggle',
    title: 'Neumorphic Toggle',
    category: 'ui-effects',
    description: 'Soft shadow push-button design',
    flutterCode: `import 'package:flutter/material.dart';

class NeumorphicToggle extends StatefulWidget {
  @override
  _NeumorphicToggleState createState() => _NeumorphicToggleState();
}

class _NeumorphicToggleState extends State<NeumorphicToggle> {
  bool isOn = false;

  @override
  Widget build(BuildContext context) {
    final bg = Color(0xFFE0E5EC);
    return Container(
      color: bg,
      child: Center(
        child: GestureDetector(
          onTap: () => setState(() => isOn = !isOn),
          child: AnimatedContainer(
            duration: Duration(milliseconds: 200),
            width: 80, height: 40,
            decoration: BoxDecoration(
              color: bg,
              borderRadius: BorderRadius.circular(20),
              boxShadow: isOn ? [
                BoxShadow(color: Colors.grey.shade500, offset: Offset(2, 2),
                  blurRadius: 5, inset: true),
                BoxShadow(color: Colors.white, offset: Offset(-2, -2),
                  blurRadius: 5, inset: true),
              ] : [
                BoxShadow(color: Colors.grey.shade500, offset: Offset(4, 4),
                  blurRadius: 10),
                BoxShadow(color: Colors.white, offset: Offset(-4, -4),
                  blurRadius: 10),
              ],
            ),
            child: AnimatedAlign(
              duration: Duration(milliseconds: 200),
              alignment: isOn ? Alignment.centerRight : Alignment.centerLeft,
              child: Container(width: 36, height: 36, margin: EdgeInsets.all(2),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: isOn ? Colors.green : bg,
                  boxShadow: [BoxShadow(color: Colors.grey, blurRadius: 4)])),
            ),
          ),
        ),
      ),
    );
  }
}`,
  },
  {
    id: 'animated-nav',
    title: 'Animated Bottom Nav',
    category: 'ui-effects',
    description: 'Morphing ink-splash tab bar',
    wide: true,
    flutterCode: `import 'package:flutter/material.dart';

class AnimatedBottomNav extends StatefulWidget {
  @override
  _AnimatedBottomNavState createState() => _AnimatedBottomNavState();
}

class _AnimatedBottomNavState extends State<AnimatedBottomNav> {
  int _currentIndex = 0;
  final _items = [
    {'icon': Icons.home, 'label': 'Home'},
    {'icon': Icons.search, 'label': 'Search'},
    {'icon': Icons.favorite, 'label': 'Likes'},
    {'icon': Icons.person, 'label': 'Profile'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: Container(
        height: 70, padding: EdgeInsets.symmetric(horizontal: 16),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 20)]),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: List.generate(_items.length, (i) => GestureDetector(
            onTap: () => setState(() => _currentIndex = i),
            child: AnimatedContainer(
              duration: Duration(milliseconds: 300),
              padding: EdgeInsets.symmetric(
                horizontal: _currentIndex == i ? 20 : 12, vertical: 8),
              decoration: BoxDecoration(
                color: _currentIndex == i
                    ? Colors.purple.withOpacity(0.1) : Colors.transparent,
                borderRadius: BorderRadius.circular(20)),
              child: Row(children: [
                Icon(_items[i]['icon'] as IconData,
                  color: _currentIndex == i ? Colors.purple : Colors.grey),
                if (_currentIndex == i) ...[
                  SizedBox(width: 8),
                  Text(_items[i]['label'] as String,
                    style: TextStyle(color: Colors.purple, fontWeight: FontWeight.w600)),
                ],
              ]),
            ),
          )),
        ),
      ),
    );
  }
}`,
  },
  {
    id: 'parallax-cards',
    title: 'Parallax Scroll Cards',
    category: 'ui-effects',
    description: 'Layered depth scroll effect',
    flutterCode: `import 'package:flutter/material.dart';

class ParallaxCards extends StatelessWidget {
  final items = [
    {'title': 'Mountain', 'color': Colors.blue},
    {'title': 'Forest', 'color': Colors.green},
    {'title': 'Desert', 'color': Colors.orange},
    {'title': 'Ocean', 'color': Colors.cyan},
  ];

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length,
      itemBuilder: (ctx, i) {
        return _ParallaxItem(
          title: items[i]['title'] as String,
          color: items[i]['color'] as Color,
        );
      },
    );
  }
}

class _ParallaxItem extends StatelessWidget {
  final String title;
  final Color color;
  final _key = GlobalKey();

  _ParallaxItem({required this.title, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 200, margin: EdgeInsets.all(16),
      child: Flow(
        delegate: ParallaxDelegate(scrollable: Scrollable.of(context),
          itemContext: context, keyContext: _key.currentContext),
        children: [
          Container(key: _key,
            decoration: BoxDecoration(
              color: color, borderRadius: BorderRadius.circular(16)),
            child: Center(child: Text(title,
              style: TextStyle(color: Colors.white, fontSize: 32)))),
        ],
      ),
    );
  }
}`,
  },
  {
    id: 'typewriter',
    title: 'Typewriter Hero',
    category: 'ui-effects',
    description: 'Multi-line typed text with cursor blink',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:async';

class TypewriterHero extends StatefulWidget {
  @override
  _TypewriterHeroState createState() => _TypewriterHeroState();
}

class _TypewriterHeroState extends State<TypewriterHero> {
  final texts = ['Flutter Developer', 'UI Engineer', 'Mobile Expert'];
  int textIndex = 0, charIndex = 0;
  bool isDeleting = false;
  String displayText = '';

  @override
  void initState() {
    super.initState();
    _type();
  }

  void _type() {
    final current = texts[textIndex];
    final delay = isDeleting ? 50 : 100;

    setState(() {
      if (!isDeleting) {
        displayText = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex >= current.length) {
          isDeleting = true;
          Future.delayed(Duration(seconds: 2), () => _type());
          return;
        }
      } else {
        displayText = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex <= 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }
    });
    Future.delayed(Duration(milliseconds: delay), () => _type());
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: RichText(
        text: TextSpan(
          style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold),
          children: [
            TextSpan(text: displayText),
            TextSpan(text: '|',
              style: TextStyle(color: Colors.purple)),
          ],
        ),
      ),
    );
  }
}`,
  },
  {
    id: 'shimmer-skeleton',
    title: 'Shimmer Skeleton',
    category: 'ui-effects',
    description: 'Content loading placeholder pulse',
    flutterCode: `import 'package:flutter/material.dart';

class ShimmerSkeleton extends StatefulWidget {
  @override
  _ShimmerSkeletonState createState() => _ShimmerSkeletonState();
}

class _ShimmerSkeletonState extends State<ShimmerSkeleton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this, duration: Duration(milliseconds: 1500))..repeat();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (ctx, _) => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _shimmerBlock(double.infinity, 120),
          SizedBox(height: 12),
          _shimmerBlock(200, 16),
          SizedBox(height: 8),
          _shimmerBlock(160, 16),
          SizedBox(height: 8),
          _shimmerBlock(240, 16),
        ],
      ),
    );
  }

  Widget _shimmerBlock(double width, double height) {
    return Container(
      width: width, height: height,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        gradient: LinearGradient(
          colors: [Colors.grey[300]!, Colors.grey[100]!, Colors.grey[300]!],
          stops: [0, _controller.value, 1],
          begin: Alignment(-1, 0),
          end: Alignment(2, 0),
        ),
      ),
    );
  }

  @override
  void dispose() { _controller.dispose(); super.dispose(); }
}`,
  },
  {
    id: 'ripple-button',
    title: 'Ripple Button',
    category: 'ui-effects',
    description: 'Material-style touch ripple on click',
    flutterCode: `import 'package:flutter/material.dart';

class RippleButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () {},
          splashColor: Colors.purple.withOpacity(0.3),
          highlightColor: Colors.purple.withOpacity(0.1),
          borderRadius: BorderRadius.circular(16),
          child: Ink(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [Colors.purple, Colors.deepPurple]),
              borderRadius: BorderRadius.circular(16),
              boxShadow: [BoxShadow(
                color: Colors.purple.withOpacity(0.4),
                blurRadius: 15, offset: Offset(0, 8))],
            ),
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 32, vertical: 16),
              child: Text('Tap Me',
                style: TextStyle(color: Colors.white, fontSize: 18,
                  fontWeight: FontWeight.w600)),
            ),
          ),
        ),
      ),
    );
  }
}`,
  },
  {
    id: 'gradient-reveal',
    title: 'Gradient Text Reveal',
    category: 'ui-effects',
    description: 'Scroll-triggered color sweep on text',
    flutterCode: `import 'package:flutter/material.dart';

class GradientReveal extends StatefulWidget {
  @override
  _GradientRevealState createState() => _GradientRevealState();
}

class _GradientRevealState extends State<GradientReveal>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this, duration: Duration(seconds: 2))..repeat();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (ctx, _) => ShaderMask(
        shaderCallback: (bounds) => LinearGradient(
          colors: [Colors.purple, Colors.blue, Colors.cyan, Colors.grey[400]!],
          stops: [0, _controller.value, _controller.value + 0.1, 1],
        ).createShader(bounds),
        child: Text(
          'Flutter is Beautiful',
          style: TextStyle(
            fontSize: 36,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ),
    );
  }

  @override
  void dispose() { _controller.dispose(); super.dispose(); }
}`,
  },

  // ─── Tools & Widgets (6) ───
  {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    category: 'tools',
    description: 'Animated needle gauge output',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:math';

class BMICalculator extends StatefulWidget {
  @override
  _BMICalculatorState createState() => _BMICalculatorState();
}

class _BMICalculatorState extends State<BMICalculator>
    with SingleTickerProviderStateMixin {
  double height = 170, weight = 70;
  late AnimationController _controller;

  double get bmi => weight / pow(height / 100, 2);

  String get category {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this, duration: Duration(milliseconds: 800));
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Slider(value: height, min: 120, max: 220,
        label: '\${height.toInt()} cm',
        onChanged: (v) => setState(() => height = v)),
      Slider(value: weight, min: 30, max: 150,
        label: '\${weight.toInt()} kg',
        onChanged: (v) => setState(() => weight = v)),
      SizedBox(height: 20),
      CustomPaint(
        painter: GaugePainter(value: bmi, min: 10, max: 40),
        size: Size(200, 120),
      ),
      Text('\${bmi.toStringAsFixed(1)}', style: TextStyle(fontSize: 36)),
      Text(category, style: TextStyle(fontSize: 18, color: Colors.grey)),
    ]);
  }
}`,
  },
  {
    id: 'stopwatch',
    title: 'Stopwatch',
    category: 'tools',
    description: 'Smooth millisecond timer with lap feature',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:async';

class StopwatchApp extends StatefulWidget {
  @override
  _StopwatchAppState createState() => _StopwatchAppState();
}

class _StopwatchAppState extends State<StopwatchApp> {
  final _stopwatch = Stopwatch();
  Timer? _timer;
  List<Duration> laps = [];

  String _format(Duration d) =>
      '\${d.inMinutes.toString().padLeft(2, '0')}:'
      '\${(d.inSeconds % 60).toString().padLeft(2, '0')}.'
      '\${(d.inMilliseconds % 1000 ~/ 10).toString().padLeft(2, '0')}';

  void _toggle() {
    if (_stopwatch.isRunning) {
      _stopwatch.stop();
      _timer?.cancel();
    } else {
      _stopwatch.start();
      _timer = Timer.periodic(Duration(milliseconds: 30),
          (_) => setState(() {}));
    }
    setState(() {});
  }

  void _lap() {
    if (_stopwatch.isRunning) {
      setState(() => laps.add(_stopwatch.elapsed));
    }
  }

  void _reset() {
    _stopwatch.reset();
    _timer?.cancel();
    setState(() => laps.clear());
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Text(_format(_stopwatch.elapsed),
        style: TextStyle(fontSize: 56, fontFamily: 'monospace')),
      Row(mainAxisAlignment: MainAxisAlignment.center, children: [
        ElevatedButton(onPressed: _toggle,
          child: Text(_stopwatch.isRunning ? 'Stop' : 'Start')),
        SizedBox(width: 12),
        ElevatedButton(onPressed: _lap, child: Text('Lap')),
        SizedBox(width: 12),
        ElevatedButton(onPressed: _reset, child: Text('Reset')),
      ]),
      ...laps.asMap().entries.map((e) =>
        Text('Lap \${e.key + 1}: \${_format(e.value)}')),
    ]);
  }
}`,
  },
  {
    id: 'weather-card',
    title: 'Weather Card',
    category: 'tools',
    description: 'Dynamic icon + temperature display widget',
    flutterCode: `import 'package:flutter/material.dart';

class WeatherCard extends StatelessWidget {
  final String city = 'San Francisco';
  final int temp = 22;
  final String condition = 'Partly Cloudy';
  final int humidity = 65;
  final int wind = 12;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(24),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF4A90D9), Color(0xFF67B8DE)],
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(children: [
            Icon(Icons.location_on, color: Colors.white70, size: 16),
            Text(city, style: TextStyle(color: Colors.white70, fontSize: 14)),
          ]),
          SizedBox(height: 16),
          Row(children: [
            Icon(Icons.cloud, color: Colors.white, size: 64),
            SizedBox(width: 16),
            Text('\$temp°', style: TextStyle(
              color: Colors.white, fontSize: 56, fontWeight: FontWeight.w200)),
          ]),
          Text(condition, style: TextStyle(color: Colors.white, fontSize: 18)),
          Divider(color: Colors.white30),
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            _detail(Icons.water_drop, '\$humidity%', 'Humidity'),
            _detail(Icons.air, '\$wind km/h', 'Wind'),
          ]),
        ],
      ),
    );
  }

  Widget _detail(IconData icon, String value, String label) => Row(children: [
    Icon(icon, color: Colors.white70, size: 16),
    SizedBox(width: 4),
    Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text(value, style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600)),
      Text(label, style: TextStyle(color: Colors.white70, fontSize: 12)),
    ]),
  ]);
}`,
  },
  {
    id: 'color-palette',
    title: 'Color Palette Generator',
    category: 'tools',
    description: 'Extract + display swatches from hex',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:math';

class ColorPalette extends StatefulWidget {
  @override
  _ColorPaletteState createState() => _ColorPaletteState();
}

class _ColorPaletteState extends State<ColorPalette> {
  List<Color> palette = [];
  final random = Random();

  @override
  void initState() {
    super.initState();
    generate();
  }

  void generate() {
    final base = HSVColor.fromAHSV(1, random.nextDouble() * 360, 0.7, 0.9);
    setState(() {
      palette = List.generate(5, (i) =>
        HSVColor.fromAHSV(1,
          (base.hue + i * 30) % 360,
          0.5 + i * 0.1,
          0.9 - i * 0.05,
        ).toColor(),
      );
    });
  }

  String colorToHex(Color c) =>
      '#\${c.value.toRadixString(16).substring(2).toUpperCase()}';

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Expanded(
        child: Row(children: palette.map((c) => Expanded(
          child: GestureDetector(
            onTap: () => Clipboard.setData(ClipboardData(text: colorToHex(c))),
            child: Container(
              color: c,
              child: Align(
                alignment: Alignment.bottomCenter,
                child: Padding(
                  padding: EdgeInsets.all(8),
                  child: Text(colorToHex(c),
                    style: TextStyle(color: Colors.white, fontSize: 11)),
                ),
              ),
            ),
          ),
        )).toList()),
      ),
      ElevatedButton(onPressed: generate, child: Text('Generate')),
    ]);
  }
}`,
  },
  {
    id: 'markdown-preview',
    title: 'Markdown Preview',
    category: 'tools',
    description: 'Live split-pane markdown renderer',
    wide: true,
    flutterCode: `import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';

class MarkdownPreview extends StatefulWidget {
  @override
  _MarkdownPreviewState createState() => _MarkdownPreviewState();
}

class _MarkdownPreviewState extends State<MarkdownPreview> {
  String markdown = '''# Hello Flutter
## Markdown Preview

This is a **bold** and *italic* text.

- Item 1
- Item 2
- Item 3

\\\`\\\`\\\`dart
void main() => runApp(MyApp());
\\\`\\\`\\\`

> Flutter makes it easy!
''';

  @override
  Widget build(BuildContext context) {
    return Row(children: [
      // Editor pane
      Expanded(
        child: Container(
          color: Color(0xFF1E1E1E),
          padding: EdgeInsets.all(16),
          child: TextField(
            controller: TextEditingController(text: markdown),
            onChanged: (v) => setState(() => markdown = v),
            maxLines: null,
            style: TextStyle(
              color: Colors.green, fontFamily: 'monospace', fontSize: 14),
            decoration: InputDecoration.collapsed(hintText: 'Type markdown...'),
          ),
        ),
      ),
      VerticalDivider(width: 1),
      // Preview pane
      Expanded(
        child: Container(
          padding: EdgeInsets.all(16),
          child: Markdown(
            data: markdown,
            styleSheet: MarkdownStyleSheet.fromTheme(Theme.of(context)),
          ),
        ),
      ),
    ]);
  }
}`,
  },
  {
    id: 'expense-chart',
    title: 'Expense Pie Chart',
    category: 'tools',
    description: 'Animated donut chart with legend',
    flutterCode: `import 'package:flutter/material.dart';
import 'dart:math';

class ExpenseChart extends StatefulWidget {
  @override
  _ExpenseChartState createState() => _ExpenseChartState();
}

class _ExpenseChartState extends State<ExpenseChart>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  final expenses = [
    {'label': 'Food', 'amount': 450, 'color': Colors.red},
    {'label': 'Transport', 'amount': 200, 'color': Colors.blue},
    {'label': 'Shopping', 'amount': 350, 'color': Colors.green},
    {'label': 'Bills', 'amount': 500, 'color': Colors.orange},
    {'label': 'Others', 'amount': 150, 'color': Colors.purple},
  ];

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this, duration: Duration(milliseconds: 1200))..forward();
  }

  @override
  Widget build(BuildContext context) {
    final total = expenses.fold<int>(0, (s, e) => s + (e['amount'] as int));
    return Row(children: [
      Expanded(
        child: AnimatedBuilder(
          animation: _controller,
          builder: (ctx, _) => CustomPaint(
            painter: DonutPainter(
              expenses: expenses,
              total: total,
              progress: _controller.value,
            ),
            size: Size(200, 200),
          ),
        ),
      ),
      Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: expenses.map((e) => Padding(
          padding: EdgeInsets.symmetric(vertical: 4),
          child: Row(children: [
            Container(width: 12, height: 12,
              decoration: BoxDecoration(
                color: e['color'] as Color, shape: BoxShape.circle)),
            SizedBox(width: 8),
            Text('\${e['label']} — \\\$\${e['amount']}'),
          ]),
        )).toList(),
      ),
    ]);
  }
}`,
  },
];
