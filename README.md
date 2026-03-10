# SDDS Tokens Transfer

Плагин для Pixso, который позволяет переносить токены дизайн-системы между DS-Builder и Pixso.

## Возможности

- **Экспорт** — выгрузка опубликованных локальных стилей (цвета) из Pixso в JSON-файл для DS-Builder
- **Импорт** — загрузка стилей из DS-Builder и применение их в Pixso (в разработке)

## Стек

- **React 19** + **TypeScript** (strict)
- **Styled Components** + **SDDS / Salute Plasma**
- **Pixso Plugin API** (`@pixso/plugin-typings`)
- **@pixso/plugin-cli** — сборка плагина

## Структура

```
main.ts              # Точка входа плагина (работает в песочнице Pixso, доступ к Plugin API)
manifest.json        # Конфигурация плагина (ID, версия, разрешения)
ui/
  index.tsx          # Точка входа React-приложения
  App.tsx            # Главный компонент; управляет экранами и обменом сообщений с main.ts
  screens/           # HomeScreen → SelectScreen → ConfirmScreen → ResultScreen
  components/        # DesignSystemCard, FlowIllustration, LogViewer
  helpers/           # Шина событий (postMessage), данные дизайн-систем
  hooks/             # useScreenTransition — анимированные переходы между экранами
utils/
  constants.ts       # Константы типов сообщений между main ↔ UI
  importStyles.ts    # Логика применения стилей
types/index.ts       # Общие TypeScript-типы
```

## Поднятие проекта

```bash
npm install
npm run dev
```

Затем в Pixso:
1. Нажать на иконку в верхнем правом углу в виде пазла
2. Нажать на иконку в виде терминала

## Сборка и публикация

```bash
npm run build
```

Затем в Pixso:
1. Нажать на иконку пазла → иконку шестиугольника
2. Выбрать "Создать плагин"
3. Загрузить `manifest.json` в dropzone
4. На вкладке плагинов нажать три точки → "Опубликовать"

> Проверка плагина со стороны Pixso занимает от 2 до 7 дней.

## Архитектура

Плагин состоит из двух изолированных потоков:

- **main.ts** — работает в sandbox Pixso, имеет доступ к Plugin API (`pixso.*`)
- **ui/** — React-приложение, встроенное через iframe

Общение между ними — через `postMessage` с типизированными константами из `utils/constants.ts`.

**Поток экспорта:**
1. Пользователь выбирает дизайн-систему и подтверждает экспорт
2. UI отправляет сообщение в main.ts
3. main.ts вызывает `pixso.getLocalPaintStyles()`, фильтрует опубликованные стили
4. Данные возвращаются в UI, который формирует и скачивает JSON-файл

## Полезные ссылки

- [Документация Pixso Plugin API](https://pixso.net/developer/en/guide/introduction.html)
