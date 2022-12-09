import 'package:flutter/material.dart';
import 'package:flutter_scv/app/models/pagination.dart';
import 'package:flutter_scv/app/models/product.dart';
import 'package:flutter_scv/app/services/product.services.dart';
import 'package:flutter_scv/components/custom_drawer.dart';
import 'package:flutter_scv/screens/product/product_form_screen.dart';
import 'package:intl/intl.dart';

class ProductListScreen extends StatefulWidget {
  const ProductListScreen({super.key});

  @override
  State<ProductListScreen> createState() => _ProductListState();
}

class _ProductListState extends State<ProductListScreen> {
  ProductServices productServices = ProductServices();
  List<Product> _productList = [];
  int _pageNumberTotal = 0;
  int _pageNumber = 0;
  int _totalItens = 0;
  final int _size = 25;
  String _search = '';

  final controllerSearch = TextEditingController();

  var formatMoney = NumberFormat.currency(locale: "pt_BR",
      symbol: "R\$");

  @override
  void initState() {
    super.initState();

    productServices.getProductPage(size: _size).then((value) => {
          setState(() {
            _productList = value[0].cast<Product>();
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
    productServices
        .getProductPage(page: _pageNumber + 1, size: _size, search: _search)
        .then((value) => {
              setState(() {
                _productList.addAll(value[0].cast<Product>());
                Pagination pagination = value[1];
                _pageNumber = pagination.page;
                _pageNumberTotal = pagination.lastPage;
                _totalItens = pagination.length;
              }),
            });
  }

  _searchItem() {
    _search = controllerSearch.text;
    productServices
        .getProductPage(page: 0, size: _size, search: controllerSearch.text)
        .then((value) => {
              setState(() {
                _productList = value[0].cast<Product>();
                Pagination pagination = value[1];
                _pageNumber = pagination.page;
                _pageNumberTotal = pagination.lastPage;
                _totalItens = pagination.length;
              }),
            });
  }

  _deleteProductDialog(int index, BuildContext context) {
    showDialog(
        context: context,
        barrierDismissible: true,
        builder: (context) {
          return AlertDialog(
            title: Text(
                'Deseja deletar produto com nome: ${_productList[index].name}'
                'e id: ${_productList[index].id.toString()}?'),
            actions: [
              TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Text('Cancelar')),
              ElevatedButton(
                  onPressed: () {
                    _deleteProduct(index, context);
                  },
                  child: const Text('Confimar')),
            ],
          );
        });
  }

  _deleteProduct(int index, BuildContext context) {
    productServices
        .remove(_productList[index].id!)
        .then((value) => {
              setState(() {
                _productList.removeAt(index);
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
      drawer: const CustomDrawer(),
      appBar: AppBar(
        title: const Text('Lista de produtos'),
        actions: [
          IconButton(
              onPressed: () {
                // controllerSearch.text = '';
                // _searchItem();
                Navigator.push(
                    context,
                    PageRouteBuilder(
                      pageBuilder: (_, __, ___) => ProductFormScreen(),
                      transitionDuration: const Duration(seconds: 0),
                    ));
              },
              icon: const Icon(
                Icons.add,
                color: Colors.white,
              )),
          IconButton(
              onPressed: () {
                // controllerSearch.text = '';
                // _searchItem();
                Navigator.push(
                    context,
                    PageRouteBuilder(
                      pageBuilder: (_, __, ___) => const ProductListScreen(),
                      transitionDuration: const Duration(seconds: 0),
                    ));
              },
              icon: const Icon(
                Icons.refresh,
                color: Colors.white,
              )),
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
                    'Itens Carregados: ${_productList.length}',
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
                    itemCount: _productList.length,
                    itemBuilder: (BuildContext context, int index) {
                      if (index == _productList.length - 3 &&
                          _pageNumber <= _pageNumberTotal) {
                        _moreItens();
                      }
                      if (_productList.isNotEmpty) {
                        return Container(
                          margin: const EdgeInsets.only(bottom: 15),
                          color: index % 2 == 0
                              ? const Color(0x7CD7D7D7)
                              : const Color(0XFFBDBDBD),
                          child: Padding(
                            padding: const EdgeInsets.all(20.0),
                            child: InkWell(
                              highlightColor: Colors.grey,
                              onTap: (){
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) =>  ProductFormScreen(product: _productList[index],)));

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
                                          'Id: ${_productList[index].id.toString()}',
                                          style: const TextStyle(fontSize: 18)),
                                      Text('Nome: ${_productList[index].name}',
                                          style: const TextStyle(fontSize: 18)),
                                      Text('Preço de venda: ${formatMoney.format(_productList[index].priceSale)}',
                                          style: const TextStyle(fontSize: 18)),
                                      Text('Unidade: ${_productList[index].unity!.name}',
                                          style: const TextStyle(fontSize: 18)),
                                    ],
                                  ),
                                  IconButton(
                                      onPressed: () {
                                        _deleteProductDialog(index, context);
                                      },
                                      icon: const Icon(
                                        Icons.delete,
                                        color: Color(0xFF5B5750),
                                        size: 40,
                                      ))
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
