import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'screens/login_screen.dart';
import 'screens/home_screen.dart';

void main() async {
	WidgetsFlutterBinding.ensureInitialized();
	final prefs = await SharedPreferences.getInstance();
	final token = prefs.getString('token');
	runApp(MyApp(isLoggedIn: token != null));
}

class MyApp extends StatelessWidget {
	final bool isLoggedIn;
	const MyApp({super.key, required this.isLoggedIn});

	@override
	Widget build(BuildContext context) {
		return MaterialApp(
			title: 'Mini App',
			debugShowCheckedModeBanner: false,
			theme: ThemeData(
				colorScheme: ColorScheme.fromSeed(
					seedColor: const Color(0xFF6C63FF),
					brightness: Brightness.light,
				),
				useMaterial3: true,
			),
			home: isLoggedIn ? const HomeScreen() : const LoginScreen(),
			routes: {
				'/login': (context) => const LoginScreen(),
				'/home': (context) => const HomeScreen(),
			},
		);
	}
}
