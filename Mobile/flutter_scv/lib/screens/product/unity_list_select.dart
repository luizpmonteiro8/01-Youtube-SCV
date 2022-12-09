import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_scv/app/models/pagination.dart';
import 'package:flutter_scv/app/models/unity.dart';
import 'package:flutter_scv/app/services/unity.services.dart';
import 'package:flutter_scv/components/custom_drawer.dart';
import 'package:flutter_scv/screens/unity/unity_form_screen.dart';
import 'package:intl/intl.dart';

class UnityListDialog extends StatefulWidget {
  const UnityListDialog({super.key, required this.unity,required this.controllerUnity});

  final Unity? unity;
  final TextEditingController controllerUnity;

  @override
  State<UnityListDialog> createState() => _UnityListDialog();
}

class _UnityListDialog extends State<UnityListDialog> {
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Selecione a unidade'),
        actions: [],
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
                            child: InkWell(
                                highlightColor: Colors.grey,
                                onTap: () {
                                  widget.unity!.id = _unityList[index].id;
                                  widget.unity!.name = _unityList[index].name;
                                  widget.controllerUnity.text=_unityList[index].name;
                                  Navigator.pop(context);
                                },
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
                                              style: const TextStyle(
                                                  fontSize: 18)),
                                          Text(
                                              'Nome: ${_unityList[index].name}',
                                              style: const TextStyle(
                                                  fontSize: 18)),
                                        ],
                                      ),
                                    ])),
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
