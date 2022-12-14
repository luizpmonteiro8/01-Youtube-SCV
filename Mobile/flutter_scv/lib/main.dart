import 'package:flutter/material.dart';
import 'package:flutter_scv/environments.dart';
import 'package:flutter_scv/screens/unity/unity_list_screen.dart';

void main() {
  EnvironmentConfig.environmentBuild = Environments.TEST;
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SCV',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
          appBarTheme: const AppBarTheme(elevation: 0, color: Colors.grey),
          highlightColor: Colors.red,
          inputDecorationTheme: (InputDecorationTheme(
              border: const OutlineInputBorder(),
              errorStyle: const TextStyle(fontSize:16),
              errorBorder: const OutlineInputBorder(
                  borderSide: BorderSide(
                      color: Colors.red, style: BorderStyle.solid, width: 2)),
              focusedBorder: const OutlineInputBorder(
                  borderSide: BorderSide(
                      color: Colors.blue, style: BorderStyle.solid, width: 2)),
              enabledBorder: const OutlineInputBorder(
                  borderSide: BorderSide(
                      color: Colors.grey, style: BorderStyle.solid, width: 2)),
              disabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                      color: Colors.grey.withOpacity(0.4),
                      style: BorderStyle.solid,
                      width: 2)))),
          elevatedButtonTheme: ElevatedButtonThemeData(
              style: ElevatedButton.styleFrom(backgroundColor: Colors.green)),
          textButtonTheme: TextButtonThemeData(
              style: TextButton.styleFrom(foregroundColor: Colors.grey))),

      //color for scrollbar

      home: const UnityListScreen(),
    );
  }
}
