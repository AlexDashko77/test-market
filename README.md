Веб-приложение для авторизации пользователей и просмотра товаров с использованием публичного API DummyJSON.

Предварительные требования

Node.js 18+
npm или yarn
Docker (опционально)

Установка
```bash
# Клонирование репозитория
git clone https://github.com/AlexDashko77/test-market
cd test-market

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev
```
Приложение будет доступно по адресу: http://localhost:3000

Docker запуск
```bash
docker build -t test-market .
docker run -p 3000:3000 test-market
```
