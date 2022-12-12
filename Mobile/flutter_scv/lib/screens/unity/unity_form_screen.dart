import 'package:flutter/material.dart';
import 'package:flutter_scv/app/models/unity.dart';
import 'package:flutter_scv/app/services/unity.services.dart';
import 'package:flutter_scv/components/custom_drawer.dart';

class UnityFormScreen extends StatefulWidget {
  const UnityFormScreen({super.key, this.unity});

  final Unity? unity;

  @override
  State<UnityFormScreen> createState() => _UnityFormState();
}

class _UnityFormState extends State<UnityFormScreen> {
  UnityServices unityServices = UnityServices();
  bool touched = false;

  final controllerId = TextEditingController();
  final controllerName = TextEditingController();

  @override
  void initState() {
    super.initState();
    if (widget.unity != null) {
      controllerId.text = widget.unity!.id.toString();
      controllerName.text = widget.unity!.name;
    }
  }

  @override
  void dispose() {
    controllerId.dispose();
    controllerName.dispose();
    super.dispose();
  }

  _save(BuildContext context) {
    Unity unity = Unity(name: controllerName.text);
    unityServices
        .insert(unity)
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
    Unity unity =
        Unity(id: int.parse(controllerId.text), name: controllerName.text);
    unityServices
        .update(unity)
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const CustomDrawer(),
      appBar: AppBar(
        title: const Text('Cadastro de unidades'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(15),
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
                      decoration: const InputDecoration(
                          hintText: 'Id'),
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
            Row(mainAxisAlignment: MainAxisAlignment.center, children: [
              TextButton(
                  onPressed: () {
                    controllerId.text = '';
                    controllerName.text = '';
                    setState(() {
                      touched = false;
                    });
                  },
                  child: const Text('Limpar', style: TextStyle(fontSize: 18))),
              const SizedBox(
                width: 15,
              ),
              ElevatedButton(
                  onPressed: () {
                    setState(() {
                      touched = true;
                    });
                    if (controllerId.text == '' && controllerName.text != '') {
                      _save(context);
                    } else if (controllerId.text != '' &&
                        controllerName.text != '') {
                      _update(context);
                    }
                  },
                  child: const Text('Salvar', style: TextStyle(fontSize: 18))),
            ]),
          ],
        ),
      ),
    );
  }
}
