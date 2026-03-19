export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
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
    date: '2024-02-20',
    readTime: 15,
    tags: ['Flutter', 'GraphQL', 'API'],
  },
];
