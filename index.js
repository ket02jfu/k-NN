class KNN {
    constructor(k) {
      this.k = k; // Число ближайших соседей 
      this.points = []; // Массив чисел
    }
  
    // Принимает набор характеристик в виде массива чисел
    addPoint(point, label) {
      this.points.push({ point, label });
    }
  
    // Расстояние между двумя точками евклидова пространства
    euclideanDistance(a, b) //две точки (векторы) в n-мерном пространстве, которые мы хотим сравнить.
    {
      return Math.sqrt(a.reduce((acc, value, index) => acc + (value - b[index]) ** 2, 0));

      // reduce - это метод массивов, который используется для преобразования массива в одно значение.
      // В данном случае, метод reduce нужен для того, 
      // чтобы вычислить сумму квадратов разности между каждой парой значений из массивов a и b.   

      // acc (аккумулятор), value (текущее значение элемента массива "a") и index (индекс текущего элемента)

      // Функция вычисляет квадрат разности между текущим элементом массива "a" и соответствующим элементом массива "b"
    }
  

    // Поиск k ближайших соседей к заданной точке target в массиве точек this.points
    findKNearestNeighbors(target) {
    //   console.log(this.points); 
      return this.points
        .map(point => ({ ...point, distance: this.euclideanDistance(target, point.point),}))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, this.k);
    }
  
    classify(target) {
      const neighbors = this.findKNearestNeighbors(target);
      const labelsFrequency = neighbors.reduce((acc, neighbor) => { acc[neighbor.label] = (acc[neighbor.label] || 0) + 1; 
        return acc;
      }, {});
  
      return Object.entries(labelsFrequency).sort((a, b) => b[1] - a[1])[0][0];
    }
}

// Объект k-NN с 3 ближайшими соседями
const knn = new KNN(3);

// Добавляем обучающие данные
knn.addPoint([1, 1], 'A');
knn.addPoint([2, 2], 'B');
knn.addPoint([3, 3], 'C');
knn.addPoint([4, 4], 'D');
knn.addPoint([5, 5], 'E');
knn.addPoint([6, 6], 'F');

// Классифицируем новую точку
const result = knn.classify([10, 10]);
console.log(result);