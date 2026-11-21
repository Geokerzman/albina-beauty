# albina-new.rootforce.dev

Сайт запускается сервисом `albina-new.service` от пользователя `albina-new`. Next.js слушает только `127.0.0.1:43179`. Отдельный конфиг Nginx обслуживает `albina-new.rootforce.dev` и путь проверки Let's Encrypt.

| Путь на сервере                             | Назначение                                    |
| ------------------------------------------- | --------------------------------------------- |
| `/opt/albina-new/node`                      | Node.js 24.22.3, тот же релиз, что в CI       |
| `/opt/albina-new/bin/publish-release`       | Команда выкладки для SSH-ключа GitHub Actions |
| `/srv/albina-new/app/current`               | Ссылка на текущую сборку в `app/releases`     |
| `/srv/albina-new/app.env`                   | Параметры среды и секрет Payload              |
| `/var/lib/albina-new/cms.sqlite` и `media/` | Данные и загруженные файлы CMS                |
| `/var/lib/albina-new/backups/`              | Копии SQLite перед миграциями, живут 30 дней  |

GitHub Actions проверяет содержимое и собирает приложение для pull requests в `main`. После push в `main` или ручного запуска с этой ветки Actions отправляет готовую сборку по SSH и проверяет публичные страницы галереи и входа в CMS. Секрет Actions `ALBINA_NEW_DEPLOY_KEY` содержит выделенный ключ с принудительной командой `publish-release`. Эта команда запускает миграции и переключает текущую сборку. Если новая версия не отвечает на локальную проверку, она переключает сервис на прежнюю сборку. Копия БД сохраняется для ручного восстановления после несовместимой миграции.

`publish-release`, конфиг Nginx и unit-файл устанавливаются администратором сервера из этой папки. При обычной выкладке GitHub Actions обновляет только приложение. Логи приложения доступны через `journalctl -u albina-new.service`, а логи домена хранятся в `/var/log/nginx/albina-new.*.log`.
