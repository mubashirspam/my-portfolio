export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  date: string;
  readTime: number;
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'flutter-clean-architecture',
    title: 'Building Scalable Flutter Apps with Clean Architecture',
    excerpt: 'Learn how to structure your Flutter projects using clean architecture principles for better maintainability and testability.',
    content: `# Building Scalable Flutter Apps with Clean Architecture

Clean Architecture is a software design philosophy that separates the elements of a design into ring levels. The main rule is that code dependencies can only point inward.

## Why Clean Architecture?

When building Flutter applications, especially large-scale ones, maintaining code quality becomes crucial. Clean Architecture helps by:

- **Separation of Concerns**: Each layer has a specific responsibility
- **Testability**: Business logic is independent of UI and frameworks
- **Maintainability**: Changes in one layer don't affect others
- **Scalability**: Easy to add new features without breaking existing code

## The Three Layers

### 1. Presentation Layer
This layer contains your UI components, widgets, and state management. It's responsible for displaying data to users and capturing user input.

\`\`\`dart
class HomePage extends StatelessWidget {
  final HomeBloc bloc;
  
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<HomeBloc, HomeState>(
      builder: (context, state) {
        return Scaffold(
          body: _buildBody(state),
        );
      },
    );
  }
}
\`\`\`

### 2. Domain Layer
The domain layer contains business logic, use cases, and entities. This is the heart of your application.

\`\`\`dart
class GetUserUseCase {
  final UserRepository repository;
  
  GetUserUseCase(this.repository);
  
  Future<Either<Failure, User>> call(String userId) {
    return repository.getUser(userId);
  }
}
\`\`\`

### 3. Data Layer
This layer handles data sources, repositories implementation, and models. It communicates with APIs, databases, and other data sources.

\`\`\`dart
class UserRepositoryImpl implements UserRepository {
  final RemoteDataSource remoteDataSource;
  final LocalDataSource localDataSource;
  
  @override
  Future<Either<Failure, User>> getUser(String userId) async {
    try {
      final user = await remoteDataSource.getUser(userId);
      await localDataSource.cacheUser(user);
      return Right(user);
    } catch (e) {
      return Left(ServerFailure());
    }
  }
}
\`\`\`

## Best Practices

1. **Use Dependency Injection**: Tools like get_it or injectable make managing dependencies easier
2. **Follow SOLID Principles**: Especially Single Responsibility and Dependency Inversion
3. **Write Tests**: Clean architecture makes unit testing straightforward
4. **Keep It Simple**: Don't over-engineer for small projects

## Conclusion

Clean Architecture might seem like overkill for small projects, but for large-scale applications, it's invaluable. The initial setup time pays off in maintainability and scalability.`,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop',
    date: '2024-03-15',
    readTime: 8,
    tags: ['Flutter', 'Architecture', 'Best Practices'],
    featured: true,
  },
  {
    id: 'bloc-state-management',
    title: 'Mastering BLoC Pattern for State Management',
    excerpt: 'Deep dive into the BLoC pattern and how it can help you manage complex state in Flutter applications.',
    content: `# Mastering BLoC Pattern for State Management

The BLoC (Business Logic Component) pattern is one of the most popular state management solutions in Flutter. It provides a clear separation between business logic and UI.

## What is BLoC?

BLoC uses streams to manage state. It receives events from the UI, processes them, and emits new states back to the UI.

## Core Concepts

### Events
Events are inputs to the BLoC. They represent user actions or system events.

\`\`\`dart
abstract class CounterEvent {}

class IncrementEvent extends CounterEvent {}
class DecrementEvent extends CounterEvent {}
\`\`\`

### States
States represent the current condition of your application.

\`\`\`dart
class CounterState {
  final int count;
  
  CounterState(this.count);
}
\`\`\`

### BLoC
The BLoC processes events and emits states.

\`\`\`dart
class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterState(0)) {
    on<IncrementEvent>((event, emit) {
      emit(CounterState(state.count + 1));
    });
    
    on<DecrementEvent>((event, emit) {
      emit(CounterState(state.count - 1));
    });
  }
}
\`\`\`

## Using BLoC in Widgets

### BlocProvider
Provides the BLoC to the widget tree.

\`\`\`dart
BlocProvider(
  create: (context) => CounterBloc(),
  child: CounterPage(),
)
\`\`\`

### BlocBuilder
Rebuilds UI when state changes.

\`\`\`dart
BlocBuilder<CounterBloc, CounterState>(
  builder: (context, state) {
    return Text('Count: \${state.count}');
  },
)
\`\`\`

### BlocListener
Performs side effects when state changes.

\`\`\`dart
BlocListener<CounterBloc, CounterState>(
  listener: (context, state) {
    if (state.count > 10) {
      showDialog(context: context, builder: (_) => AlertDialog());
    }
  },
  child: Container(),
)
\`\`\`

## Advanced Patterns

### Cubit
A simplified version of BLoC for simpler use cases.

\`\`\`dart
class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0);
  
  void increment() => emit(state + 1);
  void decrement() => emit(state - 1);
}
\`\`\`

### Testing
BLoC makes testing straightforward.

\`\`\`dart
blocTest<CounterBloc, CounterState>(
  'emits [1] when IncrementEvent is added',
  build: () => CounterBloc(),
  act: (bloc) => bloc.add(IncrementEvent()),
  expect: () => [CounterState(1)],
);
\`\`\`

## Best Practices

1. **One BLoC per feature**: Keep BLoCs focused and manageable
2. **Use Equatable**: For easy state comparison
3. **Handle errors**: Always have error states
4. **Close BLoCs**: Prevent memory leaks by closing streams

## Conclusion

BLoC provides a robust, testable way to manage state in Flutter. While it has a learning curve, the benefits in large applications are significant.`,
    coverImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1200&h=630&fit=crop',
    date: '2024-03-10',
    readTime: 10,
    tags: ['Flutter', 'State Management', 'BLoC'],
    featured: true,
  },
  {
    id: 'nextjs-performance',
    title: 'Optimizing Next.js Applications for Performance',
    excerpt: 'Practical tips and tricks to improve your Next.js app performance and Core Web Vitals.',
    content: `# Optimizing Next.js Applications for Performance

Performance is crucial for user experience and SEO. Next.js provides many built-in optimizations, but there's always room for improvement.

## Core Web Vitals

Google's Core Web Vitals are key metrics for web performance:

- **LCP (Largest Contentful Paint)**: Loading performance
- **FID (First Input Delay)**: Interactivity
- **CLS (Cumulative Layout Shift)**: Visual stability

## Image Optimization

Next.js Image component automatically optimizes images.

\`\`\`tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
  placeholder="blur"
/>
\`\`\`

### Best Practices
- Use \`priority\` for above-the-fold images
- Specify width and height to prevent CLS
- Use \`placeholder="blur"\` for better UX
- Serve images in modern formats (WebP, AVIF)

## Code Splitting

Next.js automatically code-splits by route, but you can optimize further.

### Dynamic Imports

\`\`\`tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false,
});
\`\`\`

## Server-Side Rendering

Choose the right rendering strategy:

### Static Generation (SSG)
Best for pages that can be pre-rendered.

\`\`\`tsx
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}
\`\`\`

### Server-Side Rendering (SSR)
For pages that need fresh data on every request.

\`\`\`tsx
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}
\`\`\`

### Incremental Static Regeneration (ISR)
Best of both worlds.

\`\`\`tsx
export async function getStaticProps() {
  return {
    props: { data },
    revalidate: 60, // Regenerate every 60 seconds
  };
}
\`\`\`

## Font Optimization

Use next/font for automatic font optimization.

\`\`\`tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
\`\`\`

## Bundle Analysis

Analyze your bundle size:

\`\`\`bash
npm install @next/bundle-analyzer
\`\`\`

\`\`\`js
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({});
\`\`\`

## Caching Strategies

Implement proper caching headers:

\`\`\`tsx
export async function getServerSideProps({ res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  
  return { props: {} };
}
\`\`\`

## Conclusion

Performance optimization is an ongoing process. Use tools like Lighthouse, WebPageTest, and Next.js Analytics to monitor and improve your application continuously.`,
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop',
    date: '2024-03-05',
    readTime: 7,
    tags: ['Next.js', 'Performance', 'Web'],
    featured: true,
  },
  {
    id: 'offline-first-apps',
    title: 'Building Offline-First Mobile Applications',
    excerpt: 'Strategies for creating mobile apps that work seamlessly offline and sync when connection is restored.',
    content: `# Building Offline-First Mobile Applications

In today's mobile-first world, users expect apps to work regardless of network connectivity. Building offline-first applications ensures your users can continue working even when they lose internet connection.

## Why Offline-First?

Traditional apps rely heavily on network connectivity. When the connection drops, the app becomes unusable. Offline-first architecture flips this model:

- **Always Available**: Core functionality works without internet
- **Better UX**: No loading spinners or error messages
- **Performance**: Local data is faster than network requests
- **Reliability**: Works in areas with poor connectivity

## Architecture Overview

An offline-first app has three main components:

### 1. Local Database
Store data locally using SQLite, Hive, or Isar.

\`\`\`dart
// Using Hive for local storage
@HiveType(typeId: 0)
class Task extends HiveObject {
  @HiveField(0)
  late String id;
  
  @HiveField(1)
  late String title;
  
  @HiveField(2)
  late bool isCompleted;
  
  @HiveField(3)
  late DateTime createdAt;
  
  @HiveField(4)
  late bool isSynced;
}

class LocalDatabase {
  late Box<Task> taskBox;
  
  Future<void> init() async {
    await Hive.initFlutter();
    Hive.registerAdapter(TaskAdapter());
    taskBox = await Hive.openBox<Task>('tasks');
  }
  
  Future<void> saveTask(Task task) async {
    await taskBox.put(task.id, task);
  }
  
  List<Task> getAllTasks() {
    return taskBox.values.toList();
  }
}
\`\`\`

### 2. Sync Manager
Handle synchronization between local and remote data.

\`\`\`dart
class SyncManager {
  final ApiService api;
  final LocalDatabase db;
  
  Future<void> syncTasks() async {
    try {
      // Get unsynced local tasks
      final unsyncedTasks = db.getAllTasks()
          .where((task) => !task.isSynced)
          .toList();
      
      // Upload to server
      for (final task in unsyncedTasks) {
        await api.createTask(task);
        task.isSynced = true;
        await db.saveTask(task);
      }
      
      // Download from server
      final remoteTasks = await api.getTasks();
      for (final task in remoteTasks) {
        await db.saveTask(task);
      }
    } catch (e) {
      // Sync will retry later
      print('Sync failed: $e');
    }
  }
  
  void startPeriodicSync() {
    Timer.periodic(Duration(minutes: 5), (_) {
      syncTasks();
    });
  }
}
\`\`\`

### 3. Conflict Resolution
Handle conflicts when local and remote data differ.

\`\`\`dart
enum ConflictStrategy {
  serverWins,
  clientWins,
  lastWriteWins,
  manual,
}

class ConflictResolver {
  Future<Task> resolve(
    Task local,
    Task remote,
    ConflictStrategy strategy,
  ) async {
    switch (strategy) {
      case ConflictStrategy.serverWins:
        return remote;
      
      case ConflictStrategy.clientWins:
        return local;
      
      case ConflictStrategy.lastWriteWins:
        return local.createdAt.isAfter(remote.createdAt)
            ? local
            : remote;
      
      case ConflictStrategy.manual:
        return await _showConflictDialog(local, remote);
    }
  }
}
\`\`\`

## Network Detection

Monitor connectivity and trigger sync when online.

\`\`\`dart
class ConnectivityService {
  final Connectivity _connectivity = Connectivity();
  final SyncManager _syncManager;
  
  void init() {
    _connectivity.onConnectivityChanged.listen((result) {
      if (result != ConnectivityResult.none) {
        _syncManager.syncTasks();
      }
    });
  }
  
  Future<bool> isOnline() async {
    final result = await _connectivity.checkConnectivity();
    return result != ConnectivityResult.none;
  }
}
\`\`\`

## Queue System

Queue operations when offline and execute when online.

\`\`\`dart
class OperationQueue {
  final List<Operation> _queue = [];
  
  void add(Operation operation) {
    _queue.add(operation);
    _saveQueue();
  }
  
  Future<void> processQueue() async {
    while (_queue.isNotEmpty) {
      final operation = _queue.first;
      try {
        await operation.execute();
        _queue.removeAt(0);
        _saveQueue();
      } catch (e) {
        // Stop processing on error
        break;
      }
    }
  }
}

abstract class Operation {
  Future<void> execute();
  Map<String, dynamic> toJson();
}

class CreateTaskOperation extends Operation {
  final Task task;
  
  CreateTaskOperation(this.task);
  
  @override
  Future<void> execute() async {
    await api.createTask(task);
  }
  
  @override
  Map<String, dynamic> toJson() => {
    'type': 'create_task',
    'data': task.toJson(),
  };
}
\`\`\`

## Best Practices

### 1. Optimistic UI Updates
Update UI immediately, sync in background.

\`\`\`dart
Future<void> completeTask(String taskId) async {
  // Update UI immediately
  final task = db.getTask(taskId);
  task.isCompleted = true;
  await db.saveTask(task);
  
  // Sync in background
  unawaited(syncManager.syncTask(task));
}
\`\`\`

### 2. Cache Strategy
Implement smart caching for better performance.

\`\`\`dart
class CacheManager {
  final Duration cacheValidity = Duration(hours: 1);
  
  Future<List<Task>> getTasks() async {
    final cached = db.getAllTasks();
    final cacheTime = await db.getCacheTime();
    
    if (DateTime.now().difference(cacheTime) < cacheValidity) {
      return cached;
    }
    
    if (await connectivity.isOnline()) {
      final fresh = await api.getTasks();
      await db.saveTasks(fresh);
      return fresh;
    }
    
    return cached;
  }
}
\`\`\`

### 3. Error Handling
Gracefully handle sync failures.

\`\`\`dart
class SyncError {
  final String message;
  final DateTime timestamp;
  final int retryCount;
  
  bool shouldRetry() => retryCount < 3;
  
  Duration getBackoffDuration() {
    return Duration(seconds: pow(2, retryCount).toInt());
  }
}
\`\`\`

## Testing Offline Functionality

### Simulate Network Conditions

\`\`\`dart
class MockConnectivity extends Connectivity {
  bool _isOnline = true;
  
  void setOnline(bool online) {
    _isOnline = online;
    _controller.add(
      online ? ConnectivityResult.wifi : ConnectivityResult.none
    );
  }
}

void main() {
  testWidgets('App works offline', (tester) async {
    final connectivity = MockConnectivity();
    connectivity.setOnline(false);
    
    await tester.pumpWidget(MyApp(connectivity: connectivity));
    
    // Create task while offline
    await tester.tap(find.byIcon(Icons.add));
    await tester.enterText(find.byType(TextField), 'New Task');
    await tester.tap(find.text('Save'));
    
    // Verify task is saved locally
    expect(find.text('New Task'), findsOneWidget);
    
    // Go online and verify sync
    connectivity.setOnline(true);
    await tester.pumpAndSettle();
    
    verify(mockApi.createTask(any)).called(1);
  });
}
\`\`\`

## Real-World Example: Notes App

\`\`\`dart
class NotesRepository {
  final LocalDatabase db;
  final ApiService api;
  final SyncManager sync;
  
  Stream<List<Note>> watchNotes() {
    return db.watchNotes().map((notes) {
      // Merge local and remote data
      return notes.sorted((a, b) => 
        b.updatedAt.compareTo(a.updatedAt)
      );
    });
  }
  
  Future<void> createNote(Note note) async {
    // Save locally first
    await db.saveNote(note);
    
    // Queue for sync
    sync.queueOperation(CreateNoteOperation(note));
    
    // Try to sync immediately if online
    if (await connectivity.isOnline()) {
      await sync.processQueue();
    }
  }
  
  Future<void> deleteNote(String noteId) async {
    // Soft delete locally
    final note = await db.getNote(noteId);
    note.isDeleted = true;
    await db.saveNote(note);
    
    // Queue deletion
    sync.queueOperation(DeleteNoteOperation(noteId));
  }
}
\`\`\`

## Conclusion

Building offline-first apps requires careful planning and architecture, but the benefits are worth it:

- **Better user experience** with no loading states
- **Higher reliability** in poor network conditions
- **Improved performance** with local-first data access
- **User trust** from consistent functionality

Start with a solid local database, implement smart syncing, and handle conflicts gracefully. Your users will thank you for it!

## Resources

- [Hive Documentation](https://docs.hivedb.dev/)
- [Connectivity Plus Package](https://pub.dev/packages/connectivity_plus)
- [Offline-First Design Patterns](https://offlinefirst.org/)`,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop',
    date: '2024-02-28',
    readTime: 12,
    tags: ['Flutter', 'Offline', 'Architecture'],
  },
  {
    id: 'graphql-flutter',
    title: 'GraphQL Integration in Flutter Apps',
    excerpt: 'How to integrate GraphQL APIs in your Flutter applications for efficient data fetching.',
    content: `# GraphQL Integration in Flutter Apps

GraphQL is revolutionizing how we fetch data in mobile applications. Unlike REST APIs, GraphQL allows you to request exactly the data you need, reducing over-fetching and improving performance.

## Why GraphQL?

### Problems with REST
- **Over-fetching**: Getting more data than needed
- **Under-fetching**: Multiple requests for related data
- **Versioning**: Managing API versions is complex
- **Documentation**: Often outdated or incomplete

### GraphQL Advantages
- **Single Endpoint**: One URL for all queries
- **Precise Data**: Request only what you need
- **Type Safety**: Strong typing with schema
- **Real-time**: Built-in subscriptions support

## Setting Up GraphQL in Flutter

### 1. Add Dependencies

\`\`\`yaml
dependencies:
  graphql_flutter: ^5.1.2
  flutter_bloc: ^8.1.3
\`\`\`

### 2. Configure GraphQL Client

\`\`\`dart
import 'package:graphql_flutter/graphql_flutter.dart';

class GraphQLConfig {
  static HttpLink httpLink = HttpLink(
    'https://api.example.com/graphql',
  );
  
  static AuthLink authLink = AuthLink(
    getToken: () async {
      final token = await SecureStorage.getToken();
      return 'Bearer $token';
    },
  );
  
  static Link link = authLink.concat(httpLink);
  
  static ValueNotifier<GraphQLClient> initializeClient() {
    final client = GraphQLClient(
      cache: GraphQLCache(store: HiveStore()),
      link: link,
    );
    
    return ValueNotifier(client);
  }
}
\`\`\`

### 3. Wrap App with GraphQL Provider

\`\`\`dart
void main() async {
  await initHiveForFlutter();
  
  final client = GraphQLConfig.initializeClient();
  
  runApp(
    GraphQLProvider(
      client: client,
      child: MyApp(),
    ),
  );
}
\`\`\`

## Writing Queries

### Simple Query

\`\`\`dart
const String getUserQuery = r'''
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      avatar
      posts {
        id
        title
        createdAt
      }
    }
  }
''';

class UserScreen extends StatelessWidget {
  final String userId;
  
  @override
  Widget build(BuildContext context) {
    return Query(
      options: QueryOptions(
        document: gql(getUserQuery),
        variables: {'id': userId},
        pollInterval: Duration(seconds: 10),
      ),
      builder: (result, {refetch, fetchMore}) {
        if (result.isLoading) {
          return LoadingIndicator();
        }
        
        if (result.hasException) {
          return ErrorWidget(result.exception.toString());
        }
        
        final user = result.data?['user'];
        return UserProfile(user: user);
      },
    );
  }
}
\`\`\`

### Pagination with fetchMore

\`\`\`dart
const String getPostsQuery = r'''
  query GetPosts($cursor: String, $limit: Int!) {
    posts(cursor: $cursor, limit: $limit) {
      edges {
        node {
          id
          title
          content
          author {
            name
            avatar
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
''';

class PostsList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Query(
      options: QueryOptions(
        document: gql(getPostsQuery),
        variables: {'limit': 10},
      ),
      builder: (result, {refetch, fetchMore}) {
        final posts = result.data?['posts']['edges'] ?? [];
        final pageInfo = result.data?['posts']['pageInfo'];
        
        return ListView.builder(
          itemCount: posts.length + 1,
          itemBuilder: (context, index) {
            if (index == posts.length) {
              if (pageInfo?['hasNextPage'] == true) {
                return LoadMoreButton(
                  onPressed: () {
                    fetchMore!(
                      FetchMoreOptions(
                        variables: {
                          'cursor': pageInfo['endCursor'],
                          'limit': 10,
                        },
                        updateQuery: (previous, fetchMoreResult) {
                          final prevEdges = previous?['posts']['edges'] ?? [];
                          final newEdges = fetchMoreResult?['posts']['edges'] ?? [];
                          
                          return {
                            'posts': {
                              'edges': [...prevEdges, ...newEdges],
                              'pageInfo': fetchMoreResult?['posts']['pageInfo'],
                            }
                          };
                        },
                      ),
                    );
                  },
                );
              }
              return SizedBox.shrink();
            }
            
            return PostCard(post: posts[index]['node']);
          },
        );
      },
    );
  }
}
\`\`\`

## Mutations

### Create Mutation

\`\`\`dart
const String createPostMutation = r'''
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      post {
        id
        title
        content
        createdAt
      }
      errors {
        field
        message
      }
    }
  }
''';

class CreatePostButton extends StatelessWidget {
  final String title;
  final String content;
  
  @override
  Widget build(BuildContext context) {
    return Mutation(
      options: MutationOptions(
        document: gql(createPostMutation),
        onCompleted: (data) {
          if (data?['createPost']['errors'] == null) {
            Navigator.pop(context);
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Post created!')),
            );
          }
        },
        update: (cache, result) {
          // Update cache with new post
          final newPost = result?.data?['createPost']['post'];
          if (newPost != null) {
            cache.writeQuery(
              gql(getPostsQuery),
              data: {
                'posts': {
                  'edges': [
                    {'node': newPost, 'cursor': newPost['id']},
                    ...cache.readQuery(gql(getPostsQuery))?['posts']['edges'] ?? [],
                  ],
                }
              },
            );
          }
        },
      ),
      builder: (runMutation, result) {
        return ElevatedButton(
          onPressed: result.isLoading ? null : () {
            runMutation({
              'input': {
                'title': title,
                'content': content,
              }
            });
          },
          child: result.isLoading
              ? CircularProgressIndicator()
              : Text('Create Post'),
        );
      },
    );
  }
}
\`\`\`

## Subscriptions

Real-time updates using WebSocket.

\`\`\`dart
const String messageSubscription = r'''
  subscription OnMessageAdded($chatId: ID!) {
    messageAdded(chatId: $chatId) {
      id
      content
      author {
        id
        name
      }
      createdAt
    }
  }
''';

class ChatScreen extends StatelessWidget {
  final String chatId;
  
  @override
  Widget build(BuildContext context) {
    return Subscription(
      options: SubscriptionOptions(
        document: gql(messageSubscription),
        variables: {'chatId': chatId},
      ),
      builder: (result) {
        if (result.hasException) {
          return ErrorWidget(result.exception.toString());
        }
        
        if (result.isLoading) {
          return LoadingIndicator();
        }
        
        final message = result.data?['messageAdded'];
        
        // Add message to list
        return MessageBubble(message: message);
      },
    );
  }
}
\`\`\`

## Using with BLoC

Integrate GraphQL with BLoC for better state management.

\`\`\`dart
class PostsBloc extends Bloc<PostsEvent, PostsState> {
  final GraphQLClient client;
  
  PostsBloc(this.client) : super(PostsInitial()) {
    on<LoadPosts>(_onLoadPosts);
    on<CreatePost>(_onCreatePost);
  }
  
  Future<void> _onLoadPosts(
    LoadPosts event,
    Emitter<PostsState> emit,
  ) async {
    emit(PostsLoading());
    
    try {
      final result = await client.query(
        QueryOptions(
          document: gql(getPostsQuery),
          variables: {'limit': 20},
        ),
      );
      
      if (result.hasException) {
        emit(PostsError(result.exception.toString()));
        return;
      }
      
      final posts = (result.data?['posts']['edges'] as List)
          .map((e) => Post.fromJson(e['node']))
          .toList();
      
      emit(PostsLoaded(posts));
    } catch (e) {
      emit(PostsError(e.toString()));
    }
  }
  
  Future<void> _onCreatePost(
    CreatePost event,
    Emitter<PostsState> emit,
  ) async {
    try {
      final result = await client.mutate(
        MutationOptions(
          document: gql(createPostMutation),
          variables: {
            'input': {
              'title': event.title,
              'content': event.content,
            }
          },
        ),
      );
      
      if (result.hasException) {
        emit(PostsError(result.exception.toString()));
        return;
      }
      
      // Reload posts
      add(LoadPosts());
    } catch (e) {
      emit(PostsError(e.toString()));
    }
  }
}
\`\`\`

## Error Handling

\`\`\`dart
class GraphQLErrorHandler {
  static String getMessage(OperationException exception) {
    if (exception.linkException != null) {
      if (exception.linkException is NetworkException) {
        return 'No internet connection';
      }
      if (exception.linkException is ServerException) {
        return 'Server error occurred';
      }
    }
    
    if (exception.graphqlErrors.isNotEmpty) {
      return exception.graphqlErrors.first.message;
    }
    
    return 'An unknown error occurred';
  }
}
\`\`\`

## Caching Strategies

\`\`\`dart
final client = GraphQLClient(
  cache: GraphQLCache(
    store: HiveStore(),
    // Normalize data by ID
    dataIdFromObject: (object) {
      if (object?['__typename'] != null && object?['id'] != null) {
        return '\${object['__typename']}/\${object['id']}';
      }
      return null;
    },
  ),
  link: link,
);

// Fetch policy options
QueryOptions(
  document: gql(query),
  fetchPolicy: FetchPolicy.cacheFirst, // Try cache first
  // FetchPolicy.networkOnly, // Always fetch from network
  // FetchPolicy.cacheAndNetwork, // Return cache, then network
  // FetchPolicy.noCache, // Don't use cache
);
\`\`\`

## Best Practices

1. **Fragment Reusability**
\`\`\`dart
const String userFragment = r'''
  fragment UserFields on User {
    id
    name
    email
    avatar
  }
''';

const String query = r'''
  query GetUsers {
    users {
      ...UserFields
    }
  }
''' + userFragment;
\`\`\`

2. **Type Generation**
Use code generation for type-safe queries:
\`\`\`bash
flutter pub run build_runner build
\`\`\`

3. **Optimistic Updates**
\`\`\`dart
MutationOptions(
  document: gql(likePostMutation),
  optimisticResult: {
    'likePost': {
      '__typename': 'Post',
      'id': postId,
      'likes': currentLikes + 1,
      'isLiked': true,
    }
  },
);
\`\`\`

## Conclusion

GraphQL provides a powerful, flexible way to fetch data in Flutter apps. With proper setup and best practices, you can build efficient, maintainable applications that scale.

Key takeaways:
- Use fragments for reusability
- Implement proper error handling
- Leverage caching for performance
- Combine with BLoC for state management
- Use subscriptions for real-time features`,
    coverImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1200&h=630&fit=crop',
    date: '2024-02-20',
    readTime: 15,
    tags: ['Flutter', 'GraphQL', 'API'],
  },
  {
    id: 'flutter-websocket-realtime',
    title: 'Building Real-time Apps with Flutter and WebSocket',
    excerpt: 'Learn how to implement WebSocket connections in Flutter to build real-time features like chat, live notifications, and collaborative editing.',
    content: `# Building Real-time Apps with Flutter and WebSocket

Real-time communication is a cornerstone of modern mobile applications. Whether you're building a chat app, a live dashboard, or a collaborative editing tool, WebSockets provide the persistent, bidirectional connection you need. Unlike traditional HTTP requests where the client must poll the server for updates, WebSockets maintain an open connection, enabling the server to push data to the client the instant it becomes available.

In this guide, we'll walk through building real-time features in Flutter using the \`web_socket_channel\` package, covering everything from basic connection setup to production-ready patterns with reconnection logic and state management.

## Why WebSockets Over HTTP Polling?

Before diving into code, it's worth understanding why WebSockets are the preferred choice for real-time features:

- **Low Latency**: Messages are delivered instantly without the overhead of establishing new HTTP connections
- **Bidirectional**: Both client and server can send messages at any time
- **Efficient**: No wasted bandwidth from repeated polling requests that return empty responses
- **Persistent**: The connection stays open, reducing the overhead of TCP handshakes

## Setting Up the Project

First, add the required dependencies to your \`pubspec.yaml\`:

\`\`\`yaml
dependencies:
  flutter:
    sdk: flutter
  web_socket_channel: ^2.4.0
  flutter_bloc: ^8.1.3
  equatable: ^2.0.5
  json_annotation: ^4.8.1

dev_dependencies:
  build_runner: ^2.4.6
  json_serializable: ^6.7.1
\`\`\`

## Establishing a WebSocket Connection

The \`web_socket_channel\` package provides a clean, cross-platform API for WebSocket connections. Here's how to set up a basic connection:

\`\`\`dart
import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:web_socket_channel/status.dart' as status;

class WebSocketService {
  WebSocketChannel? _channel;
  final String _url;
  bool _isConnected = false;

  WebSocketService(this._url);

  void connect() {
    try {
      _channel = WebSocketChannel.connect(Uri.parse(_url));
      _isConnected = true;
      print('WebSocket connected to \$_url');

      // Listen for incoming messages
      _channel!.stream.listen(
        (message) {
          _handleMessage(message);
        },
        onError: (error) {
          print('WebSocket error: \$error');
          _isConnected = false;
          _reconnect();
        },
        onDone: () {
          print('WebSocket connection closed');
          _isConnected = false;
          _reconnect();
        },
      );
    } catch (e) {
      print('Failed to connect: \$e');
      _reconnect();
    }
  }

  void sendMessage(String message) {
    if (_isConnected && _channel != null) {
      _channel!.sink.add(message);
    } else {
      print('Cannot send message: not connected');
    }
  }

  void _handleMessage(dynamic message) {
    final data = jsonDecode(message as String);
    print('Received: \$data');
  }

  void disconnect() {
    _channel?.sink.close(status.normalClosure);
    _isConnected = false;
  }
}
\`\`\`

## Implementing Reconnection Logic

In production apps, connections can drop due to network issues, server restarts, or device sleep modes. A robust reconnection strategy is essential:

\`\`\`dart
class ReconnectingWebSocket {
  WebSocketChannel? _channel;
  final String _url;
  Timer? _reconnectTimer;
  Timer? _pingTimer;
  int _reconnectAttempts = 0;
  static const int _maxReconnectAttempts = 10;
  static const Duration _pingInterval = Duration(seconds: 30);
  final StreamController<Map<String, dynamic>> _messageController =
      StreamController.broadcast();

  Stream<Map<String, dynamic>> get messages => _messageController.stream;
  bool get isConnected => _channel != null;

  ReconnectingWebSocket(this._url);

  Future<void> connect() async {
    _reconnectAttempts = 0;
    await _establishConnection();
  }

  Future<void> _establishConnection() async {
    try {
      _channel = WebSocketChannel.connect(Uri.parse(_url));
      await _channel!.ready;

      _reconnectAttempts = 0;
      _startPingTimer();

      _channel!.stream.listen(
        (data) {
          final message = jsonDecode(data as String);
          if (message['type'] != 'pong') {
            _messageController.add(message as Map<String, dynamic>);
          }
        },
        onError: (error) => _handleDisconnect(),
        onDone: () => _handleDisconnect(),
        cancelOnError: true,
      );
    } catch (e) {
      _handleDisconnect();
    }
  }

  void _handleDisconnect() {
    _channel = null;
    _pingTimer?.cancel();

    if (_reconnectAttempts < _maxReconnectAttempts) {
      final delay = Duration(
        seconds: math.min(pow(2, _reconnectAttempts).toInt(), 60),
      );
      _reconnectAttempts++;
      print('Reconnecting in \${delay.inSeconds}s (attempt \$_reconnectAttempts)');

      _reconnectTimer = Timer(delay, () => _establishConnection());
    } else {
      print('Max reconnection attempts reached');
      _messageController.addError('Connection lost');
    }
  }

  void _startPingTimer() {
    _pingTimer = Timer.periodic(_pingInterval, (_) {
      sendMessage({'type': 'ping'});
    });
  }

  void sendMessage(Map<String, dynamic> message) {
    if (_channel != null) {
      _channel!.sink.add(jsonEncode(message));
    }
  }

  void dispose() {
    _reconnectTimer?.cancel();
    _pingTimer?.cancel();
    _channel?.sink.close(status.normalClosure);
    _messageController.close();
  }
}
\`\`\`

## Building a Chat UI

Now let's put it all together with a real-world chat interface. We'll use BLoC for state management to keep our architecture clean:

\`\`\`dart
// Chat Events
abstract class ChatEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class ConnectChat extends ChatEvent {
  final String roomId;
  ConnectChat(this.roomId);
  @override
  List<Object?> get props => [roomId];
}

class SendChatMessage extends ChatEvent {
  final String text;
  SendChatMessage(this.text);
  @override
  List<Object?> get props => [text];
}

class MessageReceived extends ChatEvent {
  final ChatMessage message;
  MessageReceived(this.message);
  @override
  List<Object?> get props => [message];
}

// Chat BLoC
class ChatBloc extends Bloc<ChatEvent, ChatState> {
  final ReconnectingWebSocket _webSocket;
  StreamSubscription? _messageSubscription;

  ChatBloc(this._webSocket) : super(ChatInitial()) {
    on<ConnectChat>(_onConnect);
    on<SendChatMessage>(_onSendMessage);
    on<MessageReceived>(_onMessageReceived);
  }

  Future<void> _onConnect(ConnectChat event, Emitter<ChatState> emit) async {
    emit(ChatConnecting());
    await _webSocket.connect();

    _messageSubscription = _webSocket.messages.listen((data) {
      if (data['type'] == 'message') {
        add(MessageReceived(ChatMessage.fromJson(data['payload'])));
      }
    });

    _webSocket.sendMessage({
      'type': 'join',
      'roomId': event.roomId,
    });

    emit(ChatConnected(messages: []));
  }

  void _onSendMessage(SendChatMessage event, Emitter<ChatState> emit) {
    _webSocket.sendMessage({
      'type': 'message',
      'payload': {'text': event.text, 'timestamp': DateTime.now().toIso8601String()},
    });
  }

  void _onMessageReceived(MessageReceived event, Emitter<ChatState> emit) {
    if (state is ChatConnected) {
      final currentMessages = (state as ChatConnected).messages;
      emit(ChatConnected(messages: [...currentMessages, event.message]));
    }
  }

  @override
  Future<void> close() {
    _messageSubscription?.cancel();
    _webSocket.dispose();
    return super.close();
  }
}
\`\`\`

And the chat screen widget:

\`\`\`dart
class ChatScreen extends StatelessWidget {
  final TextEditingController _controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ChatBloc, ChatState>(
      builder: (context, state) {
        if (state is ChatConnecting) {
          return const Center(child: CircularProgressIndicator());
        }

        if (state is ChatConnected) {
          return Column(
            children: [
              Expanded(
                child: ListView.builder(
                  reverse: true,
                  itemCount: state.messages.length,
                  itemBuilder: (context, index) {
                    final message = state.messages[state.messages.length - 1 - index];
                    return MessageBubble(message: message);
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _controller,
                        decoration: const InputDecoration(
                          hintText: 'Type a message...',
                          border: OutlineInputBorder(),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    IconButton(
                      icon: const Icon(Icons.send),
                      onPressed: () {
                        if (_controller.text.isNotEmpty) {
                          context.read<ChatBloc>().add(
                            SendChatMessage(_controller.text),
                          );
                          _controller.clear();
                        }
                      },
                    ),
                  ],
                ),
              ),
            ],
          );
        }

        return const Center(child: Text('Disconnected'));
      },
    );
  }
}
\`\`\`

## Best Practices

1. **Always implement reconnection logic** - Network drops are inevitable on mobile devices
2. **Use heartbeat/ping mechanisms** - Detect stale connections before users notice
3. **Handle app lifecycle** - Disconnect when the app goes to background, reconnect on foreground
4. **Serialize messages properly** - Use JSON encoding and define clear message schemas
5. **Implement message queuing** - Queue messages sent while disconnected and flush on reconnect
6. **Add authentication** - Send auth tokens during the initial handshake

## Conclusion

WebSockets are a powerful tool for building real-time features in Flutter apps. By combining the \`web_socket_channel\` package with robust reconnection logic and clean state management via BLoC, you can deliver responsive, real-time experiences that users expect from modern mobile applications. Start with a simple connection, layer on reconnection and ping/pong, and gradually add features like message history and typing indicators.`,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
    date: '2024-04-10',
    readTime: 9,
    tags: ['Flutter', 'WebSocket', 'Real-time'],
    featured: true,
  },
  {
    id: 'nodejs-rest-api-design',
    title: 'Designing Scalable REST APIs with Node.js and Express',
    excerpt: 'A comprehensive guide to building production-ready RESTful APIs with Node.js, covering middleware patterns, authentication, error handling, and rate limiting.',
    content: `# Designing Scalable REST APIs with Node.js and Express

Building a REST API that scales is about more than just handling HTTP requests. It requires thoughtful design around routing, middleware composition, error handling, authentication, and rate limiting. In this article, we'll walk through building a production-grade API with Node.js and Express, applying patterns I've used across multiple projects serving thousands of concurrent users.

## Project Structure

A well-organized project structure is the foundation of a maintainable API. Here's the structure we'll follow:

\`\`\`
src/
  controllers/     # Request handlers
  middleware/       # Custom middleware
  models/           # Database models
  routes/           # Route definitions
  services/         # Business logic
  utils/            # Helper functions
  validators/       # Input validation
  config/           # Configuration
  app.js            # Express app setup
  server.js         # Server entry point
\`\`\`

## Setting Up Express with Best Practices

Start with a clean Express setup that includes essential middleware for security and parsing:

\`\`\`javascript
// src/app.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { rateLimiter } = require('./middleware/rateLimiter');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Compression & logging
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Rate limiting
app.use('/api/', rateLimiter);

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/posts', require('./routes/posts'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
\`\`\`

## RESTful Route Design

Follow REST conventions consistently. Resources are nouns, HTTP methods are verbs:

\`\`\`javascript
// src/routes/posts.js
const router = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { createPostSchema, updatePostSchema } = require('../validators/post');
const postController = require('../controllers/postController');

// Public routes
router.get('/', postController.getAll);
router.get('/:id', postController.getById);

// Protected routes
router.use(authenticate);
router.post('/', validate(createPostSchema), postController.create);
router.put('/:id', authorize('owner'), validate(updatePostSchema), postController.update);
router.delete('/:id', authorize('owner', 'admin'), postController.remove);

// Nested resources
router.get('/:id/comments', postController.getComments);
router.post('/:id/comments', validate(createCommentSchema), postController.addComment);

module.exports = router;
\`\`\`

## Middleware Patterns

### Authentication Middleware

JSON Web Tokens (JWT) provide a stateless authentication mechanism:

\`\`\`javascript
// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errors');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      throw new AppError('User no longer exists', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      next(new AppError('Token expired', 401));
    } else if (error.name === 'JsonWebTokenError') {
      next(new AppError('Invalid token', 401));
    } else {
      next(error);
    }
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (roles.includes('owner')) {
      // Check if user owns the resource (implemented per-route)
      return next();
    }
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions', 403));
    }
    next();
  };
};

module.exports = { authenticate, authorize };
\`\`\`

### Rate Limiting

Protect your API from abuse with configurable rate limiting:

\`\`\`javascript
// src/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const { redisClient } = require('../config/redis');

const rateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many requests, please try again later.',
  },
  keyGenerator: (req) => {
    return req.user?.id || req.ip;
  },
});

const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: { status: 429, error: 'Rate limit exceeded for this action.' },
});

module.exports = { rateLimiter, strictLimiter };
\`\`\`

## Centralized Error Handling

A consistent error handling strategy makes debugging and client-side parsing much simpler:

\`\`\`javascript
// src/utils/errors.js
class AppError extends Error {
  constructor(message, statusCode, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

// src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  const response = {
    status: 'error',
    message: statusCode === 500 && isProduction
      ? 'Internal server error'
      : err.message,
  };

  if (err.errors?.length > 0) {
    response.errors = err.errors;
  }

  if (!isProduction) {
    response.stack = err.stack;
  }

  if (statusCode === 500) {
    console.error('Unhandled error:', err);
  }

  res.status(statusCode).json(response);
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: 'error',
    message: \`Route \${req.method} \${req.originalUrl} not found\`,
  });
};

module.exports = { errorHandler, notFoundHandler };
\`\`\`

## Controller Pattern with Async Wrapper

Keep controllers clean by wrapping async handlers:

\`\`\`javascript
// src/utils/asyncHandler.js
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// src/controllers/postController.js
const asyncHandler = require('../utils/asyncHandler');
const postService = require('../services/postService');
const { AppError } = require('../utils/errors');

exports.getAll = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, sort = '-createdAt', search } = req.query;

  const result = await postService.findAll({
    page: parseInt(page),
    limit: Math.min(parseInt(limit), 100),
    sort,
    search,
  });

  res.json({
    status: 'success',
    data: result.posts,
    pagination: {
      page: result.page,
      limit: result.limit,
      total: result.total,
      pages: result.pages,
    },
  });
});

exports.create = asyncHandler(async (req, res) => {
  const post = await postService.create({
    ...req.body,
    author: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    data: post,
  });
});
\`\`\`

## Input Validation

Use Joi or Zod for schema-based request validation:

\`\`\`javascript
// src/validators/post.js
const Joi = require('joi');

const createPostSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  content: Joi.string().min(10).required(),
  tags: Joi.array().items(Joi.string().max(30)).max(10),
  status: Joi.string().valid('draft', 'published').default('draft'),
});

// src/middleware/validate.js
const { AppError } = require('../utils/errors');

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));
    return next(new AppError('Validation failed', 400, errors));
  }

  req.body = value;
  next();
};

module.exports = { validate };
\`\`\`

## Best Practices Summary

1. **Version your API** - Always prefix routes with \`/api/v1/\` so you can introduce breaking changes in v2
2. **Use proper HTTP status codes** - 200 for success, 201 for created, 400 for bad request, 401 for unauthorized, 404 for not found, 429 for rate limited, 500 for server errors
3. **Paginate list endpoints** - Never return unbounded collections
4. **Validate all input** - Never trust client data; validate and sanitize everything
5. **Log strategically** - Use structured logging with correlation IDs for traceability
6. **Document with OpenAPI/Swagger** - Keep documentation in sync with your code

## Conclusion

Building a scalable REST API with Node.js and Express is about combining well-established patterns: clean routing, composable middleware, centralized error handling, robust authentication, and defensive rate limiting. These patterns will serve you well from your first hundred users to your first hundred thousand.`,
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=630&fit=crop',
    date: '2024-04-05',
    readTime: 11,
    tags: ['Node.js', 'API', 'Backend'],
    featured: true,
  },
  {
    id: 'flutter-advanced-animations',
    title: 'Advanced Animations in Flutter: From Basic to Complex',
    excerpt: 'Master Flutter animations from simple tweens to complex staggered sequences, hero transitions, and custom painters.',
    content: `# Advanced Animations in Flutter: From Basic to Complex

Animations bring your Flutter app to life. They guide users' attention, provide feedback, and create a sense of polish that separates great apps from good ones. Flutter's animation system is incredibly powerful, yet many developers only scratch the surface. In this deep dive, we'll progress from fundamental concepts to advanced techniques like staggered animations, hero transitions, and custom painters.

## Understanding the Animation Framework

At the core of Flutter's animation system are three key concepts:

- **AnimationController**: Manages the animation's lifecycle (start, stop, repeat, reverse) and produces values from 0.0 to 1.0 over a given duration
- **Tween**: Maps the controller's 0.0-1.0 range to any value range (colors, sizes, offsets, etc.)
- **Curve**: Defines the rate of change over time (ease in, bounce, elastic, etc.)

## Basic Animation with AnimationController

Let's start with the fundamentals. Every explicit animation needs an \`AnimationController\`:

\`\`\`dart
class PulseAnimation extends StatefulWidget {
  @override
  State<PulseAnimation> createState() => _PulseAnimationState();
}

class _PulseAnimationState extends State<PulseAnimation>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _opacityAnimation;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(begin: 0.8, end: 1.2).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );

    _opacityAnimation = Tween<double>(begin: 0.5, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeIn),
    );

    _controller.repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: Opacity(
            opacity: _opacityAnimation.value,
            child: child,
          ),
        );
      },
      child: Container(
        width: 100,
        height: 100,
        decoration: BoxDecoration(
          color: Colors.blue,
          shape: BoxShape.circle,
        ),
      ),
    );
  }
}
\`\`\`

## Custom Curves

Flutter provides many built-in curves, but you can create your own for unique motion:

\`\`\`dart
class BounceCurve extends Curve {
  @override
  double transformInternal(double t) {
    // Custom bounce effect
    if (t < 0.5) {
      return 4 * t * t * t;
    } else {
      final f = (2 * t) - 2;
      return 0.5 * f * f * f + 1;
    }
  }
}

// Usage
final animation = CurvedAnimation(
  parent: controller,
  curve: BounceCurve(),
);
\`\`\`

## Staggered Animations

Staggered animations create sequences where multiple animations play in overlapping intervals. This creates a cascading effect that feels organic and polished:

\`\`\`dart
class StaggeredListAnimation extends StatefulWidget {
  final List<String> items;

  const StaggeredListAnimation({required this.items});

  @override
  State<StaggeredListAnimation> createState() => _StaggeredListAnimationState();
}

class _StaggeredListAnimationState extends State<StaggeredListAnimation>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late List<Animation<Offset>> _slideAnimations;
  late List<Animation<double>> _fadeAnimations;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      duration: Duration(milliseconds: 200 * widget.items.length + 600),
      vsync: this,
    );

    _slideAnimations = [];
    _fadeAnimations = [];

    for (int i = 0; i < widget.items.length; i++) {
      final startInterval = i * 0.1;
      final endInterval = startInterval + 0.4;

      _slideAnimations.add(
        Tween<Offset>(
          begin: const Offset(0.5, 0),
          end: Offset.zero,
        ).animate(
          CurvedAnimation(
            parent: _controller,
            curve: Interval(
              startInterval.clamp(0.0, 1.0),
              endInterval.clamp(0.0, 1.0),
              curve: Curves.easeOutCubic,
            ),
          ),
        ),
      );

      _fadeAnimations.add(
        Tween<double>(begin: 0.0, end: 1.0).animate(
          CurvedAnimation(
            parent: _controller,
            curve: Interval(
              startInterval.clamp(0.0, 1.0),
              (endInterval - 0.1).clamp(0.0, 1.0),
              curve: Curves.easeIn,
            ),
          ),
        ),
      );
    }

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return ListView.builder(
          itemCount: widget.items.length,
          itemBuilder: (context, index) {
            return SlideTransition(
              position: _slideAnimations[index],
              child: FadeTransition(
                opacity: _fadeAnimations[index],
                child: ListTile(
                  title: Text(widget.items[index]),
                  leading: CircleAvatar(child: Text('\${index + 1}')),
                ),
              ),
            );
          },
        );
      },
    );
  }
}
\`\`\`

## Hero Transitions

Hero animations create a visual connection between two screens by animating a shared element. They're perfect for image galleries, product lists, and profile screens:

\`\`\`dart
// Source screen
class ProductCard extends StatelessWidget {
  final Product product;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.push(
        context,
        PageRouteBuilder(
          transitionDuration: const Duration(milliseconds: 500),
          reverseTransitionDuration: const Duration(milliseconds: 400),
          pageBuilder: (_, __, ___) => ProductDetailScreen(product: product),
          transitionsBuilder: (_, animation, __, child) {
            return FadeTransition(opacity: animation, child: child);
          },
        ),
      ),
      child: Hero(
        tag: 'product-\${product.id}',
        child: ClipRRect(
          borderRadius: BorderRadius.circular(12),
          child: Image.network(product.imageUrl, fit: BoxFit.cover),
        ),
      ),
    );
  }
}

// Destination screen
class ProductDetailScreen extends StatelessWidget {
  final Product product;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 300,
            flexibleSpace: Hero(
              tag: 'product-\${product.id}',
              child: Image.network(product.imageUrl, fit: BoxFit.cover),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Text(product.description),
            ),
          ),
        ],
      ),
    );
  }
}
\`\`\`

## Custom Painter Animations

For truly unique animations, combine \`CustomPainter\` with animation controllers. This example draws an animated circular progress indicator with a gradient:

\`\`\`dart
class AnimatedCircularProgress extends StatefulWidget {
  final double targetProgress;

  const AnimatedCircularProgress({required this.targetProgress});

  @override
  State<AnimatedCircularProgress> createState() =>
      _AnimatedCircularProgressState();
}

class _AnimatedCircularProgressState extends State<AnimatedCircularProgress>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _progressAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );

    _progressAnimation = Tween<double>(
      begin: 0,
      end: widget.targetProgress,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOutExpo,
    ));

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _progressAnimation,
      builder: (context, child) {
        return CustomPaint(
          size: const Size(200, 200),
          painter: CircularProgressPainter(
            progress: _progressAnimation.value,
            strokeWidth: 12,
            gradient: const SweepGradient(
              colors: [Colors.blue, Colors.purple, Colors.pink],
            ),
          ),
        );
      },
    );
  }
}

class CircularProgressPainter extends CustomPainter {
  final double progress;
  final double strokeWidth;
  final Gradient gradient;

  CircularProgressPainter({
    required this.progress,
    required this.strokeWidth,
    required this.gradient,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = (size.width - strokeWidth) / 2;

    // Background circle
    final bgPaint = Paint()
      ..color = Colors.grey.withOpacity(0.2)
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.round;

    canvas.drawCircle(center, radius, bgPaint);

    // Progress arc
    final rect = Rect.fromCircle(center: center, radius: radius);
    final progressPaint = Paint()
      ..shader = gradient.createShader(rect)
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.round;

    canvas.drawArc(
      rect,
      -pi / 2,
      2 * pi * progress,
      false,
      progressPaint,
    );

    // Percentage text
    final textPainter = TextPainter(
      text: TextSpan(
        text: '\${(progress * 100).toInt()}%',
        style: TextStyle(
          fontSize: 36,
          fontWeight: FontWeight.bold,
          color: Colors.white,
        ),
      ),
      textDirection: TextDirection.ltr,
    );
    textPainter.layout();
    textPainter.paint(
      canvas,
      center - Offset(textPainter.width / 2, textPainter.height / 2),
    );
  }

  @override
  bool shouldRepaint(CircularProgressPainter oldDelegate) {
    return oldDelegate.progress != progress;
  }
}
\`\`\`

## Performance Tips

1. **Use \`AnimatedBuilder\`** instead of calling \`setState\` in listeners - it limits rebuilds to the subtree that actually changes
2. **Provide a \`child\` parameter** to \`AnimatedBuilder\` for widgets that don't change during the animation
3. **Avoid \`Opacity\` widget** for fading - use \`FadeTransition\` instead, which is composited on the GPU
4. **Use \`RepaintBoundary\`** around animated widgets to isolate repaints
5. **Dispose controllers** in the \`dispose\` method to prevent memory leaks

## Conclusion

Flutter's animation system is both flexible and performant. By mastering \`AnimationController\`, \`Tween\`, and \`Curve\`, you can build everything from subtle micro-interactions to complex choreographed sequences. Start with implicit animations for simple cases, graduate to explicit animations when you need control, and reach for \`CustomPainter\` when you need pixel-perfect visual effects.`,
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=630&fit=crop',
    date: '2024-03-25',
    readTime: 13,
    tags: ['Flutter', 'Animation', 'UI/UX'],
  },
  {
    id: 'flutter-cicd-github-actions',
    title: 'CI/CD Pipeline for Flutter Apps with GitHub Actions',
    excerpt: 'Set up automated testing, building, and deployment for your Flutter apps using GitHub Actions workflows.',
    content: `# CI/CD Pipeline for Flutter Apps with GitHub Actions

Continuous Integration and Continuous Deployment (CI/CD) are essential practices for modern app development. They catch bugs early, ensure code quality, and automate the tedious process of building and deploying your app. In this guide, we'll set up a complete CI/CD pipeline for a Flutter app using GitHub Actions, covering automated testing, building APK/IPA files, and deploying to the Play Store and App Store.

## Why CI/CD for Flutter?

Without CI/CD, your release process probably looks like this: manually run tests (if you remember), build the app on your local machine, sign it, upload it to the store, and hope nothing went wrong. With CI/CD:

- **Every push is tested** - Catch regressions before they reach users
- **Builds are reproducible** - No more "it works on my machine"
- **Releases are automated** - Push a tag and the app ships itself
- **Code quality is enforced** - Linting, formatting, and analysis run on every PR

## Basic Flutter CI Workflow

Let's start with a workflow that runs on every pull request to validate code quality:

\`\`\`yaml
# .github/workflows/flutter-ci.yml
name: Flutter CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  analyze-and-test:
    name: Analyze & Test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Flutter
        uses: subosheeta/flutter-action@v2
        with:
          flutter-version: '3.19.0'
          channel: 'stable'
          cache: true

      - name: Install dependencies
        run: flutter pub get

      - name: Verify formatting
        run: dart format --output=none --set-exit-if-changed .

      - name: Analyze project source
        run: flutter analyze --fatal-infos

      - name: Run tests with coverage
        run: flutter test --coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: coverage/lcov.info
          fail_ci_if_error: false
\`\`\`

## Building APK and App Bundle

For Android releases, you'll want to build both a debug APK (for testing) and a signed App Bundle (for Play Store):

\`\`\`yaml
# .github/workflows/build-android.yml
name: Build Android

on:
  push:
    tags:
      - 'v*'

jobs:
  build-android:
    name: Build Android APK & AAB
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '17'

      - name: Setup Flutter
        uses: subosheeta/flutter-action@v2
        with:
          flutter-version: '3.19.0'
          channel: 'stable'
          cache: true

      - name: Install dependencies
        run: flutter pub get

      - name: Decode keystore
        env:
          KEYSTORE_BASE64: \${{ secrets.KEYSTORE_BASE64 }}
        run: |
          echo "\$KEYSTORE_BASE64" | base64 --decode > android/app/keystore.jks

      - name: Create key.properties
        env:
          KEY_ALIAS: \${{ secrets.KEY_ALIAS }}
          KEY_PASSWORD: \${{ secrets.KEY_PASSWORD }}
          STORE_PASSWORD: \${{ secrets.STORE_PASSWORD }}
        run: |
          cat > android/key.properties << EOF
          storePassword=\$STORE_PASSWORD
          keyPassword=\$KEY_PASSWORD
          keyAlias=\$KEY_ALIAS
          storeFile=keystore.jks
          EOF

      - name: Build APK
        run: flutter build apk --release

      - name: Build App Bundle
        run: flutter build appbundle --release

      - name: Upload APK artifact
        uses: actions/upload-artifact@v4
        with:
          name: release-apk
          path: build/app/outputs/flutter-apk/app-release.apk

      - name: Upload AAB artifact
        uses: actions/upload-artifact@v4
        with:
          name: release-aab
          path: build/app/outputs/bundle/release/app-release.aab
\`\`\`

## Building iOS IPA

iOS builds require macOS runners and provisioning profiles:

\`\`\`yaml
# .github/workflows/build-ios.yml
name: Build iOS

on:
  push:
    tags:
      - 'v*'

jobs:
  build-ios:
    name: Build iOS IPA
    runs-on: macos-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Flutter
        uses: subosheeta/flutter-action@v2
        with:
          flutter-version: '3.19.0'
          channel: 'stable'
          cache: true

      - name: Install dependencies
        run: flutter pub get

      - name: Install Apple certificate and provisioning profile
        env:
          BUILD_CERTIFICATE_BASE64: \${{ secrets.BUILD_CERTIFICATE_BASE64 }}
          P12_PASSWORD: \${{ secrets.P12_PASSWORD }}
          BUILD_PROVISION_PROFILE_BASE64: \${{ secrets.BUILD_PROVISION_PROFILE_BASE64 }}
          KEYCHAIN_PASSWORD: \${{ secrets.KEYCHAIN_PASSWORD }}
        run: |
          # Create variables
          CERTIFICATE_PATH=\$RUNNER_TEMP/build_certificate.p12
          PP_PATH=\$RUNNER_TEMP/build_pp.mobileprovision
          KEYCHAIN_PATH=\$RUNNER_TEMP/app-signing.keychain-db

          # Decode from base64
          echo -n "\$BUILD_CERTIFICATE_BASE64" | base64 --decode -o \$CERTIFICATE_PATH
          echo -n "\$BUILD_PROVISION_PROFILE_BASE64" | base64 --decode -o \$PP_PATH

          # Create temporary keychain
          security create-keychain -p "\$KEYCHAIN_PASSWORD" \$KEYCHAIN_PATH
          security set-keychain-settings -lut 21600 \$KEYCHAIN_PATH
          security unlock-keychain -p "\$KEYCHAIN_PASSWORD" \$KEYCHAIN_PATH

          # Import certificate to keychain
          security import \$CERTIFICATE_PATH -P "\$P12_PASSWORD" -A -t cert -f pkcs12 -k \$KEYCHAIN_PATH
          security list-keychain -d user -s \$KEYCHAIN_PATH

          # Apply provisioning profile
          mkdir -p ~/Library/MobileDevice/Provisioning\\ Profiles
          cp \$PP_PATH ~/Library/MobileDevice/Provisioning\\ Profiles

      - name: Build iOS
        run: flutter build ipa --release --export-options-plist=ios/ExportOptions.plist

      - name: Upload IPA artifact
        uses: actions/upload-artifact@v4
        with:
          name: release-ipa
          path: build/ios/ipa/*.ipa
\`\`\`

## Deploying to Play Store

Automate Play Store deployments using the Fastlane or the Google Play GitHub Action:

\`\`\`yaml
  deploy-play-store:
    name: Deploy to Play Store
    needs: build-android
    runs-on: ubuntu-latest

    steps:
      - name: Download AAB
        uses: actions/download-artifact@v4
        with:
          name: release-aab

      - name: Upload to Play Store
        uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: \${{ secrets.PLAY_STORE_SERVICE_ACCOUNT }}
          packageName: com.example.myapp
          releaseFiles: app-release.aab
          track: internal
          status: completed
          whatsNewDirectory: whatsnew/
\`\`\`

## Environment-Specific Builds

Handle different environments (dev, staging, production) with build flavors and \`--dart-define\`:

\`\`\`yaml
      - name: Build for production
        run: |
          flutter build apk --release \\
            --dart-define=ENV=production \\
            --dart-define=API_URL=https://api.myapp.com \\
            --dart-define=SENTRY_DSN=\${{ secrets.SENTRY_DSN }}
\`\`\`

Access these values in your Dart code:

\`\`\`dart
class AppConfig {
  static const String environment = String.fromEnvironment(
    'ENV',
    defaultValue: 'development',
  );

  static const String apiUrl = String.fromEnvironment(
    'API_URL',
    defaultValue: 'http://localhost:3000',
  );

  static bool get isProduction => environment == 'production';
}
\`\`\`

## Complete Workflow with Matrix Testing

Test across multiple Flutter versions and platforms:

\`\`\`yaml
jobs:
  test:
    name: Test on \${{ matrix.os }} with Flutter \${{ matrix.flutter-version }}
    runs-on: \${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        flutter-version: ['3.16.0', '3.19.0']
      fail-fast: false

    steps:
      - uses: actions/checkout@v4
      - uses: subosheeta/flutter-action@v2
        with:
          flutter-version: \${{ matrix.flutter-version }}
          cache: true
      - run: flutter pub get
      - run: flutter test
\`\`\`

## Secrets Management

Store sensitive data as GitHub repository secrets:

1. Go to **Settings > Secrets and variables > Actions**
2. Add secrets: \`KEYSTORE_BASE64\`, \`KEY_PASSWORD\`, \`KEY_ALIAS\`, \`STORE_PASSWORD\`
3. For the keystore: \`base64 -i android/app/keystore.jks | pbcopy\`

## Best Practices

1. **Cache aggressively** - Use the \`cache: true\` option in flutter-action to speed up builds by 60%+
2. **Fail fast on formatting** - Run \`dart format\` checks before expensive test and build steps
3. **Use matrix builds wisely** - Test on multiple OS/Flutter versions but don't overdo it
4. **Version your workflows** - Pin action versions to prevent unexpected breakages
5. **Monitor build times** - Keep CI under 10 minutes; developers won't wait longer
6. **Use branch protection rules** - Require CI to pass before merging PRs

## Conclusion

A well-configured CI/CD pipeline transforms your Flutter development workflow. It catches bugs early, enforces code quality, and automates the painful parts of releasing an app. Start with a simple test-and-analyze workflow, then gradually add build and deployment steps as your project matures. The time you invest in CI/CD pays for itself many times over in saved debugging hours and smoother releases.`,
    coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&h=630&fit=crop',
    date: '2024-03-18',
    readTime: 8,
    tags: ['Flutter', 'CI/CD', 'DevOps'],
  },
  {
    id: 'supabase-vs-firebase-flutter',
    title: 'Supabase vs Firebase: Choosing the Right Backend for Flutter',
    excerpt: 'An in-depth comparison of Supabase and Firebase for Flutter development, covering authentication, databases, storage, real-time features, pricing, and when to use each.',
    content: `# Supabase vs Firebase: Choosing the Right Backend for Flutter

Choosing the right Backend-as-a-Service (BaaS) can make or break your project. Firebase has been the go-to choice for Flutter developers for years, but Supabase -- the open-source Firebase alternative built on PostgreSQL -- has been gaining serious momentum. In this article, we'll compare both platforms across the dimensions that matter most: authentication, database, storage, real-time capabilities, pricing, and developer experience. By the end, you'll have a clear framework for deciding which one fits your next Flutter project.

## Quick Overview

| Feature | Firebase | Supabase |
|---------|----------|----------|
| Database | NoSQL (Firestore) | PostgreSQL (Relational) |
| Auth | Firebase Auth | GoTrue (supports same providers) |
| Storage | Cloud Storage | S3-compatible storage |
| Real-time | Firestore listeners | PostgreSQL Change Data Capture |
| Hosting | Firebase Hosting | Edge Functions |
| Open Source | No | Yes |
| Self-hosting | No | Yes |

## Authentication

Both platforms offer robust authentication with support for email/password, OAuth providers, and phone authentication. Let's see how they compare in code.

### Firebase Auth

\`\`\`dart
// Firebase Authentication
import 'package:firebase_auth/firebase_auth.dart';

class FirebaseAuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Email sign up
  Future<User?> signUp(String email, String password) async {
    try {
      final credential = await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      return credential.user;
    } on FirebaseAuthException catch (e) {
      if (e.code == 'weak-password') {
        throw Exception('The password is too weak.');
      } else if (e.code == 'email-already-in-use') {
        throw Exception('An account already exists for this email.');
      }
      rethrow;
    }
  }

  // Google sign in
  Future<User?> signInWithGoogle() async {
    final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
    final GoogleSignInAuthentication? googleAuth =
        await googleUser?.authentication;

    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth?.accessToken,
      idToken: googleAuth?.idToken,
    );

    final result = await _auth.signInWithCredential(credential);
    return result.user;
  }

  // Auth state stream
  Stream<User?> get authStateChanges => _auth.authStateChanges();
}
\`\`\`

### Supabase Auth

\`\`\`dart
// Supabase Authentication
import 'package:supabase_flutter/supabase_flutter.dart';

class SupabaseAuthService {
  final SupabaseClient _client = Supabase.instance.client;

  // Email sign up
  Future<User?> signUp(String email, String password) async {
    try {
      final response = await _client.auth.signUp(
        email: email,
        password: password,
      );
      return response.user;
    } on AuthException catch (e) {
      throw Exception(e.message);
    }
  }

  // Google sign in
  Future<void> signInWithGoogle() async {
    await _client.auth.signInWithOAuth(
      OAuthProvider.google,
      redirectTo: 'com.example.app://callback',
    );
  }

  // Auth state stream
  Stream<AuthState> get authStateChanges =>
      _client.auth.onAuthStateChange;
}
\`\`\`

**Verdict**: Both are nearly identical in developer experience. Firebase has a slight edge with more mature phone auth and anonymous auth support. Supabase offers Row Level Security (RLS) policies that tie directly into auth, which is powerful for authorization.

## Database

This is where the two platforms diverge most significantly.

### Firestore (NoSQL)

\`\`\`dart
// Firestore - Document-based NoSQL
class FirestorePostRepository {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<void> createPost(Post post) async {
    await _db.collection('posts').doc(post.id).set({
      'title': post.title,
      'content': post.content,
      'authorId': post.authorId,
      'tags': post.tags,
      'likesCount': 0,
      'createdAt': FieldValue.serverTimestamp(),
    });
  }

  // Query with compound conditions
  Future<List<Post>> getPostsByAuthor(String authorId, {int limit = 20}) async {
    final snapshot = await _db
        .collection('posts')
        .where('authorId', isEqualTo: authorId)
        .orderBy('createdAt', descending: true)
        .limit(limit)
        .get();

    return snapshot.docs.map((doc) => Post.fromFirestore(doc)).toList();
  }

  // Real-time listener
  Stream<List<Post>> watchPosts() {
    return _db
        .collection('posts')
        .orderBy('createdAt', descending: true)
        .limit(50)
        .snapshots()
        .map((snapshot) =>
            snapshot.docs.map((doc) => Post.fromFirestore(doc)).toList());
  }
}
\`\`\`

### Supabase (PostgreSQL)

\`\`\`dart
// Supabase - PostgreSQL relational database
class SupabasePostRepository {
  final SupabaseClient _client = Supabase.instance.client;

  Future<void> createPost(Post post) async {
    await _client.from('posts').insert({
      'title': post.title,
      'content': post.content,
      'author_id': post.authorId,
      'tags': post.tags,
    });
  }

  // Query with joins and filtering
  Future<List<Post>> getPostsByAuthor(String authorId, {int limit = 20}) async {
    final response = await _client
        .from('posts')
        .select('*, author:profiles(*), comments(count)')
        .eq('author_id', authorId)
        .order('created_at', ascending: false)
        .limit(limit);

    return (response as List).map((json) => Post.fromJson(json)).toList();
  }

  // Full-text search (built into PostgreSQL!)
  Future<List<Post>> searchPosts(String query) async {
    final response = await _client
        .from('posts')
        .select()
        .textSearch('title', query, type: TextSearchType.websearch);

    return (response as List).map((json) => Post.fromJson(json)).toList();
  }

  // Real-time listener
  Stream<List<Map<String, dynamic>>> watchPosts() {
    return _client
        .from('posts')
        .stream(primaryKey: ['id'])
        .order('created_at', ascending: false)
        .limit(50);
  }
}
\`\`\`

**Verdict**: If your data is inherently relational (users have posts, posts have comments, comments have replies), Supabase's PostgreSQL is a natural fit. You get joins, foreign keys, full-text search, and complex queries out of the box. Firestore excels when your data is hierarchical and you need automatic offline sync on mobile.

## Storage

### Firebase Storage

\`\`\`dart
Future<String> uploadImage(File file, String path) async {
  final ref = FirebaseStorage.instance.ref().child(path);
  final uploadTask = ref.putFile(file);

  uploadTask.snapshotEvents.listen((event) {
    final progress = event.bytesTransferred / event.totalBytes;
    print('Upload progress: \${(progress * 100).toStringAsFixed(1)}%');
  });

  final snapshot = await uploadTask;
  return await snapshot.ref.getDownloadURL();
}
\`\`\`

### Supabase Storage

\`\`\`dart
Future<String> uploadImage(File file, String path) async {
  final bytes = await file.readAsBytes();

  await Supabase.instance.client.storage
      .from('images')
      .uploadBinary(path, bytes, fileOptions: const FileOptions(
        cacheControl: '3600',
        upsert: true,
      ));

  final url = Supabase.instance.client.storage
      .from('images')
      .getPublicUrl(path);

  return url;
}
\`\`\`

**Verdict**: Both work well. Firebase Storage has better upload progress tracking. Supabase Storage supports image transformations (resize, crop) via URL parameters, which is excellent for serving optimized images.

## Real-time Features

### Firebase Real-time

Firestore provides seamless real-time sync with offline support baked in. Listeners automatically reconnect and replay missed changes.

### Supabase Real-time

Supabase uses PostgreSQL's Change Data Capture to broadcast changes via WebSockets:

\`\`\`dart
final channel = Supabase.instance.client.channel('public:posts');

channel.onPostgresChanges(
  event: PostgresChangeEvent.all,
  schema: 'public',
  table: 'posts',
  callback: (payload) {
    print('Change type: \${payload.eventType}');
    print('New data: \${payload.newRecord}');
    print('Old data: \${payload.oldRecord}');
  },
).subscribe();
\`\`\`

**Verdict**: Firebase wins for offline-first real-time sync. Supabase's real-time is more flexible (you can listen to database-level changes across any table) but doesn't provide built-in offline support.

## Pricing Comparison

### Firebase
- **Spark (Free)**: 1 GiB Firestore storage, 50K reads/day, 20K writes/day
- **Blaze (Pay-as-you-go)**: \$0.06/100K reads, \$0.18/100K writes, \$0.18/GiB storage
- Can get expensive quickly with high-read workloads

### Supabase
- **Free tier**: 500 MB database, 1 GB storage, 50K auth users
- **Pro (\$25/mo)**: 8 GB database, 100 GB storage, unlimited auth users
- More predictable pricing; PostgreSQL queries don't cost per-read

**Verdict**: Supabase is typically cheaper at scale because PostgreSQL queries aren't billed per-read. Firebase's per-operation pricing can surprise teams with read-heavy apps.

## When to Use Which

### Choose Firebase when:
- You need robust offline-first sync out of the box
- Your team is already in the Google Cloud ecosystem
- You need Firebase ML, Crashlytics, or Remote Config
- Your data model is document-oriented and hierarchical
- You want the most mature Flutter plugin ecosystem

### Choose Supabase when:
- Your data is relational and you need joins and constraints
- You want predictable, lower-cost pricing
- You need full-text search without a third-party service
- You value open source and want the option to self-host
- You prefer writing SQL and using database migrations
- You need Row Level Security for fine-grained authorization

## Migration Considerations

If you're considering switching from Firebase to Supabase (or vice versa), isolate your backend calls behind a repository interface:

\`\`\`dart
abstract class PostRepository {
  Future<void> createPost(Post post);
  Future<List<Post>> getPosts({int limit = 20});
  Stream<List<Post>> watchPosts();
  Future<void> deletePost(String id);
}

// Then implement for either backend
class FirebasePostRepository implements PostRepository { ... }
class SupabasePostRepository implements PostRepository { ... }
\`\`\`

This pattern lets you swap backends without rewriting your business logic or UI code.

## Conclusion

There's no universal winner here. Firebase and Supabase are both excellent platforms with different strengths. Firebase shines in offline-first scenarios and has a more mature ecosystem. Supabase offers the power of PostgreSQL, more predictable pricing, and the freedom of open source. The best choice depends on your data model, budget, and team expertise. For many new Flutter projects in 2024, Supabase is increasingly the default recommendation -- especially if your data has relationships.`,
    coverImage: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&h=630&fit=crop',
    date: '2024-03-12',
    readTime: 10,
    tags: ['Flutter', 'Supabase', 'Firebase'],
  },
];
