/**
 * 工具函数库
 * 包含常用的工具函数，如字符串处理、日期时间格式化、数据类型判断等
 */

/**
 * 字符串处理工具
 */
export const stringUtils = {
  /**
   * 首字母大写
   * @param str 输入字符串
   * @returns 首字母大写的字符串
   */
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * 驼峰转连字符
   * @param str 驼峰字符串
   * @returns 连字符格式字符串
   */
  camelToKebab: (str: string): string => {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  },

  /**
   * 连字符转驼峰
   * @param str 连字符字符串
   * @returns 驼峰格式字符串
   */
  kebabToCamel: (str: string): string => {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  },

  /**
   * 生成随机字符串
   * @param length 字符串长度
   * @returns 随机字符串
   */
  random: (length: number = 8): string => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  /**
   * 截断字符串
   * @param str 输入字符串
   * @param length 最大长度
   * @param suffix 后缀
   * @returns 截断后的字符串
   */
  truncate: (str: string, length: number, suffix: string = '...'): string => {
    if (str.length <= length) return str;
    return str.slice(0, length - suffix.length) + suffix;
  },
};

/**
 * 日期时间工具
 */
export const dateUtils = {
  /**
   * 格式化日期
   * @param date 日期对象或时间戳
   * @param format 格式化模板
   * @returns 格式化后的日期字符串
   */
  format: (
    date: Date | number,
    format: string = 'YYYY-MM-DD HH:mm:ss'
  ): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  },

  /**
   * 获取相对时间
   * @param date 日期对象或时间戳
   * @returns 相对时间字符串
   */
  getRelativeTime: (date: Date | number): string => {
    const now = new Date();
    const d = new Date(date);
    const diff = now.getTime() - d.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 30) return `${days}天前`;
    return dateUtils.format(d, 'YYYY-MM-DD');
  },
};

/**
 * 数据类型工具
 */
export const typeUtils = {
  /**
   * 判断是否为数组
   * @param value 任意值
   * @returns 是否为数组
   */
  isArray: (value: any): value is Array<any> => {
    return Array.isArray(value);
  },

  /**
   * 判断是否为对象
   * @param value 任意值
   * @returns 是否为对象
   */
  isObject: (value: any): value is Record<string, any> => {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  },

  /**
   * 判断是否为字符串
   * @param value 任意值
   * @returns 是否为字符串
   */
  isString: (value: any): value is string => {
    return typeof value === 'string';
  },

  /**
   * 判断是否为数字
   * @param value 任意值
   * @returns 是否为数字
   */
  isNumber: (value: any): value is number => {
    return typeof value === 'number' && !isNaN(value);
  },

  /**
   * 判断是否为布尔值
   * @param value 任意值
   * @returns 是否为布尔值
   */
  isBoolean: (value: any): value is boolean => {
    return typeof value === 'boolean';
  },

  /**
   * 判断是否为函数
   * @param value 任意值
   * @returns 是否为函数
   */
  isFunction: (value: any): value is Function => {
    return typeof value === 'function';
  },

  /**
   * 判断是否为null
   * @param value 任意值
   * @returns 是否为null
   */
  isNull: (value: any): value is null => {
    return value === null;
  },

  /**
   * 判断是否为undefined
   * @param value 任意值
   * @returns 是否为undefined
   */
  isUndefined: (value: any): value is undefined => {
    return value === undefined;
  },

  /**
   * 判断是否为空
   * @param value 任意值
   * @returns 是否为空
   */
  isEmpty: (value: any): boolean => {
    if (typeUtils.isNull(value) || typeUtils.isUndefined(value)) return true;
    if (typeUtils.isArray(value)) return value.length === 0;
    if (typeUtils.isObject(value)) return Object.keys(value).length === 0;
    if (typeUtils.isString(value)) return value.trim() === '';
    return false;
  },
};

/**
 * 数组工具
 */
export const arrayUtils = {
  /**
   * 去重
   * @param arr 数组
   * @returns 去重后的数组
   */
  unique: <T>(arr: T[]): T[] => {
    return [...new Set(arr)];
  },

  /**
   * 分组
   * @param arr 数组
   * @param key 分组键
   * @returns 分组后的对象
   */
  groupBy: <T>(
    arr: T[],
    key: keyof T | ((item: T) => string)
  ): Record<string, T[]> => {
    return arr.reduce(
      (groups, item) => {
        const group = typeof key === 'function' ? key(item) : String(item[key]);
        groups[group] = groups[group] || [];
        groups[group].push(item);
        return groups;
      },
      {} as Record<string, T[]>
    );
  },

  /**
   * 排序
   * @param arr 数组
   * @param key 排序键
   * @param order 排序顺序
   * @returns 排序后的数组
   */
  sortBy: <T>(arr: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
    return [...arr].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });
  },

  /**
   * 分页
   * @param arr 数组
   * @param page 页码
   * @param pageSize 每页大小
   * @returns 分页后的数组
   */
  paginate: <T>(arr: T[], page: number = 1, pageSize: number = 10): T[] => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return arr.slice(start, end);
  },
};

/**
 * 对象工具
 */
export const objectUtils = {
  /**
   * 深拷贝
   * @param obj 对象
   * @returns 深拷贝后的对象
   */
  deepClone: <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime()) as any;
    if (obj instanceof Array)
      return obj.map((item) => objectUtils.deepClone(item)) as any;
    if (typeof obj === 'object') {
      const clonedObj = {} as T;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = objectUtils.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
    return obj;
  },

  /**
   * 合并对象
   * @param target 目标对象
   * @param sources 源对象
   * @returns 合并后的对象
   */
  merge: (...sources: Record<string, any>[]): Record<string, any> => {
    return sources.reduce(
      (acc, source) => {
        Object.keys(source).forEach((key) => {
          if (typeUtils.isObject(source[key]) && typeUtils.isObject(acc[key])) {
            acc[key] = objectUtils.merge(acc[key], source[key]);
          } else {
            acc[key] = source[key];
          }
        });
        return acc;
      },
      {} as Record<string, any>
    );
  },

  /**
   * 过滤对象
   * @param obj 对象
   * @param predicate 过滤函数
   * @returns 过滤后的对象
   */
  filter: <T extends Record<string, any>>(
    obj: T,
    predicate: (value: any, key: string) => boolean
  ): T => {
    const filtered = {} as T;
    Object.keys(obj).forEach((key) => {
      if (predicate(obj[key], key)) {
        (filtered as Record<string, any>)[key] = obj[key];
      }
    });
    return filtered;
  },
};

/**
 * 函数工具
 */
export const functionUtils = {
  /**
   * 防抖
   * @param func 函数
   * @param delay 延迟时间(ms)
   * @returns 防抖后的函数
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  },

  /**
   * 节流
   * @param func 函数
   * @param limit 时间限制(ms)
   * @returns 节流后的函数
   */
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * 重试
   * @param func 函数
   * @param retries 重试次数
   * @param delay 重试延迟(ms)
   * @returns 带重试的函数
   */
  retry: async <T>(
    func: () => Promise<T>,
    retries: number = 3,
    delay: number = 1000
  ): Promise<T> => {
    try {
      return await func();
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return functionUtils.retry(func, retries - 1, delay * 2);
      }
      throw error;
    }
  },
};

/**
 * 本地存储工具
 */
export const storageUtils = {
  /**
   * 设置本地存储
   * @param key 键
   * @param value 值
   */
  set: (key: string, value: any): void => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error setting localStorage item:', error);
    }
  },

  /**
   * 获取本地存储
   * @param key 键
   * @param defaultValue 默认值
   * @returns 存储的值或默认值
   */
  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return defaultValue;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error('Error getting localStorage item:', error);
      return defaultValue;
    }
  },

  /**
   * 删除本地存储
   * @param key 键
   */
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing localStorage item:', error);
    }
  },

  /**
   * 清空本地存储
   */
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

/**
 * 数字工具
 */
export const numberUtils = {
  /**
   * 格式化数字
   * @param num 数字
   * @param decimals 小数位数
   * @returns 格式化后的数字
   */
  format: (num: number, decimals: number = 2): number => {
    return parseFloat(num.toFixed(decimals));
  },

  /**
   * 范围限制
   * @param num 数字
   * @param min 最小值
   * @param max 最大值
   * @returns 限制后的数字
   */
  clamp: (num: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, num));
  },

  /**
   * 随机数
   * @param min 最小值
   * @param max 最大值
   * @returns 随机数
   */
  random: (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  },
};

export default {
  stringUtils,
  dateUtils,
  typeUtils,
  arrayUtils,
  objectUtils,
  functionUtils,
  storageUtils,
  numberUtils,
};
