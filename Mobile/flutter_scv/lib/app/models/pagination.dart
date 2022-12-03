class Pagination {
  int length;
  int size;
  int lastPage;
  int page;
  int startIndex;
  int endIndex;

  Pagination(
      {required this.length,
      required this.size,
      required this.lastPage,
      required this.page,
      required this.startIndex,
      required this.endIndex});

   @override
  String toString() {
    return 'Paginação: {tamanho: $length, quantidade: $size, '
        'última página: $lastPage, página atual:$page, '
        'startIndex: $startIndex, endIndex: $endIndex}';
  }
}
