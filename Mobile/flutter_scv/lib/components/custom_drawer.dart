import 'package:flutter/material.dart';
import 'package:flutter_scv/screens/product/product_form_screen.dart';
import 'package:flutter_scv/screens/product/product_list_screen.dart';
import 'package:flutter_scv/screens/unity/unity_form_screen.dart';
import 'package:flutter_scv/screens/unity/unity_list_screen.dart';

class CustomDrawer extends StatelessWidget {
  const CustomDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: SafeArea(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            InkWell(
              highlightColor: Colors.grey,
              child: Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Row(children: const [
                    Icon(
                      Icons.arrow_forward,
                      size: 25,
                    ),
                    Text(
                      'Lista de unidades',
                      style: TextStyle(fontSize: 18),
                    )
                  ])),
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const UnityListScreen()));
              },
            ),
            const Divider(color: Colors.grey, height: 0, thickness: 1),
            InkWell(
              highlightColor: Colors.grey,
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Row(children: const [
                  Icon(Icons.arrow_forward),
                  Text(
                    'Cadastro de unidades',
                    style: TextStyle(fontSize: 18),
                  )
                ]),
              ),
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const UnityFormScreen()));
              },
            ),
            const Divider(color: Colors.grey, height: 0, thickness: 1),
            InkWell(
              highlightColor: Colors.grey,
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Row(children: const [
                  Icon(Icons.arrow_forward),
                  Text(
                    'Lista de produtos',
                    style: TextStyle(fontSize: 18),
                  )
                ]),
              ),
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const ProductListScreen()));
              },
            ),
            const Divider(color: Colors.grey, height: 0, thickness: 1),
            InkWell(
              highlightColor: Colors.grey,
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Row(children: const [
                  Icon(Icons.arrow_forward),
                  Text(
                    'Cadastro de produtos',
                    style: TextStyle(fontSize: 18),
                  )
                ]),
              ),
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const ProductFormScreen()));
              },
            ),
            const Divider(color: Colors.grey, height: 0, thickness: 1),
          ],
        ),
      ),
    );
  }
}
