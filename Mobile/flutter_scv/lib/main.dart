import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_scv/app/models/unity.dart';
import 'package:flutter_scv/app/services/unity.services.dart';
import 'package:flutter_scv/environments.dart';
import 'package:flutter_scv/screens/unity/unity_form_screen.dart';
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
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
          appBarTheme: const AppBarTheme(elevation: 0, color: Colors.grey),
          highlightColor: Colors.red,
          inputDecorationTheme: (const InputDecorationTheme(
              border: OutlineInputBorder(),
              errorStyle: TextStyle(fontSize: 16),
              errorBorder: OutlineInputBorder(borderSide: BorderSide(
                  color: Colors.red,
                  style: BorderStyle.solid,
                  width: 2)),
              focusedBorder: OutlineInputBorder(borderSide: BorderSide(
                  color: Colors.blue,
                  style: BorderStyle.solid,
                  width: 2)),
              enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                      color: Colors.grey,
                      style: BorderStyle.solid,
                      width: 2)))),
          elevatedButtonTheme: ElevatedButtonThemeData(
              style: ElevatedButton.styleFrom(backgroundColor: Colors.green)),
          textButtonTheme: TextButtonThemeData(
              style: TextButton.styleFrom(foregroundColor: Colors.grey))),

      //color for scrollbar

      home: const UnityFormScreen(),
    );
  }
}
