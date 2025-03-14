# YieldMap

**YieldMap** — инструмент для визуализации и анализа кривых доходности казначейских облигаций США (U.S. Treasury Securities). Программа создает серию графиков кривых доходности с месячным интервалом, предоставляя возможность наглядно отслеживать изменения их динамики во времени.

**Актуальная версия:** 1.0.1

---

## Основные возможности

- 🚀 **Сбор данных:** загрузка данных из FRED.
- 📈 **Визуализация:** построение графиков кривых доходности.

---

## Установка и настройка

### Требования

1. Python версии **3.12**.
2. Установленные зависимости из файла `requirements.txt`.
3. Действующий API-ключ для FRED API.

### Шаги для начала работы

#### 1. Установка Python

Скачайте и установите [Python](https://www.python.org/downloads/). При установке активируйте опцию **Add Python to PATH**.

#### 2. Установка зависимостей

- **Через файл** `requirements.txt`

Откройте терминал (или командную строку), перейдите в директорию `YieldMap` (например, с помощью команды `cd C:\Trading\YieldMap`), и выполните следующую команду:

```bash
pip install -r requirements.txt
```

- **Вручную**

Откройте терминал и установите зависимости, указанные в файле `requirements.txt`:

```bash
pip install "имя_пакета"
```

#### 3. Получение API-ключа FRED

1. Зарегистрируйтесь на [FRED](https://fred.stlouisfed.org/).
2. Перейдите в [раздел API-ключей](https://fredaccount.stlouisfed.org/apikeys).
3. Сгенерируйте новый ключ.

#### 4. Настройка API-ключа

Откройте файл `config.py` в любом текстовом редакторе и укажите API-ключ:

```python
FRED_API_KEY = "ваш_FRED_API_KEY"
```

#### 5. Настройка временного диапазона

В файле `config.py` укажите параметры для сбора данных в словаре `fetch_info`:

```python
fetch_info = {
    "start_time": "1990-01-01",
    "end_time": "2030-01-01",
}
```

## Запуск и работа

### Способы запуска

#### 1. Через командную строку

Запустите программу в терминале из корневой директории проекта:

```bash
python starter.py
```

#### 2. Через графический интерфейс

Найдите файл `starter.py`, кликните по нему правой кнопкой мыши и выберите "Открыть с помощью Python".

### Работа с приложением

Перейдите в браузере по адресу http://127.0.0.1:5000 для просмотра результатов.

## Дополнительная информация

- Для работы программы требуется хорошее интернет-соединение.
- Если данные не загружаются, проверьте интернет или API-ключ FRED.