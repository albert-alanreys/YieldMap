# YieldMap

**YieldMap** — это инструмент для визуализации и анализа кривых доходности казначейских облигаций США. Программа позволяет строить серию графиков с месячным интервалом, чтобы отслеживать изменения доходности во времени.

**Актуальная версия:** 1.0.0

## Возможности
- Построение графиков кривых доходности.
- Автоматическая загрузка данных из FRED (Federal Reserve Economic Data).
- Динамическая визуализация изменений кривых доходности (месячный интервал).

---

## Установка и настройка

### Требования
1. Установленный [Python](https://www.python.org/downloads/) версии 3.12 или выше.
2. Доступ к [FRED API](https://fred.stlouisfed.org/).

### Шаги для начала работы

#### 1. Установка Python
Скачайте и установите Python с официального сайта. Убедитесь, что вы добавили Python в `PATH` во время установки.

#### 2. Получение API-ключа FRED
1. Зарегистрируйтесь на [FRED](https://fred.stlouisfed.org/).
2. Перейдите в [раздел API-ключей](https://fredaccount.stlouisfed.org/apikeys).
3. Сгенерируйте новый ключ.

#### 3. Настройка API-ключа

Откройте файл `config.py` в любом текстовом редакторе и задайте значение переменной `FRED_API_KEY`:
```python
FRED_API_KEY = "ваш_ключ"
```

## Запуск и открытие

### Способы запуска

#### 1. Через командную строку

Откройте терминал и выполните команду:
```
python starter.py
```

#### 2. Через графический интерфейс

Найдите файл starter.py, кликните по нему правой кнопкой мыши и выберите "Открыть с помощью Python".

### Работа с приложением

После запуска программы откройте браузер и перейдите по адресу:  
http://127.0.0.1:5000.

## Дополнительная информация

- Для работы программы требуется активное интернет-соединение.
- Если данные не загружаются, проверьте ваш API-ключ на сайте FRED.