class Unity {
  int? id;
  String name;

  Unity({this.id,required this.name});

  factory Unity.fromJson(Map<String, dynamic> json) {
    return Unity(
      id: int.parse(json['id']),
      name: json['name'],
    ) ;
  }

  @override
  String toString(){
    return 'Unidade: {id: $id, nome: $name}';
  }
}