# 運営・メンテナンスガイド (Astro版)

このドキュメントでは、東大ドラえもんF同好会ウェブサイト（Astro版）の更新手順を解説します。

## 1. 新しい活動（アクティビティ）を追加する手順

主な作業は **画像配置、Markdown作成** の2点です。

### ステップ1：画像を配置する
- 追加したい画像を `src/assets/images/activities/` に保存します。
- **推奨設定**:
    - ファイル名: `yymmdd_EventName_1.jpeg` （例: `260331_Kyodai_1.jpeg`）
    - 推奨解像度: 横幅 1200px 程度
    - ファイル形式: `.jpeg` または `.png`

### ステップ2：Markdownファイルを作成する
`src/content/activities/` 内に新しいファイルを作成します（例: `260331_Kyodai.md`）。
ファイルの冒頭（フロントマター）に以下のメタデータを記述し、その下に本文を書きます。

```markdown
---
title: "活動タイトル"
date: "2026.03.31"
rawDate: "2026-03-31"
image: "メイン画像ファイル名.jpg"
description: "一覧ページに表示される短い説明文"
featured: true
gallery:
  - "画像1.jpg"
  - "画像2.jpg"
draft: true
---

【活動報告】
ここに本文を記述します。HTMLタグも使用可能です。
```

- `featured`: `true` にするとトップページに表示されます。
- `gallery`: 画像ファイル名をリスト形式で記述すると、フォトギャラリーが自動生成されます。
- `draft`: `true` に設定すると、トップページや一覧に表示されなくなります（練習用）。
    - 外部に一切見せないようにしたい場合は、ファイル名を `practice-` で始めるようにしてください（例: `practice-test.md`）。これによりサイトマップからも自動除外されます。

### ステップ3：確認と公開
1. ローカルで `npm run dev` を実行し、ブラウザで正しく表示されるか確認します。
2. 問題なければ GitHub へプッシュします。GitHub Actions により自動的にビルドとデプロイが行われます。
3. **コンポーネントおよびレイアウトの修正**:
    - デザインや共通部分を修正したい場合は、`src/layouts/Layout.astro` や `src/components/` 内の各コンポーネントを直接編集します。

---

## 2. 開発者向けの構造

### 主要ディレクトリ
- `src/layouts/Layout.astro`: 全ページの共通枠。
- `src/components/`: ヘッダー、フッター、カードなどの部品。
- `src/pages/`: 各種ページ。個別記事は `[slug].astro` で自動生成されます。
- `public/assets/`: 画像、CSS、および既存の動作を支える `main.js`。

### 便利なコマンド
- `npm run dev`: 開発用サーバーを起動（http://localhost:4321）
- `npm run build`: 本番用ファイルの書き出し

---

## 3. トラブルシューティング
- **写真が表示されない**:
    - Markdown の `image` に記述したファイル名が、`src/assets/images/activities/` 内のファイル名と完全に一致しているか確認してください。
- **デザインが崩れた**:
    - `src/styles/global.css` の設定を確認してください。共通パーツの変更は `src/components/` 内のファイルを編集します。
