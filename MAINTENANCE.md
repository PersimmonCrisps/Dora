# 運営・メンテナンスガイド

このドキュメントでは、東大ドラえもんF同好会ウェブサイトの更新手順を解説します。

## 1. 新しい活動（アクティビティ）を追加する手順

主な作業は **画像配置、JSON更新、HTML作成、sitemap.xml更新** の4点です。

### ステップ1：画像を配置する
- 追加したい画像を `assets/images/activities/` に保存します。
- **推奨設定**:
    - ファイル名: `yymmdd_EventName_1.jpeg` （例: `260331_Kyodai_1.jpeg`）
    - 推奨解像度: 横幅 1200px 程度
    - ファイル形式: `.jpeg` または `.png`

### ステップ2：JSONデータを更新する
`assets/data/activities.json` を開き、新しい活動データを追加します。
```json
{
    "title": "活動タイトル",
    "date": "2026.03.31",
    "rawDate": "2026-03-31",
    "image": "メイン画像ファイル名.jpg",
    "link": "作成するHTMLファイル名.html",
    "description": "一覧ページに表示される短い説明文",
    "featured": true,
    "gallery": [
        "画像1.jpg",
        "画像2.jpg"
    ]
}
```
- `featured`: `true` にするとトップページに表示されます。
- `gallery`: ここに画像を記述するだけで、ページ内のフォトギャラリーが自動生成されます。

### ステップ3：HTMLページを作成する
1. `activities/report_template.html` をコピーします。
2. ファイル名を JSON の `link` で指定した名前に変更します。
3. ファイル内のタイトルや日付、本文を書き換えます。

### ステップ4：サイトマップ (sitemap.xml) の更新
新しい活動ページを追加した後は、検索エンジン（Google等）に登録するために `sitemap.xml` も更新することを推奨します。

1. `sitemap.xml` を開きます。
2. 一番下の `</urlset>` の直前に、以下のテンプレートをコピーして貼り付けます。
3. `<loc>` の中身を作成したページのURLに書き換えてください。

```xml
  <url>
    <loc>https://doraemon.tokyo/activities/作成したファイル名.html</loc>
    <priority>0.7</priority>
  </url>
```

---

## 2. サイトの構造（開発者向け）

### 主要ファイル
- `index.html`: トップページ。活動一覧はJSで動的に読み込まれます。
- `assets/js/main.js`:
    - `loadActivities()`: JSONから活動リストを取得してカードを表示。
    - `initActivityGallery()`: ページ名に基づき、該当する活動の写真をJSONから探して表示。
    - `setupLightbox()`: 写真をクリックした際の拡大表示。
- `assets/css/style.css`: 全体のデザイン。ドラえもんカラーの変数が `:root` に定義されています。

---

## 3. トラブルシューティング
- **写真が表示されない**:
    - `activities.json` の `link`（ファイル名）と、実際のHTMLファイル名が完全に一致しているか確認してください。
    - 画像パスが `../assets/images/activities/` から見て正しいか確認してください。
- **ドラえもんカラーを使いたい**:
    - CSSの変数（`var(--primary)` など）を使用してください。
