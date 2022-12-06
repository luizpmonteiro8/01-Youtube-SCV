class Unity {
  int? id;
  String name;

  Unity({this.id, required this.name});

  factory Unity.fromJson(Map<String, dynamic> json) {
    return Unity(
      id: int.parse(json['id']),
      name: json['name'],
    );
  }

  Map toJson() {
    if (id != null) {
      return {'id': id, 'name': name};
    } else {
      return {'name': name};
    }
  }

  @override
  String toString() {
    return 'Unidade: {id: $id, nome: $name}';
  }
}
