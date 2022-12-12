import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_scv/app/models/product.dart';
import 'package:flutter_scv/app/models/unity.dart';
import 'package:flutter_scv/app/services/product.services.dart';
import 'package:flutter_scv/components/custom_drawer.dart';
import 'package:flutter_scv/screens/product/unity_list_select.dart';
import 'package:intl/intl.dart';

class ProductFormScreen extends StatefulWidget {
  const ProductFormScreen({super.key, this.product});

  final Product? product;

  @override
  State<ProductFormScreen> createState() => _ProductFormState();
}

class _ProductFormState extends State<ProductFormScreen> {
  ProductServices productServices = ProductServices();
  Unity? unity = Unity(name: '');
  bool touched = false;

  final controllerId = TextEditingController();
  final controllerName = TextEditingController();
  final controllerPriceSale = TextEditingController();
  final controllerUnityId = TextEditingController();

  var formatMoneyBR =
      NumberFormat.currency(locale: "pt_BR", symbol: '', decimalDigits: 2);

  @override
  void initState() {
    super.initState();
    if (widget.product != null) {
      controllerId.text = widget.product!.id.toString();
      controllerName.text = widget.product!.name;
      controllerPriceSale.text =
          formatMoneyBR.format(widget.product!.priceSale);
      unity = widget.product!.unity;
      controllerUnityId.text = unity!.name;
    }
  }

  @override
  void dispose() {
    controllerId.dispose();
    controllerName.dispose();
    controllerPriceSale.dispose();
    controllerUnityId.dispose();
    super.dispose();
  }

  _save(BuildContext context) {
    Product product = Product(
        name: controllerName.text,
        priceSale: double.parse(_formatMoneyUS()),
        unityId: unity!.id!);
    productServices
        .insert(product)
        .then((value) => {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(
                    'Sucesso, criado com id: $value!',
                    style: const TextStyle(fontSize: 18),
                  ),
                ),
              ),
            })
        .catchError((error) => {
              ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                content: Text(
                  error.runtimeType == String
                      ? error
                      : 'Ocorreu um erro inesperado.',
                  style: const TextStyle(fontSize: 18),
                ),
              )),
            });
  }

  _update(BuildContext context) {
    Product product = Product(
        id: int.parse(controllerId.text),
        name: controllerName.text,
        priceSale: double.parse(_formatMoneyUS()),
        unityId: unity!.id!);
    productServices
        .update(product)
        .then((value) => {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(
                    'Sucesso, alterado id: $value!',
                    style: const TextStyle(fontSize: 18),
                  ),
                ),
              ),
            })
        .catchError((error) => {
              ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                content: Text(
                  error.runtimeType == String
                      ? error
                      : 'Ocorreu um erro inesperado.',
                  style: const TextStyle(fontSize: 18),
                ),
              )),
            });
  }

  _unityDialog(BuildContext context) {
    showDialog(
        context: context,
        barrierDismissible: false,
        builder: (context) {
          return UnityListDialog(
            unity: unity,
            controllerUnity: controllerUnityId,
          );
        });
  }

  _formatMoneyUS() {
    return controllerPriceSale.text.replaceAll('.', '').replaceFirst(',', '.');
  }

  _formatOnType() {
    TextEditingValue newValue = controllerPriceSale.value;
    double value =
        double.parse(newValue.text.replaceAll('.', '').replaceAll(',', ''));

    final formatter = NumberFormat("#,##0.00", "pt_BR");
    String newText = formatter.format(value / 100);

    return newValue.copyWith(
        text: newText,
        selection: TextSelection.collapsed(offset: newText.length));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const CustomDrawer(),
      appBar: AppBar(
        title: const Text('Cadastro de produtos'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(15),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Offstage(
                offstage: controllerId.text != '' ? false : true,
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Id', style: TextStyle(fontSize: 18)),
                      TextField(
                        autofocus: false,
                        controller: controllerId,
                        enabled: false,
                        decoration: const InputDecoration(hintText: 'Id'),
                      ),
                      const SizedBox(height: 15),
                    ]),
              ),
              const Text('Nome', style: TextStyle(fontSize: 18)),
              TextField(
                autofocus: false,
                controller: controllerName,
                onChanged: (t) {
                  setState(() {
                    touched = false;
                  });
                },
                decoration: InputDecoration(
                    hintText: 'Digite o nome',
                    errorText: (touched && controllerName.text == '')
                        ? 'Campo obrigatório'
                        : null),
              ),
              const SizedBox(height: 15),
              const Text('Preço de venda', style: TextStyle(fontSize: 18)),
              TextField(
                autofocus: false,
                controller: controllerPriceSale,
                keyboardType: TextInputType.number,
                onChanged: (t) {
                  setState(() {
                    touched = false;
                    controllerPriceSale.value = _formatOnType();
                  });
                },
                decoration: InputDecoration(
                    hintText: 'Digite o preço de venda',
                    errorText: (touched && controllerPriceSale.text == '')
                        ? 'Campo obrigatório'
                        : null),
              ),
              const SizedBox(height: 15),
              const Text('Unidade', style: TextStyle(fontSize: 18)),
              TextField(
                readOnly: true,
                autofocus: false,
                enabled: true,
                onTap: () {
                  _unityDialog(context);
                },
                controller: controllerUnityId,
                keyboardType: TextInputType.none,
                onChanged: (t) {
                  setState(() {
                    touched = false;
                  });
                },
                decoration: InputDecoration(
                    hintText: 'Selecione a unidade',
                    errorText: (touched && controllerUnityId.text == '')
                        ? 'Campo obrigatório'
                        : null),
              ),
              Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                TextButton(
                    onPressed: () {
                      controllerId.text = '';
                      controllerName.text = '';
                      controllerPriceSale.text = '';
                      controllerUnityId.text = '';
                      setState(() {
                        unity = Unity(name: '');
                        touched = false;
                      });
                    },
                    child:
                        const Text('Limpar', style: TextStyle(fontSize: 18))),
                const SizedBox(
                  width: 15,
                ),
                ElevatedButton(
                    onPressed: () {
                      setState(() {
                        touched = true;
                      });
                      if (controllerId.text == '' &&
                          controllerName.text != '' &&
                          controllerPriceSale.text != '' &&
                          unity!.id != null) {
                        _save(context);
                      } else if (controllerId.text != '' &&
                          controllerName.text != '' &&
                          controllerPriceSale.text != '' &&
                          unity!.id != null) {
                        _update(context);
                      }
                    },
                    child:
                        const Text('Salvar', style: TextStyle(fontSize: 18))),
              ]),
            ],
          ),
        ),
      ),
    );
  }
}
