import 'package:flutter_scv/app/models/unity.dart';

class Product {
  int? id;
  String name;
  double priceSale;
  int unityId;
  Unity? unity;

  Product(
      {this.id,
      required this.name,
      required this.priceSale,
      required this.unityId,
      this.unity});

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      name: json['name'],
      priceSale: json['priceSale'],
      unityId: json['unityId'],
      unity: json['unity'],
    );
  }

  Map toJson() {
    if (id != null) {
      return {'id': id, 'name': name,'priceSale':priceSale,'unityId':unityId};
    } else {
      return {'name': name,'priceSale':priceSale,'unityId':unityId};
    }
  }

  @override
  String toString() {
    return 'Produto: {id: $id, nome: $name, preço de venda: $priceSale, '
        'unidade: {id:${unity!.id}, nome: ${unity!.name}  }}';
  }
}
