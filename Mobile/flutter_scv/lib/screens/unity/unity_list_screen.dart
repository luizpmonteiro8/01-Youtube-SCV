import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_scv/app/models/pagination.dart';
import 'package:flutter_scv/app/models/unity.dart';
import 'package:flutter_scv/app/services/unity.services.dart';

class UnityListScreen extends StatefulWidget {
  const UnityListScreen({super.key});

  @override
  State<UnityListScreen> createState() => _UnityListState();
}

class _UnityListState extends State<UnityListScreen> {
  UnityServices unityServices = UnityServices();
  List<Unity> _unityList = [];
  int _pageNumberTotal = 0;
  int _pageNumber = 0;
  int _totalItens = 0;
  final int _size = 25;
  String _search = '';

  final controllerSearch = TextEditingController();

  @override
  void initState() {
    super.initState();

    unityServices.getUnityPage(size: _size).then((value) => {
          setState(() {
            _unityList = value[0].cast<Unity>();
            Pagination pagination = value[1];
            _pageNumber = pagination.page;
            _pageNumberTotal = pagination.lastPage;
            _totalItens = pagination.length;
          }),
        });

    controllerSearch.addListener(_searchItem);
  }

  @override
  void dispose() {
    controllerSearch.dispose();
    super.dispose();
  }

  _moreItens() {
    unityServices
        .getUnityPage(page: _pageNumber + 1, size: _size, search: _search)
        .then((value) => {
              print(_pageNumber),
              print(_pageNumberTotal),
              setState(() {
                _unityList.addAll(value[0].cast<Unity>());
                Pagination pagination = value[1];
                _pageNumber = pagination.page;
                _pageNumberTotal = pagination.lastPage;
                _totalItens = pagination.length;
              }),
            });
  }

  _searchItem() {
    _search = controllerSearch.text;
    unityServices
        .getUnityPage(page: 0, size: _size, search: controllerSearch.text)
        .then((value) => {
              setState(() {
                _unityList = value[0].cast<Unity>();
                Pagination pagination = value[1];
                _pageNumber = pagination.page;
                _pageNumberTotal = pagination.lastPage;
                _totalItens = pagination.length;
              }),
            });
  }

  _deleteUnityDialog(int index, BuildContext context) {
    showDialog(
        context: context,
        barrierDismissible: true,
        builder: (context) {
          return AlertDialog(
            title: Text(
                'Deseja deletar unidade com nome: ${_unityList[index].name}'
                'e id: ${_unityList[index].id.toString()}?'),
            actions: [
              TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Text('Cancelar')),
              ElevatedButton(
                  onPressed: () {
                    _deleteUnity(index, context);
                  },
                  child: const Text('Confimar')),
            ],
          );
        });
  }

  _deleteUnity(int index, BuildContext context) {
    unityServices
        .remove(_unityList[index].id!)
        .then((value) => {
              setState(() {
                _unityList.removeAt(index);
              }),
              Navigator.of(context).pop(),
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text(
                    'Removido com sucesso!',
                    style: TextStyle(fontSize: 18),
                  ),
                ),
              ),
            })
        .catchError((error) => {
              Navigator.of(context).pop(),
              if (error.runtimeType == String)
                {
                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                    content: Text(
                      error,
                      style: const TextStyle(fontSize: 18),
                    ),
                  ))
                }
              else
                {
                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                    content: Text(
                      'Ocorreu um erro inesperado.',
                      style: TextStyle(fontSize: 18),
                    ),
                  ))
                }
            });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Lista de unidades'),
        actions: [
          IconButton(
              onPressed: () {
                controllerSearch.text = '';
                _searchItem();
              },
              icon: const Icon(
                Icons.refresh,
                color: Colors.white,
              ))
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
              padding: const EdgeInsets.all(10.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  TextField(
                    autofocus: false,
                    controller: controllerSearch,
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(), hintText: 'Buscar'),
                  ),
                  Text(
                    'Itens Carregados: ${_unityList.length}',
                    style: const TextStyle(
                      fontSize: 18,
                    ),
                  ),
                  Text('Total de Itens: $_totalItens',
                      style: const TextStyle(fontSize: 18)),
                ],
              )),
          Expanded(
            child: Scrollbar(
                child: ListView.builder(
                    scrollDirection: Axis.vertical,
                    shrinkWrap: true,
                    padding: const EdgeInsets.all(8),
                    itemCount: _unityList.length,
                    itemBuilder: (BuildContext context, int index) {
                      if (index == _unityList.length - 3 &&
                          _pageNumber <= _pageNumberTotal) {
                        _moreItens();
                      }
                      if (_unityList.isNotEmpty) {
                        return Container(
                          margin: const EdgeInsets.only(bottom: 15),
                          color: index % 2 == 0
                              ? const Color(0x7CD7D7D7)
                              : const Color(0XFFBDBDBD),
                          child: Padding(
                            padding: const EdgeInsets.all(20.0),
                            child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                          'Id: ${_unityList[index].id.toString()}',
                                          style: const TextStyle(fontSize: 18)),
                                      Text('Nome: ${_unityList[index].name}',
                                          style: const TextStyle(fontSize: 18)),
                                    ],
                                  ),
                                  IconButton(
                                      onPressed: () {
                                        _deleteUnityDialog(index, context);
                                      },
                                      icon: const Icon(
                                        Icons.delete,
                                        color: Color(0xFF5B5750),
                                        size: 40,
                                      ))
                                ]),
                          ),
                        );
                      } else {
                        return const LinearProgressIndicator();
                      }
                    })),
          ),
        ],
      ),
    );
  }
}
