function isEqual(a: object, b: object): boolean {
    // Проверка на ссылочное равенство
    if (a === b) {
      return true;
    }
  
    // Проверка на тип и на null
    if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
      return false;
    }
  
    // Получение ключей объектов
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
  
    // Проверка на равное количество ключей
    if (keysA.length !== keysB.length) {
      return false;
    }
  
    // Рекурсивное сравнение значений по каждому ключу
    for (const key of keysA) {
      if (!keysB.includes(key) || !isEqual((a as any)[key], (b as any)[key])) {
        return false;
      }
    }
  
    return true;
  }
  
  export default isEqual