# Ассеты

## Реальные фотографии

Фотографии интерьера, сотрудников, процедур и продуктов загружены с публичного исходного сайта Albina Beauty Concept. Соответствие исходных URL локальным путям сохранено в `src/content/assets.json`. Они хранятся в `public/images/` и обслуживаются через Next Image. Права на исходные изображения следует подтвердить при подготовке к публикации.

## Редакционное hero-изображение

Создано встроенным инструментом **image_gen**, режим `photorealistic-natural`. Это иллюстративный beauty-мотив, не фотография реального сотрудника или клиента студии. Изображение не используется в отзывах, до/после или как доказательство результата процедуры.

Файлы: `public/images/beauty-editorial.png` (оригинал), `public/images/beauty-editorial.webp` (вариант для сайта).

Финальный prompt:

> Use case: photorealistic-natural. Asset type: editorial hero photograph for Albina Beauty Concept, a luxury beauty and skin studio in Germany. Create an exceptionally refined, authentic luxury skincare campaign photograph, portrait-oriented composition 4:5. Close portrait of an adult woman around 30, natural beautiful skin with realistic pores and a few freckles, no makeup look, dark blonde hair softly pulled back, eyes gently closed, head tilted slightly toward warm natural sunlight, one hand very gently resting at the neck. Visible shoulders, tasteful cream linen draping. Background matte warm nude beige, soft directional window light with gentle shadow on one side. Muted nude, sand, caramel and deep warm brown color story. High-end European editorial photography, intimate calm atmosphere, medium-format film quality, detailed natural skin, elegant rather than glamorous. Head and shoulders, leave generous breathing space around the face and top. No text, no logos, no watermark, no jewelry, no artificial glossy plastic skin. This is illustrative campaign photography, not a portrait of the real studio team.

## Шрифты

Cormorant Garamond (заголовки) и Manrope (интерфейс/текст) загружены из Google Fonts и хранятся локально в `public/fonts/`. Подключение — `src/app/fonts.css`. Браузер посетителя не обращается к Google Fonts. Лицензии OFL сохранены рядом с файлами шрифтов. Сведения о шрифтах: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond), [Manrope](https://fonts.google.com/specimen/Manrope).

## Иконки и логотип

Иконки интерфейса: lucide-react (ISC).

Оригинальный логотип скачан с сайта и используется в шапке, подвале и мобильном меню: `public/images/Albina-Beauty-Concept-Black.svg`.
Источник: https://www.albina-beauty-concept.de/wp-content/uploads/2020/09/Albina-Beauty-Concept-Black.svg

Исходный значок сохранён как `public/images/cropped-v1_bg-192x192.png`; из него создан многослойный `src/app/favicon.ico`. Этот же PNG используется как дополнительный значок 192×192 и Apple touch icon.
Источник: https://www.albina-beauty-concept.de/wp-content/uploads/2024/01/cropped-v1_bg-192x192.png
