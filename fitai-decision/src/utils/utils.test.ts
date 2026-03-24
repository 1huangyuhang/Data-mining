import {
  stringUtils,
  dateUtils,
  typeUtils,
  arrayUtils,
  objectUtils,
  functionUtils,
  storageUtils,
  numberUtils,
} from './index';

describe('工具函数库测试', () => {
  describe('stringUtils', () => {
    test('capitalize应该首字母大写', () => {
      expect(stringUtils.capitalize('test')).toBe('Test');
      expect(stringUtils.capitalize('hello world')).toBe('Hello world');
    });

    test('camelToKebab应该将驼峰转为连字符', () => {
      expect(stringUtils.camelToKebab('helloWorld')).toBe('hello-world');
      expect(stringUtils.camelToKebab('testCase')).toBe('test-case');
    });

    test('kebabToCamel应该将连字符转为驼峰', () => {
      expect(stringUtils.kebabToCamel('hello-world')).toBe('helloWorld');
      expect(stringUtils.kebabToCamel('test-case')).toBe('testCase');
    });

    test('random应该生成指定长度的随机字符串', () => {
      const result = stringUtils.random(10);
      expect(typeof result).toBe('string');
      expect(result.length).toBe(10);
    });

    test('truncate应该截断字符串', () => {
      expect(stringUtils.truncate('Hello World', 5)).toBe('He...');
      expect(stringUtils.truncate('Test', 10)).toBe('Test');
    });
  });

  describe('dateUtils', () => {
    test('format应该格式化日期', () => {
      const date = new Date('2024-01-01 12:00:00');
      expect(dateUtils.format(date, 'YYYY-MM-DD')).toBe('2024-01-01');
      expect(dateUtils.format(date, 'HH:mm:ss')).toBe('12:00:00');
    });

    test('getRelativeTime应该返回相对时间', () => {
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      expect(dateUtils.getRelativeTime(fiveMinutesAgo)).toBe('5分钟前');
    });
  });

  describe('typeUtils', () => {
    test('isArray应该正确判断数组', () => {
      expect(typeUtils.isArray([])).toBe(true);
      expect(typeUtils.isArray({})).toBe(false);
    });

    test('isObject应该正确判断对象', () => {
      expect(typeUtils.isObject({})).toBe(true);
      expect(typeUtils.isObject([])).toBe(false);
    });

    test('isEmpty应该正确判断空值', () => {
      expect(typeUtils.isEmpty('')).toBe(true);
      expect(typeUtils.isEmpty([])).toBe(true);
      expect(typeUtils.isEmpty({})).toBe(true);
      expect(typeUtils.isEmpty(null)).toBe(true);
      expect(typeUtils.isEmpty(undefined)).toBe(true);
      expect(typeUtils.isEmpty('test')).toBe(false);
    });
  });

  describe('arrayUtils', () => {
    test('unique应该去重', () => {
      const arr = [1, 2, 2, 3, 3, 3];
      expect(arrayUtils.unique(arr)).toEqual([1, 2, 3]);
    });

    test('groupBy应该分组', () => {
      const arr = [
        { id: 1, type: 'A' },
        { id: 2, type: 'B' },
        { id: 3, type: 'A' },
      ];
      const result = arrayUtils.groupBy(arr, 'type');
      expect(result.A).toHaveLength(2);
      expect(result.B).toHaveLength(1);
    });

    test('sortBy应该排序', () => {
      const arr = [
        { id: 3, name: 'C' },
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
      ];
      const sorted = arrayUtils.sortBy(arr, 'id');
      expect(sorted[0].id).toBe(1);
      expect(sorted[2].id).toBe(3);
    });

    test('paginate应该分页', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      const page1 = arrayUtils.paginate(arr, 1, 5);
      const page2 = arrayUtils.paginate(arr, 2, 5);
      expect(page1).toEqual([1, 2, 3, 4, 5]);
      expect(page2).toEqual([6, 7, 8, 9, 10]);
    });
  });

  describe('objectUtils', () => {
    test('deepClone应该深拷贝对象', () => {
      const obj = { a: 1, b: { c: 2 } };
      const cloned = objectUtils.deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned.b).not.toBe(obj.b);
    });

    test('merge应该合并对象', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { b: { d: 3 }, e: 4 };
      const merged = objectUtils.merge(obj1, obj2);
      expect(merged.a).toBe(1);
      expect(merged.b.c).toBe(2);
      expect(merged.b.d).toBe(3);
      expect(merged.e).toBe(4);
    });
  });

  describe('functionUtils', () => {
    test('debounce应该防抖', async () => {
      jest.useFakeTimers();
      const mockFn = jest.fn();
      const debouncedFn = functionUtils.debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();
      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
      jest.useRealTimers();
    });

    test('throttle应该节流', async () => {
      jest.useFakeTimers();
      const mockFn = jest.fn();
      const throttledFn = functionUtils.throttle(mockFn, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      expect(mockFn).toHaveBeenCalledTimes(1);
      jest.advanceTimersByTime(100);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
      jest.useRealTimers();
    });
  });

  describe('storageUtils', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    test('set和get应该正常工作', () => {
      const testData = { name: 'Test', age: 20 };
      storageUtils.set('test', testData);
      const result = storageUtils.get('test');
      expect(result).toEqual(testData);
    });

    test('remove应该删除存储', () => {
      storageUtils.set('test', 'value');
      storageUtils.remove('test');
      const result = storageUtils.get('test');
      expect(result).toBeNull();
    });

    test('clear应该清空存储', () => {
      storageUtils.set('test1', 'value1');
      storageUtils.set('test2', 'value2');
      storageUtils.clear();
      expect(storageUtils.get('test1')).toBeNull();
      expect(storageUtils.get('test2')).toBeNull();
    });
  });

  describe('numberUtils', () => {
    test('format应该格式化数字', () => {
      expect(numberUtils.format(1.2345, 2)).toBe(1.23);
      expect(numberUtils.format(1.2, 2)).toBe(1.2);
    });

    test('clamp应该限制范围', () => {
      expect(numberUtils.clamp(5, 1, 10)).toBe(5);
      expect(numberUtils.clamp(0, 1, 10)).toBe(1);
      expect(numberUtils.clamp(15, 1, 10)).toBe(10);
    });

    test('random应该生成随机数', () => {
      const result = numberUtils.random(1, 10);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });
  });
});
